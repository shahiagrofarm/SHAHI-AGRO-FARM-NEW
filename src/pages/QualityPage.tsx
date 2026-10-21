import React from 'react';
import { ShieldCheck, Sprout, Sparkles, Truck, CheckCircle2, PackageCheck, AlertCircle, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';

interface QualityPageProps {
  navigate: (path: string) => void;
}

export const QualityPage: React.FC<QualityPageProps> = ({ navigate }) => {
  const { t, isBn } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B241D] border border-[#D8B56D]/30 text-xs text-[#D8B56D] font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{isBn ? 'বিশুদ্ধতা ও পুষ্টিমান মানদণ্ড' : 'Verified Quality Standards'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F6F4EC] tracking-tight">
          {isBn ? 'উৎপাদন পদ্ধতি ও গুণমানের নিশ্চয়তা' : 'Production Process & Quality Assurance'}
        </h1>
        <p className="text-sm sm:text-base text-[#A9B9A8] leading-relaxed">
          {isBn
            ? 'কোনো প্রকার কৃত্রিম রাসায়নিক বা ভেজাল ছাড়াই আধুনিক কৃষিপদ্ধতি এবং সনাতন দুগ্ধজাত ঐতিহ্যের সমন্বয়ে খাদ্য প্রস্তুত করা হয়।'
            : 'Science-backed green fodder preservation and authentic slow-cooked dairy craft based strictly on verified agricultural practices.'}
        </p>
      </div>

      {/* Grass Silage Quality Deep Dive */}
      <section className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#D8B56D]/25 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs uppercase tracking-wider text-[#D8B56D] font-semibold">
              {isBn ? 'গবাদিপশুর সুষম পুষ্টি' : 'Scientific Dairy Cattle Fodder'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F6F4EC]">
              {isBn ? 'ঘাস সাইলেজ: ৫০ কেজি সিলড প্যাকেটের বিজ্ঞান' : 'Grass Silage: 50 kg Sealed Packets'}
            </h2>
            <p className="text-sm text-[#A9B9A8] leading-relaxed">
              {isBn
                ? 'কাঁচা ঘাসে পানির পরিমাণ বেশি থাকায় স্বাভাবিক অবস্থায় তা দ্রুত পচে যায়। শাহী এগ্রো ফার্মে আমরা উন্নত জাতের ভুট্টা ও ঘাস পূর্ণ পুষ্টিমান অবস্থায় কেটে বিশেষ উচ্চচাপযুক্ত বায়ুরোধী ফিল্ম দিয়ে ৫০ কেজির প্যাকেটে মুড়িয়ে দিই। এতে প্রাকৃতিকভাবে ল্যাকটিক এসিড তৈরি হয়ে ক্ষতিকর ব্যাকটেরিয়া ও ছত্রাক ধ্বংস করে এবং পুষ্টিমান অটুট রাখে।'
                : 'Fresh green fodder naturally degrades quickly. At Shahi Agro Farm, we harvest nutritious hybrid corn and forage grass at peak nutrient density, chop it to optimal size, and seal it under high anaerobic pressure in 50 kg UV-protected film packets. Controlled lactic acid fermentation naturally preserves the feed.'}
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F6F4EC]">
                <CheckCircle2 className="w-4 h-4 text-[#D8B56D] mt-0.5 shrink-0" />
                <span>{isBn ? '৮.৫% থেকে ১১.৫% ক্রুড প্রোটিন এবং ৬২-৬৮% প্রাকৃতিক আর্দ্রতা' : '8.5% - 11.5% crude protein and 62-68% natural plant moisture'}</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F6F4EC]">
                <CheckCircle2 className="w-4 h-4 text-[#D8B56D] mt-0.5 shrink-0" />
                <span>{isBn ? 'বাতাস ও রোদরোধী ইউভি প্যাকেটে ১২ মাস পর্যন্ত নিরাপদ সংরক্ষণ' : 'Up to 12 months shelf-life in airtight, unopened UV packaging'}</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F6F4EC]">
                <CheckCircle2 className="w-4 h-4 text-[#D8B56D] mt-0.5 shrink-0" />
                <span>{isBn ? 'দুগ্ধবতী গাভীর দৈনিক দুধের পরিমাণ ও ফ্যাট বজায় রাখতে সহায়ক' : 'Maintains daily milk output and butterfat during seasonal dry periods'}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative perspective-container">
            <div className="card-3d rounded-2xl overflow-hidden glass-panel-subtle p-2">
              <div className="rounded-xl overflow-hidden aspect-[4/3] bg-[#090D0B]">
                <ImageWithFallback
                  src="/images/shahi_grass_silage.jpg"
                  alt="Packets of 50kg grass silage fodder"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pure Cow Ghee Quality Deep Dive */}
      <section className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#D8B56D]/25 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 relative perspective-container">
            <div className="card-3d rounded-2xl overflow-hidden glass-panel-subtle p-2">
              <div className="rounded-xl overflow-hidden aspect-[4/3] bg-[#090D0B]">
                <ImageWithFallback
                  src="/images/shahi_pure_cow_ghee.jpg"
                  alt="Pure artisanal golden cow ghee in glass jar"
                  category="Artisanal Dairy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
            <span className="text-xs uppercase tracking-wider text-[#D8B56D] font-semibold">
              {isBn ? 'খাঁটি দুগ্ধজাত ঐতিহ্য' : 'Artisanal Dairy Craft'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F6F4EC]">
              {isBn ? 'শাহী গাভীর ঘি: ধীর আঁচে ফুটানো খাঁটি ঘ্রাণ' : 'Shahi Cow Ghee: Slow-Simmered Purity'}
            </h2>
            <p className="text-sm text-[#A9B9A8] leading-relaxed">
              {isBn
                ? 'বাণিজ্যিক ঘি কারখানায় উচ্চ তাপে কেমিক্যাল প্রসেস ব্যবহার করা হয়, যা ঘিয়ের প্রাকৃতিক গুণ ও ঘ্রাণ নষ্ট করে দেয়। শাহী ঘি প্রস্তুত হয় গাভীর খাঁটি দুধের মাখন থেকে। ভারি পাত্রে মৃদু আঁচে দীর্ঘক্ষণ ফুটানোর ফলে মিল্ক সলিড সোনালী হয়ে অসাধারণ দানাদার টেক্সচার ও প্রাকৃতিক সুগন্ধ সৃষ্টি করে।'
                : 'Commercial factories often use high heat and chemical refining. Shahi Cow Ghee is made the traditional way from pure cow milk cultured butter. Slow simmering on gentle heat caramelizes milk solids naturally, creating an authentic golden granular (danedar) texture and nutty aroma.'}
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F6F4EC]">
                <CheckCircle2 className="w-4 h-4 text-[#D8B56D] mt-0.5 shrink-0" />
                <span>{isBn ? 'শতভাগ গরুর দুধের মাখনের তৈরি (২০০ গ্রাম ও ৯০০ গ্রাম ফুড-গ্রেড কাচের জার)' : '100% cow butter origin in sterilized 200g and 900g glass jars'}</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F6F4EC]">
                <CheckCircle2 className="w-4 h-4 text-[#D8B56D] mt-0.5 shrink-0" />
                <span>{isBn ? 'সম্পূর্ণ কৃত্রিম রং, ডালডা, পাম অয়েল ও ফ্লেভার বর্জিত' : 'Zero palm oil, zero synthetic colorants, zero artificial flavorings'}</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F6F4EC]">
                <CheckCircle2 className="w-4 h-4 text-[#D8B56D] mt-0.5 shrink-0" />
                <span>{isBn ? 'প্রাকৃতিক ভিটামিন এ, ডি, ই এবং সুস্থ ফ্যাটি এসিডে সমৃদ্ধ' : 'Naturally rich in fat-soluble vitamins (A, D, E) and butyric acid'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Storage and Handling Guidelines */}
      <section className="p-8 sm:p-10 rounded-3xl bg-[#0B241D]/60 border border-[#D8B56D]/20 space-y-6">
        <div className="flex items-center gap-3">
          <PackageCheck className="w-6 h-6 text-[#D8B56D]" />
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F6F4EC]">
            {isBn ? 'সঠিক সংরক্ষণ ও হ্যান্ডলিং নির্দেশিকা' : 'Storage & Handling Guidelines'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-[#A9B9A8] leading-relaxed">
          <div className="space-y-2 p-5 rounded-2xl bg-[#090D0B] border border-[#D8B56D]/15">
            <h3 className="font-serif font-bold text-base text-[#F6F4EC]">
              {isBn ? 'ঘাস সাইলেজ সংরক্ষণ:' : 'Grass Silage Storage:'}
            </h3>
            <ul className="list-disc list-inside space-y-1.5 pl-1">
              <li>{isBn ? 'প্যাকেটগুলো ধারালো বস্তু, ইঁদুর ও কুকুর থেকে দূরে শুকনো সমতল স্থানে রাখুন।' : 'Store unopened 50 kg packets in a clean, shaded, dry location away from rodents.'}</li>
              <li>{isBn ? 'প্যাকেটের প্লাস্টিক অক্ষত থাকলে ১২ মাস পর্যন্ত ঘাস স্বাভাবিক পুষ্টি ধরে রাখে।' : 'Maintains nutritional freshness for up to 12 months as long as the multi-layer seal is unbroken.'}</li>
              <li>{isBn ? 'প্যাকেট কাটার পর কয়েক দিনের মধ্যে গবাদিপশুকে খাইয়ে শেষ করুন।' : 'Once a packet is opened, feed it to livestock within a few days to preserve moisture.'}</li>
            </ul>
          </div>

          <div className="space-y-2 p-5 rounded-2xl bg-[#090D0B] border border-[#D8B56D]/15">
            <h3 className="font-serif font-bold text-base text-[#F6F4EC]">
              {isBn ? 'খাঁটি ঘি সংরক্ষণ:' : 'Cow Ghee Storage:'}
            </h3>
            <ul className="list-disc list-inside space-y-1.5 pl-1">
              <li>{isBn ? 'ঘি ব্যবহারের সময় সর্বদা শুকনো পরিষ্কার চামচ ব্যবহার করুন।' : 'Always use a clean, dry spoon when serving ghee to prevent moisture entry.'}</li>
              <li>{isBn ? 'সরাসরি সূর্যের আলো থেকে দূরে সাধারণ ঘরের তাপমাত্রায় রাখুন (ফ্রিজে রাখার প্রয়োজন নেই)।' : 'Store at normal room temperature in a cool, dry pantry away from direct sunlight.'}</li>
              <li>{isBn ? 'আবহাওয়ার পরিবর্তনে ঘিয়ের দানাদার ঘনত্ব পরিবর্তন হতে পারে, যা প্রাকৃতিক বিশুদ্ধতারই প্রমাণ।' : 'Natural crystallization (danedar texture) may vary with seasonal temperature changes.'}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Button */}
      <div className="text-center pt-4">
        <button
          onClick={() => navigate('/shop')}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D8B56D] to-[#c7a45c] hover:from-[#e3c178] hover:to-[#d8b56d] text-[#090D0B] font-bold text-sm shadow-xl transition-all hover:scale-105"
        >
          <span>{t('heroCtaShop')}</span>
          <ArrowRight className="w-4 h-4 text-[#090D0B]" />
        </button>
      </div>
    </div>
  );
};
