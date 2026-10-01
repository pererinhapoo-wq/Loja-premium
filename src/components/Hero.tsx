import React, { useState } from 'react';
import { ArrowRight, ChevronRight, Eye } from 'lucide-react';
import { Product } from '../types';

interface HeroProps {
  onExplore: () => void;
  onViewNewArrivals: () => void;
  onOpenProduct: (product: Product) => void;
  featuredProducts: Product[];
}

export const Hero: React.FC<HeroProps> = ({
  onExplore,
  onViewNewArrivals,
  onOpenProduct,
  featuredProducts
}) => {
  const [activeHighlightIndex, setActiveHighlightIndex] = useState(0);

  const highlights = featuredProducts.slice(0, 3);
  const currentProduct = highlights[activeHighlightIndex] || highlights[0];

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#EAEAE4] bg-[#FBFBF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Subtle Editorial Top Kicker */}
        <div className="flex items-center gap-3 text-xs text-[#6A6D74] mb-8 font-sans tracking-wide">
          <span className="text-[#283628] font-semibold uppercase text-[11px] tracking-wider">
            FORMA · Edição 04
          </span>
          <span aria-hidden="true" className="text-[#C8C8C0]">/</span>
          <span>Coleção Contemporânea</span>
          <span aria-hidden="true" className="text-[#C8C8C0] hidden sm:inline">/</span>
          <span className="hidden sm:inline">Curadoria Independente</span>
        </div>

        {/* Asymmetrical Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Editorial Copy (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-normal text-[#1C1D20] leading-[1.08] max-w-2xl tracking-tight">
              Escolha diferente. <br />
              <span className="italic font-light text-[#364536]">
                Viva diferente.
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-[#5E626B] max-w-xl font-normal leading-relaxed">
              Uma seleção de objetos, tecnologia, moda e detalhes escolhidos para quem valoriza personalidade.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={onExplore}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#283628] hover:bg-[#1E281E] text-white text-xs sm:text-sm font-semibold tracking-wide rounded-md transition-all duration-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#283628]"
              >
                <span>Explorar coleção</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                onClick={onViewNewArrivals}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#F4F4F0] hover:bg-[#EAEAE4] text-[#1C1D20] border border-[#DCDCD4] text-xs sm:text-sm font-medium tracking-wide rounded-md transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#283628]"
              >
                <span>Ver novidades</span>
                <ChevronRight className="w-4 h-4 text-[#7A7E86]" />
              </button>
            </div>

            {/* Editorial Indicators Strip */}
            <div className="mt-14 pt-8 border-t border-[#EAEAE4] grid grid-cols-3 gap-6 max-w-xl text-left">
              <div>
                <span className="block text-[11px] font-mono text-[#8C8F96] uppercase tracking-wider">
                  Origem
                </span>
                <span className="text-sm font-medium text-[#1C1D20] mt-0.5 block">
                  Curadoria Autoral
                </span>
              </div>
              <div>
                <span className="block text-[11px] font-mono text-[#8C8F96] uppercase tracking-wider">
                  Matérias
                </span>
                <span className="text-sm font-medium text-[#1C1D20] mt-0.5 block">
                  Titânio & Minerais
                </span>
              </div>
              <div>
                <span className="block text-[11px] font-mono text-[#8C8F96] uppercase tracking-wider">
                  Entrega
                </span>
                <span className="text-sm font-medium text-[#1C1D20] mt-0.5 block">
                  Cortesia no Brasil
                </span>
              </div>
            </div>
          </div>

          {/* Right Product Showcase (5 Cols) - Clean Warm Framing */}
          <div className="lg:col-span-5 relative">
            <div className="relative bg-white border border-[#E6E6DF] rounded-2xl p-4 sm:p-5 shadow-sm">
              {/* Product Header Strip */}
              <div className="flex items-center justify-between pb-3 border-b border-[#F0F0EA] text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#283628]" />
                  <span className="text-[#6A6D74] font-mono text-[11px] uppercase tracking-wider">
                    {currentProduct.collection}
                  </span>
                </div>
                <span className="font-mono text-xs text-[#1C1D20] font-semibold tabular-nums">
                  R$ {currentProduct.price.toLocaleString('pt-BR')}
                </span>
              </div>

              {/* Image Frame with Warm Editorial Backdrop */}
              <div 
                className="group relative mt-3 aspect-[4/3] sm:aspect-[16/11] overflow-hidden rounded-xl bg-[#F4F4F0] cursor-pointer"
                onClick={() => onOpenProduct(currentProduct)}
              >
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <span className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-medium text-[#1C1D20] shadow-sm">
                    {currentProduct.category}
                  </span>
                  <div className="flex items-center gap-1.5 bg-[#283628] text-white px-3 py-1 rounded-md text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver detalhes</span>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h2 className="font-display text-lg sm:text-xl font-medium text-[#1C1D20] tracking-tight">
                    {currentProduct.name}
                  </h2>
                  <p className="text-xs text-[#6A6D74] mt-0.5 line-clamp-1">
                    {currentProduct.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => onOpenProduct(currentProduct)}
                  className="shrink-0 ml-3 p-2 bg-[#F4F4F0] hover:bg-[#EAEAE4] text-[#1C1D20] rounded-lg transition-colors"
                  aria-label={`Ver ${currentProduct.name}`}
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Selector Between Highlighted Pieces */}
              <div className="mt-5 pt-3 border-t border-[#F0F0EA] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#8C8F96]">
                  Destaques 0{activeHighlightIndex + 1} / 0{highlights.length}
                </span>

                <div className="flex items-center gap-1.5">
                  {highlights.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveHighlightIndex(idx)}
                      className={`h-1.5 transition-all duration-300 rounded-full ${
                        activeHighlightIndex === idx
                          ? 'w-6 bg-[#283628]'
                          : 'w-2 bg-[#DCDCD4] hover:bg-[#B0B0A8]'
                      }`}
                      aria-label={`Visualizar destaque ${item.name}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
