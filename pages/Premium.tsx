
import React from 'react';
import { User, SubscriptionType } from '../types';
import { Link } from 'react-router-dom';

interface PremiumProps {
  user: User;
  onUpgrade: () => void;
}

const Premium: React.FC<PremiumProps> = ({ user, onUpgrade }) => {
  const BASE_PRICE = 5000;
  const DISCOUNT_THRESHOLD = 10000;
  const DISCOUNT_PERCENT = 20; // 20% de desconto (Fator 0,2 solicitado)
  
  const hasLoyaltyDiscount = user.progress.points >= DISCOUNT_THRESHOLD;
  const discountAmount = (BASE_PRICE * DISCOUNT_PERCENT) / 100;
  const finalPrice = hasLoyaltyDiscount ? BASE_PRICE - discountAmount : BASE_PRICE;

  const pointsMissing = DISCOUNT_THRESHOLD - user.progress.points;
  const discountProgress = Math.min((user.progress.points / DISCOUNT_THRESHOLD) * 100, 100);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center pt-12">
      <div className="px-6 flex flex-col items-center w-full">
        <Link to="/dashboard" className="mb-8 text-blue-600 font-bold flex items-center gap-2 hover:translate-x-[-4px] transition-transform">
          <span>←</span> Voltar ao Dashboard
        </Link>
        
        <div className="max-w-4xl w-full text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Desbloqueie seu potencial financeiro</h1>
          <p className="text-xl text-slate-500">Torne-se Zifolio PRO e acesse ferramentas exclusivas para dominar o mercado angolano.</p>
        </div>

        {/* Discount Info Banner */}
        {!hasLoyaltyDiscount ? (
          <div className="max-w-5xl w-full mb-10 bg-white p-6 rounded-3xl border border-blue-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl">🎁</div>
              <div>
                <h4 className="font-bold text-slate-800">Desconto de Fidelidade</h4>
                <p className="text-slate-500 text-sm">Chegue aos {DISCOUNT_THRESHOLD.toLocaleString()} pontos e ganhe {DISCOUNT_PERCENT}% de desconto no PRO!</p>
              </div>
            </div>
            <div className="w-full md:w-64 space-y-2">
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                <span>{user.progress.points.toLocaleString()} PTS</span>
                <span>Faltam {pointsMissing.toLocaleString()}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full transition-all duration-1000" style={{ width: `${discountProgress}%` }}></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-5xl w-full mb-10 bg-green-50 p-6 rounded-3xl border border-green-200 shadow-md flex items-center gap-4 animate-in zoom-in duration-500">
            <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-green-200 text-white">🏆</div>
            <div>
              <h4 className="font-bold text-green-800">Parabéns, Mestre da Educação Financeira!</h4>
              <p className="text-green-700 text-sm">Por seres um utilizador exemplar, o teu desconto de {DISCOUNT_PERCENT}% foi aplicado automaticamente.</p>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full mb-20">
          {/* Free Plan */}
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col justify-between opacity-80">
            <div>
              <h3 className="text-2xl font-bold mb-2">Zifolio Grátis</h3>
              <p className="text-slate-400 mb-8">O básico para começar sua jornada.</p>
              <div className="text-4xl font-extrabold mb-8 text-slate-800">Kz 0 <span className="text-sm font-normal text-slate-400">/mês</span></div>
              <ul className="space-y-4 text-slate-600 mb-10">
                <li className="flex items-center gap-3">✅ Módulos básicos</li>
                <li className="flex items-center gap-3">✅ Checklist diário</li>
                <li className="flex items-center gap-3">✅ Pontuação e medalhas</li>
                <li className="flex items-center gap-3 text-slate-300">❌ Simuladores avançados</li>
                <li className="flex items-center gap-3 text-slate-300">❌ Módulos BODIVA/Ações</li>
                <li className="flex items-center gap-3 text-slate-300">❌ Dicas Diárias Personalizadas</li>
              </ul>
            </div>
            <button disabled className="w-full border border-gray-200 py-4 rounded-2xl font-bold text-slate-400">
              {user.subscription === SubscriptionType.FREE ? 'Plano Atual' : 'Disponível'}
            </button>
          </div>

          {/* Premium Plan */}
          <div className="gradient-blue p-10 rounded-[3rem] text-white shadow-2xl flex flex-col justify-between relative overflow-hidden transform md:scale-105 border-4 border-blue-400/20">
            <div className="absolute top-6 right-6 bg-amber-400 text-blue-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">Popular</div>
            
            <div>
              <h3 className="text-2xl font-bold mb-2">Zifolio PRO</h3>
              <p className="text-blue-100 mb-8">Para quem leva investimentos a sério.</p>
              
              <div className="mb-8 relative inline-block">
                {hasLoyaltyDiscount && (
                  <span className="absolute -top-6 left-0 text-[10px] font-black text-amber-300 uppercase tracking-widest animate-pulse">
                    Preço com Desconto
                  </span>
                )}
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold">Kz {finalPrice.toLocaleString()}</span>
                  <span className="text-sm font-normal text-blue-200">/mês</span>
                </div>
                {hasLoyaltyDiscount && (
                  <span className="text-xs text-blue-200 line-through opacity-50">
                    Kz {BASE_PRICE.toLocaleString()}
                  </span>
                )}
              </div>

              <ul className="space-y-4 text-blue-50 mb-10">
                <li className="flex items-center gap-3">✅ Tudo do plano grátis</li>
                <li className="flex items-center gap-3">✅ Simulador de Investimento Real</li>
                <li className="flex items-center gap-3">✅ Simulador de Fluxo de Caixa</li>
                <li className="flex items-center gap-3">✅ Módulos BODIVA e Mercado de Capitais</li>
                <li className="flex items-center gap-3 font-bold text-amber-300">✅ Dicas Diárias por Perfil (AI)</li>
                <li className="flex items-center gap-3">✅ Certificados autenticados</li>
              </ul>
            </div>
            <button 
              onClick={onUpgrade}
              disabled={user.subscription === SubscriptionType.PREMIUM}
              className="w-full bg-white text-blue-600 py-4 rounded-2xl font-bold hover:bg-blue-50 transition active:scale-[0.98] shadow-lg disabled:opacity-50"
            >
              {user.subscription === SubscriptionType.PREMIUM ? 'Assinatura Ativa' : 'Fazer Upgrade Agora'}
            </button>
          </div>
        </div>

        {/* Feature Spotlight: Personalized Tips */}
        <section className="max-w-5xl w-full bg-white rounded-[3rem] p-8 md:p-16 border border-gray-100 shadow-sm mb-20">
          <div className="text-center mb-12">
            <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">Exclusivo PRO</span>
            <h2 className="text-3xl font-bold text-slate-800">Mentoria Diária Personalizada</h2>
            <p className="text-slate-500 mt-2">Nossa IA analisa o seu perfil e o mercado angolano para dar o empurrão que você precisa todos os dias.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-100 hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl mb-4">🛡️</div>
              <h4 className="font-bold text-slate-800 mb-2">Perfil Conservador</h4>
              <p className="text-sm text-slate-600 leading-relaxed">Dicas focadas em segurança absoluta. Receba alertas sobre novas emissões de OTs e proteção contra inflação.</p>
            </div>
            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-100 hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl mb-4">⚖️</div>
              <h4 className="font-bold text-slate-800 mb-2">Perfil Moderado</h4>
              <p className="text-sm text-slate-600 leading-relaxed">Equilíbrio entre paz e lucro. Sugestões de diversificação entre Títulos do Tesouro e Fundos locais.</p>
            </div>
            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-100 hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl mb-4">🚀</div>
              <h4 className="font-bold text-slate-800 mb-2">Perfil Arrojado</h4>
              <p className="text-sm text-slate-600 leading-relaxed">Foco em aceleração de património. Insights sobre o mercado secundário da BODIVA e ações nacionais.</p>
            </div>
          </div>
        </section>

        <div className="max-w-3xl text-center space-y-4 mb-20">
          <p className="text-slate-400 text-sm italic">Pagamentos seguros via Multicaixa Express ou Stripe. Cancelamento a qualquer momento.</p>
          <p className="text-slate-500 font-medium">Tem dúvidas sobre o Zifolio PRO? <a href="https://chat.whatsapp.com/BVQl36gWjIoJj7xTtVkp5S" target="_blank" rel="noreferrer" className="text-blue-600 font-bold underline">Fale com o suporte no WhatsApp</a></p>
        </div>
      </div>

      {/* Reusable Footer Segment */}
      <footer className="w-full bg-white border-t border-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
              <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="25" y="45" width="15" height="30" rx="2" fill="currentColor" />
                <rect x="45" y="30" width="15" height="45" rx="2" fill="currentColor" />
                <rect x="65" y="15" width="15" height="60" rx="2" fill="currentColor" />
              </svg>
              Zifolio
            </div>
            <div className="flex gap-6 text-sm text-slate-500 font-medium">
              <a href="#" className="hover:text-blue-600 transition">Instagram</a>
              <a href="https://web.facebook.com/profile.php?id=61584819650804" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition">Facebook</a>
              <a href="https://chat.whatsapp.com/BVQl36gWjIoJj7xTtVkp5S" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition">WhatsApp</a>
            </div>
            <p className="text-xs text-slate-400">&copy; 2026 Zifolio - Educacao Financeira. Feito com amor no Lubango.</p>
        </div>
      </footer>
    </div>
  );
};

export default Premium;
