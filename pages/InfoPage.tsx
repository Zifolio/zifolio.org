
import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const InfoPage: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Fixo */}
      <nav className="p-6 border-b bg-white sticky top-0 z-20 flex justify-between items-center shadow-sm">
        <Link to="/" className="text-blue-600 font-bold flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 48L38 42V72H22V48Z" fill="currentColor" />
            <path d="M42 38L58 48V72H42V38Z" fill="currentColor" />
            <path d="M62 30L78 35V72H62V30Z" fill="currentColor" />
          </svg>
          Zifolio
        </Link>
        <div className="flex gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
          <a href="#sobre" className="hover:text-blue-600">Sobre</a>
          <a href="#faq" className="hover:text-blue-600">FAQ</a>
          <a href="#termos" className="hover:text-blue-600">Termos</a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-8 md:p-16 space-y-24">
        
        {/* Seção: Sobre Nós */}
        <section id="sobre" className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-4 block">A Nossa História</span>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Nascido no Lubango para empoderar Angola. 🇦🇴</h1>
          <div className="text-slate-600 leading-relaxed space-y-6 text-lg">
            <p>
              O <strong>Zifolio</strong> nasceu da necessidade de simplificar o mundo dos investimentos para o cidadão comum angolano. No coração da Huíla, percebemos que a falta de informação era a maior barreira para a prosperidade financeira.
            </p>
            <p>
              Somos uma EdTech focada em transformar o "Kwanza parado" em património crescente. Através da educação digital, gamificação e tecnologia de ponta, estamos a construir uma nova geração de investidores que dominam a BODIVA e os Títulos do Tesouro.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="p-8 bg-blue-50 rounded-[2rem] border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-2">Missão</h3>
              <p className="text-sm text-blue-800/70">Democratizar o acesso ao conhecimento financeiro em Angola, tornando o investimento simples, seguro e divertido.</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2">Visão</h3>
              <p className="text-sm text-slate-500">Ser a maior plataforma de educação financeira da África Lusófona, reconhecida pela inovação e impacto social.</p>
            </div>
            <div className="p-8 bg-blue-600 rounded-[2rem] text-white shadow-xl shadow-blue-200">
              <h3 className="font-bold mb-2">Objetivos</h3>
              <ul className="text-xs space-y-2 opacity-90">
                <li>• Formar 100 mil investidores até 2027.</li>
                <li>• Simplificar termos da BODIVA.</li>
                <li>• Fomentar a cultura da poupança.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Seção: FAQ */}
        <section id="faq" className="scroll-mt-24">
          <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-4 block">Dúvidas Comuns</span>
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Perguntas Frequentes (FAQ)</h2>
          <div className="space-y-4">
            {[
              { q: "O Zifolio é um banco ou corretora?", a: "Não. O Zifolio é uma plataforma estritamente educativa. Nós ensinamos como investir, mas as transações reais devem ser feitas via bancos ou corretoras autorizadas pelo CMC/BODIVA." },
              { q: "O plano Premium vale a pena?", a: "Se queres dominar simuladores reais e ter mentorias personalizadas pela nossa IA focada no mercado de Angola, sim! O plano PRO paga-se a si mesmo através do conhecimento que evita erros caros." },
              { q: "Como ganho as medalhas e pontos?", a: "Ao completar módulos, ler as dicas diárias e realizar quizzes com sucesso. Os pontos podem desbloquear descontos em assinaturas futuras." },
              { q: "O que acontece se eu não gostar?", a: "Podes cancelar a tua subscrição PRO a qualquer momento sem letras miúdas. O acesso continuará ativo até o final do período pago." }
            ].map((item, i) => (
              <details key={i} className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                <summary className="p-6 font-bold text-slate-800 cursor-pointer flex justify-between items-center list-none hover:bg-slate-50 transition">
                  {item.q}
                  <span className="text-blue-600 group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <div className="p-6 pt-0 text-slate-500 text-sm leading-relaxed border-t border-slate-50">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Seção: Termos de Uso */}
        <section id="termos" className="scroll-mt-24 bg-slate-50 p-8 md:p-12 rounded-[3rem] border border-slate-100">
          <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-4 block">Jurídico</span>
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Termos de Uso</h2>
          <div className="text-slate-600 text-sm space-y-6">
            <p className="font-bold text-slate-800 underline">Aviso Importante: Este conteúdo não é recomendação de investimento.</p>
            <p>
              1. <strong>Natureza Educativa:</strong> Todo o conteúdo, simuladores e conselhos gerados pela IA no Zifolio servem apenas para fins educacionais. O utilizador é o único responsável pelas suas decisões financeiras.
            </p>
            <p>
              2. <strong>Precisão dos Dados:</strong> Embora tentemos manter as taxas da BODIVA e do mercado secundário atualizadas, o mercado é volátil. Verifique sempre com o seu banco antes de investir.
            </p>
            <p>
              3. <strong>Subscrições:</strong> O pagamento do plano PRO é mensal. O não pagamento resulta na reversão para o plano Gratuito, perdendo acesso aos simuladores e histórico de dados.
            </p>
            <p>
              4. <strong>Privacidade:</strong> O Zifolio protege os seus dados conforme a legislação angolana. Não vendemos os seus dados a terceiros.
            </p>
          </div>
        </section>

        <footer className="text-center py-12 border-t border-slate-100">
          <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">
            © 2026 Zifolio - Educação Financeira | Lubango, Angola
          </p>
        </footer>
      </div>
    </div>
  );
};

export default InfoPage;
