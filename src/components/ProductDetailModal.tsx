import React, { useState } from 'react';
import { Product } from '../types';
import { formatPKR, generateWhatsAppOrderUrl } from '../utils/whatsapp';
import {
  X,
  Truck,
  ShieldCheck,
  MessageCircle,
  Plus,
  Minus,
  Check,
  Share2,
  ChevronRight,
  Package,
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  whatsappNumber: string;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  whatsappNumber,
  onClose,
}) => {
  if (!product) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes ? product.sizes[0] : ''
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors ? product.colors[0] : ''
  );

  // Optional quick address inputs for convenience
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(20, prev + delta)));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on Batool Market - Free Delivery all over Pakistan & Cash on Delivery!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const whatsappUrl = generateWhatsAppOrderUrl({
    product,
    quantity,
    selectedSize: selectedSize || undefined,
    selectedColor: selectedColor || undefined,
    customerName: customerName || undefined,
    customerPhone: customerPhone || undefined,
    customerCity: customerCity || undefined,
    customerAddress: customerAddress || undefined,
    whatsappNumber,
  });

  const totalPrice = product.price * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="product-detail-modal"
        className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-100 flex flex-col my-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="close-product-modal-btn"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 text-stone-600 hover:text-stone-950 hover:bg-stone-100 transition-colors shadow-sm cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 p-5 sm:p-8">
          {/* Left Column: Product Images */}
          <div className="flex flex-col gap-3">
            {/* Main Featured Image */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/80">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />

              {/* Guarantees floating badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                <span className="inline-flex items-center gap-1.5 bg-emerald-800 text-white text-xs font-bold px-3 py-1 rounded-lg shadow-sm">
                  <Truck className="w-3.5 h-3.5 text-amber-300" />
                  Free Delivery
                </span>
                <span className="inline-flex items-center gap-1 bg-stone-950/85 backdrop-blur-xs text-amber-300 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Cash on Delivery
                </span>
              </div>
            </div>

            {/* Gallery Thumbnails (if multiple) */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 cursor-pointer transition-all shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-emerald-700 ring-2 ring-emerald-700/20'
                        : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Key Delivery highlights for Pakistan customers */}
            <div className="mt-2 bg-emerald-50/70 border border-emerald-100/90 rounded-2xl p-4 space-y-2.5">
              <div className="flex items-center gap-3 text-xs text-emerald-950 font-medium">
                <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span><strong>Free Delivery:</strong> Delivered safely to all cities & towns across Pakistan.</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-emerald-950 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span><strong>100% Cash on Delivery:</strong> Pay only when the courier hands over the parcel.</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-emerald-950 font-medium">
                <Package className="w-4 h-4 text-emerald-700 shrink-0" />
                <span><strong>WhatsApp Direct:</strong> Instant order verification and tracking updates.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Details & WhatsApp Ordering */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Category Breadcrumb */}
              <div className="flex items-center gap-2 text-xs font-medium text-stone-500 mb-2">
                <span>Batool Market</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-emerald-800 font-bold uppercase tracking-wider">{product.category}</span>
              </div>

              {/* Product Name */}
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-950 leading-tight">
                {product.name}
              </h1>

              {/* Price Display */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-stone-950">
                  {formatPKR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    {formatPKR(product.originalPrice)}
                  </span>
                )}
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded">
                  Free Shipping
                </span>
              </div>

              {/* Description */}
              <div className="mt-4">
                <h4 className="text-xs font-bold uppercase text-stone-400 tracking-wider">
                  Product Description
                </h4>
                <p className="mt-1 text-sm text-stone-600 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {/* Size Selector (if available) */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                      Select Size: <strong className="text-stone-900">{selectedSize}</strong>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                          selectedSize === size
                            ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-emerald-600'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selector (if available) */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                      Select Color: <strong className="text-stone-900">{selectedColor}</strong>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                          selectedColor === color
                            ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-stone-900'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                  Quantity:
                </span>
                <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 text-stone-600 hover:text-stone-950 hover:bg-stone-100 disabled:opacity-30 cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-bold text-stone-900 min-w-[2.5rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 20}
                    className="p-2 text-stone-600 hover:text-stone-950 hover:bg-stone-100 disabled:opacity-30 cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="mt-4 pt-3 border-t border-stone-200/80 flex items-center justify-between">
                <span className="text-sm font-semibold text-stone-600">Total COD Amount:</span>
                <span className="text-xl font-bold text-emerald-900">
                  {formatPKR(totalPrice)}
                </span>
              </div>

              {/* Optional Quick Delivery Form Toggle */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddressForm(!showAddressForm)}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline decoration-dotted cursor-pointer flex items-center gap-1"
                >
                  {showAddressForm ? '− Hide COD address form' : '+ Add your delivery address before opening WhatsApp (Optional)'}
                </button>

                {showAddressForm && (
                  <div className="mt-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-2.5 animate-in fade-in duration-150">
                    <p className="text-[11px] text-stone-500">
                      Filling this now includes your address inside the WhatsApp message for immediate shipping:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Your Full Name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="bg-white border border-stone-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                      />
                      <input
                        type="text"
                        placeholder="Contact Number (e.g. 0300...)"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="bg-white border border-stone-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="City (e.g. Lahore, Karachi, Rawalpindi, etc.)"
                      value={customerCity}
                      onChange={(e) => setCustomerCity(e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    />
                    <input
                      type="text"
                      placeholder="Complete House / Street Delivery Address"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-stone-200 space-y-2">
              <a
                id="modal-order-whatsapp-btn"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-base py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all transform active:scale-98 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Order on WhatsApp (Cash on Delivery)</span>
              </a>

              <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Pre-filled order message ready
                </span>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 text-stone-600 hover:text-emerald-800 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Link Copied!' : 'Share Product'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
