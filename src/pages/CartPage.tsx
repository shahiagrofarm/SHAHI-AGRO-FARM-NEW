import React, { useState } from 'react';
import { useCart } from '../context/CartContext.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { formatBDT, validateQuantity } from '../utils/cart-rules.ts';
import { ImageWithFallback } from '../components/ImageWithFallback.tsx';
import { BUSINESS_CONFIG } from '../data/config.ts';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft, 
  Truck, 
  AlertCircle,
  MessageCircle
} from 'lucide-react';

interface CartPageProps {
  navigate: (path: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ navigate }) => {
  const { validatedItems, totals, updateQuantity, removeFromCart, clearCart } = useCart();
  const { t, isBn, lang } = useLanguage();
  const [warningMsg, setWarningMsg] = useState<string | null>(null);

  if (validatedItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl glass-panel flex items-center justify-center text-[#D8B56D]">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#F6F4EC]">
            {t('cartEmpty')}
          </h1>
          <p className="text-sm text-[#A9B9A8] max-w-md mx-auto">
            {t('cartEmptySubtitle')}
          </p>
        </div>
        <button
          onClick={() => navigate('/shop')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#063D2E] to-[#0B241D] hover:from-[#084e3b] hover:to-[#0f3229] border border-[#D8B56D]/40 text-[#F6F4EC] font-semibold text-sm transition-all shadow-lg"
        >
          <ShoppingBag className="w-4 h-4 text-[#D8B56D]" />
          <span>{t('browseProducts')}</span>
        </button>
      </div>
    );
  }

  const handleStepChange = (productId: string, currentQty: number, delta: number) => {
    const isSilage = productId === 'grass-silage' || productId === 'shahi-grass-silage';
    const step = isSilage ? 10 : 1;
    const target = currentQty + (delta * step);

    const validation = validateQuantity(productId, target);
    if (!validation.valid && (validation.error || validation.errorBn)) {
      setWarningMsg(isBn ? (validation.errorBn || validation.error!) : validation.error!);
      setTimeout(() => setWarningMsg(null), 4000);
    } else {
      setWarningMsg(null);
    }
    updateQuantity(productId, target);
  };

  const handleDirectInputChange = (productId: string, rawVal: string) => {
    const num = parseInt(rawVal, 10);
    if (isNaN(num)) return;
    const validation = validateQuantity(productId, num);
    if (!validation.valid && (validation.error || validation.errorBn)) {
      setWarningMsg(isBn ? (validation.errorBn || validation.error!) : validation.error!);
    } else {
      setWarningMsg(null);
    }
    updateQuantity(productId, validation.normalizedQty);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D8B56D]/20 pb-6">
        <div>
          <div className="text-xs uppercase tracking-wider text-[#D8B56D] font-semibold mb-1">
            {t('cartTitle')}
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#F6F4EC] tracking-tight">
            {t('cartReview')} ({totals.itemCount} {t('cartItemsCount')})
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-[#A9B9A8] hover:text-red-400 self-start sm:self-auto flex items-center gap-1 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{t('clearAll')}</span>
        </button>
      </div>

      {warningMsg && (
        <div className="p-3.5 rounded-xl bg-amber-950/60 border border-amber-800 text-xs text-amber-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{warningMsg}</span>
        </div>
      )}

      {/* Cart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {validatedItems.map((item) => {
            const isSilage = item.productId === 'grass-silage' || item.productId === 'shahi-grass-silage';
            return (
              <div
                key={item.productId}
                className="p-5 rounded-2xl glass-panel border border-[#D8B56D]/20 flex flex-col sm:flex-row gap-4 sm:items-center justify-between"
              >
                {/* Product thumb & details */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#090D0B] shrink-0 border border-[#D8B56D]/20">
                    <ImageWithFallback
                      src={item.image}
                      alt={isBn ? item.productNameBn : item.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base font-serif font-bold text-[#F6F4EC]">
                      {isBn ? item.productNameBn : item.productName}
                    </h3>
                    <div className="text-xs text-[#D8B56D] font-medium">
                      {isBn ? item.packageWeightBn : item.packageWeight}
                    </div>
                    <div className="text-xs text-[#A9B9A8]">
                      {t('unitPrice')}:{' '}
                      <span className="text-[#F6F4EC] font-semibold tabular-nums">
                        {formatBDT(item.unitPrice, lang)}
                      </span>{' '}
                      / {isBn ? item.unitBn : item.unit}
                    </div>
                    {isSilage && (
                      <div className="text-[11px] text-[#D8B56D]">
                        {isBn ? 'সর্বনিম্ন ২০ প্যাকেট (ধাপ ১০)' : 'Min 20 packets (Step 10)'}
                      </div>
                    )}
                  </div>
                </div>

                {/* Quantity Controls & Subtotal */}
                <div className="flex items-center justify-between sm:justify-end gap-5 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#D8B56D]/15">
                  {/* Stepper */}
                  <div className="flex items-center gap-1.5 bg-[#090D0B] border border-[#D8B56D]/25 rounded-xl p-1">
                    <button
                      type="button"
                      onClick={() => handleStepChange(item.productId, item.quantity, -1)}
                      disabled={isSilage ? item.quantity <= 20 : item.quantity <= 1}
                      className="w-7 h-7 flex items-center justify-center rounded-lg text-[#F6F4EC] hover:bg-[#0B241D] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleDirectInputChange(item.productId, e.target.value)}
                      className="w-12 text-center text-xs sm:text-sm font-bold text-[#D8B56D] bg-transparent focus:outline-none tabular-nums"
                      min={isSilage ? 20 : 1}
                      max={isSilage ? 400 : 50}
                      step={isSilage ? 10 : 1}
                    />

                    <button
                      type="button"
                      onClick={() => handleStepChange(item.productId, item.quantity, 1)}
                      disabled={isSilage ? item.quantity >= 400 : item.quantity >= 50}
                      className="w-7 h-7 flex items-center justify-center rounded-lg text-[#F6F4EC] hover:bg-[#0B241D] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right min-w-[85px]">
                    <div className="text-sm sm:text-base font-bold text-[#F6F4EC] tabular-nums">
                      {formatBDT(item.subtotal, lang)}
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.productId)}
                    className="p-1.5 text-[#A9B9A8] hover:text-red-400 rounded-lg hover:bg-[#0B241D] transition-colors"
                    title={isBn ? 'পণ্য সরান' : 'Remove item'}
                    aria-label={`Remove ${item.productName}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          <div className="pt-2">
            <button
              onClick={() => navigate('/shop')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#D8B56D] hover:underline transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t('continueShopping')}</span>
            </button>
          </div>
        </div>

        {/* Order Summary Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-[#D8B56D]/30 shadow-2xl space-y-5">
            <h2 className="text-base font-serif font-bold text-[#F6F4EC] uppercase tracking-wider">
              {isBn ? 'অর্ডার সারাংশ' : 'Order Summary'}
            </h2>

            <div className="space-y-3 text-xs sm:text-sm divide-y divide-[#D8B56D]/15">
              <div className="flex justify-between py-1 text-[#A9B9A8] items-center">
                <span>{t('itemsSubtotal')}</span>
                <span className="font-bold text-[#F6F4EC] tabular-nums whitespace-nowrap">
                  {formatBDT(totals.subtotal, lang)}
                </span>
              </div>

              <div className="py-2.5 space-y-1">
                <div className="flex justify-between text-[#A9B9A8] items-center">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#D8B56D]" />
                    <span>{t('deliveryCharge')}</span>
                  </span>
                  <span className="font-semibold text-[#D8B56D] text-xs whitespace-nowrap">
                    {isBn ? 'নিশ্চিত করা হবে' : 'To be confirmed'}
                  </span>
                </div>
                <p className="text-[11px] text-[#A9B9A8] leading-normal">
                  {isBn ? totals.deliveryChargeStatusBn : totals.deliveryChargeStatus}
                </p>
              </div>

              {totals.totalWeightNote && (
                <div className="flex justify-between py-2 text-xs text-[#A9B9A8] items-center gap-3">
                  <span className="shrink-0">{isBn ? 'মোট চালান ওজন' : 'Shipment Profile'}</span>
                  <span className="font-medium text-[#F6F4EC] text-right whitespace-nowrap">
                    {isBn ? totals.totalWeightNoteBn : totals.totalWeightNote}
                  </span>
                </div>
              )}

              <div className="flex justify-between pt-3 text-base sm:text-lg font-bold items-center">
                <div>
                  <span className="text-[#F6F4EC] block">{t('orderTotal')}</span>
                  <span className="text-[10px] text-[#A9B9A8] font-normal">
                    {isBn ? '(প্রাক্কলিত — ডেলিভারি চার্জ ব্যতীত)' : '(Provisional — excl. delivery charge)'}
                  </span>
                </div>
                <span className="text-[#D8B56D] tabular-nums whitespace-nowrap text-right">
                  {formatBDT(totals.orderTotal, lang)}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => navigate('/checkout')}
                className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-[#D8B56D] to-[#c7a45c] hover:from-[#e3c178] hover:to-[#d8b56d] text-[#090D0B] font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <span>{t('proceedToCheckout')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappIntl}?text=${encodeURIComponent(
                  `Hello Shahi Agro Farm, I have ${totals.itemCount} items in my cart totaling ${formatBDT(totals.subtotal)}. I want to place this order directly.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl glass-panel-subtle hover:border-[#D8B56D]/40 text-[#D8B56D] font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t('instantWhatsAppOrder')}</span>
              </a>
            </div>

            <div className="text-[11px] text-[#A9B9A8] text-center leading-relaxed">
              {isBn
                ? 'অনলাইনে এখনই কোনো ব্যাংক কার্ডের তথ্য প্রয়োজন নেই। ক্যাশ অন ডেলিভারি অথবা বিকাশ, নগদ, রকেট, উপায়ের মাধ্যমে পণ্য নিশ্চিত করুন।'
                : 'No immediate online card charge. We support Cash on Delivery (COD) and manual personal bKash, Nagad, Upay, Rocket payments.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
