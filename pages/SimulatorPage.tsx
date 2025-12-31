
import React, { useState } from 'react';
import { User, SubscriptionType } from '../types';
import { Link } from 'react-router-dom';

interface SimulatorPageProps {
  user: User;
}

const SimulatorPage: React.FC<SimulatorPageProps> = ({ user }) => {
  const [tab, setTab] = useState<'INVESTMENT' | 'CASHFLOW'>('INVESTMENT');
  
  // Investment State
  const [initial, setInitial] = useState(100000);
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(15); 
  const [years, setYears] = useState(5);
  const [includeTax, setIncludeTax] = useState(true);

  // Cashflow State
  const [income, setIncome] = useState(250000);
  const [fixedExpenses, setFixedExpenses] = useState(120000);
  const [variableExpenses, setVariableExpenses] = useState(50000);
  
  const isPremium = user.subscription === SubscriptionType.PREMIUM;

  /**
   * Refined Investment Calculation
   * Uses Annuity Due (payments at start of period) which is standard for savings plans.
   */
  const calculateInvestment = () => {
    const annualRateDecimal = rate / 100;
    const monthlyRate = annualRateDecimal / 12;
    const totalMonths = years * 12;

    if (monthlyRate === 0) {
      return initial + (monthly * totalMonths);
    }

    // 1. Future Value of Initial Principal: M = P * (1 + i)^n
    const fvPrincipal = initial * Math.pow(1 + monthlyRate, totalMonths);

    // 2. Future Value of Monthly Contributions (Annuity Due): 
    // M = PMT * (((1 + i)^n - 1) / i) * (1 + i)
    const fvAnnuity = monthly * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
    
    const grossTotal = fvPrincipal + fvAnnuity;

    if (includeTax) {
      // In Angola, IAC (Imposto sobre Aplicação de Capitais) is typically 10% on interest earned.
      const totalInvestedAmount = initial + (monthly * totalMonths);
      const totalInterestEarned = grossTotal - totalInvestedAmount;
      const taxAmount = totalInterestEarned * 0.10; 
      return grossTotal - taxAmount;
    }

    return grossTotal;
  };

  const investmentResult = calculateInvestment();
  const totalInvested = initial + (monthly * years * 12);
  const totalProfit = investmentResult - totalInvested;
  const monthlyBalance = income - fixedExpenses - variableExpenses;
  const balanceColor = monthlyBalance >= 0 ? 'text-green-400' : 'text-red-400';

  return (
    <div className="min-h-screen bg-slate-50">
       <nav className="p-6 border-b bg-white flex items-center justify-between sticky top-0 z-10">
        <Link to="/dashboard" className="text-blue-600 font-bold flex items-center gap-2">
          <span>←</span> Dashboard
        </Link>
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button 
            onClick={() => setTab('INVESTMENT')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition ${tab === 'INVESTMENT' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
          >
            Investimento
          </button>
          <button 
            onClick={() => setTab('CASHFLOW')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition ${tab === 'CASHFLOW' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
          >
            Fluxo de Caixa
          </button>
        </div>
        <div className="w-10"></div>
      </nav>

      <div className="max-w-5xl mx-auto p-6 md:p-12">
        {!isPremium && tab === 'INVESTMENT' && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl mb-8 flex items-center gap-4">
            <span className="text-2xl">🔒</span>
            <div className="text-sm">
              <p className="font-bold text-amber-900">Modo Gratuito</p>
              <p className="text-amber-800">Assine o Zifolio PRO para desbloquear o relatório detalhado e salvar seu histórico.</p>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-12">
          {tab === 'INVESTMENT' ? (
            <>
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
                <div className="flex justify-between items-center">
                   <h2 className="text-2xl font-bold text-slate-800">Simulador de Futuro</h2>
                   <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400">Descontar IAC (10%)</span>
                      <button 
                        onClick={() => setIncludeTax(!includeTax)}
                        className={`w-10 h-5 rounded-full transition-colors relative ${includeTax ? 'bg-blue-600' : 'bg-gray-300'}`}
                      >
                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${includeTax ? 'left-6' : 'left-1'}`}></div>
                      </button>
                   </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-2">Investimento Inicial (Kz)</label>
                  <input type="number" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={initial} onChange={(e) => setInitial(Number(e.target.value))} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-2">Aporte Mensal (Kz)</label>
                  <input type="number" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-500 mb-2">Taxa Anual (%)</label>
                    <input type="number" step="0.5" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-500 mb-2">Prazo (Anos)</label>
                    <input type="number" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={years} onChange={(e) => setYears(Number(e.target.value))} />
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 italic mt-4">
                  *Cálculo baseado em aportes mensais feitos no início de cada mês. {includeTax ? 'Considerando 10% de IAC sobre os rendimentos.' : 'Sem descontar impostos.'}
                </p>
              </div>

              <div className="bg-slate-900 rounded-[3rem] p-10 text-white flex flex-col justify-center items-center text-center shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
                 <p className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-4">Património Estimado {includeTax ? '(Líquido)' : '(Bruto)'}</p>
                 <h3 className="text-4xl md:text-5xl font-extrabold mb-8 text-white">
                   Kz {investmentResult.toLocaleString('pt-AO', { maximumFractionDigits: 0 })}
                 </h3>
                 <div className="w-full space-y-4 text-left bg-white/5 p-6 rounded-3xl">
                    <div className="flex justify-between text-sm py-2 border-b border-white/10">
                      <span className="text-slate-400">Total Investido</span>
                      <span className="font-medium">Kz {totalInvested.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm py-2 border-b border-white/10">
                      <span className="text-slate-400">Rendimento {includeTax ? 'Líquido' : 'Bruto'}</span>
                      <span className="text-green-400 font-bold">+ Kz {totalProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between text-sm py-2">
                      <span className="text-slate-400">Crescimento Total</span>
                      <span className="text-blue-400 font-bold">{((totalProfit/totalInvested)*100).toFixed(1)}%</span>
                    </div>
                 </div>
                 <button disabled={!isPremium} className={`w-full mt-10 py-4 rounded-2xl font-bold transition shadow-lg ${isPremium ? 'gradient-blue hover:opacity-90 active:scale-95' : 'bg-white/10 text-white/30 cursor-not-allowed'}`}>
                   {isPremium ? 'Salvar Simulação' : 'Salvar (Apenas Premium)'}
                 </button>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
                <h2 className="text-2xl font-bold text-slate-800">Orçamento Mensal</h2>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-2">Receita Total (Kz)</label>
                  <input type="number" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={income} onChange={(e) => setIncome(Number(e.target.value))} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-2">Gastos Fixos (Kz)</label>
                  <input type="number" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={fixedExpenses} onChange={(e) => setFixedExpenses(Number(e.target.value))} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-2">Gastos Variáveis (Kz)</label>
                  <input type="number" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={variableExpenses} onChange={(e) => setVariableExpenses(Number(e.target.value))} />
                </div>
              </div>

              <div className="bg-slate-900 rounded-[3rem] p-10 text-white flex flex-col justify-center items-center text-center shadow-2xl">
                 <p className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-4">Poder de Investimento</p>
                 <h3 className={`text-4xl md:text-5xl font-extrabold mb-6 ${balanceColor}`}>
                   Kz {monthlyBalance.toLocaleString('pt-AO')}
                 </h3>
                 <p className="text-sm text-slate-400 mb-8 max-w-xs">
                   Você consegue poupar <strong>{income > 0 ? ((monthlyBalance / income) * 100).toFixed(1) : 0}%</strong> da sua renda todo mês.
                 </p>
                 <div className="w-full p-6 bg-white/5 rounded-3xl border border-white/10 text-left">
                    <h4 className="font-bold text-sm mb-3 text-blue-400">Zifolio Analisa:</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {monthlyBalance > 0 
                        ? `Tens Kz ${monthlyBalance.toLocaleString()} livres. Recomendamos colocar pelo menos metade disso em Obrigações do Tesouro para combater a inflação de Angola.`
                        : "Cuidado! Teus gastos estão acima da tua receita. Precisas cortar nos gastos variáveis ou buscar uma renda extra urgente."}
                    </p>
                 </div>
                 <button className="w-full mt-8 py-4 gradient-blue rounded-2xl font-bold hover:opacity-90 active:scale-95 shadow-xl shadow-blue-600/20">
                   Baixar Relatório em PDF
                 </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimulatorPage;
