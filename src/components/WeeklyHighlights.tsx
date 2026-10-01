import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, Heart, Plus } from 'lucide-react';
import { Product } from '../types';

interface WeeklyHighlightsProps {
  products: Product[];
  onOpenProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (id: string) => boolean;
}

export const WeeklyHighlights: React.FC<WeeklyHighlightsProps> = ({
  products,
  onOpenProduct,
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const highlightItems = products.filter(p => p.isWeeklyHighlight || p.isFeatured).slice(0, 6);

  return (
    <section className="py-16 sm:py-24 border-b border-[#EAEAE4] bg-[#F7F7F3] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#6A6D74] mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#283628]" />
              <span>Curadoria Semanal</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-normal text-[#1C1D20]">
              Destaques da semana
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-lg border border-[#DCDCD4] bg-white text-[#5E626B] hover:text-[#1C1D20] hover:bg-[#F2F2EC] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#283628]"
              aria-label="Rolar para a esquerda"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-lg border border-[#DCDCD4] bg-white text-[#5E626B] hover:text-[#1C1D20] hover:bg-[#F2F2EC] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#283628]"
              aria-label="Rolar para a direita"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Editorial Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {highlightItems.map((product, idx) => {
            const wish = isWishlisted(product.id);
            return (
              <div
                key={product.id}
                className="group shrink-0 w-[290px] sm:w-[330px] snap-start bg-white border border-[#E6E6DF] hover:border-[#D0D0C8] rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                {/* Image & Quick Action Header */}
                <div className="relative aspect-[4/3] bg-[#F2F2EC] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Top Metas */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#1C1D20] bg-white/90 backdrop-blur-md px-2 py-0.5 rounded shadow-xs">
                      0{idx + 1} · {product.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product);
                      }}
                      className="p-2 rounded-full bg-white/90 hover:bg-white backdrop-blur-md text-[#5E626B] hover:text-[#1C1D20] shadow-xs transition-colors"
                      aria-label={wish ? `Remover ${product.name} dos favoritos` : `Favoritar ${product.name}`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${wish ? 'text-[#283628] fill-[#283628]' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Card Content & Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div
                    onClick={() => onOpenProduct(product)}
                    className="cursor-pointer"
                  >
                    <div className="text-[11px] font-mono text-[#8C8F96] mb-1">
                      {product.collection}
                    </div>
                    <h3 className="font-display text-lg font-medium text-[#1C1D20] group-hover:text-[#283628] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-xs text-[#6A6D74] line-clamp-2 leading-relaxed">
                      {product.subtitle}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#F0F0EA] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#8C8F96] block">
                        Valor
                      </span>
                      <span className="text-sm font-semibold font-mono text-[#1C1D20] tabular-nums">
                        R$ {product.price.toLocaleString('pt-BR')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenProduct(product)}
                        className="px-3 py-1.5 text-xs text-[#5E626B] hover:text-[#1C1D20] hover:bg-[#F2F2EC] rounded transition-colors"
                      >
                        Detalhes
                      </button>
                      <button
                        onClick={() => onAddToCart(product)}
                        className="p-2 bg-[#283628] hover:bg-[#1E281E] text-white rounded-lg transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#283628]"
                        aria-label={`Adicionar ${product.name} à sacola`}
                        title="Adicionar à sacola"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
