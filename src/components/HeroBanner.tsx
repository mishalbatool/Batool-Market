import React from 'react';
import { StoreSettings } from '../types';
import { Logo } from './Logo';
import { generateGeneralWhatsAppUrl } from '../utils/whatsapp';
import { Truck, ShieldCheck, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  settings: StoreSettings;
  onShopNow: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ settings, onShopNow }) => {
  const whatsappUrl = generateGeneralWhatsAppUrl(
    settings.whatsappNumber,
    'Assalam-o-Alaikum Batool Market! I saw your store and would like to order with Cash on Delivery.'
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-900 via-emerald-950 to-stone-900 text-white py-12 sm:py-20 lg:py-24">
      {/* Decorative background radial glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Top Logo and Badge */}
          <div className="mb-6 flex flex-col items-center gap-3">
            <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 shadow-xl">
              <Logo
                customLogoUrl={settings.customLogoUrl}
                size="lg"
                variant="light"
                showTagline={false}
              />
            </div>

            <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/30 text-amber-300 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Premium Quality at Affordable Selling Prices</span>
            </div>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-white leading-tight">
            {settings.heroHeading}
          </h1>

          {/* Core Subtitle Mandate */}
          <p className="mt-4 text-base sm:text-xl lg:text-2xl font-medium text-emerald-100/90 tracking-wide max-w-2xl">
            {settings.heroSubheading}
          </p>

          <p className="mt-2 text-xs sm:text-sm text-stone-300 max-w-xl">
            Discover handpicked women&apos;s fashion, smart home & kitchen appliances, trending gadgets, and beauty essentials. Pay cash at your doorstep.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              id="hero-shop-now-btn"
              onClick={onShopNow}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-extrabold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-base active:scale-98 cursor-pointer"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-5 h-5 text-stone-950" />
            </button>

            <a
              id="hero-whatsapp-btn"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-7 py-4 rounded-xl shadow-lg transition-all duration-200 text-base active:scale-98 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Order on WhatsApp</span>
            </a>
          </div>

          {/* Trust Guarantees Row */}
          <div className="mt-12 pt-8 border-t border-white/10 w-full grid grid-cols-2 md:grid-cols-4 gap-4 text-stone-200 text-xs sm:text-sm">
            <div className="flex items-center justify-center gap-2.5">
              <Truck className="w-5 h-5 text-amber-400 shrink-0" />
              <span className="text-left font-semibold">Free Delivery Across Pakistan</span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
              <span className="text-left font-semibold">100% Cash on Delivery</span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <MessageCircle className="w-5 h-5 text-amber-400 shrink-0" />
              <span className="text-left font-semibold">Instant WhatsApp Confirmation</span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
              <span className="text-left font-semibold">Carefully Sourced Products</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
