import React from 'react';
import { Truck, ShieldCheck, HeartHandshake, PackageCheck, Sparkles } from 'lucide-react';
import { StoreSettings } from '../types';
import { Logo } from './Logo';

interface AboutUsViewProps {
  settings: StoreSettings;
  onShopNow: () => void;
}

export const AboutUsView: React.FC<AboutUsViewProps> = ({ settings, onShopNow }) => {
  return (
    <div className="py-12 sm:py-20 bg-stone-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Logo customLogoUrl={settings.customLogoUrl} size="lg" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-3.5 py-1 rounded-full">
            Our Story & Values
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-3">
            Welcome to Batool Market
          </h1>
          <p className="text-base text-stone-600 mt-2 max-w-xl mx-auto">
            Your trusted online destination for quality lifestyle essentials with Cash on Delivery and Free Shipping across Pakistan.
          </p>
        </div>

        {/* Story Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-xs space-y-6 text-stone-700 leading-relaxed text-sm sm:text-base">
          <div>
            <h2 className="text-xl font-serif font-bold text-stone-950 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Who We Are
            </h2>
            <p>
              <strong>Batool Market</strong> was created to make online shopping effortless, transparent, and completely risk-free for households and families across Pakistan.
            </p>
            <p className="mt-3">
              We carefully source high-demand lifestyle products — including elegant women&apos;s stitched clothing, time-saving kitchen appliances, smart electronic gadgets, and beauty organizers. Every single product in our catalog is hand-selected and priced fairly, giving you premium quality without inflated retail markups.
            </p>
          </div>

          <div className="pt-6 border-t border-stone-100">
            <h2 className="text-xl font-serif font-bold text-stone-950 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              Why We Specialize in Cash on Delivery & WhatsApp
            </h2>
            <p>
              We believe trust is the cornerstone of great commerce. That is why:
            </p>
            <ul className="mt-3 space-y-3 pl-2">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-700 mt-2 shrink-0" />
                <span>
                  <strong>100% Cash on Delivery (COD):</strong> No online card payments or advance bank transfers required. You pay cash only when the courier delivers your parcel directly to your door.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-700 mt-2 shrink-0" />
                <span>
                  <strong>Free Delivery All Over Pakistan:</strong> We cover all courier charges so the price you see is the exact final price you pay. No hidden delivery fees.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-700 mt-2 shrink-0" />
                <span>
                  <strong>Personalized WhatsApp Support:</strong> Direct, human communication. We send tracking updates, answer size questions, and verify your address personally on WhatsApp before dispatch.
                </span>
              </li>
            </ul>
          </div>

          {/* Core Values Grid */}
          <div className="pt-6 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/70 text-center">
              <Truck className="w-8 h-8 text-emerald-800 mx-auto mb-2" />
              <h3 className="font-bold text-stone-900 text-sm">Nationwide Reach</h3>
              <p className="text-xs text-stone-500 mt-1">Delivering to every city, town, and district across Pakistan.</p>
            </div>
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/70 text-center">
              <PackageCheck className="w-8 h-8 text-emerald-800 mx-auto mb-2" />
              <h3 className="font-bold text-stone-900 text-sm">Hand-Checked Parcels</h3>
              <p className="text-xs text-stone-500 mt-1">Items inspected before packing for your peace of mind.</p>
            </div>
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/70 text-center">
              <HeartHandshake className="w-8 h-8 text-emerald-800 mx-auto mb-2" />
              <h3 className="font-bold text-stone-900 text-sm">Friendly Service</h3>
              <p className="text-xs text-stone-500 mt-1">Always available on WhatsApp for any assistance.</p>
            </div>
          </div>

          <div className="pt-6 border-t border-stone-100 text-center">
            <button
              onClick={onShopNow}
              className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-8 py-3.5 rounded-xl shadow-md cursor-pointer transition-all active:scale-98"
            >
              Explore Our Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
