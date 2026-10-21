import React, { useState } from 'react';
import { Sprout, Sparkles } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  category?: 'Cattle Feed' | 'Artisanal Dairy';
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  category = 'Cattle Feed'
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-6 bg-gradient-to-br ${
          category === 'Artisanal Dairy' ? 'from-amber-950/80 to-stone-900' : 'from-emerald-950/80 to-stone-900'
        } border border-stone-800 ${className}`}
        aria-label={alt}
      >
        {category === 'Artisanal Dairy' ? (
          <Sparkles className="w-12 h-12 text-amber-400/80 mb-2" />
        ) : (
          <Sprout className="w-12 h-12 text-emerald-400/80 mb-2" />
        )}
        <span className="text-xs text-stone-400 text-center font-medium line-clamp-2 px-2">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-stone-900 ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-stone-900/60 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
