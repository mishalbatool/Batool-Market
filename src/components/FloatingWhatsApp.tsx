import React, { useState } from 'react';
import { generateGeneralWhatsAppUrl } from '../utils/whatsapp';
import { MessageCircle, X } from 'lucide-react';

interface FloatingWhatsAppProps {
  whatsappNumber: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ whatsappNumber }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = generateGeneralWhatsAppUrl(
    whatsappNumber,
    'Assalam-o-Alaikum Batool Market! I would like to place an order or inquire about a product.'
  );

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Tooltip Popup */}
      {showTooltip && (
        <div className="mb-2 bg-stone-900 text-white text-xs px-3.5 py-2 rounded-xl shadow-lg border border-stone-700/80 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-xs">
          <span>
            Need help? <strong>Order on WhatsApp</strong> with Free Delivery!
          </span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-stone-400 hover:text-white p-0.5"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        id="floating-whatsapp-btn"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer ring-4 ring-[#25D366]/30"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-8 h-8 fill-white" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 border-2 border-white rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 border-2 border-white rounded-full" />
      </a>
    </div>
  );
};
