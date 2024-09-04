"use client";

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import FileUpload from '../components/FileUpload';
import HistoryList from '../components/HistoryList';
import { fetchHistory, mergePdfs } from '../utils/api';
import { useUser } from '../context/userContext';


export default function MergePage() {
  const { email, error, setError } = useUser();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [history, setHistory] = useState([]);
  const [pdfName, setPdfName] = useState('');

  useEffect(() => {
    if (email) {
      fetchHistory(email).then((data) => {
        setHistory(data);
      });
    }
  }, [email]);

  const handleFilesSelected = (files) => {
    setSelectedFiles(files);
  };

  const handleMerge = async () => {
    if (selectedFiles.length === 0) {
      setError('Por favor, selecione os arquivos.');
      return;
    }

    if (!pdfName.trim()) {
      setError('Por favor, insira um nome para o PDF.');
      return;
    }

    try {
      const pdfContentList = await Promise.all(
        Array.from(selectedFiles).map((file) => convertToBase64(file))
      );
debugger
      const result = await mergePdfs(email, pdfName, pdfContentList);

      if (result) {
        const updatedHistory = await fetchHistory(email);
        setHistory(updatedHistory);
        setError('');
      } else {
        setError('Erro ao mesclar os PDFs. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao mesclar os PDFs:', error);
      setError('Ocorreu um erro ao tentar mesclar os PDFs. Verifique sua conexão ou tente novamente mais tarde.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 items-center">
      <Header />
      <main className="w-[736px] flex flex-col items-center relative -mt-[20px]">
         <div className="bg-white p-8 rounded-lg shadow-md w-full">
          <FileUpload onFilesSelected={handleFilesSelected} />
          </div>
          <input
            type="text"
            placeholder="Nome do PDF"
            value={pdfName}
            onChange={(e) => setPdfName(e.target.value)}
            className="mt-4 p-2 border border-gray-300 rounded w-full"
          />
          <button
            onClick={handleMerge}
            className="mt-4 py-4 w-full bg-blue-400 text-white text-sm  rounded-lg"
          >
            Realizar o merge
          </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
       
        <section className="mt-8 w-full">
        <h2 className="text-blue-700 text-lg font-bold flex items-center">
            Merges 
            <span className="ml-2 bg-gray-300 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-sm">
              {history.length}
            </span>
          </h2>
          <HistoryList history={history} />
          {history.length === 0 && (
            <div className="text-center mt-8">
              <div className="flex justify-center mb-4">
                <img src="/Frame.png" alt="No merges" />
              </div>
              <p className="text-gray-500">
                <strong>Você ainda não possui nenhum merge realizado.</strong><br />
                Junte seus PDFs em um único documento.
              </p>
            </div>
          )}
        </section>
      </main>
      <div className="flex-1 items-center py-16 flex flex-col justify-center">
        <img src='/powercrm.png' alt="Logo" className="mb-12 w-[136px] h-[28px]" />
      </div>
    </div>
  );
}


const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result.split(",")[1]; // Remove o prefixo da string Base64
          resolve(base64String);
        };
        reader.onerror = () => {
          reject(new Error("Erro ao converter o arquivo para Base64"));
        };
        reader.readAsDataURL(file);
      } catch (error) {
        reject(error);
      }
    });
};
