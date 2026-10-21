/**
 * Shahi Agro Farm — Centralized Price Calculation & Validation Engine
 * 
 * Enforces integer BDT arithmetic, exact product constraints,
 * delivery-charge provisional status, and bilingual currency formatting.
 */

import { BUSINESS_CONFIG } from '../data/config.ts';
import { PRODUCTS, getProductById, Product } from '../data/products.ts';

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface ValidatedCartItem extends CartItem {
  product: Product;
  productName: string;
  productNameBn: string;
  packageWeight: string;
  packageWeightBn: string;
  unit: string;
  unitBn: string;
  unitPrice: number;
  subtotal: number;
  image: string;
}

export interface CartTotals {
  subtotal: number;
  deliveryChargeAmount: number; // 0 unless explicitly configured
  deliveryChargeStatus: string;
  deliveryChargeStatusBn: string;
  isDeliveryProvisional: boolean;
  orderTotal: number;
  isTotalProvisional: boolean;
  totalWeightNote: string;
  totalWeightNoteBn: string;
  itemCount: number;
  hasGrassSilage: boolean;
  silagePacketCount: number;
  gheeJarCount: number;
}

export interface QuantityValidationResult {
  valid: boolean;
  normalizedQty: number;
  error?: string;
  errorBn?: string;
}

/**
 * Validates a product quantity strictly against Shahi Agro Farm rules:
 * - Grass Silage: Min 20, Max 400, strictly in multiples of 10.
 * - Ghee (200g & 900g): Min 1, Max 50/30, increment of 1.
 */
export function validateQuantity(productId: string, rawQty: number | string): QuantityValidationResult {
  const product = getProductById(productId);
  if (!product) {
    return {
      valid: false,
      normalizedQty: 0,
      error: `Invalid product: ${productId}`,
      errorBn: `অকার্যকর পণ্য: ${productId}`
    };
  }

  // Reject non-numeric, decimals, negatives, or strings with non-digits
  if (typeof rawQty === 'string') {
    const trimmed = rawQty.trim();
    if (!/^\d+$/.test(trimmed)) {
      return {
        valid: false,
        normalizedQty: product.defaultQty,
        error: 'Please enter a valid whole number.',
        errorBn: 'অনুগ্রহ করে একটি সঠিক পূর্ণসংখ্যা লিখুন।'
      };
    }
  }

  const num = typeof rawQty === 'string' ? parseInt(rawQty, 10) : Math.floor(rawQty);

  if (isNaN(num) || num <= 0) {
    return {
      valid: false,
      normalizedQty: product.defaultQty,
      error: `Minimum quantity is ${product.minQty}.`,
      errorBn: `সর্বনিম্ন পরিমাণ ${product.minQty}।`
    };
  }

  // Special rules for Grass Silage: Range 20 to 400, strictly multiples of 10
  if (product.id === 'grass-silage' || product.aliases.includes('grass-silage')) {
    if (num < 20) {
      return {
        valid: false,
        normalizedQty: 20,
        error: 'Minimum order for Grass Silage is 20 packets (৳7,000).',
        errorBn: 'ঘাস সাইলেজের সর্বনিম্ন অর্ডার ২০ প্যাকেট (৳৭,০০০)।'
      };
    }
    if (num > 400) {
      return {
        valid: false,
        normalizedQty: 400,
        error: 'Maximum order per consignment is 400 packets (৳140,000).',
        errorBn: 'এক চালানে সর্বোচ্চ অর্ডার ৪০০ প্যাকেট (৳১,৪০,০০০)।'
      };
    }
    if (num % 10 !== 0) {
      const rounded = Math.round(num / 10) * 10;
      const clamped = Math.min(400, Math.max(20, rounded));
      return {
        valid: false,
        normalizedQty: clamped,
        error: `Grass Silage must be in multiples of 10 (e.g., 20, 30, 40... 400).`,
        errorBn: `ঘাস সাইলেজের পরিমাণ অবশ্যই ১০ এর গুণিতক হতে হবে (যেমন: ২০, ৩০, ৪০... ৪০০)।`
      };
    }
    return { valid: true, normalizedQty: num };
  }

  // Rules for Ghee (200g and 900g)
  if (num < product.minQty) {
    return {
      valid: false,
      normalizedQty: product.minQty,
      error: `Minimum order for ${product.name} is ${product.minQty} jar.`,
      errorBn: `${product.nameBn}-এর সর্বনিম্ন অর্ডার ${product.minQty} জার।`
    };
  }
  if (num > product.maxQty) {
    return {
      valid: false,
      normalizedQty: product.maxQty,
      error: `Maximum online limit is ${product.maxQty} jars. Contact via WhatsApp for commercial wholesale.`,
      errorBn: `অনলাইনে সর্বোচ্চ সীমা ${product.maxQty} জার। পাইকারি অর্ডারের জন্য হোয়াটসঅ্যাপে যোগাযোগ করুন।`
    };
  }

  return { valid: true, normalizedQty: num };
}

