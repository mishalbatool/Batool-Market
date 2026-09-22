import React from 'react';
import { Category, Product } from '../types';
import { ArrowRight, Package } from 'lucide-react';

interface CategoriesViewProps {
  categories: Category[];
  products: Product[];
  onSelectCategory: (categoryName: string) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  categories,
  products,
  onSelectCategory,
}) => {
  return (
    <div className="py-10 sm:py-16 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full">
            Collections & Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-3">
            Shop by Category
          </h1>
          <p className="text-sm text-stone-600 mt-2">
            Explore our curated collections with Cash on Delivery and Free Shipping across Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => {
            const catProducts = products.filter(
              (p) => p.category.toLowerCase() === cat.name.toLowerCase()
            );

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)}
                className="group bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="relative h-64 w-full overflow-hidden bg-stone-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex items-end p-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                        {catProducts.length || cat.itemCount} Items Available
                      </span>
                      <h2 className="text-2xl font-serif font-bold text-white mt-1 group-hover:text-amber-200 transition-colors">
                        {cat.name}
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                      <Package className="w-4 h-4 text-emerald-700" />
                      Free Delivery & COD on all items
                    </span>

                    <span className="inline-flex items-center gap-1 text-sm font-bold text-stone-900 group-hover:text-emerald-800 group-hover:translate-x-1 transition-all">
                      Browse Products <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
