import React from 'react';

interface LogoProps {
  customLogoUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark' | 'header';
  className?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  customLogoUrl,
  size = 'md',
  variant = 'header',
  className = '',
  showTagline = true,
}) => {
  if (customLogoUrl) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <img
          src={customLogoUrl}
          alt="Batool Market Logo"
          className={`object-contain rounded-md ${
            size === 'sm' ? 'h-8' : size === 'lg' ? 'h-14' : 'h-10'
          }`}
        />
        <div>
          <span
            className={`font-serif font-bold tracking-tight block ${
              variant === 'light' ? 'text-white' : 'text-stone-900'
            } ${size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl'}`}
          >
            Batool Market
          </span>
          {showTagline && (
            <span
              className={`text-[10px] tracking-wider uppercase block font-semibold ${
                variant === 'light' ? 'text-emerald-200' : 'text-emerald-700'
              }`}
            >
              COD • Free Delivery Pakistan
            </span>
          )}
        </div>
      </div>
    );
  }

  // Elegant built-in regal emblem with emerald green & warm gold
  const emblemSizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Regal Emblem */}
      <div
        className={`relative ${emblemSizes[size]} rounded-xl flex items-center justify-center font-serif font-black shadow-sm ring-1 ring-amber-400/40 bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 text-amber-300 transition-transform duration-300 hover:scale-105`}
      >
        <span className="relative z-10 tracking-tighter drop-shadow-sm">BM</span>
        {/* Subtle decorative gold corner sparkle */}
        <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse opacity-80" />
      </div>

      <div>
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-serif font-bold tracking-tight ${
              variant === 'light' ? 'text-white' : 'text-stone-900'
            } ${textSizes[size]}`}
          >
            Batool Market
          </span>
        </div>
        {showTagline && (
          <span
            className={`text-[9.5px] tracking-wider uppercase block font-bold mt-0.5 ${
              variant === 'light' ? 'text-emerald-200' : 'text-emerald-700'
            }`}
          >
            COD • Free Delivery Pakistan
          </span>
        )}
      </div>
    </div>
  );
};