/**
 * Re-validates all cart items and calculates exact line subtotals, cart subtotal,
 * and delivery charge status.
 */
export function calculateCartTotals(cartItems: CartItem[]): { validatedItems: ValidatedCartItem[]; totals: CartTotals } {
  const validatedItems: ValidatedCartItem[] = [];
  let subtotal = 0;
  let hasGrassSilage = false;
  let silagePacketCount = 0;
  let gheeJarCount = 0;

  for (const item of cartItems) {
    const product = getProductById(item.productId);
    if (!product) continue;

    const validation = validateQuantity(product.id, item.quantity);
    const validQty = validation.valid ? item.quantity : validation.normalizedQty;
    const lineSubtotal = validQty * product.price;

    if (product.id === 'grass-silage' || product.aliases.includes('grass-silage')) {
      hasGrassSilage = true;
      silagePacketCount += validQty;
    } else {
      gheeJarCount += validQty;
    }

    subtotal += lineSubtotal;
    validatedItems.push({
      productId: product.id,
      quantity: validQty,
      product,
      productName: product.name,
      productNameBn: product.nameBn,
      packageWeight: product.packageWeight,
      packageWeightBn: product.packageWeightBn,
      unit: product.unit,
      unitBn: product.unitBn,
      unitPrice: product.price,
      subtotal: lineSubtotal,
      image: product.image
    });
  }

  // Delivery charge rule:
  // If the owner has not configured fixed delivery charges, show "Delivery charge will be confirmed"
  // and mark the final total as provisional.
  const deliveryChargeAmount = 0;
  let deliveryChargeStatus = 'Delivery charge will be confirmed by farm upon dispatch';
  let deliveryChargeStatusBn = 'ডেলিভারি চার্জ খামার থেকে প্রেরণের সময় নিশ্চিত করা হবে';

  if (hasGrassSilage) {
    deliveryChargeStatus = `Truck freight delivery charge for ${silagePacketCount} packets will be confirmed based on district road distance`;
    deliveryChargeStatusBn = `${silagePacketCount} প্যাকেট সাইলেজের ট্রাক পরিবহন ভাড়া জেলা দূরত্বের ভিত্তিতে জানিয়ে দেওয়া হবে`;
  } else if (gheeJarCount > 0) {
    deliveryChargeStatus = 'Courier delivery charge to be confirmed upon district dispatch';
    deliveryChargeStatusBn = 'কুরিয়ার ডেলিভারি চার্জ প্রেরণের সময় নিশ্চিত করা হবে';
  }

  let totalWeightNote = '';
  let totalWeightNoteBn = '';
  if (hasGrassSilage) {
    const totalWeightKg = silagePacketCount * 50;
    totalWeightNote = `${silagePacketCount} packets (${totalWeightKg.toLocaleString()} kg / ${(totalWeightKg / 1000).toFixed(1)} MT)`;
    totalWeightNoteBn = `${silagePacketCount} প্যাকেট (${toBanglaDigits(totalWeightKg.toLocaleString())} কেজি / ${toBanglaDigits((totalWeightKg / 1000).toFixed(1))} মেট্রিক টন)`;
  } else if (gheeJarCount > 0) {
    totalWeightNote = `${gheeJarCount} jar(s)`;
    totalWeightNoteBn = `${toBanglaDigits(gheeJarCount)} জার`;
  }

  return {
    validatedItems,
    totals: {
      subtotal,
      deliveryChargeAmount,
      deliveryChargeStatus,
      deliveryChargeStatusBn,
      isDeliveryProvisional: true,
      orderTotal: subtotal + deliveryChargeAmount,
      isTotalProvisional: true, // Marked provisional because freight/courier is verified upon dispatch
      totalWeightNote,
      totalWeightNoteBn,
      itemCount: validatedItems.reduce((acc, it) => acc + it.quantity, 0),
      hasGrassSilage,
      silagePacketCount,
      gheeJarCount
    }
  };
}

/**
 * Converts English digits to Bangla numerals.
 */
export function toBanglaDigits(num: number | string): string {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (d) => bnDigits[parseInt(d, 10)]);
}

/**
 * Formats currency in Bangladeshi Taka (BDT) in English or Bangla.
 */
