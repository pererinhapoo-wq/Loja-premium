import React, { useState } from 'react';
import { ArrowUpRight, ShieldCheck, Mail, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
  onSelectCategory: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectCategory }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setIsSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#F4F4EE] border-t border-[#E4E4DC] text-[#1C1D20] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#E2E2DC]">
          {/* Brand & Slogan Column (4 Cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center">
              <span className="font-display text-2xl sm:text-3xl font-normal tracking-[-0.03em] text-[#1C1D20]">
                FORMA
              </span>
              <span className="ml-1.5 h-1.5 w-1.5 rounded-full bg-[#283628]" />
            </div>

            <p className="font-display text-lg italic text-[#283628] font-normal">
              “Escolhas que definem seu espaço.”
            </p>

            <p className="text-xs sm:text-sm text-[#5E626B] leading-relaxed max-w-sm">
              Concept store contemporânea de curadoria autoral. Reunimos peças de design, tecnologia, moda e arquitetura para indivíduos que buscam distinção e calma visual.
            </p>

            <div className="pt-2 text-xs font-mono text-[#8C8F96]">
              <span>São Paulo · Curitiba · Belo Horizonte</span>
            </div>
          </div>

          {/* Navigation Links Column (2 Cols) */}
          <div className="md:col-span-2 space-y-3">
            <span className="block text-[11px] font-mono uppercase tracking-widest text-[#283628] font-semibold">
              Navegação
            </span>
            <ul className="space-y-2 text-xs text-[#5E626B]">
              <li>
                <button
                  onClick={() => onNavigate('inicio')}
                  className="hover:text-[#1C1D20] transition-colors"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('colecoes')}
                  className="hover:text-[#1C1D20] transition-colors"
                >
                  Coleções
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('produtos')}
                  className="hover:text-[#1C1D20] transition-colors"
                >
                  Acervo de Produtos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('curadoria')}
                  className="hover:text-[#1C1D20] transition-colors"
                >
                  Filosofia de Curadoria
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('monte-sua-selecao')}
                  className="text-[#283628] font-semibold hover:underline transition-colors"
                >
                  Monte sua Seleção
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sobre')}
                  className="hover:text-[#1C1D20] transition-colors"
                >
                  Sobre a Marca
                </button>
              </li>
            </ul>
          </div>

          {/* Categories Column (2 Cols) */}
          <div className="md:col-span-2 space-y-3">
            <span className="block text-[11px] font-mono uppercase tracking-widest text-[#283628] font-semibold">
              Categorias
            </span>
            <ul className="space-y-2 text-xs text-[#5E626B]">
              {['Essenciais', 'Design', 'Tecnologia', 'Estilo', 'Casa', 'Bem-estar'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      onNavigate('produtos');
                    }}
                    className="hover:text-[#1C1D20] transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Atelier Column (4 Cols) */}
          <div className="md:col-span-4 space-y-4">
            <span className="block text-[11px] font-mono uppercase tracking-widest text-[#283628] font-semibold">
              Edições & Convites
            </span>
            <p className="text-xs text-[#5E626B] leading-relaxed">
              Receba comunicações exclusivas sobre novos lançamentos autorais, ensaios de design e tiragens numeradas.
            </p>

            {isSubscribed ? (
              <div className="p-3 bg-white border border-[#E2E2DC] rounded-xl flex items-center gap-2.5 text-xs text-[#283628] shadow-xs">
                <Check className="w-4 h-4 text-[#283628] shrink-0" />
                <span className="font-medium">Obrigado pelo seu interesse. Você está na lista de convidados FORMA.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Seu e-mail preferido..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 bg-white border border-[#DCDCD4] rounded-lg text-xs text-[#1C1D20] placeholder-[#8C8F96] focus:outline-none focus:border-[#283628] shadow-xs"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#283628] hover:bg-[#1E281E] text-white text-xs font-semibold rounded-lg transition-colors shrink-0 shadow-xs"
                  >
                    Inscrever
                  </button>
                </div>
                <span className="text-[11px] text-[#8C8F96] block">
                  Sem spam. Apenas ensaios visuais e convites de preview.
                </span>
              </form>
            )}

            <div className="pt-2 flex items-center gap-4 text-xs text-[#6A6D74]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#283628]" />
                <span>Garantia de 5 anos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-[#283628]" />
                <span>Concierge dedicado</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A7E86] gap-4">
          <p>© {new Date().getFullYear()} FORMA Concept Store. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <span>Privacidade & Dados</span>
            <span>Termos de Serviço</span>
            <span>Manual do Usuário</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
