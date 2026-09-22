import React, { useState, useEffect } from 'react';
import { PageView, Product, StoreSettings, Category } from './types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_SETTINGS } from './data/initialProducts';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoriesSection } from './components/CategoriesSection';
import { ProductCard } from './components/ProductCard';
import { HowToOrder } from './components/HowToOrder';
import { WhyShopWithUs } from './components/WhyShopWithUs';
import { ShopView } from './components/ShopView';
import { CategoriesView } from './components/CategoriesView';
import { AboutUsView } from './components/AboutUsView';
import { ContactUsView } from './components/ContactUsView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SearchModal } from './components/SearchModal';
import { StoreOwnerModal } from './components/StoreOwnerModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { ArrowRight, Sparkles } from 'lucide-react';

const STORAGE_KEY_PRODUCTS = 'batool_market_products_v1';
const STORAGE_KEY_SETTINGS = 'batool_market_settings_v1';

export default function App() {
  // Navigation state
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('');

  // Products and settings state with local persistence
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_PRODUCTS;
  });

  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);

  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure the owner's WhatsApp number 03015954967 is active
        if (
          parsed.whatsappNumber === '923001234567' ||
          !parsed.whatsappNumber ||
          parsed.whatsappDisplayNumber === '0300 1234567'
        ) {
          parsed.whatsappNumber = '923015954967';
          parsed.whatsappDisplayNumber = '0301-5954967';
        }
        return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_SETTINGS;
  });

  // Modal states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOwnerSettingsOpen, setIsOwnerSettingsOpen] = useState(false);
  const [ownerModalTab, setOwnerModalTab] = useState<'add' | 'prices' | 'whatsapp' | 'logo'>('add');

  const handleOpenOwnerModal = (tab: 'add' | 'prices' | 'whatsapp' | 'logo' = 'add') => {
    setOwnerModalTab(tab);
    setIsOwnerSettingsOpen(true);
  };

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  // Scroll to top on page change
  const handleNavigate = (page: PageView, categoryFilter?: string) => {
    setCurrentPage(page);
    if (categoryFilter !== undefined) {
      setSelectedCategoryFilter(categoryFilter);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all products and settings to default Batool Market catalog?')) {
      setProducts(INITIAL_PRODUCTS);
      setSettings(INITIAL_SETTINGS);
      localStorage.removeItem(STORAGE_KEY_PRODUCTS);
      localStorage.removeItem(STORAGE_KEY_SETTINGS);
    }
  };

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf8] text-stone-900 selection:bg-emerald-200 selection:text-emerald-950 font-sans">
      {/* Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        settings={settings}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenOwnerSettings={() => handleOpenOwnerModal('add')}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <div>
            {/* Attractive Hero Banner with Batool Market Logo & Mandated Headlines */}
            <HeroBanner
              settings={settings}
              onShopNow={() => handleNavigate('shop')}
            />

            {/* Product Categories */}
            <CategoriesSection
              categories={categories}
              onSelectCategory={(catName) => handleNavigate('shop', catName)}
              onViewAllCategories={() => handleNavigate('categories')}
            />

            {/* Featured Products Section */}
            <section className="py-12 sm:py-16 bg-[#fafaf8]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full mb-2">
                      <Sparkles className="w-3.5 h-3.5" /> Handpicked For You
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                      Featured Products
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-600 mt-1">
                      Cash on Delivery & Free Delivery across Pakistan on every item.
                    </p>
                  </div>

                  <button
                    onClick={() => handleNavigate('shop')}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer group shrink-0"
                  >
                    <span>View All in Shop ({products.length})</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Product Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {featuredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      whatsappNumber={settings.whatsappNumber}
                      onSelectProduct={(p) => setSelectedProduct(p)}
                    />
                  ))}
                </div>

                {/* View Shop Button */}
                <div className="mt-10 text-center">
                  <button
                    onClick={() => handleNavigate('shop')}
                    className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-950 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-md transition-all active:scale-98 cursor-pointer"
                  >
                    <span>Explore Full Batool Market Collection</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* Simple 3-step "How to Order" section */}
            <HowToOrder />

            {/* Why Shop With Us */}
            <WhyShopWithUs />
          </div>
        )}

        {currentPage === 'shop' && (
          <ShopView
            products={products}
            categories={categories}
            selectedCategory={selectedCategoryFilter}
            onSelectCategory={(cat) => setSelectedCategoryFilter(cat)}
            whatsappNumber={settings.whatsappNumber}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onOpenOwnerSettings={() => handleOpenOwnerModal('add')}
          />
        )}

        {currentPage === 'categories' && (
          <CategoriesView
            categories={categories}
            products={products}
            onSelectCategory={(catName) => handleNavigate('shop', catName)}
          />
        )}

        {currentPage === 'about' && (
          <AboutUsView
            settings={settings}
            onShopNow={() => handleNavigate('shop')}
          />
        )}

        {currentPage === 'contact' && (
          <ContactUsView settings={settings} />
        )}
      </main>

      {/* Product Detail Modal / Page */}
      <ProductDetailModal
        product={selectedProduct}
        whatsappNumber={settings.whatsappNumber}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Store Owner Control Modal */}
      <StoreOwnerModal
        isOpen={isOwnerSettingsOpen}
        onClose={() => setIsOwnerSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={setSettings}
        products={products}
        onUpdateProducts={setProducts}
        categories={categories}
        onResetDefaults={handleResetDefaults}
        initialTab={ownerModalTab}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp whatsappNumber={settings.whatsappNumber} />

      {/* Footer with mandatory text */}
      <Footer
        onNavigate={handleNavigate}
        settings={settings}
        onOpenOwnerSettings={() => setIsOwnerSettingsOpen(true)}
      />
    </div>
  );
}
