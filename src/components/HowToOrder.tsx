import React from 'react';
import { MousePointerClick, MessageCircle, PackageCheck } from 'lucide-react';

export const HowToOrder: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Choose Your Product',
      description:
        'Browse our collection of clothing, kitchen essentials, and gadgets. Pick your size or color preferences.',
      icon: MousePointerClick,
    },
    {
      step: '02',
      title: 'Order on WhatsApp',
      description:
        'Tap the WhatsApp button. A pre-filled message with product details and price will open. Send your delivery city and address.',
      icon: MessageCircle,
    },
    {
      step: '03',
      title: 'Pay Cash on Delivery',
      description:
        'We dispatch your order with FREE shipping anywhere in Pakistan. Inspect your parcel and pay cash at your doorstep.',
      icon: PackageCheck,
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-stone-50 border-y border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full">
            Simple 3-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-3">
            How to Order from Batool Market
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            No complicated checkouts, no bank card required. Safe, fast, and 100% Cash on Delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-xs relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-serif font-black text-stone-200">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                  <span>Free Delivery Guaranteed</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