export function formatBDT(amount: number, lang: 'en' | 'bn' = 'en'): string {
  const formatted = amount.toLocaleString('en-IN');
  if (lang === 'bn') {
    return `৳${toBanglaDigits(formatted)}`;
  }
  return `৳${formatted}`;
}

/**
 * Validates a Bangladeshi mobile phone number (11 digits, starts with 013-019).
 */
export function validateBDPhone(phone: string): { valid: boolean; normalized: string; error?: string; errorBn?: string } {
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  let normalized = cleaned;
  if (normalized.startsWith('+880')) {
    normalized = normalized.substring(3);
  } else if (normalized.startsWith('880')) {
    normalized = normalized.substring(2);
  }

  const bdRegex = /^01[3-9]\d{8}$/;
  if (!bdRegex.test(normalized)) {
    return {
      valid: false,
      normalized,
      error: 'Please enter a valid 11-digit Bangladeshi mobile number (e.g., 01604985164).',
      errorBn: 'অনুগ্রহ করে একটি সঠিক ১১ ডিজিটের বাংলাদেশী মোবাইল নম্বর দিন (যেমন: 01604985164)।'
    };
  }

  return { valid: true, normalized };
}

export interface CheckoutFormData {
  fullName: string;
  phone: string;
  email?: string;
  district: string;
  address: string;
  deliveryNotes?: string;
  paymentMethod: 'cod' | 'bkash' | 'upay' | 'nagad' | 'rocket';
  trxId?: string;
}

/**
 * Generates an internationally formatted, URL-encoded WhatsApp click-to-chat link.
 * Number: 8801604985164
 */
export function generateWhatsAppOrderUrl(
  orderId: string,
  formData: CheckoutFormData,
  validatedItems: ValidatedCartItem[],
  totals: CartTotals
): string {
  const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const itemsText = validatedItems
    .map(it => `• ${it.productName} (${it.packageWeight}) × ${it.quantity} = ${formatBDT(it.subtotal)}`)
    .join('\n');

  let paymentLabel = 'Cash on Delivery (Unpaid — to be collected at delivery)';
  if (formData.paymentMethod !== 'cod') {
    const trxDisplay = formData.trxId ? formData.trxId.trim() : 'Pending confirmation';
    paymentLabel = `${formData.paymentMethod.toUpperCase()} Personal Send Money (TrxID: ${trxDisplay} — Verification Pending)`;
  }

  const message = `🌿 *SHAHI AGRO FARM — ORDER CONFIRMATION REQUEST* 🌿
━━━━━━━━━━━━━━━━━━━━━━━━
*Order Reference:* #${orderId}
*Date:* ${dateStr}

*CUSTOMER DETAILS:*
• Name: ${formData.fullName}
• Phone: ${formData.phone}
${formData.email ? `• Email: ${formData.email}\n` : ''}• District: ${formData.district}
• Delivery Address: ${formData.address}
${formData.deliveryNotes ? `• Notes: ${formData.deliveryNotes}\n` : ''}
*ORDER ITEMS:*
${itemsText}
━━━━━━━━━━━━━━━━━━━━━━━━
*Subtotal:* ${formatBDT(totals.subtotal)}
*Delivery Charge:* ${totals.deliveryChargeStatus}
*Order Total:* ${formatBDT(totals.orderTotal)} (Provisional: delivery charge to be added upon dispatch confirmation)
*Payment Method:* ${paymentLabel}
*Payment Status:* Verification pending by farm management

_Note: Tapping Send opens this message with Shahi Agro Farm. Final delivery schedule and payment verification will be confirmed by farm staff._`;

  const cleanNumber = BUSINESS_CONFIG.whatsappIntl;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Formats a plain text order summary for the copy button.
 */
export function formatPlainOrderSummary(
  orderId: string,
  formData: CheckoutFormData,
  validatedItems: ValidatedCartItem[],
  totals: CartTotals
): string {
  const itemsText = validatedItems
    .map(it => `- ${it.productName} (${it.packageWeight}) x ${it.quantity} = ${formatBDT(it.subtotal)}`)
    .join('\n');

  return `SHAHI AGRO FARM ORDER RECEIPT
Order ID: #${orderId}
Customer: ${formData.fullName} (${formData.phone})
District: ${formData.district}
Address: ${formData.address}
Payment Method: ${formData.paymentMethod.toUpperCase()} ${formData.trxId ? `(TrxID: ${formData.trxId})` : ''}

Items:
${itemsText}

Subtotal: ${formatBDT(totals.subtotal)}
Delivery Charge: ${totals.deliveryChargeStatus}
Total: ${formatBDT(totals.orderTotal)} (Provisional)
Status: Verification Pending
`;
}
