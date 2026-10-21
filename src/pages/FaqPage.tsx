import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/config.ts';
import { useLanguage } from '../context/LanguageContext.tsx';

interface FaqPageProps {
  navigate: (path: string) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ navigate }) => {
  const { t, isBn } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      qEn: 'What is Grass Silage and why should I feed it to dairy cattle?',
      qBn: 'ঘাস সাইলেজ কী এবং এটি গবাদিপশুকে কেন খাওয়াবেন?',
      aEn: 'Grass Silage is high-protein green fodder preserved through controlled airtight anaerobic fermentation in 50 kg packets. It solves dry-season green grass scarcity and provides consistent crude protein (8.5%-11.5%) and natural moisture, helping dairy cows maintain high milk yield year-round.',
      aBn: 'ঘাস সাইলেজ হলো উচ্চ পুষ্টিসমৃদ্ধ কাঁচা ঘাসের ফার্মেন্টেড সুষম গো-খাদ্য (৫০ কেজি প্যাকেট)। শুষ্ক মৌসুমে বা বর্ষায় যখন কাঁচা ঘাস পাওয়া যায় না, তখন এটি গাভীর দুধের উৎপাদন বৃদ্ধি ও শারীরিক স্বাস্থ্য ঠিক রাখতে অত্যন্ত কার্যকর।'
    },
    {
      qEn: 'What are the exact package weight and price for Grass Silage?',
      qBn: 'ঘাস সাইলেজের প্যাকেটের ওজন ও মূল্য কত?',
      aEn: 'Grass Silage comes in 50 kg packets at ৳350 per packet. The minimum online order is 20 packets (approx. 1,000 kg, total ৳7,000). Increments must be in steps of 10 packets up to 400 packets (full truckload).',
      aBn: 'ঘাস সাইলেজ প্রতি প্যাকেট ৫০ কেজি এবং প্যাকেটের মূল্য ৩৫০ টাকা। সর্বনিম্ন অর্ডার ২০ প্যাকেট (মোট ১,০০০ কেজি বা ১ টন, ৳৭,০০০)। প্রতি ধাপে ১০ প্যাকেট করে বৃদ্ধি পায় এবং সর্বোচ্চ ৪০০ প্যাকেট (২০ মেট্রিক টন) পর্যন্ত নেওয়া যায়।'
    },
    {
      qEn: 'What are the sizes and prices available for Shahi Cow Ghee?',
      qBn: 'শাহী খাঁটি গাভীর ঘিয়ের সাইজ ও দাম কত?',
      aEn: 'Shahi Cow Ghee is available in two sizes: 200g glass jar at ৳750, and 900g family pack glass jar at ৳1,450. Minimum order is 1 jar, with increments of 1.',
      aBn: 'শাহী গাভীর ঘি দুটি প্যাকেজে পাওয়া যায়: ২০০ গ্রাম কাচের জার (৳৭৫০) এবং ৯০০ গ্রাম ফ্যামিলি প্যাক জার (৳১,৪৫০)। সর্বনিম্ন ১ জার অর্ডার করা যায়।'
    },
    {
      qEn: 'How are delivery charges handled?',
      qBn: 'ডেলিভারি চার্জ কীভাবে নির্ধারিত হয়?',
      aEn: 'For Grass Silage, transport involves heavy freight trucks; delivery charges depend on road distance to your district and are confirmed by our team before dispatch. For Cow Ghee, standard courier shipping is calculated upon dispatch.',
      aBn: 'ঘাস সাইলেজ ভারী মালামাল হওয়ায় ট্রাকের ভাড়া জেলা দূরত্বের ভিত্তিতে খামার থেকে যোগাযোগ করে নিশ্চিত করা হয়। ঘিয়ের ক্ষেত্রে কুরিয়ারের নিয়মিত চার্জ প্রযোজ্য হয়।'
    },
    {
      qEn: 'Which payment methods are accepted?',
      qBn: 'কোন কোন মাধ্যমে মূল্য পরিশোধ করা যায়?',
      aEn: 'We support Cash on Delivery (COD) across Bangladesh, as well as manual Personal Send Money via bKash (01604985164), Nagad (01814026318), Upay (01814026318), and Rocket (01604985164). For digital methods, enter your Transaction ID (TrxID) during checkout.',
      aBn: 'আমরা ক্যাশ অন ডেলিভারি (পণ্য হাতে পেয়ে মূল্য পরিশোধ) এবং বিকাশ (01604985164), নগদ (01814026318), উপায় (01814026318) ও রকেটে (01604985164) পার্সোনাল সেন্ড মানি গ্রহণ করি।'
    },
    {
      qEn: 'How long can Grass Silage be stored?',
      qBn: 'ঘাস সাইলেজ কত দিন সংরক্ষণ করা যায়?',
      aEn: 'In sealed, unopened condition, the multi-layer UV film protects the silage for up to 12 months. Store on dry, shaded ground away from sharp objects and rodents. Once a packet is cut open, feed it within a few days.',
      aBn: 'প্যাকেট না কাটা অবস্থায় ইউভি-রোধী প্লাস্টিকে ১২ মাস পর্যন্ত ঘাস সম্পূর্ণ ভালো থাকে। শুকনো ছায়াযুক্ত স্থানে রাখতে হবে। প্যাকেট কাটার পর কয়েক দিনের মধ্যে গবাদিপশুকে খাইয়ে শেষ করতে হয়।'
    },
    {
      qEn: 'Is Shahi Cow Ghee made from 100% pure cow milk?',
      qBn: 'শাহী ঘি কি শতভাগ গরুর দুধ থেকে তৈরি?',
      aEn: 'Yes, absolutely. It is slow-simmered directly from fresh cow milk cultured butter. It contains zero palm oil, zero synthetic colorants, and zero added vegetable essence.',
      aBn: 'হ্যাঁ, শতভাগ নিশ্চিত। এটি দেশি গরুর খাঁটি দুধের মাখন থেকে ঐতিহ্যবাহী ধীর আঁচে প্রস্তুত করা হয়। এতে কোনো ডালডা, পাম তেল বা কৃত্রিম রাসায়নিক সুবাস নেই।'
    },
    {
      qEn: 'Where is Shahi Agro Farm located?',
      qBn: 'শাহী এগ্রো ফার্মের অবস্থান কোথায়?',
      aEn: `Our farm is located at: ${BUSINESS_CONFIG.address}. We deliver to all 64 districts of Bangladesh.`,
      aBn: `আমাদের খামার নোয়াখালীর সুবর্ণচরে: ${BUSINESS_CONFIG.addressBn}। আমরা সারা বাংলাদেশে সরাসরি পণ্য সরবরাহ করি।`
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B241D] border border-[#D8B56D]/30 text-xs text-[#D8B56D] font-semibold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{isBn ? 'সহায়তা কেন্দ্র' : 'Help & Answers'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F6F4EC] tracking-tight">
          {t('faqTitle')}
        </h1>
        <p className="text-sm text-[#A9B9A8] max-w-xl mx-auto">
          {t('faqSubtitle')}
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="glass-panel rounded-2xl overflow-hidden border border-[#D8B56D]/20 transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-serif font-bold text-[#F6F4EC] hover:text-[#D8B56D] transition-colors"
              >
                <span>{isBn ? faq.qBn : faq.qEn}</span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-[#D8B56D] shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#A9B9A8] shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-[#A9B9A8] leading-relaxed border-t border-[#D8B56D]/15 pt-4">
                  {isBn ? faq.aBn : faq.aEn}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Direct WhatsApp Callout */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#D8B56D]/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <h2 className="text-lg font-serif font-bold text-[#F6F4EC]">
            {isBn ? 'আপনার প্রশ্নের উত্তর খুঁজে পাননি?' : 'Have a custom inquiry or bulk order?'}
          </h2>
          <p className="text-xs text-[#A9B9A8] mt-1">
            {isBn ? 'সরাসরি আমাদের খামারের হোয়াটসঅ্যাপে যোগাযোগ করুন।' : 'Reach out directly to farm management on WhatsApp.'}
          </p>
        </div>

        <a
          href={`https://wa.me/${BUSINESS_CONFIG.whatsappIntl}?text=${encodeURIComponent('Hello Shahi Agro Farm, I have a question not covered in your FAQ.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#063D2E] to-[#0B241D] hover:from-[#084e3b] hover:to-[#0f3229] border border-[#D8B56D]/40 text-[#D8B56D] font-bold text-xs flex items-center gap-2 whitespace-nowrap transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-[#D8B56D]" />
          <span>{isBn ? 'হোয়াটসঅ্যাপে জিজ্ঞাসা' : 'Ask on WhatsApp'}</span>
        </a>
      </div>
    </div>
  );
};
