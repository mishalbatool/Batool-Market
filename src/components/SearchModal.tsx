import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import { formatPKR } from '../utils/whatsapp';
import { Search, X, Truck, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-800 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, clothing, electronics, kitchen items..."
            className="w-full text-base sm:text-lg focus:outline-none placeholder:text-stone-400 font-medium"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-3">
          {query.trim() === '' ? (
            <div className="text-center py-8 text-stone-500 text-sm">
              <p className="font-semibold text-stone-700">Type a keyword to search</p>
              <p className="text-xs text-stone-400 mt-1">
                e.g. &quot;suit&quot;, &quot;chopper&quot;, &quot;earbuds&quot;, &quot;pan&quot;, &quot;steamer&quot;
              </p>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 px-1 block">
                Found {results.length} products
              </span>
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex items-center gap-3.5 p-2.5 sm:p-3 rounded-2xl hover:bg-stone-50 border border-transparent hover:border-stone-200 transition-all cursor-pointer group"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 bg-stone-100"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                      {product.category}
                    </span>
                    <h4 className="text-sm font-semibold text-stone-900 truncate group-hover:text-emerald-900">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-bold text-stone-950">
                        {formatPKR(product.price)}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded flex items-center gap-1">
                        <Truck className="w-3 h-3 text-emerald-700" />
                        Free Delivery
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-stone-500 text-sm">
              <p className="font-semibold text-stone-800">No matching products found</p>
              <p className="text-xs text-stone-400 mt-1">
                Try searching for something else or view all items in the Shop.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
