import React from 'react';
import { StoreSettings } from '../types';
import { generateGeneralWhatsAppUrl } from '../utils/whatsapp';
import { MessageCircle, Mail, MapPin, Clock, Phone, HelpCircle } from 'lucide-react';

interface ContactUsViewProps {
  settings: StoreSettings;
}

export const ContactUsView: React.FC<ContactUsViewProps> = ({ settings }) => {
  const whatsappUrl = generateGeneralWhatsAppUrl(
    settings.whatsappNumber,
    'Assalam-o-Alaikum Batool Market! I have an inquiry about placing an order or tracking my delivery.'
  );

  const faqs = [
    {
      q: 'How does Cash on Delivery (COD) work?',
      a: 'When you place an order via WhatsApp, we dispatch your package with free delivery. You do not pay anything in advance. When the courier rider brings the parcel to your doorstep, you simply pay the exact bill in cash.',
    },
    {
      q: 'Is delivery really 100% free across Pakistan?',
      a: 'Yes, absolutely! Batool Market offers FREE delivery across all cities, towns, and villages in Pakistan. There are no surprise shipping or packing fees.',
    },
    {
      q: 'How long does delivery take?',
      a: 'Orders are typically delivered within 2 to 4 working days depending on your city. Major cities like Lahore, Karachi, and Rawalpindi/Islamabad usually arrive in 2-3 business days.',
    },
    {
      q: 'Can I order more than one item on WhatsApp?',
      a: 'Yes! Simply tell us on WhatsApp which items you would like or send screenshots/names. We will combine them into one parcel with Free Delivery.',
    },
    {
      q: 'What if I need help with sizing or colors?',
      a: 'Our customer support is always ready to assist on WhatsApp. Just send us a message and we can share additional pictures, measurements, or color advice.',
    },
  ];

  return (
    <div className="py-12 sm:py-20 bg-stone-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-3.5 py-1 rounded-full">
            We Are Here to Help
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-3">
            Contact Batool Market
          </h1>
          <p className="text-base text-stone-600 mt-2 max-w-lg mx-auto">
            Have questions about an item, delivery timing, or want to place an order directly? Reach out on WhatsApp!
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Main WhatsApp Card */}
          <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-md">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center mb-4 shadow-sm">
                <MessageCircle className="w-6 h-6 fill-white" />
              </div>
              <h2 className="text-xl font-serif font-bold text-white mb-2">
                Order & Chat on WhatsApp
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mb-4">
                The fastest way to get in touch, verify orders, or ask any question. Our team replies promptly.
              </p>
              <div className="text-lg font-mono font-bold text-amber-300">
                {settings.whatsappDisplayNumber}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-700/50">
              <a
                id="contact-page-whatsapp-btn"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md transition-all active:scale-98 cursor-pointer text-sm"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Open WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Store Info Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs flex flex-col justify-between">
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
                Store Information
              </h2>

              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-emerald-700 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
                    Coverage Area
                  </span>
                  <span className="text-sm font-bold text-stone-900">
                    Free Delivery Across Pakistan
                  </span>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Delivered via reputable domestic courier networks directly to your home.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-emerald-700 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
                    Delivery Timeline
                  </span>
                  <span className="text-sm font-bold text-stone-900">
                    2 to 4 Working Days
                  </span>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Cash on Delivery at arrival.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-emerald-700 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
                    Email Support
                  </span>
                  <span className="text-sm font-bold text-stone-900">
                    {settings.email}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-emerald-700 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
                    Payment Method
                  </span>
                  <span className="text-sm font-bold text-stone-900">
                    100% Cash on Delivery (COD Only)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-xs">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-emerald-700" />
            <h2 className="text-xl font-serif font-bold text-stone-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4 divide-y divide-stone-100">
            {faqs.map((faq, index) => (
              <div key={index} className={index > 0 ? 'pt-4' : ''}>
                <h3 className="text-sm sm:text-base font-bold text-stone-900">
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
