import React from 'react';
import { Compass, ArrowLeft, ShoppingBag } from 'lucide-react';

interface NotFoundPageProps {
  navigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ navigate }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-16 h-16 mx-auto rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-amber-400">
        <Compass className="w-8 h-8" />
      </div>
      <div className="space-y-2">
        <div className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
          Error 404
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm text-stone-400 max-w-md mx-auto leading-relaxed">
          The requested page could not be located. It may have been moved or the URL might be mistyped.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>

        <button
          onClick={() => navigate('/shop')}
          className="px-6 py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white font-semibold text-xs flex items-center gap-2 transition-colors"
        >
          <ShoppingBag className="w-4 h-4 text-emerald-400" />
          <span>Browse Products</span>
        </button>
      </div>
    </div>
  );
};
