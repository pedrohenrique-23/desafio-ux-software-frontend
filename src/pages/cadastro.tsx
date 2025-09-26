// src/pages/cadastro.tsx
import { Input } from '@/components/Input';
import { useMask } from '@react-input/mask';
import { FormEvent, useState } from 'react';
import { api } from '@/services/api';
import { toast } from 'react-toastify';
import { EyeIcon } from '@/components/icons/EyeIcon'; // Importa os ícones
import { EyeOffIcon } from '@/components/icons/EyeOffIcon';

const CadastroPage = () => {
  // ... (os outros useStates continuam aqui)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 1. Estados para controlar a visibilidade de cada senha
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const cpfRef = useMask({ mask: '___.___.___-__', replacement: { _: /\d/ } });
  const phoneRef = useMask({ mask: '(__) _____-____', replacement: { _: /\d/ } });

  const handleSubmit = async (event: FormEvent) => {
    // ... (lógica do handleSubmit continua a mesma)
    event.preventDefault();
    if (password.length < 6) {
      toast.error('A senha deve ter no mínimo 6 caracteres.');
      return; // Para a execução
    }

    if (password !== confirmPassword) {
      toast.error('As senhas não conferem!');
      return;
    }
    const data = { name: fullName, email, cpf, phone, password };
    try {
      await api.post('/auth/register', data);
      toast.success('Usuário cadastrado com sucesso!');
      setFullName('');
      setEmail('');
      setCpf('');
      setPhone('');
      setPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      console.error('Erro no cadastro:', error);
      if (error.response && error.response.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Ocorreu um erro ao tentar cadastrar. Tente novamente.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Criar Conta
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Inputs de nome, email, cpf e telefone não mudam */}
          <Input id="fullName" label="Nome Completo" type="text" placeholder="Seu nome completo" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          <Input id="email" label="E-mail" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input ref={cpfRef} id="cpf" label="CPF" type="text" placeholder="000.000.000-00" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
          <Input ref={phoneRef} id="phone" label="Telefone" type="text" placeholder="(00) 00000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} required />

          {/* 2. Inputs de senha atualizados com as novas props */}
          <Input
            id="password"
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            icon={showPassword ? <EyeOffIcon /> : <EyeIcon />}
            onIconClick={() => setShowPassword(!showPassword)}
          />
          <Input
            id="confirmPassword"
            label="Confirmar Senha"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            icon={showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
            onIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
          
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastroPage;