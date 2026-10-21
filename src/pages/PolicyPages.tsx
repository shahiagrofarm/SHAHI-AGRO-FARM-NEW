import React from 'react';
import { ShieldCheck, Truck, ArrowLeft } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/config.ts';
import { useLanguage } from '../context/LanguageContext.tsx';

interface PolicyPageProps {
  navigate: (path: string) => void;
}

export const PrivacyPolicyPage: React.FC<PolicyPageProps> = ({ navigate }) => {
  const { isBn } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-xs text-[#A9B9A8] hover:text-[#D8B56D] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isBn ? 'হোমে ফিরে যান' : 'Back to Home'}</span>
        </button>
      </div>

      <div className="border-b border-[#D8B56D]/20 pb-4">
        <div className="text-xs uppercase tracking-wider text-[#D8B56D] font-semibold mb-1">
          {isBn ? 'আইনি ও নীতিমালা' : 'Legal & Compliance'}
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#F6F4EC] tracking-tight">
          {isBn ? 'প্রাইভেসি পলিসি (গোপনীয়তা নীতি)' : 'Privacy Policy'}
        </h1>
        <p className="text-xs text-[#A9B9A8] mt-1">
          {isBn ? 'কার্যকর তারিখ: অক্টোবর ২০২৬ · শাহী এগ্রো ফার্ম' : 'Effective Date: October 2026 · Shahi Agro Farm, Bangladesh'}
        </p>
      </div>

      <div className="space-y-6 text-sm text-[#A9B9A8] leading-relaxed">
        <section className="space-y-2 p-5 rounded-2xl glass-panel-subtle">
          <h2 className="text-base font-serif font-bold text-[#F6F4EC]">
            {isBn ? '১. সংগৃহীত তথ্যাদি' : '1. Information We Collect'}
          </h2>
          <p>
            {isBn
              ? 'অর্ডার প্রক্রিয়াকরণের জন্য আমরা কেবলমাত্র আপনার নাম, মোবাইল নম্বর, জেলা, ডেলিভারির ঠিকানা এবং ঐচ্ছিক ইমেইল সংগ্রহ করি। আমরা কোনো ব্যাংক কার্ড পিন, পাসওয়ার্ড বা সংবেদনশীল ব্যাংকিং তথ্য সংরক্ষণ করি না।'
              : 'We collect your name, mobile number, delivery address, district, and optional email solely to fulfill product deliveries. We do not store or process debit/credit card PINs, passwords, or banking credentials.'}
          </p>
        </section>

        <section className="space-y-2 p-5 rounded-2xl glass-panel-subtle">
          <h2 className="text-base font-serif font-bold text-[#F6F4EC]">
            {isBn ? '২. তথ্যের ব্যবহার' : '2. How Information is Used'}
          </h2>
          <p>
            {isBn
              ? 'আপনার তথ্য কেবলমাত্র সাইলেজ এবং ঘিয়ের চালান প্রেরণ, পরিবহন সমন্বয়, বিকাশ/নগদ পেমেন্ট যাচাই এবং অর্ডার স্ট্যাটাস জানানোর জন্য ব্যবহৃত হয়।'
              : 'Your data is used strictly for fulfilling product shipments, coordinating freight truck or courier dispatch, verifying manual digital payments, and communicating order status updates.'}
          </p>
        </section>

        <section className="space-y-2 p-5 rounded-2xl glass-panel-subtle">
          <h2 className="text-base font-serif font-bold text-[#F6F4EC]">
            {isBn ? '৩. যোগাযোগ' : '3. Contact Inquiries'}
          </h2>
          <p>
            {isBn
              ? `প্রাইভেসি সংক্রান্ত যেকোনো প্রশ্নে আমাদের ইমেইল (${BUSINESS_CONFIG.email}) বা হোয়াটসঅ্যাপে (${BUSINESS_CONFIG.whatsappNumber}) যোগাযোগ করুন। ঠিকানা: ${BUSINESS_CONFIG.addressBn}`
              : `For inquiries regarding your personal data, contact us at ${BUSINESS_CONFIG.email} or WhatsApp ${BUSINESS_CONFIG.whatsappNumber}. Physical address: ${BUSINESS_CONFIG.address}`}
          </p>
        </section>
      </div>
    </div>
  );
};

