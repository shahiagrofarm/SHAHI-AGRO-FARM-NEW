import React, { useState } from 'react';
import { useCart } from '../context/CartContext.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { 
  BANGLADESH_DISTRICTS, 
  BUSINESS_CONFIG,
  PaymentMethodConfig
} from '../data/config.ts';
import { 
  formatBDT, 
  validateBDPhone, 
  CheckoutFormData, 
  generateWhatsAppOrderUrl 
} from '../utils/cart-rules.ts';
import { 
  ShieldCheck, 
  Truck, 
  MessageCircle, 
  AlertCircle, 
  ArrowLeft, 
  CheckCircle2, 
  Lock,
  Copy,
  Check,
  AlertTriangle
} from 'lucide-react';

interface CheckoutPageProps {
  navigate: (path: string) => void;
  onOrderSuccess: (orderData: {
    orderId: string;
    formData: CheckoutFormData;
    items: any[];
    totals: any;
    whatsappUrl: string;
  }) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ navigate, onOrderSuccess }) => {
  const { validatedItems, totals, clearCart } = useCart();
  const { t, isBn, lang } = useLanguage();

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    phone: '',
    email: '',
    district: 'Noakhali',
    address: '',
    deliveryNotes: '',
    paymentMethod: 'cod',
    trxId: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  if (validatedItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="text-2xl font-serif font-bold text-[#F6F4EC]">{t('cartEmpty')}</h1>
        <p className="text-[#A9B9A8] text-sm">
          {t('cartEmptySubtitle')}
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#063D2E] hover:bg-[#084e3b] text-[#F6F4EC] font-semibold text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('browseProducts')}</span>
        </button>
      </div>
    );
  }

  const copyNumber = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2500);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      newErrors.fullName = isBn
        ? 'অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন (কমপক্ষে ৩ অক্ষর)।'
        : 'Please enter your full name (at least 3 characters).';
    }

    const phoneValidation = validateBDPhone(formData.phone);
    if (!phoneValidation.valid) {
      newErrors.phone = isBn ? (phoneValidation.errorBn || phoneValidation.error!) : phoneValidation.error!;
    }

    if (!formData.district) {
      newErrors.district = isBn ? 'অনুগ্রহ করে আপনার জেলা নির্বাচন করুন।' : 'Please select your delivery district.';
    }

    if (!formData.address.trim() || formData.address.trim().length < 8) {
      newErrors.address = isBn
        ? 'অনুগ্রহ করে আপনার বিস্তারিত ঠিকানা লিখুন (গ্রাম/রোড, থানা, উপজেলা)।'
        : 'Please enter your complete address (thana, area, road/house).';
    }

    if (formData.paymentMethod !== 'cod') {
      if (!formData.trxId || formData.trxId.trim().length < 5) {
        newErrors.trxId = isBn
          ? 'অনুগ্রহ করে টাকা পাঠানোর পর প্রাপ্ত সঠিক ট্রানজেকশন আইডি (TrxID) লিখুন।'
          : 'Please enter the transaction ID (TrxID) received from your payment app.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !validateForm()) return;

    setIsSubmitting(true);

    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `SAF-BD-${randomNum}`;

    const normalizedPhone = validateBDPhone(formData.phone).normalized;
    const finalFormData = { ...formData, phone: normalizedPhone };

    const whatsappUrl = generateWhatsAppOrderUrl(orderId, finalFormData, validatedItems, totals);

    const orderRecord = {
      orderId,
      formData: finalFormData,
      items: validatedItems,
      totals,
      whatsappUrl,
      createdAt: new Date().toISOString()
    };

    try {
      sessionStorage.setItem('shahi_last_order', JSON.stringify(orderRecord));
    } catch {
      // storage unavailable
    }

    onOrderSuccess(orderRecord);
    clearCart();

    // Navigate to order-status with query parameter
    navigate(`/order-status?orderId=${orderId}`);
  };

  const selectedPaymentConfig = BUSINESS_CONFIG.paymentMethods.find(m => m.id === formData.paymentMethod);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Breadcrumb */}
      <div>
        <button
          onClick={() => navigate('/cart')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#A9B9A8] hover:text-[#D8B56D] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isBn ? 'কার্টে ফিরে যান' : 'Back to Cart'}</span>
        </button>
      </div>

      <div className="border-b border-[#D8B56D]/20 pb-4">
        <div className="text-xs uppercase tracking-wider text-[#D8B56D] font-semibold mb-1">
          {isBn ? 'চূড়ান্ত ধাপ' : 'Final Step'}
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#F6F4EC] tracking-tight">
          {t('checkoutTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-[#A9B9A8] mt-1">
          {t('checkoutSubtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Form Fields (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Customer Information Card */}
          <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-[#D8B56D]/20 space-y-4">
            <h2 className="text-sm font-semibold text-[#D8B56D] uppercase tracking-wider">
              {t('stepCustomer')}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="chk-fullName" className="text-xs font-semibold text-[#F6F4EC] block">
                  {t('fullName')} <span className="text-red-400">*</span>
                </label>
                <input
                  id="chk-fullName"
                  type="text"
                  required
                  placeholder={isBn ? 'যেমন: মোহাম্মদ আব্দুর রহিম' : 'e.g. Mohammad Rahim'}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-[#090D0B] border text-sm text-[#F6F4EC] placeholder-stone-500 focus:outline-none transition-colors ${
                    errors.fullName ? 'border-red-500' : 'border-[#D8B56D]/30 focus:border-[#D8B56D]'
                  }`}
                />
                {errors.fullName && <p className="text-[11px] text-red-400">{errors.fullName}</p>}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="chk-phone" className="text-xs font-semibold text-[#F6F4EC] block">
                  {t('phone')} <span className="text-red-400">*</span>
                </label>
                <input
                  id="chk-phone"
                  type="tel"
                  required
                  placeholder="01XXXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-[#090D0B] border text-sm text-[#F6F4EC] placeholder-stone-500 focus:outline-none transition-colors ${
                    errors.phone ? 'border-red-500' : 'border-[#D8B56D]/30 focus:border-[#D8B56D]'
                  }`}
                />
                {errors.phone ? (
                  <p className="text-[11px] text-red-400">{errors.phone}</p>
                ) : (
                  <p className="text-[10px] text-[#A9B9A8]">{isBn ? '১১ ডিজিট (০১...)' : '11 digits starting with 013-019'}</p>
                )}
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label htmlFor="chk-email" className="text-xs font-semibold text-[#F6F4EC] block">
                  {t('emailOptional')}
                </label>
                <input
                  id="chk-email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090D0B] border border-[#D8B56D]/30 text-sm text-[#F6F4EC] placeholder-stone-500 focus:outline-none focus:border-[#D8B56D]"
                />
              </div>
            </div>
          </div>

          {/* Delivery Address Card */}
          <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-[#D8B56D]/20 space-y-4">
            <h2 className="text-sm font-semibold text-[#D8B56D] uppercase tracking-wider">
              {t('stepDelivery')}
            </h2>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="chk-district" className="text-xs font-semibold text-[#F6F4EC] block">
                  {t('district')} <span className="text-red-400">*</span>
                </label>
                <select
                  id="chk-district"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090D0B] border border-[#D8B56D]/30 text-sm text-[#F6F4EC] focus:outline-none focus:border-[#D8B56D]"
                >
                  {BANGLADESH_DISTRICTS.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist} {isBn ? 'জেলা' : 'District'}
                    </option>
                  ))}
                </select>
                {errors.district && <p className="text-[11px] text-red-400">{errors.district}</p>}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="chk-address" className="text-xs font-semibold text-[#F6F4EC] block">
                  {t('address')} <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="chk-address"
                  rows={3}
                  required
                  placeholder={isBn ? 'বাড়ি নং, রাস্তা, গ্রাম, থানা/উপজেলা, জেলা' : 'House, Road, Village, Thana, Upazila'}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-[#090D0B] border text-sm text-[#F6F4EC] placeholder-stone-500 focus:outline-none transition-colors ${
                    errors.address ? 'border-red-500' : 'border-[#D8B56D]/30 focus:border-[#D8B56D]'
                  }`}
                />
                {errors.address && <p className="text-[11px] text-red-400">{errors.address}</p>}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="chk-notes" className="text-xs font-semibold text-[#F6F4EC] block">
                  {t('deliveryNotes')}
                </label>
                <input
                  id="chk-notes"
                  type="text"
                  placeholder={isBn ? 'যেমন: পৌঁছানোর পূর্বে কল দিন / সাইলেজ আনলোডিং তথ্য' : 'e.g. Call before arrival / Silage truck access note'}
                  value={formData.deliveryNotes || ''}
                  onChange={(e) => setFormData({ ...formData, deliveryNotes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090D0B] border border-[#D8B56D]/30 text-sm text-[#F6F4EC] placeholder-stone-500 focus:outline-none focus:border-[#D8B56D]"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Card — All 5 Methods */}
          <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-[#D8B56D]/20 space-y-4">
            <h2 className="text-sm font-semibold text-[#D8B56D] uppercase tracking-wider">
              {t('stepPayment')}
            </h2>

            <div className="space-y-3">
              {BUSINESS_CONFIG.paymentMethods.map((method) => {
                const isSelected = formData.paymentMethod === method.id;
                return (
                  <div key={method.id} className="space-y-3">
                    <label
                      className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#063D2E]/80 border-[#D8B56D] shadow-md shadow-black/40'
                          : 'bg-[#090D0B]/80 border-[#D8B56D]/20 hover:border-[#D8B56D]/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={isSelected}
                        onChange={() => setFormData({ ...formData, paymentMethod: method.id })}
                        className="mt-1 text-[#D8B56D] focus:ring-[#D8B56D]"
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-serif font-bold text-sm sm:text-base text-[#F6F4EC]">
                            {isBn ? method.nameBn : method.name}
                          </span>
                          {method.number && (
                            <span className="px-2 py-0.5 rounded-md bg-[#090D0B] border border-[#D8B56D]/30 font-mono text-xs text-[#D8B56D]">
                              {method.number}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#A9B9A8] leading-relaxed">
                          {isBn ? method.instructionsBn : method.instructionsEn}
                        </p>
                      </div>
                    </label>

                    {/* Expandable Digital Payment Box */}
                    {isSelected && method.isDigital && method.number && (
                      <div className="p-5 rounded-2xl bg-[#090D0B] border border-[#D8B56D]/40 space-y-4 text-xs">
                        {/* Number Display & Copy Button */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-[#0B241D]/90 border border-[#D8B56D]/30">
                          <div>
                            <span className="text-[#A9B9A8] text-[11px] block">
                              {isBn ? 'টাকা পাঠানোর নম্বর (' + method.accountTypeBn + '):' : 'Payment Number (' + method.accountType + '):'}
                            </span>
                            <span className="text-base font-bold font-mono text-[#D8B56D]">
                              {method.number}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => copyNumber(method.number!)}
                            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#063D2E] hover:bg-[#084e3b] text-[#F6F4EC] font-semibold text-xs transition-colors self-start sm:self-auto border border-[#D8B56D]/30"
                          >
                            {copiedNumber === method.number ? <Check className="w-3.5 h-3.5 text-[#D8B56D]" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedNumber === method.number ? t('copied') : t('copyNumber')}</span>
                          </button>
                        </div>

                        {/* Owner verification notice */}
                        <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-800/60 text-amber-200 text-[11px] flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                          <span>
                            {isBn
                              ? 'গুরুত্বপূর্ণ: টাকা পাঠানোর পূর্বে প্রয়োজনে খামারের হোয়াটসঅ্যাপে নিশ্চিত হয়ে নিতে পারেন। অর্ডার জমা দেওয়ার পর আমাদের টিম TrxID যাচাই করে নিশ্চিতকরণ জানাবে।'
                              : 'Important: The transaction ID will be verified by farm management before packing. Please send money from your personal app with your name in reference.'}
                          </span>
                        </div>

                        {/* Transaction ID input */}
                        <div className="space-y-1.5">
                          <label htmlFor="chk-trxId" className="font-semibold text-[#F6F4EC] block">
                            {t('trxIdLabel')} <span className="text-red-400">*</span>
                          </label>
                          <input
                            id="chk-trxId"
                            type="text"
                            required
                            placeholder="e.g. 9J47AB89KL"
                            value={formData.trxId || ''}
                            onChange={(e) => setFormData({ ...formData, trxId: e.target.value.toUpperCase() })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B241D] border border-[#D8B56D]/40 text-[#F6F4EC] font-mono text-sm uppercase focus:outline-none focus:border-[#D8B56D]"
                          />
                          {errors.trxId && <p className="text-[11px] text-red-400">{errors.trxId}</p>}
                        </div>

                        {/* Security notice */}
                        <div className="p-2.5 rounded-lg bg-[#0B241D]/60 border border-[#D8B56D]/20 text-[11px] text-[#D8B56D] flex items-start gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-[#D8B56D] mt-0.5 shrink-0" />
                          <span>{t('securityNote')}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Order Review & Submission (5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-[#D8B56D]/30 shadow-2xl space-y-5">
            <h2 className="text-base font-serif font-bold text-[#F6F4EC] uppercase tracking-wider">
              {isBn ? 'অর্ডার পর্যালোচনা' : 'Order Review'}
            </h2>

            {/* Line items breakdown */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {validatedItems.map((item) => (
                <div key={item.productId} className="flex justify-between items-center text-xs py-2 border-b border-[#D8B56D]/15">
                  <div className="space-y-0.5">
                    <span className="font-bold text-[#F6F4EC] block">
                      {isBn ? item.productNameBn : item.productName}
                    </span>
                    <span className="text-[#A9B9A8] text-[11px]">
                      {item.quantity} × {formatBDT(item.unitPrice, lang)} ({isBn ? item.packageWeightBn : item.packageWeight})
                    </span>
                  </div>
                  <span className="font-bold text-[#D8B56D] tabular-nums">
                    {formatBDT(item.subtotal, lang)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations & Delivery Status */}
            <div className="space-y-2 text-xs divide-y divide-[#D8B56D]/15 pt-2">
              <div className="flex justify-between py-1.5 text-[#A9B9A8]">
                <span>{t('itemsSubtotal')}</span>
                <span className="font-bold text-[#F6F4EC] tabular-nums">
                  {formatBDT(totals.subtotal, lang)}
                </span>
              </div>

              <div className="py-2 space-y-1">
                <div className="flex justify-between text-[#A9B9A8]">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#D8B56D]" />
                    <span>{t('deliveryCharge')}</span>
                  </span>
                  <span className="font-semibold text-[#D8B56D]">
                    {isBn ? 'নিশ্চিত করা হবে' : 'To be confirmed'}
                  </span>
                </div>
                <p className="text-[11px] text-[#A9B9A8] leading-tight">
                  {isBn ? totals.deliveryChargeStatusBn : totals.deliveryChargeStatus}
                </p>
              </div>

              <div className="flex justify-between pt-3 text-base font-bold">
                <div>
                  <span className="text-[#F6F4EC] block">{t('orderTotal')}</span>
                  <span className="text-[10px] text-[#A9B9A8] font-normal">
                    {isBn ? '(প্রাক্কলিত — ডেলিভারি চার্জ ব্যতীত)' : '(Provisional — excl. delivery)'}
                  </span>
                </div>
                <span className="text-[#D8B56D] tabular-nums">
                  {formatBDT(totals.orderTotal, lang)}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-[#D8B56D] to-[#c7a45c] hover:from-[#e3c178] hover:to-[#d8b56d] text-[#090D0B] font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01] disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>{t('generatingReceipt')}</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#090D0B]" />
                  <span>{t('placeOrder')} ({formatBDT(totals.orderTotal, lang)})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
