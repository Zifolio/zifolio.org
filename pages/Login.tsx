
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: (email: string) => void;
  onRegister: (email: string, name: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onRegister }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      if (email && password && name) {
        onRegister(email, name);
        navigate('/module/4'); // Redireciona direto para o diagnóstico
      }
    } else {
      if (email && password) {
        onLogin(email);
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl w-full max-w-md border border-gray-100 animate-in fade-in zoom-in duration-300">
        <div className="flex justify-center mb-8">
          <span className="text-blue-600 font-bold text-3xl flex items-center gap-2">
             <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 48L38 42V72H22V48Z" fill="currentColor" />
                <path d="M42 38L58 48V72H42V38Z" fill="currentColor" />
                <path d="M62 30L78 35V72H62V30Z" fill="currentColor" />
            </svg>
            Zifolio
          </span>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">
          {isRegister ? 'Criar sua conta' : 'Bem-vindo de volta'}
        </h2>
        <p className="text-slate-500 text-center mb-8 text-sm">
          {isRegister ? 'O seu futuro começa com um passo.' : 'Entre para gerir o seu kumbu.'}
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div className="animate-in slide-in-from-top-2 duration-300">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Nome Completo</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-4 rounded-2xl bg-slate-50 border border-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"
                placeholder="Ex: Manuel da Silva"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Email</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-4 rounded-2xl bg-slate-50 border border-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"
              placeholder="exemplo@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Senha</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-4 rounded-2xl bg-slate-50 border border-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {!isRegister && (
            <div className="text-right">
              <span className="text-xs text-blue-600 font-bold cursor-pointer hover:underline">Esqueceu a senha?</span>
            </div>
          )}
          
          <button 
            type="submit"
            className="w-full gradient-blue text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-blue-200 transition active:scale-[0.98] mt-4"
          >
            {isRegister ? 'Cadastrar Agora' : 'Entrar na Plataforma'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          {isRegister ? 'Já tem uma conta?' : 'Ainda não tem conta?'} {' '}
          <button 
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-600 font-bold hover:underline"
          >
            {isRegister ? 'Entrar agora' : 'Criar uma grátis'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
