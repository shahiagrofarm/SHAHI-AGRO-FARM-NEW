import React from 'react';
import { ShieldCheck, Sprout, Sparkles, Award, ArrowRight, MapPin, Mail, PhoneCall } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback.tsx';
import { BUSINESS_CONFIG } from '../data/config.ts';
import { useLanguage } from '../context/LanguageContext.tsx';

interface AboutPageProps {
  navigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  const { t, isBn } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B241D] border border-[#D8B56D]/30 text-xs text-[#D8B56D] font-semibold">
          <Sprout className="w-3.5 h-3.5" />
          <span>{isBn ? 'আমাদের খামারের পরিচিতি' : 'About Shahi Agro Farm'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F6F4EC] tracking-tight">
          {isBn ? 'সুবর্ণচরের মাটি থেকে নির্ভেজাল কৃষির বিকাশ' : 'Nourishing Livestock & Preserving Traditional Food Purity'}
        </h1>
        <p className="text-sm sm:text-base text-[#A9B9A8] leading-relaxed">
          {isBn
            ? 'নোয়াখালীর সুবর্ণচরে প্রতিষ্ঠিত শাহী এগ্রো ফার্ম বিজ্ঞানসম্মত গো-খাদ্য উৎপাদন এবং সনাতন দুগ্ধজাত বিশুদ্ধতার এক সমন্বিত উদ্যোগ।'
            : 'Located at Shubornochar in Noakhali, Bangladesh, Shahi Agro Farm produces scientific cattle grass silage fodder and authentic artisanal cow ghee.'}
        </p>
      </div>

      {/* Narrative Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative perspective-container">
          <div className="card-3d rounded-3xl overflow-hidden glass-panel p-2 shadow-2xl">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#090D0B]">
                <ImageWithFallback
                  src="/images/hero_shahi_farm.jpg"
                  alt="Shahi Agro Farm pastures and fodder cultivation in Shubornochar Noakhali"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#090D0B]/85 backdrop-blur-md border border-[#D8B56D]/40 text-xs text-[#F6F4EC] shadow-xl">
                  <div className="w-5 h-5 rounded-full overflow-hidden border border-[#D8B56D] bg-white shrink-0">
                    <img
                      src={BUSINESS_CONFIG.logo}
                      alt={BUSINESS_CONFIG.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-semibold text-xs text-[#D8B56D] tracking-wide">
                    {isBn ? BUSINESS_CONFIG.nameBn : BUSINESS_CONFIG.name}
                  </span>
                </div>
              </div>
          </div>
        </div>

        <div className="space-y-6 text-sm text-[#A9B9A8] leading-relaxed">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-wider text-[#D8B56D] font-semibold">
              {isBn ? 'আমাদের প্রতিষ্ঠা ও লক্ষ্য' : 'Our Mission & Story'}
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#F6F4EC]">
              {isBn ? 'বাংলাদেশের ডেইরি খামারিদের পাশে' : 'Supporting Bangladesh Dairy Farmers'}
            </h2>
            <p>
              {isBn
                ? 'বাংলাদেশের ডেইরি খাতে প্রধান অন্তরায় হলো সারা বছর সুষম কাঁচা ঘাসের অভাব। খরা কিংবা বর্ষায় ঘাসের সংকটে গাভীর দুধ উৎপাদন কমে যায়। এই বাস্তব সমস্যা সমাধানে শাহী এগ্রো ফার্ম উচ্চ প্রোটিনযুক্ত হাইব্রিড ভুট্টা ও ঘাস চাষ করে আধুনিক ল্যাকটিক ফারমেন্টেশন প্রযুক্তিতে ৫০ কেজির প্যাকেটে বায়ুরোধী সিল করে বাজারজাত করছে।'
                : 'Seasonal drought and floods disrupt natural green fodder supply for commercial dairy farms across Bangladesh. Shahi Agro Farm cultivates high-protein forage grass and corn, packing it hermetically in 50 kg UV-shielded packets. This guarantees consistent 8.5%-11.5% crude protein year-round.'}
            </p>
            <p>
              {isBn
                ? 'একই সাথে বাজারে রাসায়নিকযুক্ত ও ভেজাল ঘিয়ের বিপরীতে দেশি গাভীর খাঁটি মাখন থেকে ধীর আঁচে প্রস্তুতকৃত সুস্বাদু সোনালী দানাদার ঘি সরবরাহ করাই আমাদের অহংকার।'
                : 'Concurrently, we counter widespread commercial adulteration by preparing pure cow ghee exclusively from fresh cow milk butter with patient slow-cooking in heavy pots.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl glass-panel-subtle space-y-1.5 border border-[#D8B56D]/20">
              <Sprout className="w-5 h-5 text-[#D8B56D]" />
              <h3 className="font-serif font-bold text-sm text-[#F6F4EC]">
                {isBn ? 'সুষম পুষ্টি' : 'Scientific Nutrition'}
              </h3>
              <p className="text-[11px] text-[#A9B9A8]">
                {isBn ? '৮.৫%-১১.৫% ক্রুড প্রোটিন ও আর্দ্রতা অটুট।' : '8.5%-11.5% crude protein locked in UV film.'}
              </p>
            </div>
            <div className="p-4 rounded-2xl glass-panel-subtle space-y-1.5 border border-[#D8B56D]/20">
              <Award className="w-5 h-5 text-[#D8B56D]" />
              <h3 className="font-serif font-bold text-sm text-[#F6F4EC]">
                {isBn ? 'খাঁটি মাখনের ঘি' : 'Authentic Cow Ghee'}
              </h3>
              <p className="text-[11px] text-[#A9B9A8]">
                {isBn ? 'কোনো পাম অয়েল বা রাসায়নিক ফ্লেভার ছাড়া।' : 'Zero palm oil, zero synthetic essence.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Location & Facility Card */}
      <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-[#D8B56D]/30 space-y-6">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F6F4EC]">
          {isBn ? 'খামারের ভৌগোলিক অবস্থান ও অফিস' : 'Physical Location & Farm Depot'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#D8B56D] font-semibold text-xs">
              <MapPin className="w-4 h-4" />
              <span>{isBn ? 'ঠিকানা:' : 'Address:'}</span>
            </div>
            <p className="text-[#F6F4EC] leading-relaxed">
              {isBn ? BUSINESS_CONFIG.addressBn : BUSINESS_CONFIG.address}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#D8B56D] font-semibold text-xs">
              <Mail className="w-4 h-4" />
              <span>{isBn ? 'অফিসিয়াল ইমেইল:' : 'Official Email:'}</span>
            </div>
            <p className="text-[#F6F4EC]">
              <a href={`mailto:${BUSINESS_CONFIG.email}`} className="hover:underline">
                {BUSINESS_CONFIG.email}
              </a>
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#D8B56D] font-semibold text-xs">
              <PhoneCall className="w-4 h-4" />
              <span>{isBn ? 'হোয়াটসঅ্যাপ ও ফোন:' : 'WhatsApp & Phone:'}</span>
            </div>
            <p className="text-[#F6F4EC]">
              <a href={`https://wa.me/${BUSINESS_CONFIG.whatsappIntl}`} target="_blank" rel="noopener noreferrer" className="hover:underline font-mono">
                {BUSINESS_CONFIG.phone}
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center space-y-4 pt-4">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F6F4EC]">
          {isBn ? 'আমাদের পণ্য পরখ করে দেখুন' : 'Explore Our Farm Offerings'}
        </h2>
        <div>
          <button
            onClick={() => navigate('/shop')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D8B56D] to-[#c7a45c] hover:from-[#e3c178] hover:to-[#d8b56d] text-[#090D0B] font-bold text-sm shadow-xl transition-all hover:scale-105"
          >
            <span>{t('viewAllProducts')}</span>
            <ArrowRight className="w-4 h-4 text-[#090D0B]" />
          </button>
        </div>
      </div>
    </div>
  );
};
