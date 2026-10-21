/**
 * Shahi Agro Farm — Verified Business Configuration
 * Central source of truth for all contact, address, social, and payment details.
 * Country: Bangladesh
 * Currency: BDT (৳)
 */

export interface PaymentMethodConfig {
  id: 'cod' | 'bkash' | 'upay' | 'nagad' | 'rocket';
  name: string;
  nameBn: string;
  number?: string;
  accountType: 'Personal (Send Money)' | 'Cash on Delivery';
  accountTypeBn: string;
  isDigital: boolean;
  requiresTrxId: boolean;
  instructionsEn: string;
  instructionsBn: string;
  enabled: boolean;
  needsOwnerVerificationNotice: boolean;
}

export interface BusinessConfig {
  name: string;
  nameBn: string;
  logo: string;
  tagline: string;
  taglineBn: string;
  country: string;
  currencySymbol: string;
  currencyCode: string;
  phone: string;
  whatsappNumber: string;
  intlPhone: string;
  whatsappIntl: string;
  email: string;
  address: string;
  addressBn: string;
  googleMapsSearchUrl: string;
  facebookUrl: string;
  instagramUrl: string | null; // Hidden until real URL provided
  siteUrlPlaceholder: string;
  paymentMethods: PaymentMethodConfig[];
}

const rawAddress = "Babul Chearman Bari, Char Bojlul Korim, Char Bata-3813, Shubornochar, Noakhali, Bangladesh.";

