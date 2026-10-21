import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateQuantity,
  calculateCartTotals,
  validateBDPhone,
  generateWhatsAppOrderUrl,
  formatBDT,
  toBanglaDigits
} from './cart-rules.ts';

test('Grass Silage: validates exact boundary calculations (20 = ৳7,000; 30 = ৳10,500; 400 = ৳140,000)', () => {
  // Valid quantities
  const q20 = validateQuantity('grass-silage', 20);
  assert.equal(q20.valid, true);
  assert.equal(q20.normalizedQty, 20);

  const q30 = validateQuantity('grass-silage', 30);
  assert.equal(q30.valid, true);
  assert.equal(q30.normalizedQty, 30);

  const q100 = validateQuantity('grass-silage', 100);
  assert.equal(q100.valid, true);
  assert.equal(q100.normalizedQty, 100);

  const q400 = validateQuantity('grass-silage', 400);
  assert.equal(q400.valid, true);
  assert.equal(q400.normalizedQty, 400);

  // Line subtotals
  const res20 = calculateCartTotals([{ productId: 'grass-silage', quantity: 20 }]);
  assert.equal(res20.totals.subtotal, 7000); // 20 * ৳350 = ৳7,000

  const res30 = calculateCartTotals([{ productId: 'grass-silage', quantity: 30 }]);
  assert.equal(res30.totals.subtotal, 10500); // 30 * ৳350 = ৳10,500

  const res100 = calculateCartTotals([{ productId: 'grass-silage', quantity: 100 }]);
  assert.equal(res100.totals.subtotal, 35000); // 100 * ৳350 = ৳35,000

  const res400 = calculateCartTotals([{ productId: 'grass-silage', quantity: 400 }]);
  assert.equal(res400.totals.subtotal, 140000); // 400 * ৳350 = ৳140,000
});

test('Grass Silage: rejects invalid quantities (0, 10, 19, 21, 25, 401, negatives, decimals, strings)', () => {
  // Below min 20
  assert.equal(validateQuantity('grass-silage', 0).valid, false);
  assert.equal(validateQuantity('grass-silage', 10).valid, false);
  assert.equal(validateQuantity('grass-silage', 19).valid, false);
  assert.equal(validateQuantity('grass-silage', -5).valid, false);

  // Not multiple of 10
  assert.equal(validateQuantity('grass-silage', 21).valid, false);
  assert.equal(validateQuantity('grass-silage', 25).valid, false);
  assert.equal(validateQuantity('grass-silage', 35).valid, false);

  // Above max 400
  assert.equal(validateQuantity('grass-silage', 401).valid, false);
  assert.equal(validateQuantity('grass-silage', 405).valid, false);
  assert.equal(validateQuantity('grass-silage', 500).valid, false);

  // Non-numeric strings and decimals
  assert.equal(validateQuantity('grass-silage', '25.5').valid, false);
  assert.equal(validateQuantity('grass-silage', 'twenty').valid, false);
});

test('Shahi Ghee 200g: unit price ৳750, calculations (1 = ৳750, 2 = ৳1,500, 3 = ৳2,250, 10 = ৳7,500)', () => {
  const res1 = calculateCartTotals([{ productId: 'shahi-ghee-200g', quantity: 1 }]);
  assert.equal(res1.totals.subtotal, 750);

  const res2 = calculateCartTotals([{ productId: 'shahi-ghee-200g', quantity: 2 }]);
  assert.equal(res2.totals.subtotal, 1500);

  const res3 = calculateCartTotals([{ productId: 'shahi-ghee-200g', quantity: 3 }]);
  assert.equal(res3.totals.subtotal, 2250);

  const res10 = calculateCartTotals([{ productId: 'shahi-ghee-200g', quantity: 10 }]);
  assert.equal(res10.totals.subtotal, 7500);
});

