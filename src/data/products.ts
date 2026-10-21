/**
 * Shahi Agro Farm — Central Verified Product Catalog
 * 
 * EXACT SPECIFICATIONS:
 * 1. Grass Silage: 50 kg per packet, ৳350 per packet. Min 20, Max 400, Default 20, Step 10.
 * 2. Shahi Ghee 200g: 200g jar, ৳750 per jar. Min 1, Default 1, Step 1.
 * 3. Shahi Family Ghee 900g: 900g jar, ৳1,450 per jar. Min 1, Default 1, Step 1.
 * 
 * ALL sheep farming and sheep meat references have been completely excluded.
 */

export interface ProductSpecification {
  label: string;
  labelBn: string;
  value: string;
  valueBn: string;
}

export interface Product {
  id: string; // Canonical slug (e.g., 'grass-silage')
  aliases: string[]; // For backwards-compatible links (e.g. 'shahi-grass-silage')
  name: string;
  nameBn: string;
  category: 'Cattle Feed' | 'Artisanal Dairy';
  categoryBn: 'গবাদিপশুর খাদ্য' | 'খাঁটি দুগ্ধজাত পণ্য';
  packageWeight: string;
  packageWeightBn: string;
  unit: string;
  unitBn: string;
  price: number; // Exact integer BDT amount
  minQty: number;
  maxQty: number;
  defaultQty: number;
  stepQty: number;
  inStock: boolean;
  shortDescription: string;
  shortDescriptionBn: string;
  fullDescription: string;
  fullDescriptionBn: string;
  features: string[];
  featuresBn: string[];
  specifications: ProductSpecification[];
  image: string;
  badge?: string;
  badgeBn?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'grass-silage',
    aliases: ['shahi-grass-silage', 'grass-silage'],
    name: 'Grass Silage',
    nameBn: 'ঘাস সাইলেজ',
    category: 'Cattle Feed',
    categoryBn: 'গবাদিপশুর খাদ্য',
    packageWeight: '50 kg per packet',
    packageWeightBn: '৫০ কেজি প্যাকেট',
    unit: 'packet',
    unitBn: 'প্যাকেট',
    price: 350,
    minQty: 20,
    maxQty: 400,
    defaultQty: 20,
    stepQty: 10,
    inStock: true,
    shortDescription: 'Nutrient-rich, hermetically fermented green fodder packets (50 kg) for dairy cattle and fattening bulls. Increases milk yield naturally.',
    shortDescriptionBn: 'উচ্চ পুষ্টিসমৃদ্ধ, বায়ুরোধী বিশেষ ফিল্মে ফারমেন্টেড কাঁচা ঘাসের সাইলেজ (৫০ কেজি প্যাকেট)। গাভীর দুধ বৃদ্ধি ও স্বাস্থ্য সুরক্ষায় কার্যকর।',
    fullDescription: 'Shahi Agro Farm Grass Silage is produced from select high-protein hybrid corn and nutritious fodder grasses cultivated in Bangladesh. Chopped at optimal nutritional maturity and packed in multi-layer UV-resistant stretch film packets of 50 kg each. Undergoes controlled lactic fermentation to preserve moisture, natural sugars, vitamins, and minerals without harmful chemical additives.',
    fullDescriptionBn: 'শাহী এগ্রো ফার্মের ঘাস সাইলেজ সুষম পুষ্টিমান বজায় রেখে প্রস্তুতকৃত উচ্চ প্রোটিনসমৃদ্ধ কাঁচা ঘাসের বৈজ্ঞানিক খাবার। ৫০ কেজির প্রতিটি প্যাকেট বিশেষ ইউভি-রোধী ফিল্মে মোড়ানো থাকে যা ঘাসের স্বাভাবিক পুষ্টি ও আর্দ্রতা অটুট রাখে। এটি দুগ্ধবতী গাভীর দুধের উৎপাদন বৃদ্ধিতে এবং মেটাবলিজম ঠিক রাখতে সারা বছর কার্যকর।',
    features: [
      '50 kg sealed packets with multi-layer UV protection',
      'Crude protein 8.5% - 11.5% with high digestibility',
      'Preserves natural plant moisture and sweet aroma',
      'Minimizes fodder scarcity during dry and monsoon seasons',
      'Available in bulk consignments (20 to 400 packets)'
    ],
    featuresBn: [
      '৫০ কেজি ওজনের সুরক্ষিত ইউভি-প্রটেক্টেড সিল প্যাক',
      '৮.৫% - ১১.৫% ক্রুড প্রোটিন ও সহজপাচ্য পুষ্টি',
      'প্রাকৃতিক আর্দ্রতা ও সুগন্ধযুক্ত সুস্বাদু খাবার',
      'খরা বা বর্ষায় কাঁচা ঘাসের অভাব দূরীকরণে আদর্শ',
      '২০ থেকে ৪০০ প্যাকেটের বিশেষ বাল্ক অর্ডার সুবিধা'
    ],
    specifications: [
      { label: 'Package Weight', labelBn: 'প্যাকেটের ওজন', value: '50 kg per packet', valueBn: '৫০ কেজি প্রতি প্যাকেট' },
      { label: 'Moisture Content', labelBn: 'আর্দ্রতা', value: '62% - 68%', valueBn: '৬২% - ৬৮%' },
      { label: 'Crude Protein', labelBn: 'ক্রুড প্রোটিন', value: '8.5% - 11.5% (DM)', valueBn: '৮.৫% - ১১.৫%' },
      { label: 'Minimum Order', labelBn: 'সর্বনিম্ন অর্ডার', value: '20 Packets (৳7,000)', valueBn: '২০ প্যাকেট (৳৭,০০০)' },
      { label: 'Maximum Order', labelBn: 'সর্বোচ্চ অর্ডার', value: '400 Packets (৳140,000)', valueBn: '৪০০ প্যাকেট (৳১,৪০,০০০)' },
      { label: 'Step Increment', labelBn: 'অর্ডার ধাপ', value: 'Exactly 10 Packets', valueBn: 'প্রতি ধাপে ১০ প্যাকেট' }
    ],
    image: '/images/shahi_grass_silage.jpg',
    badge: 'Premium Cattle Feed',
    badgeBn: 'উন্নত গবাদিপশু খাদ্য'
  },
  {
    id: 'shahi-ghee-200g',
    aliases: ['shahi-ghee-200g'],
    name: 'Shahi Ghee 200g',
    nameBn: 'শাহী ঘি ২০০ গ্রাম',
    category: 'Artisanal Dairy',
    categoryBn: 'খাঁটি দুগ্ধজাত পণ্য',
    packageWeight: '200g jar',
    packageWeightBn: '২০০ গ্রাম কাচের জার',
    unit: 'jar',
    unitBn: 'জার',
    price: 750,
    minQty: 1,
    maxQty: 50,
    defaultQty: 1,
    stepQty: 1,
    inStock: true,
    shortDescription: '100% pure handcrafted golden cow ghee in a 200g glass jar. Naturally aromatic, rich granular (danedar) texture.',
    shortDescriptionBn: '১০০% খাঁটি দেশি গাভীর দুধের মাখন থেকে তৈরি সুগন্ধযুক্ত দানাদার ঘি (২০০ গ্রাম কাচের জার)। কোনো প্রিজারভেটিভ বা ভেজাল নেই।',
    fullDescription: 'Crafted using time-honored slow-simmering techniques from the fresh cultured cream butter of cows. Slow heating naturally browns milk solids, creating a warm golden color and authentic nutty aroma with a fine granular (danedar) texture. Hand-poured into sterilized 200g glass jars.',
    fullDescriptionBn: 'শাহী ঘি ২০০ গ্রাম তৈরি হয় দেশি গরুর খাঁটি দুধের মাখন থেকে ঐতিহ্যবাহী ধীর আঁচে জ্বাল দিয়ে। এতে ঘিয়ের প্রাকৃতিক পুষ্টি, সোনাঝরা রঙ এবং সুস্বাদু সুঘ্রাণ অক্ষুণ্ণ থাকে। ২০০ গ্রামের বায়ুরোধী কাচের জারে সুরক্ষিত থাকে দীর্ঘ দিন।',
    features: [
      'Authentic danedar (granular) texture with rich sweet aroma',
      'Prepared strictly from pure cow milk butter',
      'Zero preservatives, zero palm oil, zero synthetic color',
      'Airtight food-grade 200g glass jar'
    ],
    featuresBn: [
      'খাঁটি দানাদার টেক্সচার ও লোভনীয় প্রাকৃতিক সুবাস',
      'শতভাগ গরুর দুধের নির্ভেজাল মাখন থেকে প্রস্তুত',
      'কৃত্রিম রং, গন্ধ বা পাম অয়েল সম্পূর্ণ বর্জিত',
      'স্বাস্থ্যসম্মত ২০০ গ্রামের ফুড-গ্রেড গ্লাস জার'
    ],
    specifications: [
      { label: 'Net Weight', labelBn: 'নেট ওজন', value: '200 grams', valueBn: '২০০ গ্রাম' },
      { label: 'Container Type', labelBn: 'পাত্রের ধরন', value: 'Food-grade glass jar', valueBn: 'ফুড-গ্রেড কাচের জার' },
      { label: 'Ingredients', labelBn: 'উপাদান', value: '100% Pure Clarified Cow Butter', valueBn: '১০০% খাঁটি গরুর দুধের ঘি' },
      { label: 'Minimum Order', labelBn: 'সর্বনিম্ন অর্ডার', value: '1 Jar (৳750)', valueBn: '১ জার (৳৭৫০)' }
    ],
    image: '/images/shahi_pure_cow_ghee.jpg',
    badge: 'Artisanal Pure Ghee',
    badgeBn: 'খাঁটি গাভীর ঘি'
  },
  {
    id: 'shahi-ghee-900g',
    aliases: ['shahi-ghee-900g'],
    name: 'Shahi Family Ghee 900g',
    nameBn: 'শাহী ফ্যামিলি ঘি ৯০০ গ্রাম',
    category: 'Artisanal Dairy',
    categoryBn: 'খাঁটি দুগ্ধজাত পণ্য',
    packageWeight: '900g jar',
    packageWeightBn: '৯০০ গ্রাম ফ্যামিলি প্যাক',
    unit: 'jar',
    unitBn: 'জার',
    price: 1450,
    minQty: 1,
    maxQty: 30,
    defaultQty: 1,
    stepQty: 1,
    inStock: true,
    shortDescription: 'Flagship 900g family pack of authentic artisanal golden cow ghee. Rich traditional flavor and uncompromised purity.',
    shortDescriptionBn: 'আমাদের সিগনেচার ৯০০ গ্রাম ফ্যামিলি প্যাক খাঁটি গাভীর ঘি। পরিবারের প্রতিদিনের স্বাস্থ্যকর রান্নায় খাঁটি স্বাদ ও পুষ্টি।',
    fullDescription: 'The flagship family pack of Shahi Ghee offers premium value for household cooking, festive Bangladeshi dishes, and daily wholesome nutrition. Prepared from fresh cow milk butter with slow simmering in heavy pans. Rich in fat-soluble vitamins and natural butyric acid.',
    fullDescriptionBn: 'শাহী ফ্যামিলি ঘি ৯০০ গ্রাম পরিবারের প্রতিদিনের রান্নায় এনে দেয় খাঁটি স্বাদ ও স্বাস্থ্য সুরক্ষা। পোলাও, খিচুড়ি, মিষ্টি কিংবা গরম ভাতে নির্ভেজাল ঘ্রাণ। ৯০০ গ্রামের বড় কাচের বয়ামে পরিবারের জন্য সেরা সাশ্রয়ী প্যাকেজ।',
    features: [
      '900g large family pack format',
      'Rich in fat-soluble vitamins (A, D, E) and healthy fats',
      'Traditional slow-simmered rich golden aroma',
      'Heavyweight secure glass container'
    ],
    featuresBn: [
      '৯০০ গ্রামের সেরা সাশ্রয়ী ফ্যামিলি প্যাক',
      'ভিটামিন এ, ডি, ই এবং স্বাস্থ্যকর ফ্যাটে ভরপুর',
      'ধীর আঁচে তৈরি খাঁটি সোনাঝরা রঙ ও ঘ্রাণ',
      'নিরাপদ হেভিওয়েট কাচের সংরক্ষণ পাত্র'
    ],
    specifications: [
      { label: 'Net Weight', labelBn: 'নেট ওজন', value: '900 grams', valueBn: '৯০০ গ্রাম' },
      { label: 'Container Type', labelBn: 'পাত্রের ধরন', value: 'Airtight Glass Jar', valueBn: 'বায়ুরোধী কাচের বৈয়াম' },
      { label: 'Ingredients', labelBn: 'উপাদান', value: '100% Pure Clarified Cow Butter', valueBn: '১০০% খাঁটি গরুর দুধের ঘি' },
      { label: 'Minimum Order', labelBn: 'সর্বনিম্ন অর্ডার', value: '1 Jar (৳1,450)', valueBn: '১ জার (৳১,৪৫০)' }
    ],
    image: '/images/shahi_pure_cow_ghee.jpg',
    badge: 'Family Value Pack',
    badgeBn: 'ফ্যামিলি প্যাক'
  }
];

export function getProductById(idOrAlias: string): Product | undefined {
  return PRODUCTS.find(p => p.id === idOrAlias || p.aliases.includes(idOrAlias));
}
