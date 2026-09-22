import React from 'react';
import { Truck, ShieldCheck, HeartHandshake, BadgePercent, Clock } from 'lucide-react';

export const WhyShopWithUs: React.FC = () => {
  const reasons = [
    {
      title: 'Free Delivery Across Pakistan',
      description:
        'Zero shipping charges on every order. Whether you are in Karachi, Lahore, Islamabad, Peshawar, Quetta, or remote towns, delivery is always on us.',
      icon: Truck,
    },
    {
      title: '100% Cash on Delivery (COD)',
      description:
        'Shop with complete peace of mind. You never have to pay in advance. Hand over cash to the rider only when your package arrives safely.',
      icon: ShieldCheck,
    },
    {
      title: 'Honest & Fair Selling Prices',
      description:
        'We carefully curate trending items, clothing, and kitchen appliances, pricing them transparently so you get true value for your hard-earned money.',
      icon: BadgePercent,
    },
    {
      title: 'Direct WhatsApp Customer Care',
      description:
        'Communicate directly with our team on WhatsApp for size advice, order tracking, real photos, or product questions. Fast, polite, and personalized.',
      icon: HeartHandshake,
    },
    {
      title: 'Prompt Nationwide Dispatch',
      description:
        'Orders confirmed on WhatsApp are dispatched promptly with trusted domestic courier services within 2 to 4 working days.',
      icon: Clock,
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-3 py-1 rounded-full">
            Our Commitment
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-3">
            Why Shop With Batool Market
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Built on trust, reliability, and dedicated customer satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.slice(0, 3).map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-stone-50 rounded-2xl p-6 border border-stone-200/80 hover:border-emerald-600 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-900 text-amber-300 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto">
          {reasons.slice(3).map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-stone-50 rounded-2xl p-6 border border-stone-200/80 hover:border-emerald-600 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-900 text-amber-300 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
