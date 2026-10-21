import React, { useState } from 'react';
import { PRODUCTS } from '../data/products.ts';
import { ProductCard } from '../components/ProductCard.tsx';
import { Info, HelpCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/config.ts';
import { useLanguage } from '../context/LanguageContext.tsx';

interface ShopPageProps {
  navigate: (path: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ navigate }) => {
  const { isBn } = useLanguage();
  const [filter, setFilter] = useState<'All' | 'Cattle Feed' | 'Artisanal Dairy'>('All');

  const filteredProducts = PRODUCTS.filter(p => {
    if (filter === 'All') return true;
    return p.category === filter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header & Filter Controls */}
      <div className="border-b border-[#D8B56D]/20 pb-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#D8B56D] font-semibold mb-1">
              {isBn ? 'খামার শপ' : 'Storefront'}
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#F6F4EC] tracking-tight">
              {isBn ? 'শাহী এগ্রো ফার্ম পণ্যতালিকা' : 'Shahi Agro Farm Products'}
            </h1>
            <p className="text-sm text-[#A9B9A8] mt-2 max-w-2xl">
              {isBn
                ? 'সরাসরি খামার থেকে সংগৃহীত নির্ভেজাল পণ্য। ৫০ কেজির বৈজ্ঞানিক ঘাস সাইলেজ এবং শতভাগ খাঁটি গাভীর ঘি।'
                : 'Direct from farm production. 50 kg scientific grass silage packets and 100% pure handcrafted cow ghee.'}
            </p>
          </div>

          {/* Filter Segmented Control */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl glass-panel-subtle self-start md:self-auto">
            <button
              onClick={() => setFilter('All')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                filter === 'All'
                  ? 'bg-gradient-to-r from-[#063D2E] to-[#0B241D] text-[#D8B56D] border border-[#D8B56D]/40 shadow-sm'
                  : 'text-[#A9B9A8] hover:text-[#F6F4EC]'
              }`}
            >
              {isBn ? 'সকল পণ্য' : 'All Products'} ({PRODUCTS.length})
            </button>
            <button
              onClick={() => setFilter('Cattle Feed')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                filter === 'Cattle Feed'
                  ? 'bg-gradient-to-r from-[#063D2E] to-[#0B241D] text-[#D8B56D] border border-[#D8B56D]/40 shadow-sm'
                  : 'text-[#A9B9A8] hover:text-[#F6F4EC]'
              }`}
            >
              {isBn ? 'ঘাস সাইলেজ' : 'Cattle Feed'} (1)
            </button>
            <button
              onClick={() => setFilter('Artisanal Dairy')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                filter === 'Artisanal Dairy'
                  ? 'bg-gradient-to-r from-[#063D2E] to-[#0B241D] text-[#D8B56D] border border-[#D8B56D]/40 shadow-sm'
                  : 'text-[#A9B9A8] hover:text-[#F6F4EC]'
              }`}
            >
              {isBn ? 'খাঁটি গাভীর ঘি' : 'Pure Cow Ghee'} (2)
            </button>
          </div>
        </div>
      </div>

      {/* Verified Notice regarding Grass Silage quantity limits */}
      <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-[#D8B56D]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#A9B9A8]">
        <div className="flex items-start gap-3">
          <Info className="w-4 h-4 text-[#D8B56D] mt-0.5 shrink-0" />
          <div className="leading-relaxed">
            <strong className="text-[#F6F4EC]">
              {isBn ? 'অর্ডার সংক্রান্ত নির্দেশনা: ' : 'Ordering Guidelines: '}
            </strong>
            {isBn
              ? 'ঘাস সাইলেজ প্রতি প্যাকেট ৫০ কেজি, সর্বনিম্ন অর্ডার ২০ প্যাকেট (৳৭,০০০) এবং প্রতি ধাপে ১০ প্যাকেট করে বৃদ্ধি পায়। ঘি ১ জার থেকে যেকোনো পরিমাণে নেওয়া যায়।'
              : 'Grass Silage is packed in 50 kg packets with a minimum order of 20 packets (৳7,000) in steps of 10. Shahi Ghee is available from 1 jar.'}
          </div>
        </div>

        <a
          href={`https://wa.me/${BUSINESS_CONFIG.whatsappIntl}?text=${encodeURIComponent('Hello Shahi Agro Farm, I want to inquire about products in your shop.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#D8B56D] hover:underline font-semibold flex items-center gap-1.5 shrink-0"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{isBn ? 'হোয়াটসঅ্যাপে জিজ্ঞাসা' : 'Ask on WhatsApp'}</span>
        </a>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} navigate={navigate} />
        ))}
      </div>
    </div>
  );
};
