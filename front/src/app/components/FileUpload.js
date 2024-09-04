"use client";

import { useState } from 'react';

export default function FileUpload({ onFilesSelected }) {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    onFilesSelected(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles(files);
    onFilesSelected(files);
  };

  return (
    <div
      className="border-2 border-dashed border-blue-200 rounded-lg p-8 text-center cursor-pointer"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        multiple
        accept=".pdf"
        className="hidden"
        id="file-upload"
        onChange={handleFileSelect}
      />
      <label htmlFor="file-upload" className="block cursor-pointer text-gray-600">
        {selectedFiles.length > 0
          ? `${selectedFiles.length} arquivos selecionados`
          : "Selecione ou arraste os PDF's aqui"}
      </label>
    </div>
  );
}
