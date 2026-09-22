import React, { useState, useMemo } from 'react';
import { Product, Category } from '../types';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, ArrowUpDown, X, PlusCircle } from 'lucide-react';

interface ShopViewProps {
  products: Product[];
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  whatsappNumber: string;
  onSelectProduct: (product: Product) => void;
  initialSearchQuery?: string;
  onOpenOwnerSettings?: () => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  categories,
  selectedCategory,
  onSelectCategory,
  whatsappNumber,
  onSelectProduct,
  initialSearchQuery = '',
  onOpenOwnerSettings,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else {
      // featured
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const allCategoryNames = ['All', ...categories.map((c) => c.name)];

  return (
    <div className="py-8 sm:py-12 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Shop All Products
            </h1>
            <p className="text-sm text-stone-600 mt-1">
              Free Delivery Across Pakistan • 100% Cash on Delivery • Order on WhatsApp
            </p>
          </div>

          {onOpenOwnerSettings && (
            <button
              onClick={onOpenOwnerSettings}
              className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer shrink-0 active:scale-98"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>➕ Add Your Products &amp; Prices</span>
            </button>
          )}
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, clothing, electronics, kitchen..."
                className="w-full pl-9 pr-8 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-semibold text-stone-500 flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-stone-50 border border-stone-200 text-stone-800 text-xs sm:text-sm font-medium rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
              <SlidersHorizontal className="w-3 h-3" /> Categories:
            </span>
            {allCategoryNames.map((cat) => {
              const isSelected =
                (!selectedCategory && cat === 'All') ||
                selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat === 'All' ? '' : cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter & Active Filters */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-6">
          <span>
            Showing <strong className="text-stone-900">{filteredProducts.length}</strong> products
          </span>

          {(selectedCategory || searchQuery) && (
            <button
              onClick={() => {
                onSelectCategory('');
                setSearchQuery('');
              }}
              className="text-emerald-800 font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Reset all filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                whatsappNumber={whatsappNumber}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 max-w-md mx-auto my-8">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-1">
              No products found
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              We couldn&apos;t find any item matching your search or filter. Try clearing filters or search term.
            </p>
            <button
              onClick={() => {
                onSelectCategory('');
                setSearchQuery('');
              }}
              className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
