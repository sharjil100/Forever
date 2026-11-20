// Site-wide settings.
export const site = {
  name: 'FOREVER',
  // optional: e.g. 'https://m.me/yourpagename' — shown as "Prefer Messenger?" in the bag
  messengerUrl: '',
  facebookUrl: '',
  instagramUrl: 'https://www.instagram.com/for_ever_bd/',
  promo: [
    "We're back — Flat 40% off everything",
    'Cash on delivery',
    'Delivery across Bangladesh',
  ],
  // delivery charges in ৳
  delivery: {
    inside_dhaka:  { label: 'Inside Dhaka',  fee: 80 },
    outside_dhaka: { label: 'Outside Dhaka', fee: 120 },
  },
};

export const formatPrice = (n) => `৳${Number(n).toLocaleString('en-IN')}`;

// Bangladeshi mobile: 01XXXXXXXXX (also accepts +880 / 880 prefix)
export function normalizePhone(raw = '') {
  const digits = String(raw).replace(/[^\d]/g, '');
  const local = digits.startsWith('880') ? '0' + digits.slice(3) : digits;
  return /^01[3-9]\d{8}$/.test(local) ? local : null;
}
