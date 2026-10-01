import React from 'react';
import { ArrowUpRight, Heart, Plus } from 'lucide-react';
import { Product } from '../types';

interface NewArrivalsProps {
  products: Product[];
  onOpenProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (id: string) => boolean;
  onViewAll: () => void;
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({
  products,
  onOpenProduct,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onViewAll
}) => {
  const items = products.slice(0, 5);

  return (
    <section className="py-20 sm:py-28 border-b border-[#EAEAE4] bg-[#FBFBF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-[#EAEAE4] gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#283628] font-semibold block mb-1">
              Catálogo Recente
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-normal text-[#1C1D20]">
              Novidades
            </h2>
          </div>

          <button
            onClick={onViewAll}
            className="group inline-flex items-center gap-2 text-xs font-semibold text-[#5E626B] hover:text-[#1C1D20] transition-colors"
          >
            <span>Ver todo o acervo ({products.length})</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Asymmetric Proportional Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          {/* Hero Feature Card (Spans 7 Columns) */}
          {items[0] && (
            <div
              className="md:col-span-7 group bg-white border border-[#E6E6DF] hover:border-[#D0D0C8] rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div 
                className="relative aspect-[16/10] overflow-hidden bg-[#F2F2EC] cursor-pointer"
                onClick={() => onOpenProduct(items[0])}
              >
                <img
                  src={items[0].image}
                  alt={items[0].name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="text-xs font-mono text-[#1C1D20] bg-white/90 backdrop-blur-md px-2.5 py-1 rounded shadow-xs">
                    Novidade Especial
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(items[0]);
                  }}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 hover:bg-white backdrop-blur-md text-[#5E626B] hover:text-[#1C1D20] shadow-xs transition-colors"
                  aria-label="Favoritar produto"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted(items[0].id) ? 'text-[#283628] fill-[#283628]' : ''}`} />
                </button>
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#6A6D74] font-mono mb-2">
                    <span>{items[0].category}</span>
                    <span className="text-[#1C1D20] font-semibold font-mono text-base tabular-nums">
                      R$ {items[0].price.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <h3 
                    onClick={() => onOpenProduct(items[0])}
                    className="font-display text-2xl font-normal sm:font-medium text-[#1C1D20] hover:text-[#283628] transition-colors cursor-pointer"
                  >
                    {items[0].name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#5E626B] line-clamp-2">
                    {items[0].description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-[#F0F0EA] flex items-center justify-between">
                  <div className="text-xs text-[#6A6D74]">
                    Material: <span className="text-[#1C1D20] font-medium">{items[0].materials.join(', ')}</span>
                  </div>
                  <button
                    onClick={() => onAddToCart(items[0])}
                    className="px-4 py-2 bg-[#283628] hover:bg-[#1E281E] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Right Column Grid (Spans 5 Columns, 2 Items) */}
          <div className="md:col-span-5 flex flex-col gap-6 sm:gap-8">
            {items.slice(1, 3).map((item) => (
              <div
                key={item.id}
                className="group bg-white border border-[#E6E6DF] hover:border-[#D0D0C8] rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div 
                  className="relative aspect-[16/9] overflow-hidden bg-[#F2F2EC] cursor-pointer"
                  onClick={() => onOpenProduct(item)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(item);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white backdrop-blur-md text-[#5E626B] hover:text-[#1C1D20] shadow-xs transition-colors"
                    aria-label="Favoritar produto"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted(item.id) ? 'text-[#283628] fill-[#283628]' : ''}`} />
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#6A6D74] font-mono mb-1">
                      <span>{item.category}</span>
                      <span className="text-[#1C1D20] font-semibold font-mono tabular-nums">
                        R$ {item.price.toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <h3 
                      onClick={() => onOpenProduct(item)}
                      className="font-display text-lg font-medium text-[#1C1D20] hover:text-[#283628] transition-colors cursor-pointer"
                    >
                      {item.name}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F0F0EA] flex items-center justify-between">
                    <button
                      onClick={() => onOpenProduct(item)}
                      className="text-xs text-[#5E626B] hover:text-[#1C1D20] transition-colors"
                    >
                      Ver especificações
                    </button>
                    <button
                      onClick={() => onAddToCart(item)}
                      className="p-2 bg-[#283628] hover:bg-[#1E281E] text-white rounded-lg transition-colors"
                      aria-label="Adicionar à sacola"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Lower Two Items (Spans 6 cols each) */}
          {items.slice(3, 5).map((item) => (
            <div
              key={item.id}
              className="md:col-span-6 group bg-white border border-[#E6E6DF] hover:border-[#D0D0C8] rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div 
                className="relative aspect-[16/9] overflow-hidden bg-[#F2F2EC] cursor-pointer"
                onClick={() => onOpenProduct(item)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(item);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white backdrop-blur-md text-[#5E626B] hover:text-[#1C1D20] shadow-xs transition-colors"
                  aria-label="Favoritar produto"
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted(item.id) ? 'text-[#283628] fill-[#283628]' : ''}`} />
                </button>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#6A6D74] font-mono mb-1.5">
                    <span>{item.category}</span>
                    <span className="text-[#1C1D20] font-semibold font-mono text-sm tabular-nums">
                      R$ {item.price.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <h3 
                    onClick={() => onOpenProduct(item)}
                    className="font-display text-xl font-medium text-[#1C1D20] hover:text-[#283628] transition-colors cursor-pointer"
                  >
                    {item.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#6A6D74] line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#F0F0EA] flex items-center justify-between">
                  <button
                    onClick={() => onOpenProduct(item)}
                    className="text-xs text-[#5E626B] hover:text-[#1C1D20] transition-colors"
                  >
                    Detalhes técnicos
                  </button>
                  <button
                    onClick={() => onAddToCart(item)}
                    className="px-3.5 py-1.5 bg-[#283628] hover:bg-[#1E281E] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
