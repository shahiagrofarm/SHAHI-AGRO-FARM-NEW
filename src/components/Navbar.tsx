import React, { useState } from 'react';
import { ShoppingBag, Menu, X, PhoneCall, Globe, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { BUSINESS_CONFIG } from '../data/config.ts';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const { totals } = useCart();
  const { lang, toggleLang, t, isBn } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: t('navHome'), path: '/' },
    { label: t('navShop'), path: '/shop' },
    { label: t('navQuality'), path: '/quality' },
    { label: t('navAbout'), path: '/about' },
    { label: t('navFaq'), path: '/faq' },
    { label: t('navContact'), path: '/contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    navigate(path);
    setMobileMenuOpen(false);
  };

  const basePath = currentPath.split('?')[0];

  return (
    <header className="sticky top-0 z-50 transition-all">
      {/* 1. Announcement Bar */}
      <div className="bg-[#0B241D] border-b border-[#D8B56D]/20 py-1.5 px-4 text-center text-xs text-[#F6F4EC]/90">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <span className="hidden sm:flex items-center gap-1.5 text-xs text-[#A9B9A8]">
            <Sparkles className="w-3.5 h-3.5 text-[#D8B56D]" />
            <span>{isBn ? 'সরাসরি খামার থেকে খাঁটি পণ্য' : 'Direct from farm pastures'}</span>
          </span>

          <span className="inline-flex items-center gap-2 font-medium mx-auto sm:mx-0">
            <PhoneCall className="w-3.5 h-3.5 text-[#D8B56D]" />
            <span>{isBn ? 'হোয়াটসঅ্যাপ অর্ডার:' : 'WhatsApp Order:'}</span>
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappIntl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D8B56D] font-bold hover:underline tracking-wide"
            >
              {BUSINESS_CONFIG.whatsappNumber}
            </a>
            <span className="hidden md:inline text-stone-400">· {isBn ? '৬৪ জেলায় সরবরাহ' : 'Deliveries across 64 Districts'}</span>
          </span>

          {/* Quick Language Switcher in Header */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#063D2E]/80 hover:bg-[#063D2E] border border-[#D8B56D]/30 text-xs font-semibold text-[#F6F4EC] transition-all"
            aria-label="Switch between Bangla and English"
          >
            <Globe className="w-3 h-3 text-[#D8B56D]" />
            <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
          </button>
        </div>
      </div>

      {/* 2. Main Top Bar with Glassmorphism */}
      <div className="glass-panel border-b border-[#D8B56D]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
          {/* Brand Wordmark & Official Logo */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="flex items-center gap-2.5 text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#F6F4EC] hover:text-[#D8B56D] transition-colors whitespace-nowrap shrink-0 group"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-[#D8B56D]/60 shadow-md shadow-black/40 group-hover:border-[#D8B56D] group-hover:scale-105 transition-all bg-white shrink-0">
              <img
                src={BUSINESS_CONFIG.logo}
                alt={isBn ? BUSINESS_CONFIG.nameBn : BUSINESS_CONFIG.name}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <span>{isBn ? BUSINESS_CONFIG.nameBn : BUSINESS_CONFIG.name}</span>
          </a>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-[#A9B9A8]">
            {navLinks.map((link) => {
              const isActive = basePath === link.path;
              return (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#F6F4EC] relative py-1 ${
                    isActive ? 'text-[#D8B56D] font-semibold' : 'text-[#A9B9A8]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D8B56D] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action Zone: Cart Button & Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Cart Button with 3D Depth & live count */}
            <button
              onClick={() => navigate('/cart')}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#063D2E] to-[#0B241D] hover:from-[#084e3b] hover:to-[#0f3229] border border-[#D8B56D]/40 text-[#F6F4EC] shadow-lg shadow-black/40 transition-all hover:-translate-y-0.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#D8B56D]"
              aria-label={`View shopping cart with ${totals.itemCount} items`}
            >
              <ShoppingBag className="w-4 h-4 text-[#D8B56D]" />
              <span className="font-semibold text-xs sm:text-sm">{t('navCart')}</span>
              {totals.itemCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold bg-[#D8B56D] text-[#090D0B] rounded-full tabular-nums animate-pulse">
                  {totals.itemCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#F6F4EC] hover:bg-[#0B241D] rounded-lg transition-colors border border-transparent hover:border-[#D8B56D]/20"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-b border-[#D8B56D]/30 bg-[#090D0B]/95 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const isActive = basePath === link.path;
            return (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-[#0B241D] text-[#D8B56D] font-bold border border-[#D8B56D]/30'
                    : 'text-[#F6F4EC] hover:bg-[#0B241D]/60'
                }`}
              >
                {link.label}
              </a>
            );
          })}

          <div className="pt-3 border-t border-[#D8B56D]/20 flex flex-col gap-2.5">
            {/* Mobile Language switch */}
            <button
              onClick={toggleLang}
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-[#0B241D] border border-[#D8B56D]/30 text-xs font-semibold text-[#D8B56D]"
            >
              <Globe className="w-4 h-4" />
              <span>{isBn ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন'}</span>
            </button>

            {/* WhatsApp direct tap */}
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappIntl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#063D2E] to-[#0B241D] border border-[#D8B56D]/40 text-[#F6F4EC] text-sm font-semibold"
            >
              <PhoneCall className="w-4 h-4 text-[#D8B56D]" />
              <span>{isBn ? 'হোয়াটসঅ্যাপে কথা বলুন' : 'WhatsApp Contact'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
