import React, { useState } from 'react';
import { PageView, StoreSettings } from '../types';
import { Logo } from './Logo';
import { generateGeneralWhatsAppUrl } from '../utils/whatsapp';
import {
  Menu,
  X,
  Search,
  Truck,
  ShieldCheck,
  Phone,
  Settings,
  PackagePlus,
  PlusCircle,
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView, categoryFilter?: string) => void;
  settings: StoreSettings;
  onOpenSearch: () => void;
  onOpenOwnerSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  settings,
  onOpenSearch,
  onOpenOwnerSettings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageView }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Shop', page: 'shop' },
    { label: 'Categories', page: 'categories' },
    { label: 'About Us', page: 'about' },
    { label: 'Contact Us', page: 'contact' },
  ];

  const handleLinkClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const whatsappChatUrl = generateGeneralWhatsAppUrl(
    settings.whatsappNumber,
    'Assalam-o-Alaikum Batool Market! I would like to ask about products and placing a Cash on Delivery order.'
  );

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-stone-200/80">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center font-medium tracking-wide">
            <span className="inline-flex items-center gap-1 text-amber-300 font-semibold">
              <Truck className="w-3.5 h-3.5" /> FREE Delivery Across Pakistan
            </span>
            <span className="hidden sm:inline text-emerald-300">|</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-emerald-100">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Cash on Delivery (COD)
            </span>
          </div>

          <div className="flex items-center gap-3 justify-center text-[11px] text-emerald-100">
            <a
              href={whatsappChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-amber-300 transition-colors font-semibold"
              title="Chat with us on WhatsApp"
            >
              <Phone className="w-3 h-3 fill-white" />
              <span>Customer WhatsApp Support</span>
            </a>
            <button
              onClick={onOpenOwnerSettings}
              className="flex items-center gap-1 text-amber-300 hover:text-white transition-colors cursor-pointer text-[10px] bg-emerald-950/70 hover:bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-600/50"
              title="Store Owner Settings (Edit Prices, Photos & WhatsApp)"
            >
              <Settings className="w-3 h-3" />
              <span>Owner Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            id="nav-logo-btn"
            onClick={() => handleLinkClick('home')}
            className="text-left cursor-pointer transition-opacity hover:opacity-90"
          >
            <Logo customLogoUrl={settings.customLogoUrl} size="md" variant="header" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  id={`nav-link-${link.page}`}
                  onClick={() => handleLinkClick(link.page)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'text-emerald-900 bg-emerald-50 border-b-2 border-emerald-700'
                      : 'text-stone-700 hover:text-emerald-800 hover:bg-stone-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Button */}
            <button
              id="nav-search-btn"
              onClick={onOpenSearch}
              className="p-2.5 rounded-full text-stone-600 hover:text-emerald-800 hover:bg-stone-100 transition-colors cursor-pointer"
              title="Search products"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Quick Add Products Button */}
            <button
              id="nav-add-product-btn"
              onClick={onOpenOwnerSettings}
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-bold bg-amber-50 hover:bg-amber-100/80 text-amber-900 border border-amber-300 px-3 py-2 rounded-xl transition-all cursor-pointer"
              title="Add your own products, photos and set prices"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-700" />
              <span>Add Products &amp; Prices</span>
            </button>

            {/* Direct WhatsApp Call-to-Action Button */}
            <a
              id="nav-whatsapp-btn"
              href={whatsappChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all hover:shadow-md cursor-pointer text-sm whitespace-nowrap active:scale-95"
            >
              <Phone className="w-4 h-4 fill-white" />
              <span>Order on WhatsApp</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              id="nav-mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-700 hover:text-emerald-800 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  id={`mobile-nav-${link.page}`}
                  onClick={() => handleLinkClick(link.page)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-900 font-bold border-l-4 border-emerald-700'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-emerald-600" />}
                </button>
              );
            })}
          </div>

          <div className="pt-4 mt-3 border-t border-stone-200 space-y-2">
            <button
              onClick={() => {
                onOpenOwnerSettings();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-stone-900 hover:bg-black text-white font-bold py-2.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <PackagePlus className="w-4 h-4 text-amber-300" />
              <span>➕ Add Products, Pics &amp; Prices</span>
            </button>

            <a
              href={whatsappChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-2.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Phone className="w-4 h-4 fill-white" />
              <span>Chat / Order on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
