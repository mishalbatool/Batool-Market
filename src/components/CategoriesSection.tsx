import React from 'react';
import { Category } from '../types';
import { ArrowRight } from 'lucide-react';

interface CategoriesSectionProps {
  categories: Category[];
  onSelectCategory: (categoryName: string) => void;
  onViewAllCategories: () => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  onSelectCategory,
  onViewAllCategories,
}) => {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Browse Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
              Popular Product Categories
            </h2>
          </div>
          <button
            onClick={onViewAllCategories}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => onSelectCategory(category.name)}
              className="group relative rounded-2xl overflow-hidden aspect-4/5 bg-stone-100 cursor-pointer shadow-xs hover:shadow-md transition-all duration-300"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4 sm:p-5 text-white">
                <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider">
                  {category.itemCount} Items
                </span>
                <h3 className="font-serif font-bold text-base sm:text-lg leading-tight mt-0.5 group-hover:text-amber-200 transition-colors">
                  {category.name}
                </h3>
                <span className="text-[11px] text-stone-300 line-clamp-1 mt-1 hidden sm:block">
                  {category.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
