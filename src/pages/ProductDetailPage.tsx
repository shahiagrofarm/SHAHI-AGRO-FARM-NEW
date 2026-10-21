import React, { useState, useEffect } from 'react';
import { getProductById, PRODUCTS, Product } from '../data/products.ts';
import { formatBDT, validateQuantity } from '../utils/cart-rules.ts';
import { useCart } from '../context/CartContext.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { ImageWithFallback } from '../components/ImageWithFallback.tsx';
import { BUSINESS_CONFIG } from '../data/config.ts';
import { 
  ShoppingBag, 
  MessageCircle, 
  ArrowLeft, 
  Plus, 
  Minus, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  AlertCircle,
  Zap
} from 'lucide-react';

interface ProductDetailPageProps {
  productId: string;
  navigate: (path: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId, navigate }) => {
  const product: Product | undefined = getProductById(productId);
  const { addToCart, buyNow } = useCart();
  const { t, isBn, lang } = useLanguage();

  const [quantity, setQuantity] = useState<number>(() => {
    return product ? product.defaultQty : 1;
  });
  const [inputVal, setInputVal] = useState<string>(() => {
    return product ? String(product.defaultQty) : '1';
  });
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setQuantity(product.defaultQty);
      setInputVal(String(product.defaultQty));
      setErrorMsg(null);
      setFeedbackMsg(null);
    }
  }, [productId, product]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-serif font-bold text-[#F6F4EC]">
          {isBn ? 'পণ্যটি খুঁজে পাওয়া যায়নি' : 'Product Not Found'}
        </h1>
        <p className="text-[#A9B9A8] text-sm">
          {isBn ? 'অনুরোধকৃত কৃষি পণ্যটি আমাদের ক্যাটালগে নেই।' : 'The requested product does not exist in our catalog.'}
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#063D2E] hover:bg-[#084e3b] text-[#F6F4EC] text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('backToCatalog')}</span>
        </button>
      </div>
    );
  }

  const isSilage = product.id === 'grass-silage' || product.aliases.includes('grass-silage');
  const step = product.stepQty;

  const handleIncrement = () => {
    const next = quantity + step;
    if (next <= product.maxQty) {
      setQuantity(next);
      setInputVal(String(next));
      setErrorMsg(null);
    }
  };

  const handleDecrement = () => {
    const prev = quantity - step;
    if (prev >= product.minQty) {
      setQuantity(prev);
      setInputVal(String(prev));
      setErrorMsg(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setInputVal(raw);

    const validation = validateQuantity(product.id, raw);
    if (!validation.valid) {
      setErrorMsg(isBn ? (validation.errorBn || validation.error || 'Invalid quantity') : (validation.error || 'Invalid quantity'));
    } else {
      setErrorMsg(null);
      setQuantity(validation.normalizedQty);
    }
  };

  const handleInputBlur = () => {
    const validation = validateQuantity(product.id, inputVal);
    setQuantity(validation.normalizedQty);
    setInputVal(String(validation.normalizedQty));
    if (!validation.valid) {
      setErrorMsg(isBn ? (validation.errorBn || validation.error || 'Invalid quantity') : (validation.error || 'Invalid quantity'));
    } else {
      setErrorMsg(null);
    }
  };

  const handleAddToCart = () => {
    const validation = validateQuantity(product.id, quantity);
    if (!validation.valid) {
      setErrorMsg(isBn ? (validation.errorBn || validation.error || 'Invalid quantity') : (validation.error || 'Invalid quantity'));
      return;
    }

    addToCart(product.id, validation.normalizedQty);
    setFeedbackMsg(
      isBn
        ? `কার্টে ${validation.normalizedQty} ${product.unitBn} যোগ করা হয়েছে।`
        : `Added ${validation.normalizedQty} ${product.unit} to your cart.`
    );
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  const handleBuyNow = () => {
    const validation = validateQuantity(product.id, quantity);
    if (!validation.valid) {
      setErrorMsg(isBn ? (validation.errorBn || validation.error || 'Invalid quantity') : (validation.error || 'Invalid quantity'));
      return;
    }

    buyNow(product.id, validation.normalizedQty);
    navigate('/checkout');
  };

  const handleVariantSwitch = (targetId: string) => {
    navigate(`/products/${targetId}`);
  };

  const currentTotal = quantity * product.price;

  // WhatsApp order link
  const waText = `Hello Shahi Agro Farm, I want to order:
• Product: ${product.name} (${product.packageWeight})
• Quantity: ${quantity} ${product.unit}
• Calculated Subtotal: ${formatBDT(currentTotal)}
Please confirm availability and dispatch schedule to my district.`;
  const singleWaUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappIntl}?text=${encodeURIComponent(waText)}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back Breadcrumb */}
      <div>
        <button
          onClick={() => navigate('/shop')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#A9B9A8] hover:text-[#D8B56D] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('backToCatalog')}</span>
        </button>
      </div>

      {/* Main Grid: Gallery Left, Contiguous Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Media (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass-panel p-2 shadow-2xl">
            <div className="relative rounded-2xl overflow-hidden w-full h-full bg-[#090D0B]">
              <ImageWithFallback
                src={product.image}
                alt={isBn ? product.nameBn : product.name}
                category={product.category}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#090D0B]/85 backdrop-blur-md border border-[#D8B56D]/30 text-xs font-semibold text-[#D8B56D]">
                {isBn ? product.badgeBn : product.badge}
              </div>
              <div className="absolute bottom-4 right-4 px-3 py-1 rounded-lg bg-[#063D2E]/90 backdrop-blur-md border border-[#A9B9A8]/30 text-xs font-medium text-[#F6F4EC]">
                {isBn ? product.packageWeightBn : product.packageWeight}
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="p-6 rounded-2xl glass-panel space-y-3">
            <h3 className="text-sm font-semibold text-[#D8B56D] uppercase tracking-wider">
              {t('highlights')}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#A9B9A8]">
              {(isBn ? product.featuresBn : product.features).map((feat, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D8B56D] mt-0.5 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Purchase Module (5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-[#D8B56D]/30 shadow-2xl space-y-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#D8B56D] font-semibold mb-1">
                {isBn ? product.categoryBn : product.category}
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#F6F4EC] tracking-tight">
                {isBn ? product.nameBn : product.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#A9B9A8] mt-2 leading-relaxed">
                {isBn ? product.shortDescriptionBn : product.shortDescription}
              </p>
            </div>

            {/* Price Block */}
            <div className="p-4 rounded-2xl bg-[#090D0B]/80 border border-[#D8B56D]/20 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-[#A9B9A8] block">{t('unitPrice')}</span>
                <span className="text-2xl sm:text-3xl font-bold text-[#D8B56D] tabular-nums">
                  {formatBDT(product.price, lang)}
                </span>
                <span className="text-xs text-[#A9B9A8] ml-1">/ {isBn ? product.unitBn : product.unit}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#A9B9A8] block">{isBn ? 'সাবটোটাল' : 'Subtotal'}</span>
                <span className="text-xl font-bold text-[#F6F4EC] tabular-nums">
                  {formatBDT(currentTotal, lang)}
                </span>
              </div>
            </div>

            {/* Variant Switcher for Ghee */}
            {!isSilage && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#F6F4EC] block">
                  {isBn ? 'প্যাকেজ সাইজ নির্বাচন করুন:' : 'Select Size:'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleVariantSwitch('shahi-ghee-200g')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                      product.id === 'shahi-ghee-200g'
                        ? 'bg-[#063D2E] border-[#D8B56D] text-[#D8B56D] shadow-sm'
                        : 'bg-[#090D0B] border-[#D8B56D]/20 text-[#A9B9A8] hover:text-[#F6F4EC]'
                    }`}
                  >
                    {isBn ? '২০০ গ্রাম — ৳৭৫০' : '200g Jar — ৳750'}
                  </button>
                  <button
                    onClick={() => handleVariantSwitch('shahi-ghee-900g')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                      product.id === 'shahi-ghee-900g'
                        ? 'bg-[#063D2E] border-[#D8B56D] text-[#D8B56D] shadow-sm'
                        : 'bg-[#090D0B] border-[#D8B56D]/20 text-[#A9B9A8] hover:text-[#F6F4EC]'
                    }`}
                  >
                    {isBn ? '৯০০ গ্রাম — ৳১,৪৫০' : '900g Family — ৳1,450'}
                  </button>
                </div>
              </div>
            )}

            {/* Quantity Stepper & Manual Entry */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="pdp-quantity" className="text-xs font-semibold text-[#F6F4EC]">
                  {t('quantity')} ({isBn ? product.unitBn : product.unit}):
                </label>
                {isSilage && (
                  <span className="text-[11px] text-[#D8B56D]">
                    {isBn ? 'সর্বনিম্ন ২০ · সর্বোচ্চ ৪০০ (ধাপ ১০)' : 'Min 20 · Max 400 (Step 10)'}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={quantity <= product.minQty}
                  className="w-12 h-12 rounded-xl bg-[#090D0B] border border-[#D8B56D]/25 hover:border-[#D8B56D] text-[#F6F4EC] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors text-sm font-bold"
                  aria-label={`Decrease by ${step}`}
                >
                  <Minus className="w-4 h-4" />
                </button>

                <input
                  id="pdp-quantity"
                  type="number"
                  value={inputVal}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  min={product.minQty}
                  max={product.maxQty}
                  step={product.stepQty}
                  className="flex-1 h-12 text-center font-bold text-[#F6F4EC] bg-[#090D0B] border border-[#D8B56D]/30 rounded-xl focus:outline-none focus:border-[#D8B56D] tabular-nums text-xl"
                />

                <button
                  type="button"
                  onClick={handleIncrement}
                  disabled={quantity >= product.maxQty}
                  className="w-12 h-12 rounded-xl bg-[#090D0B] border border-[#D8B56D]/25 hover:border-[#D8B56D] text-[#F6F4EC] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors text-sm font-bold"
                  aria-label={`Increase by ${step}`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-xs text-red-200 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {feedbackMsg && (
                <div className="p-3 rounded-xl bg-[#063D2E]/80 border border-[#D8B56D]/40 text-xs text-[#F6F4EC] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D8B56D] shrink-0" />
                  <span>{feedbackMsg}</span>
                </div>
              )}
            </div>

            {/* Action Buttons: Add to Cart & Buy Now */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-3.5 px-4 rounded-xl bg-[#0B241D] hover:bg-[#063D2E] border border-[#D8B56D]/40 text-[#F6F4EC] font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <ShoppingBag className="w-4 h-4 text-[#D8B56D]" />
                <span>{t('addToCart')} ({formatBDT(currentTotal, lang)})</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#D8B56D] to-[#c7a45c] hover:from-[#e3c178] hover:to-[#d8b56d] text-[#090D0B] font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <Zap className="w-4 h-4 text-[#090D0B]" />
                <span>{t('buyNow')} ({formatBDT(currentTotal, lang)})</span>
              </button>

              <a
                href={singleWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl glass-panel-subtle hover:border-[#D8B56D]/40 text-[#D8B56D] font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isBn ? 'সরাসরি হোয়াটসঅ্যাপে অর্ডার দিন' : 'Order via WhatsApp'}</span>
              </a>
            </div>

            {/* Delivery Trust Note */}
            <div className="pt-4 border-t border-[#D8B56D]/15 text-xs text-[#A9B9A8] space-y-2">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#D8B56D]" />
                <span>
                  {isSilage
                    ? (isBn ? 'জেলা দূরত্বের ভিত্তিতে ট্রাক ভাড়া নির্ধারিত হবে' : 'Truck freight calculated based on destination district')
                    : (isBn ? '৬৪ জেলায় নির্ভরযোগ্য কুরিয়ার হোম ডেলিভারি' : 'Doorstep courier delivery across all 64 districts')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D8B56D]" />
                <span>
                  {isBn
                    ? 'ক্যাশ অন ডেলিভারি এবং বিকাশ, নগদ, উপায়, রকেটে পেমেন্ট সুবিধা'
                    : 'Cash on Delivery and bKash, Nagad, Upay, Rocket supported'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Table */}
      <section className="border-t border-[#D8B56D]/20 pt-12 space-y-6">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F6F4EC] tracking-tight">
          {t('specifications')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[#D8B56D]">
              {t('productOverview')}
            </h3>
            <p className="text-sm text-[#A9B9A8] leading-relaxed">
              {isBn ? product.fullDescriptionBn : product.fullDescription}
            </p>
          </div>

          <div className="rounded-2xl border border-[#D8B56D]/20 overflow-hidden glass-panel">
            <table className="w-full text-xs sm:text-sm">
              <tbody className="divide-y divide-[#D8B56D]/15">
                {product.specifications.map((spec, i) => (
                  <tr key={i} className="hover:bg-[#0B241D]/40 transition-colors">
                    <td className="py-3 px-4 text-[#A9B9A8] font-medium w-2/5">
                      {isBn ? spec.labelBn : spec.label}
                    </td>
                    <td className="py-3 px-4 text-[#F6F4EC] font-semibold">
                      {isBn ? spec.valueBn : spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
