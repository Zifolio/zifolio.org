
import React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="gradient-blue text-white py-20 px-6 flex flex-col items-center text-center">
        <div className="mb-8">
           <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 48L38 42V72H22V48Z" fill="white" />
            <path d="M42 38L58 48V72H42V38Z" fill="white" />
            <path d="M62 30L78 35V72H62V30Z" fill="white" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">Zifolio</h1>
        <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-2xl">
          Sua jornada para a liberdade financeira começa aqui.
        </p>
        <blockquote className="italic text-lg mb-10 opacity-80">
          "O dinheiro é um excelente servo, mas um péssimo mestre."
        </blockquote>
        <Link 
          to="/login" 
          className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg"
        >
          Criar conta grátis
        </Link>
      </section>

      {/* Features */}
      <section className="py-20 px-6 grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        <div className="text-center p-6 border rounded-2xl hover:shadow-md transition">
          <div className="text-4xl mb-4">🇦🇴</div>
          <h3 className="font-bold text-xl mb-2">Foco Local</h3>
          <p className="text-slate-600">Conteúdo adaptado à realidade de Angola, BODIVA e Títulos do Tesouro.</p>
        </div>
        <div className="text-center p-6 border rounded-2xl hover:shadow-md transition">
          <div className="text-4xl mb-4">🎮</div>
          <h3 className="font-bold text-xl mb-2">Gamificação</h3>
          <p className="text-slate-600">Ganhe medalhas e pontos enquanto aprende a investir seu Kwanza.</p>
        </div>
        <div className="text-center p-6 border rounded-2xl hover:shadow-md transition">
          <div className="text-4xl mb-4">🧮</div>
          <h3 className="font-bold text-xl mb-2">Simuladores</h3>
          <p className="text-slate-600">Simule seu futuro financeiro com ferramentas exclusivas.</p>
        </div>
      </section>

      {/* Modern Footer with FB Integration */}
      <footer className="bg-slate-50 border-t border-gray-100 pt-16 pb-8 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-2xl">
              <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 48L38 42V72H22V48Z" fill="currentColor" />
                <path d="M42 38L58 48V72H42V38Z" fill="currentColor" />
                <path d="M62 30L78 35V72H62V30Z" fill="currentColor" />
              </svg>
              Zifolio
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              A maior plataforma de educação financeira de Angola. Capacitando investidores de Cabinda ao Cunene.
            </p>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="font-bold text-slate-800 mb-4">Plataforma</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link to="/info#sobre" className="hover:text-blue-600 transition">Sobre Nós</Link></li>
              <li><Link to="/info#faq" className="hover:text-blue-600 transition">FAQ</Link></li>
              <li><Link to="/premium" className="hover:text-blue-600 transition">Zifolio PRO</Link></li>
              <li><Link to="/info#termos" className="hover:text-blue-600 transition">Termos de Uso</Link></li>
            </ul>
          </div>

          {/* Social Column */}
          <div>
            <h4 className="font-bold text-slate-800 mb-4">Siga-nos</h4>
            <div className="flex gap-4">
              <a href="https://web.facebook.com/profile.php?id=61584819650804" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition shadow-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-pink-600 hover:bg-pink-600 hover:text-white transition shadow-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://chat.whatsapp.com/BVQl36gWjIoJj7xTtVkp5S" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white transition shadow-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>

          {/* Facebook Widget Column */}
          <div className="md:col-span-1">
            <h4 className="font-bold text-slate-800 mb-4">Comunidade</h4>
            <div className="bg-white rounded-xl overflow-hidden border border-gray-100 h-[130px] shadow-sm">
              <iframe 
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61584819650804&tabs=timeline&width=250&height=130&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false&appId" 
                width="100%" 
                height="130" 
                style={{ border: 'none', overflow: 'hidden' }} 
                scrolling="no" 
                frameBorder="0" 
                allowFullScreen={true} 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title="Facebook Page"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium">
          <p>&copy; 2026 Zifolio - Educação Financeira. Feito com ❤️ no Lubango.</p>
          <div className="flex gap-6">
            <Link to="/info#termos" className="hover:text-blue-600 transition">Política de Privacidade</Link>
            <Link to="/info#faq" className="hover:text-blue-600 transition">Segurança</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
