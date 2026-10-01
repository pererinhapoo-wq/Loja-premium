import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WeeklyHighlights } from './components/WeeklyHighlights';
import { CollectionsGrid } from './components/CollectionsGrid';
import { SpotlightProduct } from './components/SpotlightProduct';
import { NewArrivals } from './components/NewArrivals';
import { CuratorshipSection } from './components/CuratorshipSection';
import { BrandExperience } from './components/BrandExperience';
import { CatalogView } from './components/CatalogView';
import { MonteSuaSelecao } from './components/MonteSuaSelecao';
import { AboutView } from './components/AboutView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { NotificationToast } from './components/NotificationToast';
import { Footer } from './components/Footer';

import { Product, CartItem, ProductCategory } from './types';
import { PRODUCTS } from './data/products';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<string>('inicio');
  const [selectedCatalogCategory, setSelectedCatalogCategory] = useState<string>('Todos');

  // Shopping Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('forma_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State (Array of product IDs)
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('forma_wishlist');
      return saved ? JSON.parse(saved) : ['forma-01'];
    } catch {
      return ['forma-01'];
    }
  });

  // Modals & Drawers State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('forma_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('forma_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [wishlistIds]);

  // Toast notification helper with auto-clear
  const showNotification = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Cart Management
  const handleAddToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === selectedColor
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      }
      return [...prev, { product, quantity, selectedColor: selectedColor || product.colors[0]?.name }];
    });
    showNotification(`${product.name} adicionado à sacola.`);
  };

  const handleAddMultipleToCart = (productsToAdd: Product[]) => {
    productsToAdd.forEach((p) => handleAddToCart(p, 1));
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showNotification('Item removido da sacola.');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist Management
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showNotification(`${product.name} removido dos favoritos.`);
        return prev.filter((id) => id !== product.id);
      } else {
        showNotification(`${product.name} salvo nos seus favoritos.`);
        return [...prev, product.id];
      }
    });
  };

  const handleRemoveFromWishlist = (product: Product) => {
    setWishlistIds((prev) => prev.filter((id) => id !== product.id));
    showNotification(`${product.name} removido dos favoritos.`);
  };

  const handleClearWishlist = () => {
    setWishlistIds([]);
    showNotification('Todos os favoritos foram limpos.');
  };

  const isWishlisted = (id: string) => wishlistIds.includes(id);

  // Filtered Wishlist Products
  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  // Cart Metrics
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Spotlights
  const spotlightProduct = PRODUCTS.find((p) => p.isSpotlight) || PRODUCTS[0];
  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured);

  // Related products helper
  const getRelatedProducts = (current: Product | null) => {
    if (!current) return [];
    return PRODUCTS.filter(
      (p) => p.id !== current.id && (p.category === current.category || p.collection === current.collection)
    );
  };

  // Navigation handlers
  const handleNavigate = (view: string) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategoryFromHome = (category: ProductCategory | string) => {
    setSelectedCatalogCategory(category);
    setActiveView('produtos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-[#1C1D20] flex flex-col font-sans selection:bg-[#283628] selection:text-white">
      {/* Global Header */}
      <Header
        activeView={activeView}
        onNavigate={handleNavigate}
        cartCount={cartCount}
        cartTotal={cartTotal}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {activeView === 'inicio' && (
          <>
            {/* Hero Section */}
            <Hero
              featuredProducts={featuredProducts}
              onExplore={() => handleNavigate('produtos')}
              onViewNewArrivals={() => handleNavigate('produtos')}
              onOpenProduct={(product) => setSelectedProduct(product)}
            />

            {/* Section 1: Destaques da semana */}
            <WeeklyHighlights
              products={PRODUCTS}
              onOpenProduct={(product) => setSelectedProduct(product)}
              onAddToCart={(product) => handleAddToCart(product)}
              onToggleWishlist={handleToggleWishlist}
              isWishlisted={isWishlisted}
            />

            {/* Section 2: Coleções Modulares */}
            <CollectionsGrid onSelectCategory={handleSelectCategoryFromHome} />

            {/* Section 3: Produto em destaque */}
            <SpotlightProduct
              product={spotlightProduct}
              onAddToCart={(product, color) => handleAddToCart(product, 1, color)}
              onToggleWishlist={handleToggleWishlist}
              isWishlisted={isWishlisted(spotlightProduct.id)}
              onOpenProduct={(product) => setSelectedProduct(product)}
            />

            {/* Section 4: Novidades */}
            <NewArrivals
              products={PRODUCTS}
              onOpenProduct={(product) => setSelectedProduct(product)}
              onAddToCart={(product) => handleAddToCart(product)}
              onToggleWishlist={handleToggleWishlist}
              isWishlisted={isWishlisted}
              onViewAll={() => handleNavigate('produtos')}
            />

            {/* Section 5: Curadoria */}
            <CuratorshipSection />

            {/* Section 6: Experiência da marca */}
            <BrandExperience
              onStartCuratedSelection={() => handleNavigate('monte-sua-selecao')}
            />

            {/* Signature Feature Banner Invitation */}
            <section className="py-20 sm:py-24 bg-[#F4F4EE] border-b border-[#EAEAE4] text-center relative overflow-hidden">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#283628] uppercase tracking-widest mb-3 bg-white px-3.5 py-1.5 rounded-full border border-[#E2E2DC] shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#283628]" />
                  <span>Experiência Exclusiva</span>
                </div>
                <h2 className="font-display text-3xl sm:text-5xl font-normal text-[#1C1D20] tracking-tight">
                  Construa a identidade do seu espaço.
                </h2>
                <p className="mt-4 text-sm sm:text-base text-[#5E626B] max-w-xl mx-auto leading-relaxed">
                  Utilize o configurador exclusivo FORMA para combinar estética, iluminação, tecnologia e ergonomia em uma seleção personalizada única.
                </p>
                <div className="mt-8">
                  <button
                    onClick={() => handleNavigate('monte-sua-selecao')}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#283628] hover:bg-[#1E281E] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#283628]"
                  >
                    <span>Iniciar Experiência "Monte sua Seleção"</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {activeView === 'colecoes' && (
          <div className="min-h-screen">
            <CollectionsGrid onSelectCategory={handleSelectCategoryFromHome} />
            <CuratorshipSection />
          </div>
        )}

        {activeView === 'produtos' && (
          <CatalogView
            products={PRODUCTS}
            initialCategory={selectedCatalogCategory}
            onOpenProduct={(product) => setSelectedProduct(product)}
            onAddToCart={(product) => handleAddToCart(product)}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={isWishlisted}
          />
        )}

        {activeView === 'curadoria' && (
          <div>
            <CuratorshipSection />
            <BrandExperience
              onStartCuratedSelection={() => handleNavigate('monte-sua-selecao')}
            />
          </div>
        )}

        {activeView === 'monte-sua-selecao' && (
          <MonteSuaSelecao
            products={PRODUCTS}
            onAddToCart={(product) => handleAddToCart(product)}
            onAddAllToCart={handleAddMultipleToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={isWishlisted}
            onOpenProduct={(product) => setSelectedProduct(product)}
            onNotify={showNotification}
          />
        )}

        {activeView === 'sobre' && (
          <AboutView
            onExploreCatalog={() => handleNavigate('produtos')}
            onStartCuratedSelection={() => handleNavigate('monte-sua-selecao')}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSelectCategory={handleSelectCategoryFromHome}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={isWishlisted}
        relatedProducts={getRelatedProducts(selectedProduct)}
        onOpenProduct={(product) => setSelectedProduct(product)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onNavigateToCatalog={() => {
          setIsCartOpen(false);
          handleNavigate('produtos');
        }}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={(product) => {
          handleAddToCart(product);
          showNotification(`${product.name} adicionado à sacola.`);
        }}
        onOpenProduct={(product) => {
          setIsWishlistOpen(false);
          setSelectedProduct(product);
        }}
        onClearWishlist={handleClearWishlist}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onOpenProduct={(product) => setSelectedProduct(product)}
        onSelectCategory={(category) => {
          setSelectedCatalogCategory(category);
          handleNavigate('produtos');
        }}
      />

      {/* Discreet Feedback Notification Toast */}
      <NotificationToast
        message={toastMessage}
        onDismiss={() => setToastMessage(null)}
      />
    </div>
  );
}
