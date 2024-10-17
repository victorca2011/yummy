"use client"

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false, // Mantém o redirecionamento falso para gerenciar manualmente
      email,
      password,
    });

    // Verifica se houve um erro
    if (result?.error) {
      alert('Erro ao fazer login. Verifique suas credenciais.');
    } else {
      // Redireciona para a página privada após o login bem-sucedido
      router.push('/private');  // Redireciona para a página privada
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="p-4 shadow-md rounded">
        <h1 className="text-2xl mb-4">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          <a href="/private">Entrar</a>
        </button>
      </form>
    </div>
  );
}
