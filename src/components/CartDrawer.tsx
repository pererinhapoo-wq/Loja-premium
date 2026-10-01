import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  CheckCircle2
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onNavigateToCatalog: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigateToCatalog
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [mockOrderNumber, setMockOrderNumber] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 500;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const freeShippingDifference = Math.max(0, freeShippingThreshold - subtotal);
  const shippingCost = isFreeShipping || items.length === 0 ? 0 : 45;
  const grandTotal = subtotal + shippingCost;

  const handleStartCheckout = () => {
    setCheckoutStep('checkout');
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderNum = `FRM-${Math.floor(100000 + Math.random() * 900000)}`;
    setMockOrderNumber(orderNum);
    setCheckoutStep('success');
  };

  const handleFinishAndReset = () => {
    onClearCart();
    setCheckoutStep('cart');
    onClose();
  };

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
              <ShoppingBag className="w-5 h-5 text-[#283628]" />
              <h2 className="font-display text-xl font-bold tracking-tight text-[#1C1D20]">
                Sua Sacola FORMA
              </h2>
              <span className="text-xs font-mono text-[#6A6D74] tabular-nums">
                ({items.reduce((s, i) => s + i.quantity, 0)})
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[#6A6D74] hover:text-[#1C1D20] hover:bg-[#F2F2EC] transition-colors"
              aria-label="Fechar sacola"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {checkoutStep === 'success' ? (
              /* Success confirmation state */
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#283628]/10 border border-[#283628]/20 flex items-center justify-center mx-auto text-[#283628]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#1C1D20]">
                  Pedido Confirmado
                </h3>
                <p className="text-xs font-mono text-[#283628] font-semibold">
                  Código: {mockOrderNumber}
                </p>
                <p className="text-xs text-[#5E626B] max-w-xs mx-auto leading-relaxed">
                  Esta é uma demonstração comercial interativa da marca FORMA. As peças selecionadas foram computadas com sucesso no seu fluxo.
                </p>

                <div className="mt-6 p-4 rounded-xl bg-white border border-[#E6E6DF] text-left text-xs space-y-2 shadow-xs">
                  <div className="flex justify-between text-[#6A6D74]">
                    <span>Cliente:</span>
                    <span className="text-[#1C1D20] font-medium">{customerName || 'Visitante Convidado'}</span>
                  </div>
                  <div className="flex justify-between text-[#6A6D74]">
                    <span>Local:</span>
                    <span className="text-[#1C1D20] font-medium">{customerCity || 'São Paulo, SP'}</span>
                  </div>
                  <div className="flex justify-between text-[#6A6D74]">
                    <span>Total Simulado:</span>
                    <span className="text-[#1C1D20] font-mono font-bold">R$ {grandTotal.toLocaleString('pt-BR')}</span>
                  </div>
                </div>

                <button
                  onClick={handleFinishAndReset}
                  className="w-full mt-6 py-3.5 bg-[#283628] hover:bg-[#1E281E] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
                >
                  Concluir & Continuar Navegando
                </button>
              </div>
            ) : checkoutStep === 'checkout' ? (
              /* Simulated Checkout Form */
              <form onSubmit={handleConfirmOrder} className="space-y-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-[#1C1D20] mb-1">
                    Finalização de Demonstração
                  </h3>
                  <p className="text-xs text-[#6A6D74]">
                    Simule os dados de entrega para revisar o pedido com embalagem protetora especial.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#6A6D74] mb-1 font-semibold">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Carlos Mendes"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#DCDCD4] rounded-lg text-xs text-[#1C1D20] focus:outline-none focus:border-[#283628]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#6A6D74] mb-1 font-semibold">
                      E-mail de Notificação
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="carlos@exemplo.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#DCDCD4] rounded-lg text-xs text-[#1C1D20] focus:outline-none focus:border-[#283628]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#6A6D74] mb-1 font-semibold">
                      Cidade & Estado
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Curitiba, PR"
                      value={customerCity}
                      onChange={(e) => setCustomerCity(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#DCDCD4] rounded-lg text-xs text-[#1C1D20] focus:outline-none focus:border-[#283628]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EAEAE4] space-y-2 text-xs">
                  <div className="flex justify-between text-[#6A6D74]">
                    <span>Subtotal de produtos:</span>
                    <span className="font-mono text-[#1C1D20]">R$ {subtotal.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between text-[#6A6D74]">
                    <span>Frete:</span>
                    <span className="font-mono text-[#283628] font-semibold">
                      {shippingCost === 0 ? 'Cortesia' : `R$ ${shippingCost}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#1C1D20] pt-2 border-t border-[#EAEAE4]">
                    <span>Total:</span>
                    <span className="font-mono tabular-nums">R$ {grandTotal.toLocaleString('pt-BR')}</span>
                  </div>
                </div>

                <div className="pt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="w-1/3 py-3 bg-[#F4F4EE] border border-[#DCDCD4] text-[#5E626B] hover:text-[#1C1D20] rounded-lg text-xs"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-3 bg-[#283628] hover:bg-[#1E281E] text-white text-xs font-semibold rounded-lg shadow-sm"
                  >
                    Confirmar Pedido Fictício
                  </button>
                </div>
              </form>
            ) : items.length === 0 ? (
              /* Empty Bag State */
              <div className="py-16 text-center space-y-3">
                <ShoppingBag className="w-10 h-10 text-[#8C8F96] mx-auto opacity-40" />
                <h3 className="font-display text-base font-bold text-[#1C1D20]">
                  Sua sacola está vazia
                </h3>
                <p className="text-xs text-[#6A6D74] max-w-xs mx-auto">
                  Explore nosso acervo autoral e selecione peças que traduzem a sua identidade.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToCatalog();
                  }}
                  className="mt-4 px-4 py-2.5 bg-[#283628] hover:bg-[#1E281E] text-white text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-2 shadow-xs"
                >
                  <span>Explorar Acervo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              /* Itemized List */
              <>
                {/* Free Shipping Indicator */}
                <div className="p-3.5 bg-white border border-[#E6E6DF] rounded-xl text-xs space-y-2 shadow-xs">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="flex items-center gap-1.5 text-[#1C1D20]">
                      <Truck className="w-3.5 h-3.5 text-[#283628]" />
                      <span>Frete Cortesia (Brasil)</span>
                    </span>
                    <span className={isFreeShipping ? 'text-[#283628] font-semibold' : 'text-[#6A6D74]'}>
                      {isFreeShipping ? 'Ativado' : `Faltam R$ ${freeShippingDifference.toLocaleString('pt-BR')}`}
                    </span>
                  </div>
                  <div className="w-full bg-[#EAEAE4] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#283628] h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-3.5">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedColor || 'default'}`}
                      className="bg-white border border-[#E6E6DF] rounded-xl p-3.5 flex items-start gap-3.5 shadow-xs"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg bg-[#F2F2EC] shrink-0 border border-[#E4E4DC]"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-display text-sm font-bold text-[#1C1D20] truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-[11px] text-[#6A6D74] mt-0.5">
                          {item.selectedColor ? `Acabamento: ${item.selectedColor}` : item.product.category}
                        </div>
                        <div className="font-mono text-xs font-semibold text-[#1C1D20] tabular-nums mt-1">
                          R$ {item.product.price.toLocaleString('pt-BR')}
                        </div>

                        {/* Quantity Stepper & Remove */}
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center border border-[#DCDCD4] bg-[#F7F7F3] rounded-md">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 text-[#6A6D74] hover:text-[#1C1D20]"
                              aria-label="Diminuir quantidade"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center font-mono text-xs text-[#1C1D20] font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 text-[#6A6D74] hover:text-[#1C1D20]"
                              aria-label="Aumentar quantidade"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="p-1 text-[#8C8F96] hover:text-[#EF4444] transition-colors"
                            aria-label="Remover item da sacola"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={onClearCart}
                    className="text-xs text-[#8C8F96] hover:text-[#EF4444] transition-colors"
                  >
                    Esvaziar toda a sacola
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Footer Actions */}
          {checkoutStep === 'cart' && items.length > 0 && (
            <div className="p-6 border-t border-[#EAEAE4] bg-white space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#6A6D74]">
                  <span>Subtotal:</span>
                  <span className="font-mono text-[#1C1D20] font-medium tabular-nums">
                    R$ {subtotal.toLocaleString('pt-BR')}
                  </span>
                </div>
                <div className="flex justify-between text-[#6A6D74]">
                  <span>Frete estimado:</span>
                  <span className="font-mono text-[#283628] font-semibold">
                    {shippingCost === 0 ? 'Cortesia' : `R$ ${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#1C1D20] pt-2 border-t border-[#EAEAE4]">
                  <span>Total do Pedido:</span>
                  <span className="font-mono tabular-nums">
                    R$ {grandTotal.toLocaleString('pt-BR')}
                  </span>
                </div>
              </div>

              <button
                onClick={handleStartCheckout}
                className="w-full py-3.5 bg-[#283628] hover:bg-[#1E281E] text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Finalizar Seleção (Demonstração)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#7A7E86]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#283628]" />
                <span>Ambiente de demonstração comercial autoral</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
