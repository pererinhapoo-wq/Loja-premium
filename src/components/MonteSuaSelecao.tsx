import React, { useState } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  ShoppingBag, 
  Heart, 
  ArrowRight, 
  Check, 
  RefreshCw, 
  Plus, 
  Trash2, 
  Share2,
  MoveUp,
  MoveDown
} from 'lucide-react';
import { Product, CuratedIntent, CuratedStyle } from '../types';
import { CURATED_INTENTS, CURATED_STYLES } from '../data/products';

interface MonteSuaSelecaoProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onAddAllToCart: (products: Product[]) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (id: string) => boolean;
  onOpenProduct: (product: Product) => void;
  onNotify: (message: string) => void;
}

export const MonteSuaSelecao: React.FC<MonteSuaSelecaoProps> = ({
  products,
  onAddToCart,
  onAddAllToCart,
  onToggleWishlist,
  isWishlisted,
  onOpenProduct,
  onNotify
}) => {
  const [selectedIntent, setSelectedIntent] = useState<CuratedIntent>('casa');
  const [selectedStyle, setSelectedStyle] = useState<CuratedStyle>('aluminio');
  
  const [bundleProducts, setBundleProducts] = useState<Product[]>(() => {
    const intentObj = CURATED_INTENTS.find(i => i.id === 'casa');
    const matched = products.filter(p => intentObj?.recommendedIds.includes(p.id));
    return matched.length > 0 ? matched : products.slice(0, 4);
  });

  const [swappingProductIndex, setSwappingProductIndex] = useState<number | null>(null);
  const [isSelectionSaved, setIsSelectionSaved] = useState(false);

  const handleGenerateCuration = (intent: CuratedIntent, style: CuratedStyle) => {
    setSelectedIntent(intent);
    setSelectedStyle(style);

    const filtered = products.filter(p => 
      p.intentMatch.includes(intent) || p.styleProfile.includes(style)
    );

    const chosen: Product[] = [];
    const usedCategories = new Set<string>();

    for (const p of filtered) {
      if (!usedCategories.has(p.category) && chosen.length < 4) {
        chosen.push(p);
        usedCategories.add(p.category);
      }
    }

    if (chosen.length < 3) {
      for (const p of products) {
        if (!chosen.find(c => c.id === p.id) && chosen.length < 4) {
          chosen.push(p);
        }
      }
    }

    setBundleProducts(chosen);
    setIsSelectionSaved(false);
    onNotify('Curadoria personalizada gerada com sucesso.');
  };

  const handleRemoveItem = (index: number) => {
    if (bundleProducts.length <= 1) {
      onNotify('A seleção precisa de pelo menos 1 peça.');
      return;
    }
    const updated = bundleProducts.filter((_, i) => i !== index);
    setBundleProducts(updated);
    onNotify('Item removido da seleção.');
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= bundleProducts.length) return;
    const updated = [...bundleProducts];
    const temp = updated[index];
    updated[index] = updated[newIdx];
    updated[newIdx] = temp;
    setBundleProducts(updated);
  };

  const handleSwapItem = (newProduct: Product) => {
    if (swappingProductIndex === null) return;
    const updated = [...bundleProducts];
    updated[swappingProductIndex] = newProduct;
    setBundleProducts(updated);
    setSwappingProductIndex(null);
    onNotify(`Substituído por ${newProduct.name}.`);
  };

  const handleAddExtraProduct = (product: Product) => {
    if (bundleProducts.some(p => p.id === product.id)) {
      onNotify('Este produto já faz parte da seleção.');
      return;
    }
    if (bundleProducts.length >= 6) {
      onNotify('Limite de 6 peças por seleção atingido.');
      return;
    }
    setBundleProducts([...bundleProducts, product]);
    onNotify(`${product.name} adicionado à seleção.`);
  };

  const subtotal = bundleProducts.reduce((sum, p) => sum + p.price, 0);
  const bundleDiscount = bundleProducts.length >= 3 ? Math.round(subtotal * 0.1) : 0;
  const totalPrice = subtotal - bundleDiscount;

  const currentIntentData = CURATED_INTENTS.find(i => i.id === selectedIntent);
  const currentStyleData = CURATED_STYLES.find(s => s.id === selectedStyle);

  return (
    <section className="py-16 sm:py-24 bg-[#FBFBF9] border-b border-[#EAEAE4] relative min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-[#283628] uppercase tracking-widest mb-3 font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Experiência Exclusiva de Curadoria</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-normal text-[#1C1D20] tracking-tight leading-tight">
            Monte sua Seleção
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#5E626B] leading-relaxed">
            Uma consultoria de estilo e composição feita sob medida para o seu ambiente. Defina intenções, refine preferências visuais e receba uma composição FORMA integrada.
          </p>
        </div>

        {/* Curation Configuration Selector Bar */}
        <div className="bg-white border border-[#E6E6DF] rounded-2xl p-6 sm:p-8 mb-12 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Step 1: Intenção */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#6A6D74] mb-3 font-semibold">
                1. Escolha sua Intenção Principal
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CURATED_INTENTS.map((intent) => {
                  const isSelected = selectedIntent === intent.id;
                  return (
                    <button
                      key={intent.id}
                      onClick={() => handleGenerateCuration(intent.id, selectedStyle)}
                      className={`p-3.5 rounded-xl text-left transition-all border ${
                        isSelected
                          ? 'bg-[#283628]/8 border-[#283628] text-[#1C1D20] shadow-xs'
                          : 'bg-[#F9F9F6] border-[#E6E6DF] text-[#6A6D74] hover:text-[#1C1D20] hover:border-[#D0D0C8]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display text-sm font-bold block">
                          {intent.label}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-[#283628]" />}
                      </div>
                      <span className="text-[11px] text-[#7A7E86] line-clamp-1 mt-0.5 block">
                        {intent.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Estilo & Matéria-Prima */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#6A6D74] mb-3 font-semibold">
                2. Preferência Visual & Uso
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CURATED_STYLES.map((style) => {
                  const isSelected = selectedStyle === style.id;
                  return (
                    <button
                      key={style.id}
                      onClick={() => handleGenerateCuration(selectedIntent, style.id)}
                      className={`p-3.5 rounded-xl text-left transition-all border ${
                        isSelected
                          ? 'bg-[#283628]/8 border-[#283628] text-[#1C1D20] shadow-xs'
                          : 'bg-[#F9F9F6] border-[#E6E6DF] text-[#6A6D74] hover:text-[#1C1D20] hover:border-[#D0D0C8]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display text-sm font-bold block">
                          {style.title}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-[#283628]" />}
                      </div>
                      <span className="text-[11px] text-[#7A7E86] line-clamp-1 mt-0.5 block">
                        {style.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Reset / Status bar */}
          <div className="mt-6 pt-5 border-t border-[#F0F0EA] flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-[#5E626B]">
              <span className="w-2 h-2 rounded-full bg-[#283628]" />
              <span>
                Composição ativa: <strong className="text-[#1C1D20] font-medium">{currentIntentData?.label}</strong> com perfil <strong className="text-[#1C1D20] font-medium">{currentStyleData?.title}</strong>
              </span>
            </div>

            <button
              onClick={() => handleGenerateCuration('estilo', 'minimalista')}
              className="inline-flex items-center gap-1.5 text-xs text-[#5E626B] hover:text-[#1C1D20] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar Escolhas</span>
            </button>
          </div>
        </div>

        {/* CURATED SELECTION OUTPUT - "Sua seleção FORMA" */}
        <div className="bg-white border border-[#E6E6DF] rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-xs">
          {/* Curatorial Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-[#F0F0EA] gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#283628] font-semibold block mb-1">
                Composição Exclusiva
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-normal text-[#1C1D20]">
                Sua seleção FORMA
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#5E626B]">
                Esta seleção foi montada a partir das suas escolhas para equilibrar estética, tato e função.
              </p>
            </div>

            {/* Selection Quick Stats */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setIsSelectionSaved(!isSelectionSaved);
                  onNotify(isSelectionSaved ? 'Seleção removida dos salvos.' : 'Seleção guardada em seus favoritos.');
                }}
                className={`p-3 rounded-lg border text-xs font-medium flex items-center gap-2 transition-all ${
                  isSelectionSaved
                    ? 'bg-[#283628]/10 border-[#283628] text-[#283628]'
                    : 'bg-[#F7F7F3] border-[#DCDCD4] text-[#5E626B] hover:text-[#1C1D20]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isSelectionSaved ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">
                  {isSelectionSaved ? 'Seleção Salva' : 'Favoritar Seleção'}
                </span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  onNotify('Link da seleção copiado para sua área de transferência.');
                }}
                className="p-3 rounded-lg bg-[#F7F7F3] border border-[#DCDCD4] text-[#5E626B] hover:text-[#1C1D20] transition-colors"
                title="Compartilhar Seleção"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Editorial Products Showcase Grid / List */}
          <div className="mt-8 space-y-4">
            {bundleProducts.map((product, idx) => (
              <div
                key={`${product.id}-${idx}`}
                className="group bg-[#FBFBF9] border border-[#E6E6DF] hover:border-[#D0D0C8] rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 transition-all duration-300"
              >
                {/* Product Media & Core Info */}
                <div className="flex items-center gap-4 flex-1">
                  <span className="font-mono text-xs text-[#8C8F96] w-6 shrink-0">
                    0{idx + 1}
                  </span>

                  <div 
                    onClick={() => onOpenProduct(product)}
                    className="w-20 h-20 sm:w-24 sm:h-24 bg-[#F2F2EC] rounded-lg overflow-hidden shrink-0 cursor-pointer border border-[#E4E4DC]"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-[#6A6D74] mb-1">
                      <span>{product.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#283628] font-semibold">{product.collection}</span>
                    </div>

                    <h3 
                      onClick={() => onOpenProduct(product)}
                      className="font-display text-lg font-bold text-[#1C1D20] hover:text-[#283628] transition-colors cursor-pointer"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#5E626B] line-clamp-1 mt-0.5">
                      {product.subtitle}
                    </p>

                    <div className="mt-2 text-xs text-[#7A7E86] flex items-center gap-3">
                      <span>Material: <strong className="text-[#1C1D20] font-normal">{product.materials[0]}</strong></span>
                      <span>Dimensões: <strong className="text-[#1C1D20] font-normal">{product.dimensions}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Price & Interactive Actions */}
                <div className="flex items-center justify-between md:justify-end gap-5 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-[#EAEAE4]">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] font-mono uppercase text-[#8C8F96] block">Preço</span>
                    <span className="font-mono text-base font-bold text-[#1C1D20] tabular-nums">
                      R$ {product.price.toLocaleString('pt-BR')}
                    </span>
                  </div>

                  {/* Rearrange Up / Down */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMove(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1.5 text-[#8C8F96] hover:text-[#1C1D20] disabled:opacity-30 transition-colors"
                      title="Mover para cima"
                    >
                      <MoveUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMove(idx, 'down')}
                      disabled={idx === bundleProducts.length - 1}
                      className="p-1.5 text-[#8C8F96] hover:text-[#1C1D20] disabled:opacity-30 transition-colors"
                      title="Mover para baixo"
                    >
                      <MoveDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Substitute / Swap Action */}
                  <button
                    onClick={() => setSwappingProductIndex(idx)}
                    className="p-2 rounded-lg bg-white hover:bg-[#F2F2EC] border border-[#DCDCD4] text-xs text-[#5E626B] hover:text-[#1C1D20] transition-colors flex items-center gap-1.5"
                    title="Substituir produto"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Substituir</span>
                  </button>

                  {/* Remove Action */}
                  <button
                    onClick={() => handleRemoveItem(idx)}
                    className="p-2 rounded-lg bg-white hover:bg-[#FDF2F2] border border-[#DCDCD4] hover:border-[#EF4444] text-[#8C8F96] hover:text-[#EF4444] transition-colors"
                    title="Remover produto da seleção"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add more products prompt if less than 6 */}
          {bundleProducts.length < 6 && (
            <div className="mt-6 pt-6 border-t border-[#F0F0EA]">
              <div className="text-xs font-mono text-[#6A6D74] uppercase tracking-wider mb-3 font-semibold">
                Adicionar mais peças compatíveis à seleção:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {products
                  .filter(p => !bundleProducts.some(b => b.id === p.id))
                  .slice(0, 4)
                  .map(candidate => (
                    <button
                      key={candidate.id}
                      onClick={() => handleAddExtraProduct(candidate)}
                      className="group p-3 bg-[#FBFBF9] hover:bg-white border border-[#E6E6DF] hover:border-[#283628] rounded-xl text-left transition-all flex items-center gap-3 shadow-xs"
                    >
                      <img
                        src={candidate.image}
                        alt={candidate.name}
                        className="w-10 h-10 object-cover rounded-lg bg-[#F2F2EC]"
                      />
                      <div className="overflow-hidden">
                        <span className="font-display text-xs font-bold text-[#1C1D20] block truncate group-hover:text-[#283628]">
                          {candidate.name}
                        </span>
                        <span className="text-[11px] font-mono text-[#6A6D74] tabular-nums">
                          + R$ {candidate.price.toLocaleString('pt-BR')}
                        </span>
                      </div>
                      <Plus className="w-4 h-4 text-[#8C8F96] group-hover:text-[#283628] ml-auto shrink-0" />
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Curated Financial & Action Summary Footer */}
          <div className="mt-10 pt-8 border-t border-[#F0F0EA] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3 text-xs text-[#5E626B]">
                <span>Itens selecionados: <strong className="text-[#1C1D20]">{bundleProducts.length}</strong></span>
                {bundleDiscount > 0 && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#283628] font-semibold">Benefício Curadoria FORMA (-10%) aplicado</span>
                  </>
                )}
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-3xl font-extrabold text-[#1C1D20] tabular-nums">
                  R$ {totalPrice.toLocaleString('pt-BR')}
                </span>
                {bundleDiscount > 0 && (
                  <span className="font-mono text-base text-[#9C9FA6] line-through tabular-nums">
                    R$ {subtotal.toLocaleString('pt-BR')}
                  </span>
                )}
                <span className="text-xs text-[#6A6D74] font-mono">
                  ou 12× de R$ {Math.round(totalPrice / 12).toLocaleString('pt-BR')} sem juros
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  bundleProducts.forEach(p => onAddToCart(p));
                  onNotify(`${bundleProducts.length} peças da seleção foram adicionadas à sacola.`);
                }}
                className="px-6 py-3.5 bg-[#283628] hover:bg-[#1E281E] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#283628]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Adicionar Toda a Seleção à Sacola</span>
              </button>

              <button
                onClick={() => handleGenerateCuration('casa', 'aluminio')}
                className="px-5 py-3.5 bg-[#F4F4EE] hover:bg-[#EAEAE4] border border-[#DCDCD4] text-xs font-medium text-[#5E626B] hover:text-[#1C1D20] rounded-lg transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Criar Outra Seleção</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Substitution Modal */}
      {swappingProductIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white border border-[#E6E6DF] rounded-2xl max-w-2xl w-full p-6 max-h-[80vh] flex flex-col shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#F0F0EA]">
              <div>
                <h3 className="font-display text-lg font-bold text-[#1C1D20]">
                  Substituir Objeto
                </h3>
                <p className="text-xs text-[#6A6D74]">
                  Escolha outro produto do acervo para entrar nesta composição.
                </p>
              </div>
              <button
                onClick={() => setSwappingProductIndex(null)}
                className="text-xs text-[#6A6D74] hover:text-[#1C1D20]"
              >
                Cancelar
              </button>
            </div>

            <div className="overflow-y-auto py-4 space-y-3 flex-1">
              {products
                .filter(p => !bundleProducts.some(b => b.id === p.id))
                .map(product => (
                  <div
                    key={product.id}
                    className="p-3 rounded-xl bg-[#FBFBF9] border border-[#E6E6DF] hover:border-[#283628] flex items-center justify-between gap-4 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-14 h-14 object-cover rounded-lg bg-[#F2F2EC]"
                      />
                      <div>
                        <span className="text-[10px] font-mono text-[#283628] uppercase font-semibold">
                          {product.category}
                        </span>
                        <h4 className="font-display text-sm font-bold text-[#1C1D20]">
                          {product.name}
                        </h4>
                        <span className="font-mono text-xs text-[#6A6D74] tabular-nums">
                          R$ {product.price.toLocaleString('pt-BR')}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSwapItem(product)}
                      className="px-3.5 py-1.5 bg-[#283628] hover:bg-[#1E281E] text-white text-xs font-semibold rounded-lg transition-colors"
                    >
                      Selecionar
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
