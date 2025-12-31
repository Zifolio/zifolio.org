
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MODULES } from '../constants';
import { User } from '../types';

interface ModuleViewProps {
  user: User;
  updateProgress: (points: number, moduleId: string) => void;
  saveFinancialProfile?: (profile: 'Conservador' | 'Moderado' | 'Arrojado', language?: string) => void;
}

const ANGOLAN_LANGUAGES = [
  { id: 'portuguese', name: 'Português', welcome: 'Bem-vindo' },
  { id: 'umbundu', name: 'Umbundu', welcome: 'Kalunga' },
  { id: 'kimbundu', name: 'Kimbundu', welcome: 'Kiambote' },
  { id: 'kikongo', name: 'Kikongo', welcome: 'Mbote' },
  { id: 'cokwe', name: 'Cokwe', welcome: 'Moyo' },
  { id: 'kwanyama', name: 'Kwanyama', welcome: 'Mwa lala po' },
  { id: 'ngangela', name: 'Ngangela', welcome: 'Moyo' },
  { id: 'nyaneka', name: 'Nyaneka', welcome: 'Tyikola' },
];

const WELCOME_MESSAGES: Record<string, string> = {
  portuguese: 'Bem-vindo',
  umbundu: 'Kalunga',
  kimbundu: 'Kiambote',
  kikongo: 'Mbote',
  cokwe: 'Moyo',
  kwanyama: 'Mwa lala po',
  ngangela: 'Moyo',
  nyaneka: 'Tyikola',
};

