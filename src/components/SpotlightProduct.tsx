import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface SpotlightProductProps {
  product: Product;
  onAddToCart: (product: Product, selectedColor?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onOpenProduct: (product: Product) => void;
}

export const SpotlightProduct: React.FC<SpotlightProductProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onOpenProduct
}) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = product.secondaryImages.length > 0 ? product.secondaryImages : [product.image];
  const currentColor = product.colors[selectedColorIndex] || product.colors[0];

  return (
    <section className="py-20 sm:py-28 border-b border-[#EAEAE4] bg-[#F4F4EE] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subtle Header */}
        <div className="flex items-center gap-3 text-xs font-mono text-[#6A6D74] mb-8">
          <span className="text-[#283628] font-semibold">PEÇA EM FOCO</span>
          <span aria-hidden="true" className="text-[#C8C8C0]">/</span>
          <span>ESTUDO DE FORMA & TATO</span>
          <span aria-hidden="true" className="text-[#C8C8C0]">/</span>
          <span>EDIÇÃO ASSINADA</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Visual Gallery Showcase (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div 
              onClick={() => onOpenProduct(product)}
              className="group relative aspect-[16/10] sm:aspect-[16/11] bg-white border border-[#E6E6DF] rounded-2xl overflow-hidden cursor-pointer shadow-sm"
            >
              <img
                src={images[activeImageIndex] || product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-md text-xs font-mono text-[#1C1D20] shadow-xs">
                {product.collection}
              </div>

              {/* Quick inspect hint */}
              <div className="absolute bottom-4 right-4 bg-[#283628] text-white px-3 py-1.5 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shadow-sm">
                <Eye className="w-3.5 h-3.5" />
                <span>Ampliar galeria</span>
              </div>
            </div>

            {/* Thumbnail selector */}
            {images.length > 1 && (
              <div className="flex items-center gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border transition-all duration-200 ${
                      activeImageIndex === idx
                        ? 'border-[#283628] ring-1 ring-[#283628]'
                        : 'border-[#E2E2DC] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Miniatura ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Specification & Purchase Module (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="text-xs font-mono uppercase tracking-wider text-[#6A6D74] mb-2">
              {product.category} · {product.badge || 'Exclusivo'}
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#1C1D20] tracking-tight leading-tight">
              {product.name}
            </h2>

            <p className="mt-2 text-sm text-[#5E626B]">
              {product.subtitle}
            </p>

            {/* Price Row */}
            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-[#1C1D20] tabular-nums">
                R$ {product.price.toLocaleString('pt-BR')}
              </span>
              {product.originalPrice && (
                <span className="font-mono text-base text-[#9C9FA6] line-through tabular-nums">
                  R$ {product.originalPrice.toLocaleString('pt-BR')}
                </span>
              )}
              <span className="text-xs text-[#6A6D74] font-mono ml-auto">
                Em até 10× sem juros
              </span>
            </div>

            <div className="mt-6 pt-6 border-t border-[#EAEAE4]">
              <p className="text-sm text-[#4E5158] leading-relaxed">
                {product.description}
              </p>
              <div className="mt-3 p-3.5 rounded-lg bg-white border border-[#EAEAE4] text-xs text-[#5E626B] italic">
                “{product.editorialNote}”
              </div>
            </div>

            {/* Colors Selection */}
            {product.colors.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <span className="font-mono text-[#6A6D74] uppercase tracking-wider">Acabamento</span>
                  <span className="font-medium text-[#1C1D20]">{currentColor.name}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((color, idx) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`group relative p-1 rounded-full transition-all focus:outline-none ${
                        selectedColorIndex === idx
                          ? 'ring-2 ring-[#283628] ring-offset-2 ring-offset-[#F4F4EE]'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                      title={color.name}
                      aria-label={`Selecionar acabamento ${color.name}`}
                    >
                      <span
                        className="block w-6 h-6 rounded-full border border-black/10 shadow-xs"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Characteristics Grid */}
            <div className="mt-6 pt-6 border-t border-[#EAEAE4] grid grid-cols-2 gap-3 text-xs">
              {product.specs.slice(0, 4).map((spec) => (
                <div key={spec.key} className="bg-white p-2.5 rounded-lg border border-[#E6E6DF]">
                  <span className="block text-[#8C8F96] font-mono text-[10px] uppercase">
                    {spec.key}
                  </span>
                  <span className="font-medium text-[#1C1D20] mt-0.5 block line-clamp-1">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Buy & Wishlist Actions */}
            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={() => onAddToCart(product, currentColor.name)}
                className="flex-1 py-3.5 px-6 bg-[#283628] hover:bg-[#1E281E] text-white text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 shadow-sm flex items-center justify-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#283628]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Adicionar à sacola</span>
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-3.5 rounded-lg border transition-all duration-200 flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#283628] ${
                  isWishlisted
                    ? 'border-[#283628] bg-[#283628]/10 text-[#283628]'
                    : 'border-[#DCDCD4] bg-white text-[#5E626B] hover:text-[#1C1D20] hover:border-[#B0B0A8]'
                }`}
                aria-label={isWishlisted ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
