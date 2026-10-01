import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  activeView: string;
  onNavigate: (view: string) => void;
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onNavigate,
  cartCount,
  cartTotal,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'inicio', label: 'Início' },
    { id: 'colecoes', label: 'Coleções' },
    { id: 'produtos', label: 'Produtos' },
    { id: 'curadoria', label: 'Curadoria' },
    { id: 'monte-sua-selecao', label: 'Monte sua Seleção', highlight: true },
    { id: 'sobre', label: 'Sobre' }
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-[#FBFBF9]/95 backdrop-blur-md border-[#E5E5DF] py-3.5 shadow-sm'
            : 'bg-[#FBFBF9] border-[#EEEEEC] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Brand title */}
            <div className="flex items-center">
              <button
                onClick={() => handleLinkClick('inicio')}
                className="group flex items-baseline focus:outline-none focus-visible:ring-1 focus-visible:ring-[#283628]"
                aria-label="FORMA Página Inicial"
              >
                <span className="font-display text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-[#1C1D20] transition-colors">
                  FORMA
                </span>
                <span className="ml-1.5 h-1.5 w-1.5 rounded-full bg-[#283628] transition-transform duration-300 group-hover:scale-125" />
              </button>
            </div>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium tracking-wide">
              {navLinks.map((link) => {
                const isActive = activeView === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`relative py-1 whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#283628] ${
                      isActive
                        ? 'text-[#1C1D20] font-semibold'
                        : link.highlight
                        ? 'text-[#283628] font-semibold hover:text-[#182218]'
                        : 'text-[#6A6D74] hover:text-[#1C1D20]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#283628] transition-all" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Primary Actions */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              {/* Search */}
              <button
                onClick={onOpenSearch}
                className="p-2 sm:px-3 sm:py-2 text-xs font-medium text-[#5E626B] hover:text-[#1C1D20] hover:bg-[#F2F2EC] rounded-lg transition-colors flex items-center gap-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#283628]"
                aria-label="Buscar produtos"
                title="Buscar"
              >
                <Search className="w-4 h-4 text-[#5E626B]" />
                <span className="hidden sm:inline text-xs">Buscar</span>
              </button>

              {/* Wishlist */}
              <button
                onClick={onOpenWishlist}
                className="relative p-2 text-[#5E626B] hover:text-[#1C1D20] hover:bg-[#F2F2EC] rounded-lg transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#283628]"
                aria-label={`Favoritos com ${wishlistCount} itens`}
                title="Favoritos"
              >
                <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'text-[#283628] fill-[#283628]' : ''}`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#283628] px-1 text-[10px] font-bold text-white tabular-nums">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Drawer Button */}
              <button
                onClick={onOpenCart}
                className="group relative flex items-center gap-2.5 bg-[#F4F4F0] hover:bg-[#EAEAE4] border border-[#E2E2DC] hover:border-[#D0D0C8] px-3.5 py-2 rounded-lg transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-[#283628]"
                aria-label={`Sacola com ${cartCount} itens`}
              >
                <ShoppingBag className="w-4 h-4 text-[#1C1D20]" />
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="font-semibold text-[#1C1D20] tabular-nums">{cartCount}</span>
                  {cartCount > 0 && (
                    <span className="hidden md:inline text-[#6A6D74] tabular-nums">
                      · R$ {cartTotal.toLocaleString('pt-BR')}
                    </span>
                  )}
                </div>
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#5E626B] hover:text-[#1C1D20] hover:bg-[#F2F2EC] rounded-lg transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#283628]"
                aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[61px] z-30 bg-[#FBFBF9]/98 backdrop-blur-xl border-b border-[#E5E5DF] lg:hidden flex flex-col justify-between p-6 overflow-y-auto">
          <div className="space-y-4">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#8A8E96] mb-2">
              Menu FORMA
            </div>
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive = activeView === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`flex items-center justify-between text-left py-3 text-lg font-display tracking-tight border-b border-[#EFEFEA] transition-colors ${
                      isActive
                        ? 'text-[#283628] font-bold'
                        : link.highlight
                        ? 'text-[#283628]'
                        : 'text-[#1C1D20] hover:text-[#283628]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-40" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-[#EAEAE4] space-y-3 text-xs text-[#6A6D74]">
            <div className="flex items-center justify-between">
              <span>Atendimento Concierge</span>
              <span className="text-[#1C1D20] font-medium">concierge@forma.design</span>
            </div>
            <p className="text-[11px] text-[#8C8F96] pt-1">
              FORMA Concept Store — Escolhas que definem seu espaço.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