const ModuleView: React.FC<ModuleViewProps> = ({ user, updateProgress, saveFinancialProfile }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const module = MODULES.find(m => m.id === id);
  
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [calculatedProfile, setCalculatedProfile] = useState<'Conservador' | 'Moderado' | 'Arrojado' | null>(null);
  const [profileWeights, setProfileWeights] = useState<number[]>([]);
  
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  // Novo estado para o passo da língua no diagnóstico
  const [diagnosisStep, setDiagnosisStep] = useState<'LANGUAGE' | 'FINANCE'>(id === '4' ? 'LANGUAGE' : 'FINANCE');
  const [tempLanguage, setTempLanguage] = useState<string>('portuguese');

  useEffect(() => {
    if (module?.isProfileQuiz && !user.financialProfile) {
      setShowQuiz(true);
      setDiagnosisStep('LANGUAGE');
    }
  }, [module, user.financialProfile]);

  if (!module) return <div>Módulo não encontrado</div>;

  const currentQuestion = module.quiz[currentQuestionIdx];

  const handleLanguageChoice = (langId: string) => {
    setTempLanguage(langId);
    setDiagnosisStep('FINANCE');
  };

  const handleAnswerProfileQuiz = (optionIdx: number) => {
    if (!currentQuestion.weight || !saveFinancialProfile || isChecking) return;
    
    setIsChecking(true);
    setSelectedOption(optionIdx);

    setTimeout(() => {
      const weight = currentQuestion.weight![optionIdx];
      const newWeights = [...profileWeights, weight];
      setProfileWeights(newWeights);

      if (currentQuestionIdx < module.quiz.length - 1) {
        setCurrentQuestionIdx(prev => prev + 1);
        setIsChecking(false);
        setSelectedOption(null);
      } else {
        const averageWeight = newWeights.reduce((a, b) => a + b, 0) / newWeights.length;
        let profile: 'Conservador' | 'Moderado' | 'Arrojado' = 'Conservador';
        
        if (averageWeight > 1.6 && averageWeight <= 2.4) profile = 'Moderado';
        else if (averageWeight > 2.4) profile = 'Arrojado';

        setCalculatedProfile(profile);
        saveFinancialProfile(profile, tempLanguage);
        updateProgress(50, module.id);
        setQuizFinished(true);
        setIsChecking(false);
        setSelectedOption(null);
      }
    }, 800);
  };

  const handleAnswerKnowledgeQuiz = (optionIdx: number, correctIdx: number) => {
    if (isChecking) return;
    
    setIsChecking(true);
    setSelectedOption(optionIdx);

    setTimeout(() => {
      if (optionIdx === correctIdx) {
        updateProgress(10, module.id);
      }

      if (currentQuestionIdx < module.quiz.length - 1) {
        setCurrentQuestionIdx(prev => prev + 1);
        setIsChecking(false);
        setSelectedOption(null);
      } else {
        setQuizFinished(true);
        setIsChecking(false);
        setSelectedOption(null);
      }
    }, 1000);
  };

  const getProfileTips = (profile: string) => {
    switch(profile) {
      case 'Conservador':
        return "Foco em segurança. No mercado angolano, explore BTs e OTs. Sua meta é não perder kumbu para a inflação.";
      case 'Moderado':
        return "Equilíbrio. Uma mistura de Títulos Públicos com Fundos de Investimento diversificados é o ideal para si.";
      case 'Arrojado':
        return "Crescimento. Explore ações na BODIVA e fundos imobiliários. O risco é maior, mas o potencial de lucro também.";
      default:
        return "";
    }
  };

  const isFirstDiagnostic = module.isProfileQuiz && !user.financialProfile;
  const welcomeText = WELCOME_MESSAGES[user.nationalLanguage] || WELCOME_MESSAGES.portuguese;

  return (
    <div className="min-h-screen bg-white">
      <nav className="p-6 border-b flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
        {!isFirstDiagnostic ? (
          <Link to="/dashboard" className="text-blue-600 font-bold flex items-center gap-2 hover:translate-x-[-4px] transition-transform">
            ← Voltar ao Dashboard
          </Link>
        ) : (
          <div className="flex items-center gap-2 text-blue-600 font-bold">
            <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 48L38 42V72H22V48Z" fill="currentColor" />
                <path d="M42 38L58 48V72H42V38Z" fill="currentColor" />
                <path d="M62 30L78 35V72H62V30Z" fill="currentColor" />
            </svg>
            Zifolio: Diagnóstico
          </div>
        )}
        <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{module.category}</span>
      </nav>

      <div className="max-w-4xl mx-auto p-6 md:p-12">
        {!showQuiz ? (
          <article className="animate-in fade-in duration-700">
             {/* Conteúdo Normal do Módulo (Omitido para brevidade, mantendo funcionalidade) */}
             <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">{module.title}</h1>
             <p className="text-slate-500 text-lg leading-relaxed mb-8">{module.description}</p>
             <div className="text-slate-700 mb-12"><p>{module.content}</p></div>
             <button onClick={() => setShowQuiz(true)} className="gradient-blue text-white px-10 py-4 rounded-2xl font-bold">Começar Exercício</button>
          </article>
        ) : (
          <div className="bg-slate-50 p-8 md:p-16 rounded-[3rem] border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-700">
            {!quizFinished ? (
              <div className="max-w-2xl mx-auto">
                {diagnosisStep === 'LANGUAGE' ? (
                  <div className="animate-in zoom-in duration-500 text-center">
                    <h2 className="text-3xl font-black text-slate-900 mb-4">Escolha a sua língua de origem</h2>
                    <p className="text-slate-500 mb-10">A Zifolio celebra a diversidade de Angola. Como gostaria de ser saudado?</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {ANGOLAN_LANGUAGES.map(lang => (
                        <button 
                          key={lang.id}
                          onClick={() => handleLanguageChoice(lang.id)}
                          className="bg-white p-4 rounded-2xl border-2 border-gray-100 hover:border-blue-500 transition-all font-bold text-slate-700 flex flex-col items-center gap-2"
                        >
                          <span className="text-blue-600 text-xs">{lang.welcome}</span>
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-10">
                      <div className="flex flex-col">
                        <h2 className="text-lg font-bold text-slate-800">{module.isProfileQuiz ? 'Passo Financeiro' : 'Questão'}</h2>
                        <div className="flex gap-1 mt-1">
                          {module.quiz.map((_, i) => (
                            <div key={i} className={`h-1 w-6 rounded-full transition-all ${i === currentQuestionIdx ? 'bg-blue-600' : i < currentQuestionIdx ? 'bg-blue-200' : 'bg-slate-200'}`}></div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <p className="text-xl md:text-2xl font-bold mb-8 text-slate-800 leading-tight">{currentQuestion.question}</p>
                      <div className="grid gap-3">
                        {currentQuestion.options.map((opt, oIdx) => {
                          const isSelected = selectedOption === oIdx;
                          let buttonStyle = "bg-white border-gray-100 text-slate-700 hover:border-blue-500 hover:bg-blue-50/30";
                          if (isSelected) {
                            buttonStyle = module.isProfileQuiz 
                              ? "bg-blue-600 border-blue-600 text-white shadow-xl scale-[1.02]" 
                              : (oIdx === currentQuestion.answer ? "bg-green-500 border-green-500 text-white" : "bg-red-500 border-red-500 text-white");
                          }
                          return (
                            <button key={oIdx} disabled={isChecking} onClick={() => module.isProfileQuiz ? handleAnswerProfileQuiz(oIdx) : handleAnswerKnowledgeQuiz(oIdx, currentQuestion.answer)} className={`text-left px-6 py-5 border-2 rounded-2xl transition-all font-semibold flex items-center gap-4 ${buttonStyle}`}>
                              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isSelected ? 'bg-white/20' : 'bg-slate-100 text-slate-400'}`}>{String.fromCharCode(65 + oIdx)}</span>
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="text-center py-10 animate-in zoom-in duration-500">
                <div className="text-7xl mb-8">🎉</div>
                {module.isProfileQuiz && calculatedProfile ? (
                  <div>
                    <h2 className="text-4xl font-black mb-4 text-slate-900">Perfil: {calculatedProfile}</h2>
                    <p className="text-slate-500 text-lg mb-10">Agora já sabemos como te ajudar a cuidar do teu kumbu com orgulho nas tuas raízes.</p>
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm text-left mb-12">
                      <h4 className="font-bold text-slate-800 mb-4">💡 Recomendação Zifolio:</h4>
                      <p className="text-slate-600 leading-relaxed">{getProfileTips(calculatedProfile)}</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-3xl font-black mb-4">Concluído!</h2>
                    <p className="text-slate-600 text-lg mb-10">Bom trabalho!</p>
                  </div>
                )}
                <button onClick={() => navigate('/dashboard')} className="gradient-blue text-white px-12 py-5 rounded-2xl font-bold w-full md:w-auto">Ir para o Dashboard</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleView;
