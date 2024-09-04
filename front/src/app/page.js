"use client";
import { useRouter } from 'next/navigation';
import { useUser } from '../app/context/userContext';


export default function Home() {
  const { email, setEmail, error, setError } = useUser();
  const router = useRouter();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value) && value) {
      setError('Por favor, insira um e-mail válido.');
    } else {
      setError('');
      
    }
  };

  const handleLogin = () => {
    if (!email) {
      setError('O e-mail é obrigatório.');
    } else if (!validateEmail(email)) {
      setError('Por favor, insira um e-mail válido.');
    } else {
      setError('');
      router.push('/merge'); 
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="flex-1 bg-blue-500 py-10 text-center flex flex-col items-center justify-center">
        <img src='/logopowerpdf.png' alt="Logo" className="mb-12 w-[386px] h-[82px]" />
        <p className="text-white mt-2">Se identifique usando seu e-mail e mescle seus documentos</p>

        <div className="mt-6 flex justify-center items-center w-full">
          <input
            type="email"
            placeholder="E-mail"
            className={`px-4 py-2 h-[54px] w-2/3 md:w-1/3 border rounded ${error ? 'border-red-500' : 'border-gray-300'} text-gray-700`}
            value={email}
            onChange={handleEmailChange}
          />
          <button
            onClick={handleLogin}
            className="ml-4 w-44 px-6 py-2 bg-blue-700 text-white text-sm font-bold  h-[54px] rounded-lg"
          >
            Entrar
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </header>

      <section className="flex-1 text-center py-16 bg-gray-200 flex flex-col justify-center">
        <h2 className=" text-[52px] font-bold text-blue-gray-500">Junte-se a nós</h2>
        <p className=" text-[16px] text-black mt-4 mb-8 max-w-3xl mx-auto">
          Transforme sua maneira de trabalhar com documentos! Junte-se à melhor ferramenta para mesclar PDFs de forma rápida, fácil e segura.
        </p>

        <div className="mx-auto my-8 w-[236px] h-[5px] bg-[#B0B8C2] rounded-tl-lg"></div>

        <div className="flex justify-center mt-8 space-x-8">
          <div>
            <h3 className="text-blue-500 text-[50px] font-bold">+180</h3>
            <p className="text-gray-500 text-[24px]">Usuários ativos</p>
          </div>
          <div>
            <h3 className="text-blue-500 text-[50px] font-bold">+50.000</h3>
            <p className="text-gray-500 text-[24px] ">Documentos mesclados</p>
          </div>
          <div>
            <h3 className="text-blue-500 text-[50px] font-bold">+1000</h3>
            <p className="text-gray-500 text-[24px]">Acessos mensais</p>
          </div>
        </div>
        <div className="flex-1 items-center py-16 bg-gray-200 flex flex-col justify-center">
          <img src='/powercrm.png' alt="Logo" className="mb-12 w-[136px] h-[28px]" />
        </div>
      </section>
    </div>
  );
}
