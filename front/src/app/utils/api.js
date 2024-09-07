const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const fetchHistory = async (email) => {
    try {
      const response = await fetch(`${apiUrl}/api/merge-history/${email}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar histórico');
      }
      const data = await response.json();
      
      // Ordenar a lista do mais recente para o mais antigo
      return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
      console.error('Erro:', error);
      return [];
    }
  };

  export const mergePdfs = async (email, fileName, pdfContentList) => {
    try {
  
      const response = await fetch(`${apiUrl}/api/merge-history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          fileName,
          pdfContentList,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao mesclar os PDFs');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro:', error);
      return null;
    }
  };
  
  