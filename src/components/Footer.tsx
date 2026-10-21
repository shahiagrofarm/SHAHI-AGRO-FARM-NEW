import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Mail, ShieldCheck, ExternalLink, Check, Copy, Facebook } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/config.ts';
import { useLanguage } from '../context/LanguageContext.tsx';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const { t, isBn } = useLanguage();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleNav = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <footer className="bg-[#090D0B] border-t border-[#D8B56D]/20 text-[#A9B9A8] relative overflow-hidden">
      {/* Background glow subtlety */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 bg-radial from-[#063D2E]/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand & Verified Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-[#D8B56D]/60 shadow-md shadow-black/40 bg-white shrink-0">
                <img
                  src={BUSINESS_CONFIG.logo}
                  alt={isBn ? BUSINESS_CONFIG.nameBn : BUSINESS_CONFIG.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className="text-xl font-serif font-bold text-[#F6F4EC] tracking-tight">
                {isBn ? BUSINESS_CONFIG.nameBn : BUSINESS_CONFIG.name}
              </span>
            </div>
            <p className="text-sm text-[#A9B9A8] leading-relaxed">
              {isBn
                ? 'নোয়াখালীর সুবর্ণচরে উৎপাদিত বৈজ্ঞানিক পুষ্টিসমৃদ্ধ ঘাস সাইলেজ এবং ঐতিহ্যবাহী গাভীর খাঁটি ঘিয়ের নির্ভরযোগ্য সরবরাহকারী।'
                : 'Producers of nutrient-dense grass silage packets and authentic artisanal cow ghee in Shubornochar, Noakhali, Bangladesh.'}
            </p>
            <div className="pt-2 text-xs text-[#D8B56D] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D8B56D] shrink-0" />
              <span>{isBn ? '১০০% খাঁটি গরুর ঘি ও ভেষজ সাইলেজ' : '100% Pure Cow Butter & Verified Fodder'}</span>
            </div>

            {/* Social links: Facebook provided, Instagram hidden */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={BUSINESS_CONFIG.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0B241D] border border-[#D8B56D]/30 text-xs font-semibold text-[#F6F4EC] hover:border-[#D8B56D] transition-colors"
              >
                <Facebook className="w-3.5 h-3.5 text-[#D8B56D]" />
                <span>Facebook Page</span>
                <ExternalLink className="w-3 h-3 text-[#A9B9A8]" />
              </a>
            </div>
          </div>

          {/* Col 2: Direct Product Links */}
          <div>
            <h3 className="text-xs font-semibold text-[#D8B56D] uppercase tracking-wider mb-4">
              {isBn ? 'পণ্যসমূহ' : 'Our Products'}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/products/grass-silage"
                  onClick={(e) => handleNav(e, '/products/grass-silage')}
                  className="hover:text-[#D8B56D] transition-colors flex items-center justify-between group"
                >
                  <span>{isBn ? 'ঘাস সাইলেজ (৫০ কেজি)' : 'Grass Silage (50 kg)'}</span>
                  <span className="text-xs text-[#D8B56D] font-mono">৳350</span>
                </a>
              </li>
              <li>
                <a
                  href="/products/shahi-ghee-200g"
                  onClick={(e) => handleNav(e, '/products/shahi-ghee-200g')}
                  className="hover:text-[#D8B56D] transition-colors flex items-center justify-between group"
                >
                  <span>{isBn ? 'শাহী ঘি (২০০ গ্রাম)' : 'Shahi Ghee (200g)'}</span>
                  <span className="text-xs text-[#D8B56D] font-mono">৳750</span>
                </a>
              </li>
              <li>
                <a
                  href="/products/shahi-ghee-900g"
                  onClick={(e) => handleNav(e, '/products/shahi-ghee-900g')}
                  className="hover:text-[#D8B56D] transition-colors flex items-center justify-between group"
                >
                  <span>{isBn ? 'শাহী ফ্যামিলি ঘি (৯০০ গ্রাম)' : 'Family Ghee (900g)'}</span>
                  <span className="text-xs text-[#D8B56D] font-mono">৳1,450</span>
                </a>
              </li>
              <li className="pt-2 border-t border-[#D8B56D]/15">
                <a
                  href="/shop"
                  onClick={(e) => handleNav(e, '/shop')}
                  className="text-xs text-[#D8B56D] font-semibold hover:underline"
                >
                  {isBn ? 'সম্পূর্ণ শপ ব্রাউজ করুন →' : 'Browse Full Storefront →'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation & Policy Links */}
          <div>
            <h3 className="text-xs font-semibold text-[#D8B56D] uppercase tracking-wider mb-4">
              {isBn ? 'তথ্য ও পলিসি' : 'Information & Policies'}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/quality"
                  onClick={(e) => handleNav(e, '/quality')}
                  className="hover:text-[#D8B56D] transition-colors"
                >
                  {isBn ? 'গুণমান ও বৈজ্ঞানিক প্রক্রিয়া' : 'Our Quality & Process'}
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => handleNav(e, '/about')}
                  className="hover:text-[#D8B56D] transition-colors"
                >
                  {isBn ? 'আমাদের খামারের গল্প' : 'About Shahi Agro Farm'}
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  onClick={(e) => handleNav(e, '/faq')}
                  className="hover:text-[#D8B56D] transition-colors"
                >
                  {isBn ? 'সচরাচর জিজ্ঞাসা (FAQ)' : 'Frequently Asked Questions'}
                </a>
              </li>
              <li>
                <a
                  href="/order-status"
                  onClick={(e) => handleNav(e, '/order-status')}
                  className="hover:text-[#D8B56D] transition-colors"
                >
                  {isBn ? 'অর্ডার স্ট্যাটাস ও নির্দেশিকা' : 'Order Status & Instructions'}
                </a>
              </li>
              <li>
                <a
                  href="/shipping-returns"
                  onClick={(e) => handleNav(e, '/shipping-returns')}
                  className="hover:text-[#D8B56D] transition-colors"
                >
                  {isBn ? 'ডেলিভারি ও রিটার্ন পলিসি' : 'Shipping & Returns'}
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  onClick={(e) => handleNav(e, '/privacy')}
                  className="hover:text-[#D8B56D] transition-colors"
                >
                  {isBn ? 'প্রাইভেসি পলিসি' : 'Privacy Policy'}
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => handleNav(e, '/terms')}
                  className="hover:text-[#D8B56D] transition-colors"
                >
                  {isBn ? 'শর্তাবলী ও নিয়ম' : 'Terms & Conditions'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Contact & Address */}
          <div>
            <h3 className="text-xs font-semibold text-[#D8B56D] uppercase tracking-wider mb-4">
              {isBn ? 'খামার যোগাযোগের তথ্য' : 'Verified Farm Contacts'}
            </h3>
            <ul className="space-y-3.5 text-xs sm:text-sm">
              {/* Phone */}
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#D8B56D] mt-0.5 shrink-0" />
                <div className="flex-1">
                  <span className="text-xs text-[#A9B9A8] block">{isBn ? 'কল করুন:' : 'Direct Call:'}</span>
                  <a href={`tel:${BUSINESS_CONFIG.intlPhone}`} className="text-[#F6F4EC] font-semibold hover:text-[#D8B56D]">
                    {BUSINESS_CONFIG.phone}
                  </a>
                </div>
              </li>

              {/* WhatsApp */}
              <li className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#D8B56D] mt-0.5 shrink-0" />
                <div className="flex-1">
                  <span className="text-xs text-[#A9B9A8] block">{isBn ? 'অফিসিয়াল হোয়াটসঅ্যাপ:' : 'WhatsApp:'}</span>
                  <a
                    href={`https://wa.me/${BUSINESS_CONFIG.whatsappIntl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D8B56D] font-bold hover:underline"
                  >
                    {BUSINESS_CONFIG.whatsappNumber}
                  </a>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#D8B56D] mt-0.5 shrink-0" />
                <div className="flex-1">
                  <span className="text-xs text-[#A9B9A8] block">{isBn ? 'অফিসিয়াল ইমেইল:' : 'Official Email:'}</span>
                  <a href={`mailto:${BUSINESS_CONFIG.email}`} className="text-[#F6F4EC] hover:text-[#D8B56D] break-all">
                    {BUSINESS_CONFIG.email}
                  </a>
                </div>
              </li>

              {/* Physical Address with Google Maps search link */}
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D8B56D] mt-0.5 shrink-0" />
                <div className="space-y-1">
                  <span className="text-xs text-[#A9B9A8] block">{isBn ? 'খামারের ঠিকানা:' : 'Physical Address:'}</span>
                  <p className="text-[#F6F4EC] text-xs leading-relaxed">
                    {isBn ? BUSINESS_CONFIG.addressBn : BUSINESS_CONFIG.address}
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={BUSINESS_CONFIG.googleMapsSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-[#D8B56D] hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>{isBn ? 'গুগল ম্যাপসে খুঁজুন' : 'Search on Google Maps'}</span>
                    </a>
                    <button
                      onClick={() => copyToClipboard(BUSINESS_CONFIG.address, 'address')}
                      className="inline-flex items-center gap-1 text-[11px] text-[#A9B9A8] hover:text-white"
                      title="Copy Address"
                    >
                      {copiedField === 'address' ? <Check className="w-3 h-3 text-[#D8B56D]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedField === 'address' ? t('copied') : (isBn ? 'কপি' : 'Copy')}</span>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with payment options */}
        <div className="mt-14 pt-8 border-t border-[#D8B56D]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A9B9A8]">
          <p>© {new Date().getFullYear()} {isBn ? BUSINESS_CONFIG.nameBn : BUSINESS_CONFIG.name}. {t('rightsReserved')}</p>
          <div className="flex flex-wrap items-center gap-3">
            <span>{isBn ? 'পেমেন্ট মাধ্যমসমূহ:' : 'Payment Methods:'}</span>
            <span className="px-2 py-0.5 rounded bg-[#0B241D] text-[#D8B56D] border border-[#D8B56D]/30 font-mono">bKash</span>
            <span className="px-2 py-0.5 rounded bg-[#0B241D] text-[#D8B56D] border border-[#D8B56D]/30 font-mono">Nagad</span>
            <span className="px-2 py-0.5 rounded bg-[#0B241D] text-[#D8B56D] border border-[#D8B56D]/30 font-mono">Upay</span>
            <span className="px-2 py-0.5 rounded bg-[#0B241D] text-[#D8B56D] border border-[#D8B56D]/30 font-mono">Rocket</span>
            <span className="px-2 py-0.5 rounded bg-[#0B241D] text-[#F6F4EC] border border-[#A9B9A8]/30">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
