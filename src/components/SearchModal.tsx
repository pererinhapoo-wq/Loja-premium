import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { CATEGORIES } from '../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onOpenProduct: (product: Product) => void;
  onSelectCategory: (category: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onOpenProduct,
  onSelectCategory
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const results = query.trim()
    ? products.filter(p => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.materials.some(m => m.toLowerCase().includes(q))
        );
      })
    : [];

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24"
      onClick={onClose}
    >
      <div 
        className="bg-[#FBFBF9] border border-[#E6E6DF] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl text-[#1C1D20]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative p-4 sm:p-5 border-b border-[#EAEAE4] bg-white flex items-center gap-3">
          <Search className="w-5 h-5 text-[#6A6D74] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por objeto, material, categoria (ex: titânio, luminária, acústica)..."
            className="w-full bg-transparent text-sm sm:text-base text-[#1C1D20] placeholder-[#8C8F96] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#8C8F96] hover:text-[#1C1D20] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline text-[11px] font-mono text-[#6A6D74] px-2 py-0.5 rounded bg-[#F4F4EE] border border-[#E2E2DC]">
            ESC
          </span>
        </div>

        {/* Quick Categories Bar */}
        <div className="px-5 py-3 bg-[#F7F7F3] border-b border-[#EAEAE4] flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-mono uppercase text-[#6A6D74] font-semibold shrink-0">
            Categorias:
          </span>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => {
                onSelectCategory(cat);
                onClose();
              }}
              className="px-2.5 py-1 text-xs text-[#5E626B] hover:text-[#1C1D20] bg-white hover:bg-[#F2F2EC] border border-[#E2E2DC] rounded-lg transition-colors whitespace-nowrap shadow-xs"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 space-y-3">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-xs text-[#6A6D74]">
              <Sparkles className="w-6 h-6 text-[#283628] mx-auto mb-2 opacity-60" />
              <p>Digite um termo para pesquisar ou explore as categorias rápidas acima.</p>
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#6A6D74]">
              Nenhum objeto correspondeu a “{query}”. Verifique a ortografia ou use palavras-chave como “alumínio”, “som” ou “luminária”.
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onClose();
                  onOpenProduct(product);
                }}
                className="group p-3 rounded-xl bg-white hover:bg-[#F4F4EE] border border-[#E6E6DF] hover:border-[#283628] flex items-center justify-between gap-4 cursor-pointer transition-all shadow-xs"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg bg-[#F2F2EC] border border-[#E4E4DC]"
                  />
                  <div>
                    <span className="text-[10px] font-mono text-[#283628] uppercase font-semibold">
                      {product.category} · {product.collection}
                    </span>
                    <h4 className="font-display text-sm font-bold text-[#1C1D20] group-hover:text-[#283628]">
                      {product.name}
                    </h4>
                    <span className="text-xs text-[#6A6D74] line-clamp-1">
                      {product.subtitle}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0 flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold text-[#1C1D20] tabular-nums">
                    R$ {product.price.toLocaleString('pt-BR')}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#8C8F96] group-hover:text-[#283628] transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
