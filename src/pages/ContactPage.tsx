import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Mail, Clock, Send, CheckCircle2, ExternalLink, Facebook, Copy, Check } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/config.ts';
import { useLanguage } from '../context/LanguageContext.tsx';

export const ContactPage: React.FC = () => {
  const { t, isBn } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'Grass Silage Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;

    const waText = `Hello Shahi Agro Farm,
My name is ${formData.name} (${formData.phone}).
Subject: ${formData.subject}
Message: ${formData.message}`;

    const waUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappIntl}?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(BUSINESS_CONFIG.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="border-b border-[#D8B56D]/20 pb-6">
        <div className="text-xs uppercase tracking-wider text-[#D8B56D] font-semibold mb-1">
          {isBn ? 'সরাসরি যোগাযোগ' : 'Direct Communications'}
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#F6F4EC] tracking-tight">
          {t('contactTitle')}
        </h1>
        <p className="text-sm text-[#A9B9A8] mt-2 max-w-2xl">
          {t('contactSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-[#D8B56D]/20 space-y-6">
            <h2 className="text-base font-serif font-bold text-[#F6F4EC] uppercase tracking-wider">
              {isBn ? 'অফিসিয়াল যোগাযোগের মাধ্যম' : 'Official Channels'}
            </h2>

            <div className="space-y-4 text-sm">
              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#063D2E] border border-[#D8B56D]/40 text-[#D8B56D] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#A9B9A8]">{t('directCall')}</div>
                  <a href={`tel:${BUSINESS_CONFIG.intlPhone}`} className="text-[#F6F4EC] font-bold text-base hover:text-[#D8B56D]">
                    {BUSINESS_CONFIG.phone}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#063D2E] border border-[#D8B56D]/40 text-[#D8B56D] shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#A9B9A8]">{t('officialWhatsApp')}</div>
                  <a
                    href={`https://wa.me/${BUSINESS_CONFIG.whatsappIntl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D8B56D] font-bold text-base hover:underline"
                  >
                    {BUSINESS_CONFIG.whatsappNumber}
                  </a>
                  <p className="text-[11px] text-[#A9B9A8] mt-0.5">
                    {isBn ? 'দ্রুততম প্রতিক্রিয়া ও সাইলেজ বুকিংয়ের জন্য।' : 'Fastest response for truckload quotes & orders.'}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#063D2E] border border-[#D8B56D]/40 text-[#D8B56D] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#A9B9A8]">{t('emailInquiry')}</div>
                  <a href={`mailto:${BUSINESS_CONFIG.email}`} className="text-[#F6F4EC] font-medium hover:text-[#D8B56D] break-all">
                    {BUSINESS_CONFIG.email}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#063D2E] border border-[#D8B56D]/40 text-[#D8B56D] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-[#A9B9A8]">{t('farmAddress')}</div>
                  <p className="text-[#F6F4EC] text-xs leading-relaxed">
                    {isBn ? BUSINESS_CONFIG.addressBn : BUSINESS_CONFIG.address}
                  </p>
                  <div className="flex items-center gap-3 pt-1">
                    <a
                      href={BUSINESS_CONFIG.googleMapsSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-[#D8B56D] hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>{t('googleMapsSearch')}</span>
                    </a>
                    <button
                      type="button"
                      onClick={copyAddress}
                      className="inline-flex items-center gap-1 text-[11px] text-[#A9B9A8] hover:text-[#F6F4EC]"
                    >
                      {copiedAddress ? <Check className="w-3 h-3 text-[#D8B56D]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedAddress ? t('copied') : t('copyNumber')}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Facebook */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#063D2E] border border-[#D8B56D]/40 text-[#D8B56D] shrink-0">
                  <Facebook className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#A9B9A8]">Facebook</div>
                  <a
                    href={BUSINESS_CONFIG.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D8B56D] text-xs font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <span>facebook.com/share/1HrwvM2mRo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5 pt-2 border-t border-[#D8B56D]/15">
                <div className="p-2.5 rounded-xl bg-[#063D2E] border border-[#D8B56D]/40 text-[#D8B56D] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-xs text-[#A9B9A8]">
                  <p className="text-[#F6F4EC] font-medium">{t('operatingHours')}</p>
                  <p className="text-[11px] text-[#D8B56D]">{t('emergencyNotice')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-[#D8B56D]/20 space-y-6">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#F6F4EC]">
                {isBn ? 'ইনকোয়ারি বা পাইকারি অর্ডারের বার্তা পাঠান' : 'Send an Inquiry or Wholesale Request'}
              </h2>
              <p className="text-xs text-[#A9B9A8] mt-1">
                {isBn
                  ? 'নিচের ফর্মটি পূরণ করে হোয়াটসঅ্যাপের মাধ্যমে সরাসরি খামার কর্তৃপক্ষের কাছে পাঠিয়ে দিন।'
                  : 'Fill out your requirements below to generate an instant WhatsApp dispatch message.'}
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#063D2E]/60 border border-[#D8B56D]/40 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#D8B56D] mx-auto" />
                <h3 className="text-lg font-serif font-bold text-[#F6F4EC]">
                  {isBn ? 'বার্তা হোয়াটসঅ্যাপে প্রস্তুত করা হয়েছে' : 'Inquiry Ready in WhatsApp'}
                </h3>
                <p className="text-xs text-[#A9B9A8] max-w-sm mx-auto">
                  {isBn
                    ? 'হোয়াটসঅ্যাপে প্রেরিত বার্তাটি সেন্ড করুন। আমাদের টিম দ্রুত আপনার সাথে যোগাযোগ করবে।'
                    : 'Your inquiry has been formatted. Please tap Send in WhatsApp to deliver it to our team.'}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-[#D8B56D] hover:underline pt-2 inline-block font-semibold"
                >
                  {isBn ? 'আরেকটি বার্তা পাঠান' : 'Send another inquiry'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="ct-name" className="text-xs font-semibold text-[#F6F4EC] block">
                      {t('fullName')} <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="ct-name"
                      type="text"
                      required
                      placeholder={isBn ? 'যেমন: কামাল হোসেন' : 'e.g. Kamal Hossain'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#090D0B] border border-[#D8B56D]/30 text-sm text-[#F6F4EC] focus:outline-none focus:border-[#D8B56D]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="ct-phone" className="text-xs font-semibold text-[#F6F4EC] block">
                      {t('phone')} <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="ct-phone"
                      type="tel"
                      required
                      placeholder="01XXXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#090D0B] border border-[#D8B56D]/30 text-sm text-[#F6F4EC] focus:outline-none focus:border-[#D8B56D]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="ct-subject" className="text-xs font-semibold text-[#F6F4EC] block">
                    {isBn ? 'ইনকোয়ারির বিষয়' : 'Inquiry Subject'}
                  </label>
                  <select
                    id="ct-subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090D0B] border border-[#D8B56D]/30 text-sm text-[#F6F4EC] focus:outline-none focus:border-[#D8B56D]"
                  >
                    <option value="Grass Silage Bulk Truckload">
                      {isBn ? 'ঘাস সাইলেজ বাল্ক ট্রাকলোড (২০ - ৪০০ প্যাকেট)' : 'Grass Silage Bulk Truckload (20 to 400 Packets)'}
                    </option>
                    <option value="Pure Cow Ghee Wholesale">
                      {isBn ? 'খাঁটি গাভীর ঘি পাইকারি অর্ডার' : 'Pure Cow Ghee Wholesale'}
                    </option>
                    <option value="Delivery Schedule & District Rates">
                      {isBn ? 'ডেলিভারি সিডিউল ও জেলাভিত্তিক পরিবহন' : 'Delivery Schedule & District Rates'}
                    </option>
                    <option value="General Agro Inquiry">
                      {isBn ? 'সাধারণ কৃষি ও খামার পরামর্শ' : 'General Farm Consultation'}
                    </option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="ct-message" className="text-xs font-semibold text-[#F6F4EC] block">
                    {isBn ? 'আপনার বার্তা / প্রয়োজনীয় তথ্যাদি' : 'Your Message / Requirements'} <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="ct-message"
                    rows={4}
                    required
                    placeholder={isBn ? 'আপনার খামারের গাভীর সংখ্যা, জেলা বা ঘিয়ের পরিমাণ ইত্যাদি লিখুন...' : 'Details about your livestock herd, destination district, or ghee quantity needed...'}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090D0B] border border-[#D8B56D]/30 text-sm text-[#F6F4EC] focus:outline-none focus:border-[#D8B56D]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#D8B56D] to-[#c7a45c] hover:from-[#e3c178] hover:to-[#d8b56d] text-[#090D0B] font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4 text-[#090D0B]" />
                  <span>{isBn ? 'হোয়াটসঅ্যাপে বার্তা পাঠান' : 'Send Message via WhatsApp'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
