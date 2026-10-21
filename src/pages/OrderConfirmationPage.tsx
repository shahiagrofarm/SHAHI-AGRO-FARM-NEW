import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Printer, 
  MessageCircle, 
  ArrowRight, 
  Truck, 
  PhoneCall, 
  MapPin, 
  Calendar,
  Clock,
  Copy,
  Check,
  AlertCircle
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/config.ts';
import { formatBDT, formatPlainOrderSummary } from '../utils/cart-rules.ts';
import { useLanguage } from '../context/LanguageContext.tsx';

interface OrderConfirmationPageProps {
  navigate: (path: string) => void;
  orderData?: any;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ navigate, orderData }) => {
  const { t, isBn, lang } = useLanguage();
  const [copiedDetails, setCopiedDetails] = useState(false);

  const [order, setOrder] = useState<any>(() => {
    if (orderData) return orderData;
    try {
      const saved = sessionStorage.getItem('shahi_last_order');
      if (saved) return JSON.parse(saved);
    } catch {
      // storage unavailable
    }
    return null;
  });

  useEffect(() => {
    if (orderData) {
      setOrder(orderData);
    }
  }, [orderData]);

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="text-2xl font-serif font-bold text-[#F6F4EC]">
          {isBn ? 'কোনো সক্রিয় অর্ডার পাওয়া যায়নি' : 'No Active Order Found'}
        </h1>
        <p className="text-[#A9B9A8] text-sm">
          {isBn
            ? 'আপনি যদি সম্প্রতি কোনো অর্ডার করে থাকেন, অনুগ্রহ করে সরাসরি আমাদের হোয়াটসঅ্যাপে যোগাযোগ করুন।'
            : 'If you have recently placed an order, please contact our farm WhatsApp directly.'}
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#063D2E] hover:bg-[#084e3b] text-[#F6F4EC] font-semibold text-sm transition-colors"
        >
          <span>{isBn ? 'হোমপেজে ফিরে যান' : 'Return to Homepage'}</span>
        </button>
      </div>
    );
  }

  const { orderId, formData, items, totals, whatsappUrl, createdAt } = order;
  const dateFormatted = createdAt
    ? new Date(createdAt).toLocaleDateString(isBn ? 'bn-BD' : 'en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : new Date().toLocaleDateString(isBn ? 'bn-BD' : 'en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const handlePrint = () => {
    window.print();
  };

  const handleCopyDetails = () => {
    const plainText = formatPlainOrderSummary(orderId, formData, items, totals);
    navigator.clipboard.writeText(plainText);
    setCopiedDetails(true);
    setTimeout(() => setCopiedDetails(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 print:py-0 print:px-0">
      {/* Top Banner */}
      <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-[#D8B56D]/30 text-center space-y-3 print:border-none print:bg-transparent">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#063D2E] border border-[#D8B56D]/60 flex items-center justify-center text-[#D8B56D]">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#F6F4EC] tracking-tight">
          {t('orderReceivedTitle')}
        </h1>
        <p className="text-sm text-[#A9B9A8]">
          {t('orderRef')}: <strong className="text-[#D8B56D] font-mono tracking-wider">{orderId}</strong>
        </p>
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#090D0B] border border-[#D8B56D]/30 text-xs text-[#D8B56D]">
          <Clock className="w-3.5 h-3.5" />
          <span>{t('orderStatusPending')}</span>
        </div>
      </div>

      {/* Printable Receipt Card */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-[#D8B56D]/30 space-y-6 shadow-2xl print:border-black print:text-black print:bg-white">
        {/* Receipt Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#D8B56D]/20 print:border-stone-300 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#D8B56D]/60 shadow-md bg-white shrink-0">
              <img
                src={BUSINESS_CONFIG.logo}
                alt={BUSINESS_CONFIG.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-[#F6F4EC] print:text-black">
                {t('receiptTitle')}
              </h2>
              <div className="text-xs text-[#A9B9A8] print:text-stone-600 flex items-center gap-2 mt-1">
                <Calendar className="w-3.5 h-3.5 text-[#D8B56D]" />
                <span>{t('dateLabel')}: {dateFormatted}</span>
                <span>·</span>
                <span>#{orderId}</span>
              </div>
            </div>
          </div>
          <div className="text-right text-xs text-[#A9B9A8] print:text-stone-600">
            <div>{isBn ? 'ফোন:' : 'Phone:'} {BUSINESS_CONFIG.phone}</div>
            <div>{isBn ? 'হোয়াটসঅ্যাপ:' : 'WhatsApp:'} {BUSINESS_CONFIG.whatsappNumber}</div>
          </div>
        </div>

        {/* Customer & Delivery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div className="space-y-1.5">
            <h3 className="font-semibold text-[#D8B56D] uppercase tracking-wider text-xs print:text-stone-900">
              {t('customerDetails')}
            </h3>
            <p className="text-[#F6F4EC] font-semibold print:text-black">{formData.fullName}</p>
            <p className="text-[#A9B9A8] flex items-center gap-1.5 print:text-stone-700">
              <PhoneCall className="w-3.5 h-3.5 text-[#D8B56D] shrink-0" />
              <span>{formData.phone}</span>
            </p>
            {formData.email && (
              <p className="text-[11px] text-[#A9B9A8] print:text-stone-600">{formData.email}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <h3 className="font-semibold text-[#D8B56D] uppercase tracking-wider text-xs print:text-stone-900">
              {t('deliveryDestination')}
            </h3>
            <p className="text-[#F6F4EC] font-semibold print:text-black">
              {formData.district} {isBn ? 'জেলা' : 'District'}, Bangladesh
            </p>
            <p className="text-[#A9B9A8] flex items-start gap-1.5 print:text-stone-700">
              <MapPin className="w-3.5 h-3.5 text-[#D8B56D] mt-0.5 shrink-0" />
              <span>{formData.address}</span>
            </p>
            {formData.deliveryNotes && (
              <p className="text-[11px] text-[#D8B56D]/90 print:text-stone-600">
                {isBn ? 'নোট: ' : 'Note: '}{formData.deliveryNotes}
              </p>
            )}
          </div>
        </div>

        {/* Payment Method Badge */}
        <div className="p-3.5 rounded-xl bg-[#090D0B] border border-[#D8B56D]/20 text-xs print:border-stone-300 print:bg-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[#A9B9A8]">{t('paymentMethodLabel')}: </span>
            <strong className="text-[#F6F4EC] print:text-black font-semibold">
              {formData.paymentMethod === 'cod'
                ? (isBn ? 'ক্যাশ অন ডেলিভারি (মূল্য অপরিশোধিত)' : 'Cash on Delivery — unpaid')
                : `${formData.paymentMethod.toUpperCase()} (${isBn ? 'যাচাইকরণ প্রক্রিয়াধীন' : 'Verification pending'}) ${formData.trxId ? `· TrxID: ${formData.trxId}` : ''}`}
            </strong>
          </div>
          <div className="text-[#D8B56D] text-[11px] font-mono">
            BDT (৳)
          </div>
        </div>

        {/* Itemized Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#D8B56D]/20 text-[#A9B9A8] uppercase text-[11px] tracking-wider print:border-stone-300 print:text-black">
                <th className="py-2.5">{isBn ? 'পণ্য' : 'Item'}</th>
                <th className="py-2.5 text-center">{t('unitPrice')}</th>
                <th className="py-2.5 text-center">{t('quantity')}</th>
                <th className="py-2.5 text-right">{isBn ? 'সাবটোটাল' : 'Subtotal'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8B56D]/15 print:divide-stone-300">
              {items.map((item: any) => (
                <tr key={item.productId} className="text-[#F6F4EC] print:text-black">
                  <td className="py-3 font-semibold">
                    {isBn ? item.productNameBn : item.productName}
                    <span className="block text-[11px] text-[#D8B56D] font-normal print:text-stone-600">
                      {isBn ? item.packageWeightBn : item.packageWeight}
                    </span>
                  </td>
                  <td className="py-3 text-center tabular-nums">
                    {formatBDT(item.unitPrice, lang)}
                  </td>
                  <td className="py-3 text-center tabular-nums font-bold text-[#D8B56D]">
                    {item.quantity}
                  </td>
                  <td className="py-3 text-right tabular-nums font-bold text-[#F6F4EC] print:text-black">
                    {formatBDT(item.subtotal, lang)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Breakdown */}
        <div className="pt-4 border-t border-[#D8B56D]/20 print:border-stone-300 space-y-2 text-xs sm:text-sm">
          <div className="flex justify-between text-[#A9B9A8] print:text-black">
            <span>{t('itemsSubtotal')}</span>
            <span className="font-bold tabular-nums text-[#F6F4EC]">{formatBDT(totals.subtotal, lang)}</span>
          </div>
          <div className="flex justify-between text-[#A9B9A8] print:text-black">
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-[#D8B56D]" />
              <span>{t('deliveryCharge')}</span>
            </span>
            <span className="font-semibold text-[#D8B56D] text-xs">
              {isBn ? totals.deliveryChargeStatusBn : totals.deliveryChargeStatus}
            </span>
          </div>
          <div className="flex justify-between pt-3 border-t border-[#D8B56D]/20 print:border-stone-300 text-base sm:text-lg font-bold">
            <div>
              <span className="text-[#F6F4EC] print:text-black block">{t('orderTotal')}</span>
              <span className="text-[10px] text-[#A9B9A8] font-normal">
                {isBn ? '(প্রাক্কলিত — ডেলিভারি চার্জ ব্যতীত)' : '(Provisional — excl. delivery)'}
              </span>
            </div>
            <span className="text-[#D8B56D] tabular-nums print:text-black">
              {formatBDT(totals.orderTotal, lang)}
            </span>
          </div>
        </div>
      </div>

      {/* WhatsApp Handoff Notice & Copy Details */}
      <div className="p-4 rounded-2xl glass-panel-subtle text-xs text-[#A9B9A8] space-y-2 print:hidden border border-[#D8B56D]/20">
        <div className="flex items-start gap-2 text-[#D8B56D] font-semibold">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>
            {isBn
              ? 'হোয়াটসঅ্যাপে নিশ্চিতকরণ নির্দেশনা:'
              : 'WhatsApp Confirmation Instructions:'}
          </span>
        </div>
        <p className="leading-relaxed">
          {isBn
            ? 'নিচের "হোয়াটসঅ্যাপে নিশ্চিত করুন" বোতামে চাপলে হোয়াটসঅ্যাপে আপনার সম্পূর্ণ অর্ডার মেসেজ প্রস্তুত হয়ে যাবে। মেসেজটি পাঠানোর পর আমাদের খামার টিম আপনার অর্ডারটি গ্রহণ করে যোগাযোগ করবে।'
            : 'Tapping the button below opens WhatsApp with your pre-formatted order summary. Opening WhatsApp does not itself send the message—please tap Send inside WhatsApp.'}
        </p>
      </div>

      {/* Actions Strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl glass-panel text-[#F6F4EC] border border-[#D8B56D]/30 text-xs font-semibold flex items-center justify-center gap-2 hover:border-[#D8B56D] transition-colors"
          >
            <Printer className="w-4 h-4 text-[#D8B56D]" />
            <span>{t('printReceipt')}</span>
          </button>

          <button
            onClick={handleCopyDetails}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl glass-panel text-[#F6F4EC] border border-[#D8B56D]/30 text-xs font-semibold flex items-center justify-center gap-2 hover:border-[#D8B56D] transition-colors"
          >
            {copiedDetails ? <Check className="w-4 h-4 text-[#D8B56D]" /> : <Copy className="w-4 h-4 text-[#D8B56D]" />}
            <span>{copiedDetails ? t('detailsCopied') : t('copyOrderDetails')}</span>
          </button>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#063D2E] to-[#0B241D] hover:from-[#084e3b] hover:to-[#0f3229] border border-[#D8B56D]/40 text-[#F6F4EC] text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 text-[#D8B56D]" />
              <span>{t('confirmOnWhatsApp')}</span>
            </a>
          )}

          <button
            onClick={() => navigate('/shop')}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl glass-panel text-[#D8B56D] text-xs font-semibold flex items-center justify-center gap-1.5 hover:underline"
          >
            <span>{isBn ? 'আরও কেনাকাটা' : 'Continue Shopping'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
