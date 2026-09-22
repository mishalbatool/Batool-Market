import React from 'react';
import { Product } from '../types';
import { formatPKR, generateWhatsAppOrderUrl } from '../utils/whatsapp';
import { Truck, MessageCircle, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  whatsappNumber: string;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  whatsappNumber,
  onSelectProduct,
}) => {
  const quickWhatsAppUrl = generateWhatsAppOrderUrl({
    product,
    quantity: 1,
    selectedSize: product.sizes?.[0],
    selectedColor: product.colors?.[0],
    whatsappNumber,
  });

  const handleCardClick = (e: React.MouseEvent) => {
    // If the click was not directly on the WhatsApp link/button, open product details
    const target = e.target as HTMLElement;
    if (!target.closest('a')) {
      onSelectProduct(product);
    }
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={handleCardClick}
      className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer relative"
    >
      {/* Product Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Free Delivery Badge */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          <span className="inline-flex items-center gap-1 bg-emerald-800 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
            <Truck className="w-3 h-3 text-amber-300" />
            Free Delivery
          </span>
          <span className="inline-flex items-center bg-stone-900/85 backdrop-blur-xs text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
            Cash on Delivery
          </span>
        </div>

        {/* Quick View Hover Indicator */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 text-stone-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="w-3.5 h-3.5 text-emerald-700" /> View Details
          </span>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category */}
          <span className="text-[11px] font-semibold text-emerald-700 tracking-wider uppercase">
            {product.category}
          </span>

          {/* Product Name */}
          <h3 className="font-semibold text-stone-900 text-sm sm:text-base leading-snug line-clamp-2 mt-1 group-hover:text-emerald-900 transition-colors">
            {product.name}
          </h3>

          {/* Variants preview if available */}
          {(product.colors || product.sizes) && (
            <div className="mt-2 text-[11px] text-stone-500 flex flex-wrap gap-1 items-center">
              {product.sizes && (
                <span>
                  Sizes: <strong className="text-stone-700">{product.sizes.slice(0, 2).join(', ')}</strong>
                  {product.sizes.length > 2 ? ' +' : ''}
                </span>
              )}
              {product.sizes && product.colors && <span>•</span>}
              {product.colors && (
                <span>
                  Colors: <strong className="text-stone-700">{product.colors.length} choices</strong>
                </span>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-stone-100">
          {/* Selling Price */}
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-xs text-stone-500 font-medium block">Price (COD)</span>
              <span className="text-lg sm:text-xl font-bold text-stone-950">
                {formatPKR(product.price)}
              </span>
            </div>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through">
                {formatPKR(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Order on WhatsApp button */}
          <a
            id={`order-whatsapp-btn-${product.id}`}
            href={quickWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm py-2.5 px-3 rounded-xl transition-all duration-200 active:scale-98 shadow-xs hover:shadow-md cursor-pointer"
            title={`Order ${product.name} directly on WhatsApp`}
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Order on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
