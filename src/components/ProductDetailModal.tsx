import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Truck, 
  ShieldCheck
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, color?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (id: string) => boolean;
  relatedProducts: Product[];
  onOpenProduct: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  relatedProducts,
  onOpenProduct
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'materials' | 'shipping'>('specs');

  const images = product.secondaryImages.length > 0 ? product.secondaryImages : [product.image];
  const currentColor = product.colors[selectedColorIndex] || product.colors[0];
  const wish = isWishlisted(product.id);

  const handleAdd = () => {
    onAddToCart(product, quantity, currentColor?.name);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6"
      onClick={onClose}
    >
      <div 
        className="relative bg-white border border-[#E6E6DF] rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl my-8 text-[#1C1D20]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 hover:bg-white text-[#5E626B] hover:text-[#1C1D20] transition-colors border border-[#E4E4DC] shadow-xs"
          aria-label="Fechar detalhes do produto"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
          {/* Left Column: Multi-Image Gallery (7 Cols) */}
          <div className="lg:col-span-7 bg-[#FAF9F5] p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#EAEAE4]">
            {/* Main Stage Image */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F2F2EC] border border-[#E4E4DC]">
              <img
                src={images[activeImageIndex] || product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded text-xs font-mono text-[#1C1D20] shadow-xs">
                {product.collection}
              </div>
            </div>

            {/* Thumbnail Navigation Strip */}
            {images.length > 1 && (
              <div className="mt-6 flex items-center gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-16 rounded-lg overflow-hidden border shrink-0 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#283628] ring-2 ring-[#283628]/30'
                        : 'border-[#E2E2DC] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Visualização ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Curatorial Quote Box */}
            <div className="mt-6 p-4 rounded-xl bg-white border border-[#E6E6DF] text-xs text-[#5E626B]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#283628] block mb-1 font-semibold">
                Nota do Curador FORMA
              </span>
              <p className="italic leading-relaxed">
                “{product.editorialNote}”
              </p>
            </div>
          </div>

          {/* Right Column: Information & Purchase Module (5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh] bg-white">
            <div>
              {/* Category & Badge */}
              <div className="flex items-center gap-2 text-xs font-mono text-[#6A6D74] uppercase tracking-wider mb-2">
                <span>{product.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#283628] font-semibold">{product.badge || 'Curadoria Oficial'}</span>
              </div>

              {/* Title & Subtitle */}
              <h2 className="font-display text-2xl sm:text-3xl font-normal sm:font-medium text-[#1C1D20] tracking-tight">
                {product.name}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#6A6D74]">
                {product.subtitle}
              </p>

              {/* Pricing */}
              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-[#1C1D20] tabular-nums">
                  R$ {product.price.toLocaleString('pt-BR')}
                </span>
                {product.originalPrice && (
                  <span className="font-mono text-sm text-[#9C9FA6] line-through tabular-nums">
                    R$ {product.originalPrice.toLocaleString('pt-BR')}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-mono text-[#6A6D74] block mt-0.5">
                Frete cortesia · Em até 10× de R$ {(product.price / 10).toFixed(2).replace('.', ',')} sem juros
              </span>

              {/* Description */}
              <p className="mt-5 text-xs sm:text-sm text-[#4E5158] leading-relaxed">
                {product.description}
              </p>

              {/* Color Options */}
              {product.colors.length > 0 && (
                <div className="mt-6 pt-5 border-t border-[#F0F0EA]">
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className="font-mono uppercase tracking-wider text-[#6A6D74]">
                      Acabamento
                    </span>
                    <span className="font-medium text-[#1C1D20]">{currentColor?.name}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map((color, idx) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColorIndex(idx)}
                        className={`p-1 rounded-full transition-all ${
                          selectedColorIndex === idx
                            ? 'ring-2 ring-[#283628] ring-offset-2 ring-offset-white'
                            : 'opacity-70 hover:opacity-100'
                        }`}
                        title={color.name}
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

              {/* Tabbed Specifications */}
              <div className="mt-6 pt-5 border-t border-[#F0F0EA]">
                <div className="flex gap-4 border-b border-[#F0F0EA] text-xs font-mono mb-4">
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-2 transition-colors ${
                      activeTab === 'specs'
                        ? 'text-[#1C1D20] border-b-2 border-[#283628] font-semibold'
                        : 'text-[#8C8F96] hover:text-[#1C1D20]'
                    }`}
                  >
                    Especificações
                  </button>
                  <button
                    onClick={() => setActiveTab('materials')}
                    className={`pb-2 transition-colors ${
                      activeTab === 'materials'
                        ? 'text-[#1C1D20] border-b-2 border-[#283628] font-semibold'
                        : 'text-[#8C8F96] hover:text-[#1C1D20]'
                    }`}
                  >
                    Matérias-Primas
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-2 transition-colors ${
                      activeTab === 'shipping'
                        ? 'text-[#1C1D20] border-b-2 border-[#283628] font-semibold'
                        : 'text-[#8C8F96] hover:text-[#1C1D20]'
                    }`}
                  >
                    Envio & Cuidados
                  </button>
                </div>

                {activeTab === 'specs' && (
                  <div className="space-y-2 text-xs">
                    {product.specs.map(s => (
                      <div key={s.key} className="flex justify-between py-1 border-b border-[#F4F4EE]">
                        <span className="text-[#6A6D74] font-mono">{s.key}</span>
                        <span className="text-[#1C1D20] font-medium text-right">{s.value}</span>
                      </div>
                    ))}
                    <div className="flex justify-between py-1 border-b border-[#F4F4EE]">
                      <span className="text-[#6A6D74] font-mono">Dimensões</span>
                      <span className="text-[#1C1D20] font-medium">{product.dimensions}</span>
                    </div>
                  </div>
                )}

                {activeTab === 'materials' && (
                  <div className="text-xs text-[#5E626B] space-y-2">
                    <p>
                      Composição primária: <strong className="text-[#1C1D20]">{product.materials.join(', ')}</strong>.
                    </p>
                    <p>
                      Acabamentos resistentes a corrosão, digitais e desgaste contínuo por processo eletroquímico mineral.
                    </p>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="text-xs text-[#5E626B] space-y-2">
                    <div className="flex items-center gap-2 text-[#1C1D20]">
                      <Truck className="w-3.5 h-3.5 text-[#283628]" />
                      <span>Despacho prioritário em embalagem reforçada.</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#1C1D20]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#283628]" />
                      <span>Certificado de autenticidade e número de série inclusos.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-8 pt-6 border-t border-[#F0F0EA] space-y-4">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#DCDCD4] bg-[#F7F7F3] rounded-lg p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-[#6A6D74] hover:text-[#1C1D20] transition-colors"
                    aria-label="Diminuir quantidade"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-mono text-sm text-[#1C1D20] font-bold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-[#6A6D74] hover:text-[#1C1D20] transition-colors"
                    aria-label="Aumentar quantidade"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Bag CTA */}
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3.5 px-6 bg-[#283628] hover:bg-[#1E281E] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Adicionar à sacola</span>
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3.5 rounded-lg border transition-all ${
                    wish
                      ? 'border-[#283628] bg-[#283628]/10 text-[#283628]'
                      : 'border-[#DCDCD4] bg-[#F7F7F3] text-[#6A6D74] hover:text-[#1C1D20]'
                  }`}
                  aria-label="Favoritar produto"
                >
                  <Heart className={`w-5 h-5 ${wish ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Recommendation Footer inside modal */}
        {relatedProducts.length > 0 && (
          <div className="p-6 sm:p-8 bg-[#F7F7F3] border-t border-[#EAEAE4]">
            <h3 className="font-display text-sm font-bold text-[#1C1D20] mb-4">
              Peças Relacionadas do Acervo
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedProducts.slice(0, 4).map(rel => (
                <div
                  key={rel.id}
                  onClick={() => onOpenProduct(rel)}
                  className="group bg-white border border-[#E6E6DF] hover:border-[#283628] rounded-xl p-2.5 cursor-pointer transition-all shadow-xs"
                >
                  <img
                    src={rel.image}
                    alt={rel.name}
                    className="aspect-[4/3] w-full object-cover rounded-lg bg-[#F2F2EC] mb-2"
                  />
                  <div className="font-display text-xs font-semibold text-[#1C1D20] truncate group-hover:text-[#283628]">
                    {rel.name}
                  </div>
                  <div className="font-mono text-[11px] text-[#6A6D74] tabular-nums mt-0.5">
                    R$ {rel.price.toLocaleString('pt-BR')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