export const TermsPage: React.FC<PolicyPageProps> = ({ navigate }) => {
  const { isBn } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-xs text-[#A9B9A8] hover:text-[#D8B56D] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isBn ? 'হোমে ফিরে যান' : 'Back to Home'}</span>
        </button>
      </div>

      <div className="border-b border-[#D8B56D]/20 pb-4">
        <div className="text-xs uppercase tracking-wider text-[#D8B56D] font-semibold mb-1">
          {isBn ? 'সেবার শর্তাবলী' : 'Terms of Service'}
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#F6F4EC] tracking-tight">
          {isBn ? 'শর্তাবলী ও নিয়ম' : 'Terms and Conditions'}
        </h1>
        <p className="text-xs text-[#A9B9A8] mt-1">
          {isBn ? 'শাহী এগ্রো ফার্ম · নোয়াখালী, বাংলাদেশ' : 'Shahi Agro Farm · Noakhali, Bangladesh'}
        </p>
      </div>

      <div className="space-y-6 text-sm text-[#A9B9A8] leading-relaxed">
        <section className="space-y-2 p-5 rounded-2xl glass-panel-subtle">
          <h2 className="text-base font-serif font-bold text-[#F6F4EC]">
            {isBn ? '১. অর্ডার গ্রহণ ও যাচাই' : '1. Order Acceptance & Verification'}
          </h2>
          <p>
            {isBn
              ? 'অনলাইনে বা হোয়াটসঅ্যাপে অর্ডার জমাদান একটি প্রাথমিক সংরক্ষণ। খামার ব্যবস্থাপক স্টক ও পরিবহন নিশ্চিত করে চূড়ান্ত সরবরাহ সম্পন্ন করবেন।'
              : 'Order submission creates a provisional request. Farm management verifies stock availability, destination road access, and payment details before physical dispatch.'}
          </p>
        </section>

        <section className="space-y-2 p-5 rounded-2xl glass-panel-subtle">
          <h2 className="text-base font-serif font-bold text-[#F6F4EC]">
            {isBn ? '২. ঘাস সাইলেজ অর্ডার ও পরিবহন নীতি' : '2. Grass Silage Fodder Terms'}
          </h2>
          <p>
            {isBn
              ? 'ঘাস সাইলেজের সর্বনিম্ন অনলাইন অর্ডার ২০ প্যাকেট (৫০ কেজি/প্যাকেট, মোট ১ টন) এবং সর্বোচ্চ ৪০০ প্যাকেট (২০ টন)। ট্রাকের পরিবহন খরচ জেলা দূরত্বের ভিত্তিতে নির্ধারিত হয়।'
              : 'Grass Silage is sold in 50 kg packets with a minimum quantity of 20 packets (1 metric ton) and a maximum of 400 packets per consignment. Heavy truck freight is calculated based on destination district road distance.'}
          </p>
        </section>

        <section className="space-y-2 p-5 rounded-2xl glass-panel-subtle">
          <h2 className="text-base font-serif font-bold text-[#F6F4EC]">
            {isBn ? '৩. ডিজিটাল পেমেন্ট নিরাপত্তা' : '3. Payment & Transaction Security'}
          </h2>
          <p>
            {isBn
              ? 'বিকাশ, নগদ, উপায় বা রকেটে পার্সোনাল পেমেন্ট করার পর সঠিক TrxID প্রদান আবশ্যক। শাহী এগ্রো ফার্ম কখনোই গ্রাহকের পিন বা ওটিপি চাইবে না।'
              : 'When paying via bKash, Nagad, Upay, or Rocket, customers must provide the correct Transaction ID (TrxID). We will NEVER request account PINs, passwords, or OTPs.'}
          </p>
        </section>
      </div>
    </div>
  );
};

