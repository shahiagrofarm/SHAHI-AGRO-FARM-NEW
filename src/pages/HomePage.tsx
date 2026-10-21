import React, { useState } from 'react';
import { 
  ShoppingBag, 
  MessageCircle, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Award, 
  PhoneCall, 
  MapPin, 
  Mail, 
  ExternalLink 
} from 'lucide-react';
import { PRODUCTS } from '../data/products.ts';
import { BUSINESS_CONFIG } from '../data/config.ts';
import { ProductCard } from '../components/ProductCard.tsx';
import { ImageWithFallback } from '../components/ImageWithFallback.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';

interface HomePageProps {
  navigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const { t, isBn, lang } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const homeFaqs = [
    {
      qEn: 'What is Grass Silage and how does it help dairy cattle?',
      qBn: 'ঘাস সাইলেজ কী এবং এটি গাভীর জন্য কেন বিশেষ উপকারী?',
      aEn: 'Grass Silage is high-protein green fodder fermented under airtight conditions in 50 kg packets. It retains natural plant moisture, soluble sugars, and enzymes, preventing seasonal milk yield drop during drought and monsoons.',
      aBn: 'ঘাস সাইলেজ হলো বিজ্ঞানসম্মত উপায়ে প্রস্তুতকৃত কাঁচা ঘাসের ফার্মেন্টেড সুষম খাবার (৫০ কেজি প্যাকেট)। এটি শুষ্ক মৌসুমে কাঁচা ঘাসের অভাব পূরণ করে গাভীর দৈনিক দুধের উৎপাদন ও স্বাস্থ্য ঠিক রাখে।'
    },
    {
      qEn: 'What is the minimum order quantity for Grass Silage?',
      qBn: 'ঘাস সাইলেজের সর্বনিম্ন অর্ডার কত?',
      aEn: 'The minimum order is 20 packets (approx. 1,000 kg total, ৳7,000). Orders increment in steps of 10 packets up to 400 packets (20 metric tons).',
      aBn: 'ঘাস সাইলেজের সর্বনিম্ন অর্ডার ২০ প্যাকেট (মোট ১,০০০ কেজি, ৳৭,০০০)। প্রতি ধাপে ১০ প্যাকেট করে সর্বোচ্চ ৪০০ প্যাকেট (২০ মেট্রিক টন) পর্যন্ত অনলাইনে অর্ডার করা যায়।'
    },
    {
      qEn: 'How is Shahi Cow Ghee produced?',
      qBn: 'শাহী গরুর ঘি কীভাবে প্রস্তুত করা হয়?',
      aEn: 'Our ghee is slow-simmered using traditional bilona methods strictly from the cultured butter of fresh cow milk. It contains zero palm oil, zero chemical scents, and features an authentic golden granular (danedar) texture.',
      aBn: 'আমাদের ঘি তৈরি হয় দেশি গাভীর দুধের মাখন থেকে ঐতিহ্যবাহী ধীর আঁচে জ্বাল দিয়ে। এতে কোনো প্রকার প্রিজারভেটিভ, ডালডা বা কৃত্রিম গন্ধ মেশানো হয় না।'
    },
    {
      qEn: 'How does delivery and payment work across Bangladesh?',
      qBn: 'সারা দেশে ডেলিভারি ও পেমেন্ট কীভাবে সম্পন্ন হয়?',
      aEn: 'We deliver to all 64 districts. Shahi Ghee is dispatched via doorstep courier. Grass Silage is delivered via dedicated pickup/truck loads. We accept Cash on Delivery (COD) and manual personal bKash, Nagad, Upay, or Rocket payments with transaction verification.',
      aBn: 'আমরা ৬৪ জেলাতেই পণ্য পাঠাই। ঘি কুরিয়ারে এবং সাইলেজ ট্রাকে পাঠানো হয়। ক্যাশ অন ডেলিভারি এবং বিকাশ, নগদ, উপায় বা রকেটের মাধ্যমে পেমেন্ট করা যায়।'
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 3. Premium 3D Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-20 lg:py-28 border-b border-[#D8B56D]/20">
        {/* Layered radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-radial from-[#063D2E]/30 via-[#0B241D]/10 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Quiet kicker */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B241D] border border-[#D8B56D]/30 text-xs text-[#D8B56D] font-medium tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#D8B56D]" />
                <span>{isBn ? 'সুবর্ণচর, নোয়াখালী · বাংলাদেশ' : 'Shubornochar, Noakhali · Bangladesh'}</span>
              </div>

              {/* Verified Editorial Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#F6F4EC] tracking-tight leading-[1.12] text-balance">
                {isBn ? (
                  <>
                    প্রকৃতির নিখাদ গুণ। <br />
                    <span className="text-[#D8B56D]">মাটির খাঁটি স্বাদ।</span>
                  </>
                ) : (
                  <>
                    Pure Goodness. <br />
                    <span className="text-[#D8B56D]">Rooted in Nature.</span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-[#A9B9A8] leading-relaxed max-w-2xl">
                {isBn
                  ? 'শাহী এগ্রো ফার্মের প্রিমিয়াম ৫০ কেজি ঘাস সাইলেজ প্যাকেট এবং ঐতিহ্যবাহী খাঁটি গাভীর ঘি। গবাদিপশুর স্বাস্থ্য সুরক্ষা এবং পরিবারের নির্ভেজাল পুষ্টির সেরা সমাধান।'
                  : 'Discover quality farm products from Shahi Agro Farm: premium 50 kg cattle grass silage fodder packets and authentic slow-simmered golden cow ghee.'}
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigate('/shop')}
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#063D2E] to-[#0B241D] hover:from-[#084e3b] hover:to-[#0f3229] border border-[#D8B56D]/40 text-[#F6F4EC] font-bold text-sm shadow-xl shadow-black/50 flex items-center gap-2.5 transition-all hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-[#D8B56D]"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D8B56D]" />
                  <span>{t('heroCtaShop')}</span>
                  <ArrowRight className="w-4 h-4 text-[#D8B56D]" />
                </button>

                <button
                  onClick={() => navigate('/about')}
                  className="px-7 py-3.5 rounded-xl glass-panel-subtle hover:border-[#D8B56D]/40 text-[#F6F4EC] font-semibold text-sm flex items-center gap-2 transition-all hover:bg-[#0B241D]/80"
                >
                  <span>{t('heroCtaStory')}</span>
                  <ArrowRight className="w-4 h-4 text-[#A9B9A8]" />
                </button>
              </div>

              {/* Trust Indicators Strip */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-[#D8B56D]/15 text-xs text-[#A9B9A8]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D8B56D] shrink-0" />
                  <span>{t('heroTrustGhee')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#D8B56D] shrink-0" />
                  <span>{t('heroTrustDistricts')}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <Award className="w-4 h-4 text-[#D8B56D] shrink-0" />
                  <span>{t('heroTrustFarm')}</span>
                </div>
              </div>
            </div>

            {/* Right Media Column with 3D Depth */}
            <div className="lg:col-span-5 relative perspective-container">
              <div className="card-3d relative rounded-2xl overflow-hidden glass-panel p-2 shadow-2xl shadow-black/80">
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-[#090D0B]">
                  <ImageWithFallback
                    src="/images/hero_shahi_farm.jpg"
                    alt="Shahi Agro Farm pastures in Shubornochar Noakhali Bangladesh"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D0B]/85 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-xs">
                    <p className="font-serif font-bold text-sm text-[#F6F4EC]">
                      {isBn ? 'সুবর্ণচরের সবুজ চারণভূমি ও খামার' : 'Coastal Agro Pastures & Farm Facilities'}
                    </p>
                    <p className="text-[#D8B56D] text-[11px]">
                      {isBn ? 'প্রাকৃতিক পরিবেশে সুষম লালন-পালন' : 'Nourished naturally in Noakhali, Bangladesh'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Products (Exactly the 3 Products) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#D8B56D] font-semibold mb-1">
              {isBn ? 'খামারের মূল পণ্যতালিকা' : 'Storefront Offerings'}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#F6F4EC] tracking-tight">
              {t('featuredTitle')}
            </h2>
            <p className="text-sm text-[#A9B9A8] mt-1">
              {t('featuredSubtitle')}
            </p>
          </div>

          <button
            onClick={() => navigate('/shop')}
            className="text-xs sm:text-sm font-semibold text-[#D8B56D] hover:underline flex items-center gap-1.5 self-start sm:self-auto transition-colors"
          >
            <span>{t('viewAllProducts')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} navigate={navigate} />
          ))}
        </div>
      </section>

      {/* 5. Product Benefits & Information Section */}
      <section className="glass-panel border-y border-[#D8B56D]/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#D8B56D] font-semibold">
              {isBn ? 'কেন শাহী এগ্রো ফার্মের পণ্য অনন্য?' : 'Why Choose Shahi Agro Farm?'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F6F4EC]">
              {isBn ? 'সঠিক পুষ্টি ও বিশুদ্ধতার বিজ্ঞানসম্মত সমন্বয়' : 'The Science of Nutrition & Traditional Purity'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl glass-panel-subtle space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#063D2E] border border-[#D8B56D]/40 text-[#D8B56D] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#F6F4EC]">
                {isBn ? '১০০% ভেজালমুক্ত খাঁটি গাভীর ঘি' : '100% Pure Cow Ghee'}
              </h3>
              <p className="text-xs sm:text-sm text-[#A9B9A8] leading-relaxed">
                {isBn
                  ? 'কোনো প্রকার পাম অয়েল, কৃত্রিম সুবাস বা কেমিক্যাল ছাড়াই খাঁটি মাখন থেকে সনাতন মৃদু তাপে ধীরে ধীরে জ্বাল দিয়ে প্রস্তুতকৃত সোনালী দানাদার ঘি।'
                  : 'Slow-simmered from pure cow milk curd butter. Absolutely zero palm oil, hydrogenated fats, or artificial essences.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-panel-subtle space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#063D2E] border border-[#D8B56D]/40 text-[#D8B56D] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#F6F4EC]">
                {isBn ? '৫০ কেজি হাই-প্রোটিন সাইলেজ' : '50 kg High-Protein Silage'}
              </h3>
              <p className="text-xs sm:text-sm text-[#A9B9A8] leading-relaxed">
                {isBn
                  ? 'হাইব্রিড ঘাস ও ভুট্টার সমন্বয়ে বৈজ্ঞানিক ল্যাকটিক ফারমেন্টেশন। ৫০ কেজির প্রতিটি প্যাকেট ইউভি-সুরক্ষিত এবং বছরজুড়ে খামারের কাঁচা ঘাসের জোগান দেয়।'
                  : 'Hermetically wrapped in 50 kg UV-resistant film packets. Preserves 62-68% moisture and high crude protein for peak dairy output.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-panel-subtle space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#063D2E] border border-[#D8B56D]/40 text-[#D8B56D] flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#F6F4EC]">
                {isBn ? '৬৪ জেলায় পরিবহন সুবিধা' : 'Nationwide 64-District Transport'}
              </h3>
              <p className="text-xs sm:text-sm text-[#A9B9A8] leading-relaxed">
                {isBn
                  ? 'ঘি কুরিয়ার সার্ভিসে এবং ঘাস সাইলেজ পিকআপ বা ট্রাক বোঝাই সরাসরি আপনার খামারের ঠিকানায় নিরাপদে পৌঁছে দেওয়ার নির্ভরযোগ্য ব্যবস্থা।'
                  : 'Doorstep courier for glass jar ghee and dedicated truck freight logistics for bulk silage consignments.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Brand Story Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative perspective-container order-2 lg:order-1">
            <div className="card-3d rounded-2xl overflow-hidden glass-panel p-2 shadow-2xl">
              <div className="rounded-xl overflow-hidden aspect-[4/3] bg-[#090D0B]">
                <ImageWithFallback
                  src="/images/shahi_farm_shed.jpg"
                  alt="Modern dairy cattle shed and silage feeding at Shahi Agro Farm"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <span className="text-xs uppercase tracking-wider text-[#D8B56D] font-semibold">
              {isBn ? 'আমাদের খামারের লক্ষ্য' : 'Our Brand Story'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#F6F4EC] tracking-tight">
              {isBn
                ? 'সুবর্ণচরের মাটি থেকে বাংলাদেশের প্রতিটি ঘরে বিশুদ্ধতার প্রতিশ্রুতি'
                : 'From the Soil of Shubornochar to Families Across Bangladesh'}
            </h2>
            <p className="text-sm sm:text-base text-[#A9B9A8] leading-relaxed">
              {isBn
                ? 'নোয়াখালীর সুবর্ণচরে প্রতিষ্ঠিত শাহী এগ্রো ফার্ম আধুনিক কৃষিবিজ্ঞান ও সনাতন দুগ্ধজাত ঐতিহ্যের এক মেলবন্ধন। আমাদের লক্ষ্য বাংলাদেশের বাণিজ্যিক ডেইরি খামারিদের ঘাসের তীব্র সংকট থেকে মুক্তি দেওয়া এবং খাদ্যপ্রেমী পরিবারগুলোতে আসল গাভীর ঘিয়ের সুঘ্রাণ ফিরিয়ে আনা।'
                : 'Established at Shubornochar in Noakhali, Shahi Agro Farm connects modern agricultural science with traditional artisanal food processing. We solve critical fodder scarcity for commercial dairy farmers while restoring authentic, unadulterated cow ghee.'}
            </p>

            <button
              onClick={() => navigate('/about')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B241D] hover:bg-[#063D2E] border border-[#D8B56D]/40 text-[#D8B56D] font-semibold text-xs sm:text-sm transition-colors"
            >
              <span>{isBn ? 'আমাদের বিস্তারিত গল্প পড়ুন' : 'Read Our Full Story'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. Quality & Process Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#D8B56D]/25 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#D8B56D] font-semibold">
                {t('navQuality')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F6F4EC]">
                {t('qualityTitle')}
              </h2>
            </div>
            <button
              onClick={() => navigate('/quality')}
              className="text-xs sm:text-sm text-[#D8B56D] font-semibold hover:underline flex items-center gap-1"
            >
              <span>{isBn ? 'বিস্তারিত প্রক্রিয়া জানুন' : 'Explore Detailed Process'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-[#090D0B]/80 border border-[#D8B56D]/20 space-y-2.5">
              <h3 className="text-lg font-serif font-bold text-[#D8B56D]">
                {t('silageProcess')}
              </h3>
              <p className="text-xs sm:text-sm text-[#A9B9A8] leading-relaxed">
                {t('silageProcessDesc')}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#090D0B]/80 border border-[#D8B56D]/20 space-y-2.5">
              <h3 className="text-lg font-serif font-bold text-[#D8B56D]">
                {t('gheeCraft')}
              </h3>
              <p className="text-xs sm:text-sm text-[#A9B9A8] leading-relaxed">
                {t('gheeCraftDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. How to Order (3 Clean Steps) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-wider text-[#D8B56D] font-semibold">
            {isBn ? 'সহজ ও স্বচ্ছ কেনাকাটা' : 'Simple & Transparent'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F6F4EC]">
            {isBn ? 'কীভাবে অর্ডার করবেন?' : 'How to Place an Order'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl glass-panel space-y-3">
            <div className="w-9 h-9 rounded-xl bg-[#063D2E] border border-[#D8B56D]/40 text-[#D8B56D] font-mono font-bold flex items-center justify-center text-sm">
              ০১
            </div>
            <h3 className="text-base font-semibold text-[#F6F4EC]">
              {isBn ? 'পণ্য ও পরিমাণ নির্বাচন করুন' : 'Select Product & Quantity'}
            </h3>
            <p className="text-xs text-[#A9B9A8] leading-relaxed">
              {isBn
                ? 'ঘাস সাইলেজ (সর্বনিম্ন ২০ প্যাকেট) বা খাঁটি ঘি (২০০ গ্রাম বা ৯০০ গ্রাম) বেছে নিয়ে কার্টে যোগ করুন।'
                : 'Choose Grass Silage (min 20 packets) or pure cow ghee (200g or 900g jar) and add to cart.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel space-y-3">
            <div className="w-9 h-9 rounded-xl bg-[#063D2E] border border-[#D8B56D]/40 text-[#D8B56D] font-mono font-bold flex items-center justify-center text-sm">
              ০২
            </div>
            <h3 className="text-base font-semibold text-[#F6F4EC]">
              {isBn ? 'চেকআউট বা হোয়াটসঅ্যাপ অর্ডার' : 'Checkout or WhatsApp'}
            </h3>
            <p className="text-xs text-[#A9B9A8] leading-relaxed">
              {isBn
                ? 'আপনার জেলা ও পূর্ণ ঠিকানা দিন। ক্যাশ অন ডেলিভারি কিংবা বিকাশ, নগদ, রকেটে পেমেন্ট বেছে নিন।'
                : 'Provide your district and full delivery address. Select Cash on Delivery or digital payment.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel space-y-3">
            <div className="w-9 h-9 rounded-xl bg-[#063D2E] border border-[#D8B56D]/40 text-[#D8B56D] font-mono font-bold flex items-center justify-center text-sm">
              ০৩
            </div>
            <h3 className="text-base font-semibold text-[#F6F4EC]">
              {isBn ? 'যাচাই ও পরিবহন নিশ্চিতকরণ' : 'Verification & Dispatch'}
            </h3>
            <p className="text-xs text-[#A9B9A8] leading-relaxed">
              {isBn
                ? 'খামার ব্যবস্থাপক আপনার সাথে যোগাযোগ করে ট্রাক বা কুরিয়ারে সঠিক সময়ে পণ্য পাঠিয়ে দেবেন।'
                : 'Farm management confirms your shipment and coordinates truck or courier dispatch.'}
            </p>
          </div>
        </div>
      </section>

      {/* 9. FAQ Preview */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-wider text-[#D8B56D] font-semibold">
            {t('navFaq')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F6F4EC]">
            {t('faqTitle')}
          </h2>
        </div>

        <div className="space-y-3 pt-2">
          {homeFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="glass-panel rounded-xl overflow-hidden border border-[#D8B56D]/20 transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-semibold text-[#F6F4EC] hover:text-[#D8B56D] transition-colors"
                >
                  <span>{isBn ? faq.qBn : faq.qEn}</span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-[#D8B56D] shrink-0" /> : <ChevronDown className="w-5 h-5 text-[#A9B9A8] shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#A9B9A8] leading-relaxed border-t border-[#D8B56D]/15 pt-3">
                    {isBn ? faq.aBn : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => navigate('/faq')}
            className="text-xs font-semibold text-[#D8B56D] hover:underline"
          >
            {isBn ? 'আরও সকল প্রশ্ন ও উত্তর দেখুন →' : 'View All Frequently Asked Questions →'}
          </button>
        </div>
      </section>

      {/* 10. Direct Contact & Social Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#063D2E] via-[#0B241D] to-[#090D0B] border border-[#D8B56D]/40 p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center lg:text-left max-w-xl">
            <span className="text-xs uppercase tracking-wider text-[#D8B56D] font-semibold">
              {isBn ? 'সরাসরি খামার যোগাযোগ' : 'Direct Farm Inquiries'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#F6F4EC]">
              {isBn ? 'বাল্ক সাইলেজ কিংবা ঘিয়ের যেকোনো প্রশ্নে কথা বলুন' : 'Need Bulk Silage Delivery or Farm Consultation?'}
            </h3>
            <p className="text-xs sm:text-sm text-[#A9B9A8] leading-relaxed">
              {isBn
                ? `সরাসরি খামার মালিকের সাথে কথা বলতে কল বা হোয়াটসঅ্যাপ করুন: ${BUSINESS_CONFIG.phone}। সুবর্ণচর খামার ডিপো থেকে সারাদেশে সরাসরি সরবরাহ।`
                : `Connect directly with farm management on WhatsApp at ${BUSINESS_CONFIG.phone} for wholesale quotes and verified truck dispatch.`}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappIntl}?text=${encodeURIComponent('আসসালামু আলাইকুম শাহী এগ্রো ফার্ম। আমি ঘাস সাইলেজ এবং খাঁটি ঘি সম্পর্কে জানতে চাই।')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D8B56D] to-[#c7a45c] text-[#090D0B] font-bold text-sm shadow-xl flex items-center gap-2 whitespace-nowrap transition-all hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 text-[#090D0B]" />
              <span>{isBn ? 'হোয়াটসঅ্যাপে চ্যাট করুন' : 'Chat on WhatsApp'}</span>
            </a>

            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3.5 rounded-xl glass-panel-subtle text-[#F6F4EC] hover:text-[#D8B56D] font-semibold text-sm transition-colors whitespace-nowrap"
            >
              <span>{isBn ? 'যোগাযোগ পেজ' : 'Contact Details'}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
