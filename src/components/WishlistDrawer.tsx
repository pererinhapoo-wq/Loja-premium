import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenProduct: (product: Product) => void;
  onClearWishlist: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onOpenProduct,
  onClearWishlist
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm transition-opacity">
      <div 
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
        onClick={onClose}
      >
        <div 
          className="w-screen max-w-md bg-[#FBFBF9] border-l border-[#E6E6DF] text-[#1C1D20] shadow-2xl flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-[#EAEAE4] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-[#283628] fill-[#283628]" />
              <h2 className="font-display text-xl font-bold tracking-tight text-[#1C1D20]">
                Favoritos & Desejos
              </h2>
              <span className="text-xs font-mono text-[#6A6D74] tabular-nums">
                ({wishlistProducts.length})
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[#6A6D74] hover:text-[#1C1D20] hover:bg-[#F2F2EC] transition-colors"
              aria-label="Fechar favoritos"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3.5">
            {wishlistProducts.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <Heart className="w-10 h-10 text-[#8C8F96] mx-auto opacity-40" />
                <h3 className="font-display text-base font-bold text-[#1C1D20]">
                  Nenhum item salvo
                </h3>
                <p className="text-xs text-[#6A6D74] max-w-xs mx-auto">
                  Marque seus objetos favoritos ao navegar pelo catálogo para guardá-los ou compará-los depois.
                </p>
              </div>
            ) : (
              <>
                {wishlistProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-[#E6E6DF] rounded-xl p-3.5 flex items-start gap-3.5 shadow-xs"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      onClick={() => {
                        onClose();
                        onOpenProduct(product);
                      }}
                      className="w-16 h-16 object-cover rounded-lg bg-[#F2F2EC] shrink-0 border border-[#E4E4DC] cursor-pointer"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-[#283628] uppercase font-semibold">
                            {product.category}
                          </span>
                          <h4 
                            onClick={() => {
                              onClose();
                              onOpenProduct(product);
                            }}
                            className="font-display text-sm font-bold text-[#1C1D20] truncate hover:text-[#283628] cursor-pointer"
                          >
                            {product.name}
                          </h4>
                        </div>
                        <button
                          onClick={() => onRemoveFromWishlist(product)}
                          className="p-1 text-[#8C8F96] hover:text-[#EF4444] transition-colors"
                          aria-label="Remover dos favoritos"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="font-mono text-xs font-semibold text-[#1C1D20] tabular-nums mt-1">
                        R$ {product.price.toLocaleString('pt-BR')}
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <button
                          onClick={() => {
                            onClose();
                            onOpenProduct(product);
                          }}
                          className="text-[11px] text-[#5E626B] hover:text-[#1C1D20]"
                        >
                          Ver detalhes
                        </button>

                        <button
                          onClick={() => onAddToCart(product)}
                          className="px-3 py-1.5 bg-[#283628] hover:bg-[#1E281E] text-white text-[11px] font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Mover p/ Sacola</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-end pt-2">
                  <button
                    onClick={onClearWishlist}
                    className="text-xs text-[#8C8F96] hover:text-[#EF4444] transition-colors"
                  >
                    Limpar todos os favoritos
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          {wishlistProducts.length > 0 && (
            <div className="p-6 border-t border-[#EAEAE4] bg-white">
              <button
                onClick={() => {
                  wishlistProducts.forEach(p => onAddToCart(p));
                  onClose();
                }}
                className="w-full py-3.5 bg-[#283628] hover:bg-[#1E281E] text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Adicionar Todos os Favoritos à Sacola</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