export const ShippingReturnsPage: React.FC<PolicyPageProps> = ({ navigate }) => {
  const { isBn } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-xs text-[#A9B9A8] hover:text-[#D8B56D] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isBn ? 'হোমে ফিরে যান' : 'Back to Home'}</span>
        </button>
      </div>

      <div className="border-b border-[#D8B56D]/20 pb-4">
        <div className="text-xs uppercase tracking-wider text-[#D8B56D] font-semibold mb-1">
          {isBn ? 'ডেলিভারি ও রিটার্ন' : 'Logistics & Replacements'}
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#F6F4EC] tracking-tight">
          {isBn ? 'ডেলিভারি ও রিটার্ন পলিসি' : 'Shipping and Returns'}
        </h1>
        <p className="text-xs text-[#A9B9A8] mt-1">
          {isBn ? 'সারাদেশে ৬৪ জেলায় পরিবহন কার্যক্রম' : '64-District Transport Operations across Bangladesh'}
        </p>
      </div>

      <div className="space-y-6 text-sm text-[#A9B9A8] leading-relaxed">
        <section className="space-y-2 p-5 rounded-2xl glass-panel-subtle">
          <h2 className="text-base font-serif font-bold text-[#F6F4EC] flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#D8B56D]" />
            <span>{isBn ? '১. ডেলিভারি কভারেজ ও সময়সীমা' : '1. Coverage & Delivery Timelines'}</span>
          </h2>
          <ul className="list-disc list-inside space-y-1 text-xs text-[#F6F4EC] pl-1">
            <li>
              <strong>{isBn ? 'শাহী গাভীর ঘি:' : 'Shahi Cow Ghee:'}</strong> {isBn ? 'কুরিয়ার যোগে ২ থেকে ৪ কার্যদিবসের মধ্যে সারা বাংলাদেশে হোম ডেলিভারি।' : 'Dispatched via reliable courier across all 64 districts in 2-4 working days.'}
            </li>
            <li>
              <strong>{isBn ? 'ঘাস সাইলেজ:' : 'Grass Silage:'}</strong> {isBn ? 'পিকআপ বা ট্রাক বোঝাই সরাসরি আপনার খামারে ২৪ থেকে ৪৮ ঘণ্টার মধ্যে পৌঁছে দেওয়ার ব্যবস্থা।' : 'Dispatched via dedicated truck or pickup within 24-48 hours after order confirmation.'}
            </li>
          </ul>
        </section>

        <section className="space-y-2 p-5 rounded-2xl glass-panel-subtle">
          <h2 className="text-base font-serif font-bold text-[#F6F4EC] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D8B56D]" />
            <span>{isBn ? '২. ক্ষতিগ্রস্ত পণ্যের রিপ্লেসমেন্ট' : '2. Damaged Product Replacement'}</span>
          </h2>
          <p>
            {isBn
              ? `কুরিয়ারে পরিবহনের সময় যদি ঘিয়ের কাচের জার ভাঙা অবস্থায় পাওয়া যায়, প্রাপ্তির ৪৮ ঘণ্টার মধ্যে ছবি তুলে আমাদের হোয়াটসঅ্যাপে (${BUSINESS_CONFIG.whatsappNumber}) জানান। আমরা সম্পূর্ণ বিনামূল্যে নতুন জার পাঠিয়ে দেব বা মূল্য ফেরত দেব।`
              : `If a glass jar of Shahi Ghee arrives damaged or cracked, please take a photo and contact our WhatsApp at ${BUSINESS_CONFIG.whatsappNumber} within 48 hours for an immediate free replacement or refund.`}
          </p>
        </section>
      </div>
    </div>
  );
};
