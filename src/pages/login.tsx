// src/pages/login.tsx
import { Input } from '@/components/Input';
import { FormEvent, useState } from 'react';
import { api } from '@/services/api';
import { toast } from 'react-toastify';
import Link from 'next/link'; // 1. Importa o componente Link

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    // ... (a função handleSubmit continua a mesma)
    event.preventDefault();
    const data = { email, password };
    try {
      const response = await api.post('/auth/login', data);
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      toast.success('Login realizado com sucesso!');
      setEmail('');
      setPassword('');
    } catch (error: any) {
      console.error('Erro no login:', error);
      if (error.response && error.response.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Ocorreu um erro ao tentar fazer login. Tente novamente.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Entrar
        </h1>

        <form onSubmit={handleSubmit}>
          {/* ... (os inputs e o botão continuam os mesmos) ... */}
          <Input id="email" label="E-mail" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input id="password" label="Senha" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Acessar
          </button>
        </form>

        {/* 2. Adiciona o texto e o link para a página de cadastro */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Não tem uma conta?{' '}
          <Link href="/cadastro" className="font-medium text-blue-600 hover:text-blue-500">
            Cadastre-se
          </Link>
        </p>
        
      </div>
    </div>
  );
};

export default LoginPage;