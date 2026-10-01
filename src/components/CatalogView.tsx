import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  Heart, 
  Plus, 
  ArrowUpDown, 
  Sparkles
} from 'lucide-react';
import { Product } from '../types';
import { CATEGORIES, COLLECTIONS } from '../data/products';

interface CatalogViewProps {
  products: Product[];
  initialCategory?: string;
  onOpenProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (id: string) => boolean;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  products,
  initialCategory,
  onOpenProduct,
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'Todos');
  const [selectedCollection, setSelectedCollection] = useState<string>('Todas');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('Todos');
  const [priceMax, setPriceMax] = useState<number>(6000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Extract all unique materials across products
  const allMaterials = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => p.materials.forEach(m => set.add(m)));
    return Array.from(set);
  }, [products]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchCat = product.category.toLowerCase().includes(q);
          const matchSub = product.subtitle.toLowerCase().includes(q);
          const matchMat = product.materials.some(m => m.toLowerCase().includes(q));
          if (!matchName && !matchCat && !matchSub && !matchMat) return false;
        }

        // Category filter
        if (selectedCategory !== 'Todos' && product.category !== selectedCategory) {
          return false;
        }

        // Collection filter
        if (selectedCollection !== 'Todas' && product.collection !== selectedCollection) {
          return false;
        }

        // Material filter
        if (selectedMaterial !== 'Todos' && !product.materials.includes(selectedMaterial)) {
          return false;
        }

        // Price filter
        if (product.price > priceMax) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0; // default featured
      });
  }, [products, searchQuery, selectedCategory, selectedCollection, selectedMaterial, priceMax, sortBy]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Todos');
    setSelectedCollection('Todas');
    setSelectedMaterial('Todos');
    setPriceMax(6000);
    setSortBy('featured');
  };

  const hasActiveFilters = 
    searchQuery.trim() !== '' ||
    selectedCategory !== 'Todos' ||
    selectedCollection !== 'Todas' ||
    selectedMaterial !== 'Todos' ||
    priceMax < 6000;

  return (
    <section className="py-12 sm:py-20 bg-[#FBFBF9] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#EAEAE4] gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#283628] font-semibold mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#283628]" />
              <span>Acervo Curado FORMA</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-normal text-[#1C1D20] tracking-tight">
              Catálogo de Produtos
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#6A6D74] tabular-nums">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'item exibido' : 'itens exibidos'}
            </span>
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden p-2.5 rounded-lg bg-white border border-[#DCDCD4] text-xs font-medium text-[#1C1D20] flex items-center gap-2 shadow-xs"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#283628]" />
              <span>Filtros</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#8C8F96] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nome, categoria ou material..."
              className="w-full pl-10 pr-9 py-2.5 bg-white border border-[#DCDCD4] rounded-lg text-xs sm:text-sm text-[#1C1D20] placeholder-[#8C8F96] focus:outline-none focus:border-[#283628] transition-colors shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8F96] hover:text-[#1C1D20]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Categories Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {['Todos', ...CATEGORIES].map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                    active
                      ? 'bg-[#283628] text-white shadow-xs'
                      : 'bg-[#F4F4EE] text-[#5E626B] hover:text-[#1C1D20] hover:bg-[#EAEAE4] border border-[#E2E2DC]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#6A6D74]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#DCDCD4] rounded-lg py-2 px-3 text-xs text-[#1C1D20] focus:outline-none focus:border-[#283628] shadow-xs"
            >
              <option value="featured">Destaques FORMA</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
              <option value="name">Nome (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Catalog Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Filters */}
          <aside
            className={`lg:col-span-3 space-y-6 ${
              showMobileFilters ? 'block' : 'hidden lg:block'
            } bg-white border border-[#E6E6DF] rounded-2xl p-5 shadow-xs`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#F0F0EA]">
              <span className="font-mono text-xs uppercase tracking-wider text-[#6A6D74] font-semibold">
                Filtros Avançados
              </span>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-[#283628] hover:underline transition-colors font-medium"
                >
                  Limpar todos
                </button>
              )}
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex items-center justify-between text-xs text-[#6A6D74] mb-2 font-mono">
                <span>Preço Máximo</span>
                <span className="text-[#1C1D20] font-semibold">
                  R$ {priceMax.toLocaleString('pt-BR')}
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="6000"
                step="100"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-[#283628] bg-[#EAEAE4] h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#8C8F96] mt-1">
                <span>R$ 200</span>
                <span>R$ 6.000+</span>
              </div>
            </div>

            {/* Collections Filter */}
            <div>
              <span className="block text-xs font-mono uppercase tracking-wider text-[#6A6D74] mb-2.5 font-semibold">
                Coleção
              </span>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedCollection('Todas')}
                  className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
                    selectedCollection === 'Todas'
                      ? 'bg-[#283628]/10 text-[#283628] font-semibold'
                      : 'text-[#5E626B] hover:text-[#1C1D20] hover:bg-[#F4F4EE]'
                  }`}
                >
                  Todas as Coleções
                </button>
                {COLLECTIONS.map(col => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedCollection(col.name)}
                    className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                      selectedCollection === col.name
                        ? 'bg-[#283628]/10 text-[#283628] font-semibold'
                        : 'text-[#5E626B] hover:text-[#1C1D20] hover:bg-[#F4F4EE]'
                    }`}
                  >
                    <span>{col.name}</span>
                    <span className="font-mono text-[10px] text-[#8C8F96]">{col.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Material Filter */}
            <div>
              <span className="block text-xs font-mono uppercase tracking-wider text-[#6A6D74] mb-2.5 font-semibold">
                Matéria-Prima
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedMaterial('Todos')}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors ${
                    selectedMaterial === 'Todos'
                      ? 'bg-[#283628] text-white border-[#283628]'
                      : 'bg-[#F9F9F6] border-[#E2E2DC] text-[#5E626B] hover:text-[#1C1D20]'
                  }`}
                >
                  Todos
                </button>
                {allMaterials.slice(0, 8).map(mat => (
                  <button
                    key={mat}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors ${
                      selectedMaterial === mat
                        ? 'bg-[#283628] text-white border-[#283628]'
                        : 'bg-[#F9F9F6] border-[#E2E2DC] text-[#5E626B] hover:text-[#1C1D20]'
                    }`}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid (9 Cols) */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-white border border-[#E6E6DF] rounded-2xl p-8 shadow-xs">
                <Sparkles className="w-8 h-8 text-[#8C8F96] mx-auto mb-3 opacity-50" />
                <h3 className="font-display text-lg font-bold text-[#1C1D20]">
                  Nenhum produto encontrado
                </h3>
                <p className="mt-2 text-xs text-[#5E626B] max-w-sm mx-auto">
                  Tente ajustar a busca ou redefinir os filtros aplicados para visualizar outras peças do catálogo.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-6 px-5 py-2.5 bg-[#283628] hover:bg-[#1E281E] text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Limpar todos os filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const wish = isWishlisted(product.id);
                  return (
                    <div
                      key={product.id}
                      className="group bg-white border border-[#E6E6DF] hover:border-[#D0D0C8] rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md"
                    >
                      {/* Image container */}
                      <div 
                        className="relative aspect-[4/3] bg-[#F2F2EC] overflow-hidden cursor-pointer"
                        onClick={() => onOpenProduct(product)}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Top tag & heart */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className="text-[11px] font-mono text-[#1C1D20] bg-white/90 backdrop-blur-md px-2 py-0.5 rounded shadow-xs">
                            {product.category}
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleWishlist(product);
                            }}
                            className="p-2 rounded-full bg-white/90 hover:bg-white backdrop-blur-md text-[#5E626B] hover:text-[#1C1D20] shadow-xs transition-colors"
                            aria-label="Favoritar"
                          >
                            <Heart className={`w-3.5 h-3.5 ${wish ? 'text-[#283628] fill-[#283628]' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-[11px] font-mono text-[#8C8F96] mb-1">
                            {product.collection}
                          </div>
                          <h3 
                            onClick={() => onOpenProduct(product)}
                            className="font-display text-lg font-medium text-[#1C1D20] group-hover:text-[#283628] transition-colors cursor-pointer line-clamp-1"
                          >
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
                              className="px-2.5 py-1.5 text-xs text-[#5E626B] hover:text-[#1C1D20] hover:bg-[#F2F2EC] rounded transition-colors"
                            >
                              Detalhes
                            </button>
                            <button
                              onClick={() => onAddToCart(product)}
                              className="p-2 bg-[#283628] hover:bg-[#1E281E] text-white rounded-lg transition-colors"
                              aria-label="Adicionar à sacola"
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
            )}
          </main>
        </div>
      </div>
    </section>
  );
};
