import React from 'react';
import { PageView, StoreSettings } from '../types';
import { Logo } from './Logo';
import { generateGeneralWhatsAppUrl } from '../utils/whatsapp';
import { Truck, ShieldCheck, MessageCircle, Heart, Settings } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView, categoryFilter?: string) => void;
  settings: StoreSettings;
  onOpenOwnerSettings: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  settings,
  onOpenOwnerSettings,
}) => {
  const whatsappUrl = generateGeneralWhatsAppUrl(
    settings.whatsappNumber,
    'Assalam-o-Alaikum Batool Market! I would like to place an order.'
  );

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      {/* Top Value Banner */}
      <div className="border-b border-stone-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/80 text-amber-300 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Free Nationwide Shipping</h4>
              <p className="text-xs text-stone-400">Zero delivery fees on all orders anywhere in Pakistan.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/80 text-amber-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Cash on Delivery</h4>
              <p className="text-xs text-stone-400">Pay cash at your doorstep when you receive your package.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 fill-[#25D366]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Instant WhatsApp Orders</h4>
              <p className="text-xs text-stone-400">Fast customer service and seamless order placement.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <Logo
              customLogoUrl={settings.customLogoUrl}
              size="md"
              variant="light"
            />
            <p className="text-xs text-stone-400 leading-relaxed">
              Your trusted Pakistan store for quality stitched fashion, modern kitchenware, electronics, and daily essentials.
            </p>
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp: {settings.whatsappDisplayNumber}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
              Explore Pages
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shop Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('categories')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Product Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
              Featured Collections
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('shop', "Women's Clothing")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Women&apos;s Clothing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'Home & Kitchen')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home & Kitchen
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'Electronics & Gadgets')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Electronics & Gadgets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'Beauty & Personal Care')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Beauty & Personal Care
                </button>
              </li>
            </ul>
          </div>

          {/* Service Guarantee */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
              Pakistan Delivery Info
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed mb-3">
              We dispatch orders via reliable courier services to all major cities and small towns across Pakistan within 2 to 4 working days.
            </p>
            <div className="bg-stone-800/80 rounded-xl p-3 border border-stone-700/60 text-xs space-y-1">
              <span className="text-emerald-400 font-bold block">100% Cash on Delivery</span>
              <span className="text-stone-300 block">No Advance Payment Needed</span>
            </div>
            <div className="mt-3">
              <button
                onClick={onOpenOwnerSettings}
                className="text-[11px] text-stone-500 hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Store Owner Controls (Selling Prices & Logo)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Required Mandatory Footer Bar */}
        <div className="mt-12 pt-8 border-t border-stone-800 text-center">
          <p className="text-sm font-serif font-bold text-amber-300 tracking-wide">
            Batool Market | Cash on Delivery | Free Delivery Across Pakistan
          </p>
          <p className="text-xs text-stone-500 mt-2 flex items-center justify-center gap-1">
            <span>© {new Date().getFullYear()} Batool Market. All rights reserved. Order directly on WhatsApp.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