export const BUSINESS_CONFIG: BusinessConfig = {
  name: "Shahi Agro Farm",
  nameBn: "শাহী এগ্রো ফার্ম",
  logo: "/assets/aistudio/logo_3f4c8dbd.jpg",
  tagline: "Pure Goodness. Rooted in Nature.",
  taglineBn: "প্রকৃতির নিখাদ গুণ। মাটির খাঁটি স্বাদ।",
  country: "Bangladesh",
  currencySymbol: "৳",
  currencyCode: "BDT",
  // Verified business contact / WhatsApp supplied by owner:
  phone: "01604985164",
  whatsappNumber: "01604985164",
  intlPhone: "+8801604985164",
  whatsappIntl: "8801604985164",
  // Verified official email:
  email: "shahiagrofarmlimited@gmail.com",
  // Verified physical address:
  address: rawAddress,
  addressBn: "বাবুল চেয়ারম্যান বাড়ি, চর বজলুল করিম, চর বাটা-৩৮১৩, সুবর্ণচর, নোয়াখালী, বাংলাদেশ।",
  // Google Maps search query without fake coordinates:
  googleMapsSearchUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(rawAddress)}`,
  // Verified Facebook URL supplied by owner:
  facebookUrl: "https://www.facebook.com/share/1HrwvM2mRo/",
  // Instagram URL: Not provided, kept hidden:
  instagramUrl: null,
  siteUrlPlaceholder: "https://YOUR-PUBLISHED-DOMAIN.example",
  paymentMethods: [
    {
      id: 'cod',
      name: 'Cash on Delivery (COD)',
      nameBn: 'ক্যাশ অন ডেলিভারি (হাতে পেয়ে মূল্য পরিশোধ)',
      accountType: 'Cash on Delivery',
      accountTypeBn: 'পণ্য বুঝে নিয়ে মূল্য পরিশোধ',
      isDigital: false,
      requiresTrxId: false,
      instructionsEn: 'Pay the exact cash amount when your consignment is received at your delivery address.',
      instructionsBn: 'আপনার ঠিকানায় পণ্য পৌঁছালে দেখে শুনে নগদ টাকা পরিশোধ করুন।',
      enabled: true,
      needsOwnerVerificationNotice: false
    },
    {
      id: 'bkash',
      name: 'bKash',
      nameBn: 'বিকাশ (bKash)',
      number: '01604985164',
      accountType: 'Personal (Send Money)',
      accountTypeBn: 'পার্সোনাল (Send Money)',
      isDigital: true,
      requiresTrxId: true,
      instructionsEn: 'Send Money to the bKash personal number below. Enter your Order ID in reference. Enter Transaction ID (TrxID) below.',
      instructionsBn: 'নিচের বিকাশ পার্সোনাল নম্বরে "Send Money" করুন। রেফারেন্সে আপনার নাম বা অর্ডার আইডি দিন। এরপর TrxID টি নিচে লিখুন।',
      enabled: true,
      needsOwnerVerificationNotice: true
    },
    {
      id: 'nagad',
      name: 'Nagad',
      nameBn: 'নগদ (Nagad)',
      number: '01814026318',
      accountType: 'Personal (Send Money)',
      accountTypeBn: 'পার্সোনাল (Send Money)',
      isDigital: true,
      requiresTrxId: true,
      instructionsEn: 'Send Money to the Nagad personal number below. Enter your Order ID in reference. Enter Transaction ID (TrxID) below.',
      instructionsBn: 'নিচের নগদ পার্সোনাল নম্বরে "Send Money" করুন। রেফারেন্সে আপনার নাম বা অর্ডার আইডি দিন। এরপর TrxID টি নিচে লিখুন।',
      enabled: true,
      needsOwnerVerificationNotice: true
    },
    {
      id: 'upay',
      name: 'Upay',
      nameBn: 'উপায় (Upay)',
      number: '01814026318',
      accountType: 'Personal (Send Money)',
      accountTypeBn: 'পার্সোনাল (Send Money)',
      isDigital: true,
      requiresTrxId: true,
      instructionsEn: 'Send Money to the Upay personal number below. Enter your Order ID in reference. Enter Transaction ID (TrxID) below.',
      instructionsBn: 'নিচের উপায় পার্সোনাল নম্বরে "Send Money" করুন। রেফারেন্সে আপনার নাম বা অর্ডার আইডি দিন। এরপর TrxID টি নিচে লিখুন।',
      enabled: true,
      needsOwnerVerificationNotice: true
    },
    {
      id: 'rocket',
      name: 'Rocket',
      nameBn: 'রকেট (Rocket)',
      number: '01604985164',
      accountType: 'Personal (Send Money)',
      accountTypeBn: 'পার্সোনাল (Send Money)',
      isDigital: true,
      requiresTrxId: true,
      instructionsEn: 'Send Money to the Rocket personal number below. Enter your Order ID in reference. Enter Transaction ID (TrxID) below.',
      instructionsBn: 'নিচের রকেট পার্সোনাল নম্বরে "Send Money" করুন। রেফারেন্সে আপনার নাম বা অর্ডার আইডি দিন। এরপর TrxID টি নিচে লিখুন।',
      enabled: true,
      needsOwnerVerificationNotice: true
    }
  ]
};

// 64 Districts of Bangladesh
export const BANGLADESH_DISTRICTS = [
  "Noakhali", "Dhaka", "Gazipur", "Narayanganj", "Tangail", "Narsingdi", "Munshiganj", "Manikganj", "Kishoreganj", "Faridpur", "Gopalganj", "Madaripur", "Rajbari", "Shariatpur",
  "Chattogram", "Cox's Bazar", "Cumilla", "Feni", "Brahmanbaria", "Chandpur", "Lakshmipur", "Khagrachhari", "Rangamati", "Bandarban",
  "Sylhet", "Moulvibazar", "Habiganj", "Sunamganj",
  "Rajshahi", "Bogura", "Pabna", "Sirajganj", "Naogaon", "Natore", "Chapai Nawabganj", "Joypurhat",
  "Khulna", "Jashore", "Kushtia", "Satkhira", "Jhenaidah", "Chuadanga", "Bagerhat", "Magura", "Meherpur", "Narail",
  "Barishal", "Patuakhali", "Bhola", "Pirojpur", "Barguna", "Jhalokati",
  "Rangpur", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Thakurgaon",
  "Mymensingh", "Jamalpur", "Netrokona", "Sherpur"
] as const;
