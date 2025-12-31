
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { User, SubscriptionType, ChecklistItem } from './types';
import { MOCK_ACHIEVEMENTS } from './constants';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ModuleView from './pages/ModuleView';
import Premium from './pages/Premium';
import SimulatorPage from './pages/SimulatorPage';
import InfoPage from './pages/InfoPage';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('zifolio_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const loginUser = (email: string) => {
    const savedUser = localStorage.getItem('zifolio_user');
    if (savedUser) {
       const u = JSON.parse(savedUser);
       if (u.email === email) {
          setUser(u);
          showNotify("Bem-vindo de volta! Vamos organizar esse kumbu?");
          return;
       }
    }
    
    // Login mock
    const newUser: User = {
      id: Date.now().toString(),
      name: 'Investidor Angolano',
      email,
      subscription: SubscriptionType.FREE,
      nationalLanguage: 'portuguese',
      progress: {
        points: 0,
        completedModules: [],
        achievements: MOCK_ACHIEVEMENTS,
        dailyChecklist: [
          { id: '1', task: 'Registrar gastos do dia', done: false },
          { id: '2', task: 'Ler 5 min de conteúdo', done: false },
          { id: '3', task: 'Planejar semana', done: false }
        ]
      }
    };
    setUser(newUser);
    localStorage.setItem('zifolio_user', JSON.stringify(newUser));
  };

  const registerUser = (email: string, name: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      name: name || 'Novo Investidor',
      email,
      subscription: SubscriptionType.FREE,
      nationalLanguage: 'portuguese', // Default inicial
      progress: {
        points: 0,
        completedModules: [],
        achievements: MOCK_ACHIEVEMENTS,
        dailyChecklist: [
          { id: '1', task: 'Registrar gastos do dia', done: false },
          { id: '2', task: 'Ler 5 min de conteúdo', done: false },
          { id: '3', task: 'Planejar semana', done: false }
        ]
      }
    };
    setUser(newUser);
    localStorage.setItem('zifolio_user', JSON.stringify(newUser));
    showNotify("Conta criada! Comecemos pelo seu diagnóstico.");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('zifolio_user');
  };

  const updateProgress = (pointsToAdd: number, moduleId?: string) => {
    if (!user) return;
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev };
      updated.progress.points += pointsToAdd;
      if (moduleId && !updated.progress.completedModules.includes(moduleId)) {
        updated.progress.completedModules = [...updated.progress.completedModules, moduleId];
      }
      localStorage.setItem('zifolio_user', JSON.stringify(updated));
      return updated;
    });
    showNotify(`Parabéns! Ganhou ${pointsToAdd} pontos! 🚀`);
  };

  const saveFinancialProfile = (profile: 'Conservador' | 'Moderado' | 'Arrojado', language?: string) => {
    if (!user) return;
    setUser(prev => {
      if (!prev) return null;
      const updated = { 
        ...prev, 
        financialProfile: profile,
        nationalLanguage: language || prev.nationalLanguage 
      };
      localStorage.setItem('zifolio_user', JSON.stringify(updated));
      return updated;
    });
    showNotify(`Diagnóstico concluído! 🎯`);
  };

  const toggleChecklist = (id: string) => {
    if (!user) return;
    const updated = { ...user };
    updated.progress.dailyChecklist = updated.progress.dailyChecklist.map(item => 
      item.id === id ? { ...item, done: !item.done } : item
    );
    setUser(updated);
    localStorage.setItem('zifolio_user', JSON.stringify(updated));
    if (updated.progress.dailyChecklist.find(i => i.id === id)?.done) {
        showNotify("Tarefa concluída! Foco no objetivo!");
    }
  };

  const upgradeToPremium = () => {
    if (!user) return;
    const updated = { ...user, subscription: SubscriptionType.PREMIUM };
    setUser(updated);
    localStorage.setItem('zifolio_user', JSON.stringify(updated));
    showNotify("Bem-vindo ao Zifolio PRO! 💎");
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-blue-600">Carregando Zifolio...</div>;

  return (
    <HashRouter>
      {notification && (
        <div className="fixed top-6 right-6 z-50 animate-bounce">
          <div className="bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-2xl border-2 border-white font-bold flex items-center gap-3">
            <span>✨</span> {notification}
          </div>
        </div>
      )}
      <Routes>
        <Route path="/" element={!user ? <Landing /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login onLogin={loginUser} onRegister={registerUser} />} />
        <Route 
          path="/dashboard" 
          element={user ? (
            !user.financialProfile ? <Navigate to="/module/4" /> : <Dashboard user={user} logout={logout} toggleChecklist={toggleChecklist} />
          ) : <Navigate to="/login" />} 
        />
        <Route 
          path="/module/:id" 
          element={user ? <ModuleView user={user} updateProgress={updateProgress} saveFinancialProfile={saveFinancialProfile} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/simulator" 
          element={user ? <SimulatorPage user={user} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/premium" 
          element={user ? <Premium user={user} onUpgrade={upgradeToPremium} /> : <Navigate to="/login" />} 
        />
        <Route path="/info" element={<InfoPage />} />
      </Routes>
      <Analytics />
    </HashRouter>
  );
};

export default App;
