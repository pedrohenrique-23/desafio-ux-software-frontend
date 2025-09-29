// src/pages/login.tsx
import { Input } from '@/components/Input';
import { FormEvent, useState } from 'react';
import { api } from '@/services/api';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // 2. Inicializa o router

const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const data = { email, password };
    try {
      const response = await api.post('/auth/login', data);
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      toast.success('Login realizado com sucesso!');
      
      router.push('/');

    } catch (error) { // <-- MUDANÇA AQUI (removemos o ': any')
      console.error('Erro no login:', error);

      // Verificamos se o erro é do Axios para acessar 'response' com segurança
      if (axios.isAxiosError(error) && error.response) {
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
          <Input id="email" label="E-mail" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input id="password" label="Senha" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Acessar
          </button>
        </form>
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