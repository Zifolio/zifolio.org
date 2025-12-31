
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, SubscriptionType } from '../types';
import { MODULES, MOCK_RANKING, MARKET_DATA } from '../constants';
import { getFinancialAdvice, getPersonalizedDailyTip } from '../geminiService';

interface DashboardProps {
  user: User;
  logout: () => void;
  toggleChecklist: (id: string) => void;
}

const WELCOME_MESSAGES: Record<string, string> = {
  portuguese: 'Mambo fixe',
  umbundu: 'Kalunga',
  kimbundu: 'Kiambote',
  kikongo: 'Mbote',
  cokwe: 'Moyo',
  kwanyama: 'Mwa lala po',
  ngangela: 'Moyo',
  nyaneka: 'Tyikola',
};

const Dashboard: React.FC<DashboardProps> = ({ user, logout, toggleChecklist }) => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  const [dailyTip, setDailyTip] = useState<string | null>(null);
  const [loadingTip, setLoadingTip] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [animatedProgress, setAnimatedProgress] = useState(0);

  const isPremium = user.subscription === SubscriptionType.PREMIUM;
  const categories = ['Todos', ...new Set(MODULES.map(m => m.category))];
  const filteredModules = selectedCategory === 'Todos' 
    ? MODULES 
    : MODULES.filter(m => m.category === selectedCategory);

  const progressPercentage = Math.round((user.progress.completedModules.length / MODULES.length) * 100);
  const completedTasks = user.progress.dailyChecklist.filter(t => t.done).length;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progressPercentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [progressPercentage]);

  // Carregar dica diária com Cache de 24h
  useEffect(() => {
    if (isPremium && user.financialProfile) {
      const fetchDailyTip = async () => {
        const cacheKey = `zifolio_tip_${user.id}`;
        const cachedData = localStorage.getItem(cacheKey);
        const today = new Date().toDateString();

        if (cachedData) {
          const { tip, date } = JSON.parse(cachedData);
          if (date === today) {
            setDailyTip(tip);
            return;
          }
        }

        setLoadingTip(true);
        const tip = await getPersonalizedDailyTip(user.financialProfile!, user.name, user.nationalLanguage);
        setDailyTip(tip);
        localStorage.setItem(cacheKey, JSON.stringify({ tip, date: today }));
        setLoadingTip(false);
      };
      fetchDailyTip();
    }
  }, [isPremium, user.financialProfile, user.id, user.name, user.nationalLanguage]);

  const handleGetAdvice = async (customPrompt?: string) => {
    const query = customPrompt || prompt;
    if (!query) return;
    setLoadingAdvice(true);
    const result = await getFinancialAdvice(query, user.nationalLanguage);
    setAdvice(result);
    setLoadingAdvice(false);
    if (!customPrompt) setPrompt('');
  };

  const welcomePhrase = WELCOME_MESSAGES[user.nationalLanguage] || WELCOME_MESSAGES.portuguese;

  const quickPrompts = [
    "O que são Títulos do Tesouro?",
    "Como funciona a BODIVA?",
    "Dicas para poupar no Kwanza"
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-100 p-6 flex flex-col sticky top-0 md:h-screen z-20 shadow-sm">
        <div className="flex items-center gap-2 mb-10 text-blue-600 font-bold text-xl">
           <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 48L38 42V72H22V48Z" fill="currentColor" />
                <path d="M42 38L58 48V72H42V38Z" fill="currentColor" />
                <path d="M62 30L78 35V72H62V30Z" fill="currentColor" />
            </svg>
            Zifolio
        </div>

        <nav className="flex-grow space-y-2 flex md:flex-col flex-row gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 no-scrollbar">
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-semibold min-w-max">
            <span>🏠</span> Início
          </Link>
          <Link to="/simulator" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-gray-50 rounded-xl transition min-w-max">
            <span>🧮</span> Simuladores
          </Link>
          <Link to="/premium" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-gray-50 rounded-xl transition min-w-max">
            <span>💎</span> Premium
          </Link>
        </nav>

        <button 
          onClick={logout}
          className="mt-4 md:mt-10 flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition font-medium"
        >
          <span>🚪</span> Sair
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-8 overflow-y-auto max-h-screen">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex flex-col gap-2 w-full max-w-md">
            <h1 className="text-2xl font-bold text-slate-800">{welcomePhrase}, {user.name.split(' ')[0]}? 👋</h1>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <p className="text-slate-500 font-medium">Jornada de Aprendizado: {progressPercentage}%</p>
                {user.financialProfile && (
                  <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    {user.financialProfile}
                  </span>
                )}
              </div>
              <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-blue-600 transition-all duration-1000 ease-out rounded-full shadow-[0_0_8px_rgba(0,102,255,0.4)]"
                  style={{ width: `${animatedProgress}%` }}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="bg-white px-4 py-2 rounded-2xl border border-gray-100 flex items-center gap-2 shadow-sm">
                <span className="text-yellow-500 font-bold">⭐ {user.progress.points}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Pontos</span>
             </div>
             {isPremium && (
               <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-2 rounded-2xl text-[10px] font-bold uppercase shadow-md">PRO</div>
             )}
          </div>
        </header>

        {/* Market Data Bar */}
        <section className="relative overflow-hidden mb-8 group">
          <div className="flex gap-4 animate-marquee whitespace-nowrap overflow-x-auto no-scrollbar pb-2">
            {[...MARKET_DATA, ...MARKET_DATA].map((item, i) => (
              <div key={i} className="bg-white min-w-[180px] p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col shrink-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.symbol}</span>
                <div className="flex justify-between items-end mt-1">
                  <span className="font-bold text-slate-800">{item.price}</span>
                  <span className={`text-[10px] font-bold ${item.change.startsWith('+') ? 'text-green-500' : item.change.startsWith('-') ? 'text-red-500' : 'text-slate-400'}`}>
                    {item.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            
            {/* Dica Diária */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                 <span className="text-8xl">💡</span>
               </div>
               {(!isPremium || !user.financialProfile) && (
                 <div className="absolute inset-0 bg-white/60 backdrop-blur-[4px] z-10 flex flex-col items-center justify-center p-6 text-center">
                    <span className="text-3xl mb-3">🔒</span>
                    <h4 className="font-bold text-slate-800 mb-2">Dica Diária Personalizada</h4>
                    <p className="text-sm text-slate-500 max-w-xs mb-4">
                      {!user.financialProfile 
                        ? "Primeiro, descubra o seu perfil para receber dicas exclusivas." 
                        : "Exclusivo para membros Zifolio PRO."}
                    </p>
                    <Link to={!user.financialProfile ? "/module/4" : "/premium"} className="gradient-blue text-white px-6 py-2 rounded-xl font-bold text-sm shadow-lg active:scale-95 transition">
                      {!user.financialProfile ? "Descobrir Perfil" : "Ver Planos PRO"}
                    </Link>
                 </div>
               )}
               
               <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <span className="text-blue-600">✨</span> Dica do Dia
                  </h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-md">Personalizada: {user.nationalLanguage}</span>
               </div>

               {loadingTip ? (
                 <div className="space-y-3">
                    <div className="h-4 bg-slate-100 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-slate-100 rounded w-full animate-pulse delay-75"></div>
                    <div className="h-4 bg-slate-100 rounded w-5/6 animate-pulse delay-150"></div>
                 </div>
               ) : (
                 <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap italic">
                   {dailyTip || "Aguardando geração da sua dica personalizada..."}
                 </div>
               )}
            </div>

            {/* AI Advisor */}
            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
               <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-blue-600/20 blur-3xl rounded-full"></div>
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-blue-600/40">🤖</div>
                  <div>
                    <h3 className="text-xl font-bold">Assessor Zifolio AI</h3>
                    <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest">Atendimento em {user.nationalLanguage}</p>
                  </div>
               </div>

               {advice ? (
                 <div className="mb-6 space-y-4 max-h-[300px] overflow-y-auto no-scrollbar pr-2">
                    <div className="bg-white/10 p-4 rounded-2xl rounded-bl-none border border-white/5 animate-in slide-in-from-left-4 duration-300">
                      <p className="text-sm leading-relaxed text-slate-200">{advice}</p>
                    </div>
                    <button 
                      onClick={() => setAdvice(null)}
                      className="text-[10px] font-bold text-blue-400 hover:text-blue-300 transition"
                    >
                      Nova pergunta →
                    </button>
                 </div>
               ) : (
                 <div className="mb-6">
                    <p className="text-slate-400 text-xs mb-4">Sugestões de temas:</p>
                    <div className="flex flex-wrap gap-2">
                       {quickPrompts.map((qp, i) => (
                         <button 
                            key={i}
                            onClick={() => handleGetAdvice(qp)}
                            className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-xs hover:bg-white/10 transition text-slate-300"
                         >
                           {qp}
                         </button>
                       ))}
                    </div>
                 </div>
               )}

               {!advice && (
                 <div className="flex flex-col sm:flex-row gap-2">
                   <input 
                      type="text" 
                      placeholder="Faça uma pergunta sobre investimentos..."
                      className="flex-grow px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:text-slate-500 text-sm"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleGetAdvice()}
                   />
                   <button 
                    onClick={() => handleGetAdvice()}
                    disabled={loadingAdvice || !prompt}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-50 shadow-lg shadow-blue-600/30 text-sm"
                   >
                     {loadingAdvice ? 'Analisando...' : 'Enviar'}
                   </button>
                 </div>
               )}
            </div>
            
            {/* Módulos com Filtro */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-800">Caminho do Investidor</h3>
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-500 border border-gray-100 hover:bg-gray-50'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {filteredModules.map(module => (
                  <div key={module.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          {module.category}
                        </span>
                        {module.isPremium && !isPremium && (
                          <span className="text-lg">🔒</span>
                        )}
                      </div>
                      <h4 className="font-bold text-lg mb-2 text-slate-800 group-hover:text-blue-600 transition-colors">{module.title}</h4>
                      <p className="text-xs text-slate-500 mb-6 line-clamp-2">{module.description}</p>
                    </div>
                    <Link 
                      to={module.isPremium && !isPremium ? '/premium' : `/module/${module.id}`}
                      className={`w-full py-3 rounded-xl font-bold text-center text-sm transition ${
                        user.progress.completedModules.includes(module.id) 
                        ? 'bg-green-50 text-green-600 border border-green-100' 
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md active:scale-95'
                      }`}
                    >
                      {user.progress.completedModules.includes(module.id) ? 'Concluído ✅' : 'Ver Conteúdo'}
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Checklist */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-slate-800">Checklist do Dia</h3>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                    {completedTasks}/{user.progress.dailyChecklist.length}
                  </span>
               </div>
               <div className="space-y-3">
                  {user.progress.dailyChecklist.map(item => (
                    <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                       <div className="relative flex items-center">
                          <input 
                              type="checkbox" 
                              checked={item.done} 
                              onChange={() => toggleChecklist(item.id)}
                              className="w-5 h-5 border-2 border-slate-200 rounded-md accent-blue-600 cursor-pointer appearance-none checked:bg-blue-600 checked:border-blue-600 transition-all"
                            />
                          {item.done && <span className="absolute inset-0 flex items-center justify-center text-white text-[8px]">✓</span>}
                       </div>
                       <span className={`text-xs font-medium transition ${item.done ? 'line-through text-slate-300' : 'text-slate-600'}`}>
                         {item.task}
                       </span>
                    </label>
                  ))}
               </div>
            </div>

            {/* Ranking */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
               <h3 className="font-bold mb-4 text-slate-800 text-sm">Comunidade</h3>
               <div className="space-y-3">
                  {MOCK_RANKING.map((rank, idx) => (
                    <div key={idx} className={`flex items-center justify-between p-2 rounded-xl transition ${rank.name === 'Você' ? 'bg-blue-50 border border-blue-100' : ''}`}>
                       <div className="flex items-center gap-3">
                          <span className={`font-bold text-xs ${idx === 0 ? 'text-amber-500' : 'text-slate-300'} w-4`}>{idx + 1}</span>
                          <span className="text-lg">{rank.avatar}</span>
                          <span className={`text-xs font-medium ${rank.name === 'Você' ? 'text-blue-700 font-bold' : 'text-slate-700'}`}>{rank.name}</span>
                       </div>
                       <span className="text-[10px] font-bold text-slate-400">{rank.points} <span className="text-[8px] opacity-60">PTS</span></span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Achievements */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
               <h3 className="font-bold text-slate-800 text-sm mb-4">Conquistas</h3>
               <div className="grid grid-cols-4 gap-2">
                  {user.progress.achievements.map(ach => (
                    <div 
                      key={ach.id} 
                      title={ach.description} 
                      className={`flex flex-col items-center justify-center aspect-square rounded-xl border transition-all ${ach.unlocked ? 'bg-blue-50 border-blue-100' : 'opacity-20 grayscale border-gray-100'}`}
                    >
                       <span className="text-xl">{ach.icon}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </main>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
