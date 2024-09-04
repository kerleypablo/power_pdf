export default function HistoryItem({ item }) {
    // Função para formatar a data
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }) + ' ' + date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });
    };

    const downloadFile = () => {
        const link = document.createElement('a');
        link.href = item.downloadLink;
        link.download = item.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

  
    return (
      <li className="flex items-center justify-between bg-gray-200 p-4 rounded-lg shadow mb-2">
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <img src="/icon_calender.png" alt="Calendar" className="w-6 h-6 mr-2" />
            <p className="text-sm text-gray-600">{formatDate(item.createdAt)}</p>
          </div>
          <div className="flex items-center">
            <img src="/Icon_doc.png" alt="Document" className="w-6 h-6 mr-2" />
            <p className="text-sm text-gray-600">{item.name}</p>
          </div>
        </div>
        <div>
          {item.status === 'pending' ? (
            <span className="text-blue-700 border border-blue-700 rounded px-2 py-1">Pendente</span>
          ) : (
            <button
              className="bg-blue-400 text-white text-sm rounded-lg px-8 py-0"
              onClick={downloadFile}
            >
              Download
            </button>
          )}
        </div>
      </li>
    );
  }
  