test('Shahi Family Ghee 900g: unit price ৳1,450, calculations (1 = ৳1,450, 2 = ৳2,900, 3 = ৳4,350, 10 = ৳14,500)', () => {
  const res1 = calculateCartTotals([{ productId: 'shahi-ghee-900g', quantity: 1 }]);
  assert.equal(res1.totals.subtotal, 1450);

  const res2 = calculateCartTotals([{ productId: 'shahi-ghee-900g', quantity: 2 }]);
  assert.equal(res2.totals.subtotal, 2900);

  const res3 = calculateCartTotals([{ productId: 'shahi-ghee-900g', quantity: 3 }]);
  assert.equal(res3.totals.subtotal, 4350);

  const res10 = calculateCartTotals([{ productId: 'shahi-ghee-900g', quantity: 10 }]);
  assert.equal(res10.totals.subtotal, 14500);
});

test('MANDATORY MIXED CART TEST: 20 Silage + 2 Ghee 200g + 1 Family Ghee 900g = ৳9,950', () => {
  // 20 Grass Silage = 20 * ৳350 = ৳7,000
  // 2 Shahi Ghee 200g = 2 * ৳750 = ৳1,500
  // 1 Shahi Family Ghee 900g = 1 * ৳1,450 = ৳1,450
  // Expected Subtotal = 7000 + 1500 + 1450 = ৳9,950
  const mixedCart = [
    { productId: 'grass-silage', quantity: 20 },
    { productId: 'shahi-ghee-200g', quantity: 2 },
    { productId: 'shahi-ghee-900g', quantity: 1 }
  ];

  const result = calculateCartTotals(mixedCart);

  assert.equal(result.totals.subtotal, 9950);
  assert.equal(result.totals.isTotalProvisional, true);
  assert.match(result.totals.deliveryChargeStatus, /confirmed/i);
  assert.equal(result.totals.hasGrassSilage, true);
  assert.equal(result.totals.silagePacketCount, 20);
  assert.equal(result.totals.gheeJarCount, 3);
});

test('Bangla digits conversion and BDT formatting', () => {
  assert.equal(toBanglaDigits('9950'), '৯৯৫০');
  assert.equal(formatBDT(9950, 'en'), '৳9,950');
  assert.equal(formatBDT(9950, 'bn'), '৳৯,৯৫০');
});

test('Bangladeshi phone validation accepts valid mobile numbers and rejects invalid ones', () => {
  assert.equal(validateBDPhone('01604985164').valid, true);
  assert.equal(validateBDPhone('+8801814026318').valid, true);
  assert.equal(validateBDPhone('01814-026318').valid, true);
  assert.equal(validateBDPhone('01234567890').valid, false);
  assert.equal(validateBDPhone('016049851').valid, false);
});

test('WhatsApp URL generator formats international number 8801604985164 and encodes full details', () => {
  const url = generateWhatsAppOrderUrl(
    'SAF-TEST-99',
    {
      fullName: 'Kamal Uddin',
      phone: '01604985164',
      district: 'Noakhali',
      address: 'Char Bata, Shubornochar',
      paymentMethod: 'bkash',
      trxId: 'TRX998877'
    },
    [
      {
        productId: 'grass-silage',
        product: {} as any,
        productName: 'Grass Silage',
        productNameBn: 'ঘাস সাইলেজ',
        packageWeight: '50 kg per packet',
        packageWeightBn: '৫০ কেজি প্যাকেট',
        unit: 'packet',
        unitBn: 'প্যাকেট',
        unitPrice: 350,
        quantity: 20,
        subtotal: 7000,
        image: '/images/shahi_grass_silage.jpg'
      }
    ],
    {
      subtotal: 7000,
      deliveryChargeAmount: 0,
      deliveryChargeStatus: 'Delivery charge to be confirmed',
      deliveryChargeStatusBn: 'ডেলিভারি চার্জ নিশ্চিত করা হবে',
      isDeliveryProvisional: true,
      orderTotal: 7000,
      isTotalProvisional: true,
      totalWeightNote: '20 packets (1,000 kg)',
      totalWeightNoteBn: '২০ প্যাকেট (১,০০০ কেজি)',
      itemCount: 20,
      hasGrassSilage: true,
      silagePacketCount: 20,
      gheeJarCount: 0
    }
  );

  assert.match(url, /^https:\/\/wa\.me\/8801604985164\?text=/);
  assert.match(decodeURIComponent(url), /SAF-TEST-99/);
  assert.match(decodeURIComponent(url), /Kamal Uddin/);
  assert.match(decodeURIComponent(url), /৳7,000/);
  assert.match(decodeURIComponent(url), /TRX998877/);
});
