"use client";
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Relatorio() {
  const [relatorios, setRelatorios] = useState([]);

  useEffect(() => {
    // Obtendo a URL da API da variável de ambiente
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    
    fetch(`${apiUrl}/api/merge-history/merges-por-dia`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRelatorios(data);
        } else {
          console.error('Resposta inesperada da API:', data);
          setRelatorios([]);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar dados do relatório:', error);
        setRelatorios([]);
      });
  }, []);

  const labels = relatorios.map((item) => item.date);
  const data = {
    labels,
    datasets: [
      {
        label: 'Mesclagens por Dia',
        data: relatorios.map((item) => item.mergeCount),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Mesclagens por Dia',
      },
    },
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Relatórios de Mesclagens por Dia</h1>
      <div className="w-full max-w-2xl">
        {relatorios.length > 0 ? (
          <Bar data={data} options={options} />
        ) : (
          <p>Nenhum dado disponível.</p>
        )}
      </div>
    </div>
  );
}
