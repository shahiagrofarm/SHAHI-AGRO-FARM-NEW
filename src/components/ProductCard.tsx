import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Check, Zap } from 'lucide-react';
import { Product } from '../data/products.ts';
import { formatBDT, validateQuantity } from '../utils/cart-rules.ts';
import { useCart } from '../context/CartContext.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { ImageWithFallback } from './ImageWithFallback.tsx';

interface ProductCardProps {
  product: Product;
  navigate: (path: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, navigate }) => {
  const { addToCart, buyNow, lastAddedProduct } = useCart();
  const { t, isBn, lang } = useLanguage();
  const [cardQty, setCardQty] = useState<number>(product.defaultQty);
  const isJustAdded = lastAddedProduct === product.id;

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleStepChange = (e: React.MouseEvent, delta: number) => {
    e.stopPropagation();
    const next = cardQty + (delta * product.stepQty);
    if (next >= product.minQty && next <= product.maxQty) {
      setCardQty(next);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product.id, cardQty);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    buyNow(product.id, cardQty);
    navigate('/checkout');
  };

  const calculatedSubtotal = cardQty * product.price;

  return (
    <div
      onClick={handleCardClick}
      className="card-3d group relative flex flex-col glass-panel rounded-2xl overflow-hidden hover:border-[#D8B56D]/60 transition-all duration-300 cursor-pointer shadow-xl shadow-black/40"
    >
      {/* Top Media Showcase */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#090D0B]">
        <ImageWithFallback
          src={product.image}
          alt={isBn ? product.nameBn : product.name}
          category={product.category}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Quiet badge */}
        <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#090D0B]/85 backdrop-blur-md border border-[#D8B56D]/30 text-[11px] font-semibold text-[#D8B56D] tracking-wide">
          {isBn ? product.badgeBn : product.badge}
        </div>

        {/* Package weight tag */}
        <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-md bg-[#063D2E]/90 backdrop-blur-md border border-[#A9B9A8]/30 text-[11px] font-medium text-[#F6F4EC]">
          {isBn ? product.packageWeightBn : product.packageWeight}
        </div>
      </div>

      {/* Card Content Container */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between space-y-4">
        <div className="space-y-2">
          {/* Category */}
          <div className="text-[11px] uppercase tracking-wider font-semibold text-[#A9B9A8]">
            {isBn ? product.categoryBn : product.category}
          </div>

          {/* Product Name */}
          <h3 className="text-lg sm:text-xl font-serif font-bold text-[#F6F4EC] group-hover:text-[#D8B56D] transition-colors leading-snug">
            {isBn ? product.nameBn : product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-[#A9B9A8] line-clamp-2 leading-relaxed">
            {isBn ? product.shortDescriptionBn : product.shortDescription}
          </p>
        </div>

        {/* Price & Quantity Selector */}
        <div className="pt-3 border-t border-[#D8B56D]/15 space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[11px] text-[#A9B9A8] block">{t('unitPrice')}</span>
              <span className="text-lg font-bold text-[#D8B56D] tabular-nums">
                {formatBDT(product.price, lang)}
              </span>
              <span className="text-[11px] text-[#A9B9A8] ml-1">
                / {isBn ? product.unitBn : product.unit}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-[#A9B9A8] block">{isBn ? 'সাবটোটাল' : 'Subtotal'}</span>
              <span className="text-base font-bold text-[#F6F4EC] tabular-nums">
                {formatBDT(calculatedSubtotal, lang)}
              </span>
            </div>
          </div>

          {/* Mini quantity stepper */}
          <div className="flex items-center justify-between gap-2 p-1.5 rounded-lg bg-[#090D0B]/80 border border-[#D8B56D]/20">
            <span className="text-xs text-[#A9B9A8] pl-2 font-medium">
              {t('quantity')}:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => handleStepChange(e, -1)}
                disabled={cardQty <= product.minQty}
                className="w-7 h-7 rounded bg-[#0B241D] hover:bg-[#063D2E] disabled:opacity-40 disabled:cursor-not-allowed text-[#F6F4EC] text-xs font-bold transition-colors"
                aria-label={`Decrease by ${product.stepQty}`}
              >
                -{product.stepQty}
              </button>

              <span className="text-xs font-bold text-[#D8B56D] min-w-[32px] text-center tabular-nums">
                {cardQty}
              </span>

              <button
                type="button"
                onClick={(e) => handleStepChange(e, 1)}
                disabled={cardQty >= product.maxQty}
                className="w-7 h-7 rounded bg-[#0B241D] hover:bg-[#063D2E] disabled:opacity-40 disabled:cursor-not-allowed text-[#F6F4EC] text-xs font-bold transition-colors"
                aria-label={`Increase by ${product.stepQty}`}
              >
                +{product.stepQty}
              </button>
            </div>
          </div>

          {/* Action Buttons: Add to Cart and Buy Now */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                isJustAdded
                  ? 'bg-[#063D2E] border-[#D8B56D] text-[#F6F4EC]'
                  : 'bg-[#0B241D] hover:bg-[#063D2E] border-[#D8B56D]/30 text-[#F6F4EC]'
              }`}
            >
              {isJustAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#D8B56D]" />
                  <span>{t('addedToCart')}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#D8B56D]" />
                  <span>{t('addToCart')}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="py-2 px-3 rounded-lg bg-gradient-to-r from-[#D8B56D] to-[#c7a45c] hover:from-[#e3c178] hover:to-[#d8b56d] text-[#090D0B] font-bold text-xs flex items-center justify-center gap-1 shadow-md transition-all hover:scale-[1.02]"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{t('buyNow')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
