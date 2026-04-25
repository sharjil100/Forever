// All images from Fear of God Essentials CDN — used as placeholders.
// Replace with your own assets per the spec at the bottom of this file.
const FOG = 'https://fearofgod.com/cdn/shop/files';

const HOODIE_MODEL = `${FOG}/192SP264462F_TRAINING_90S_HOODIE-FADED_DUNE_1_x800.jpg`;
const HOODIE_FRONT = `${FOG}/192SP265542FW_CLASSIC_HOODIE-VINTAGE_BLACK_1_b54db34e-9f44-49c9-b929-c110f4cbe758_x600.jpg`;
const HOODIE_BACK  = `${FOG}/192SP265072FW_CLASSIC_FULL_ZIP_HOODIE-VINTAGE_BLACK_2_x800.jpg`;
const SPORT_HOODIE = `${FOG}/RW00186-006_US_BASEBALL_SPORT_HOODIE-DARK_SAPPHIRE_1_x600.jpg`;

const TEE_FRONT    = `${FOG}/125SP264411F_SIGNATURE_90S_SHORT_SLEEVE_TEE-VINTAGE_BLACK_1_x600.jpg`;
const TEE_OAT      = `${FOG}/RW00184-0132_US_BASEBALL_MERCH_TEE-OAT_1_x800.jpg`;
const POLO_BLACK   = `${FOG}/192SP264911F_SIGNATURE_90S_KNIT_POLO-VINTAGE_BLACK_1_x600.jpg`;

const PANT_SEAL    = `${FOG}/130SP268653F_TRAINING_CLASSIC_FIT_FLARE_SWEATPANT-FADED_SEAL_1_x800.jpg`;
const PANT_BLACK   = `${FOG}/130SP268651F_TRAINING_CLASSIC_FIT_FLARE_SWEATPANT-FADED_BLACK_1_x600.jpg`;
const PANT_PIPING  = `${FOG}/130SP265701FW_WOMENS_SIGNATURE_RELAXED_PANT_WITH_PIPING-VINTAGE_BLACK_2_x800.jpg`;

export const products = [
  // ── EMBRACE THE JOURNEY — HOODIES (4) ───────────────────────────
  {
    id: 1, collection: 'embrace', category: 'hoodies',
    name: 'FOREVER HOODIE', subtitle: 'Heavyweight Fleece',
    description: 'The one you reach for every time.',
    longDescription: 'Built from 14oz brushed fleece. Dropped shoulders. Oversized fit. The kind of hoodie that becomes part of how people remember you.',
    price: 168, originalPrice: null,
    size: 'S / M / L / XL / XXL', colorway: 'Vintage Black', inStock: true,
    image: HOODIE_MODEL, hoverImage: HOODIE_FRONT, modelImage: HOODIE_MODEL,
  },
  {
    id: 2, collection: 'embrace', category: 'hoodies',
    name: 'FOREVER HOODIE', subtitle: 'Classic Pullover',
    description: 'Clean. Heavy. Built to last.',
    longDescription: 'A clean pullover silhouette with no excess. Heavyweight cotton-poly fleece, kangaroo pocket, and a fit that works whether you are standing still or in motion.',
    price: 158, originalPrice: null,
    size: 'S / M / L / XL / XXL', colorway: 'Dark Sapphire', inStock: true,
    image: HOODIE_FRONT, hoverImage: SPORT_HOODIE,
  },
  {
    id: 3, collection: 'embrace', category: 'hoodies',
    name: 'FOREVER ZIP HOODIE', subtitle: 'Full Zip',
    description: 'The one you never take off.',
    longDescription: 'Garment-dyed after construction. Full-length YKK zip. A heavyweight shell that breaks in better with every wear.',
    price: 178, originalPrice: null,
    size: 'S / M / L / XL / XXL', colorway: 'Faded Seal', inStock: true,
    image: HOODIE_BACK, hoverImage: HOODIE_MODEL,
  },
  {
    id: 4, collection: 'embrace', category: 'hoodies',
    name: 'SPORT HOODIE', subtitle: 'Athletic Fleece',
    description: 'Performance. Without the compromise.',
    longDescription: 'A sport-weight hoodie with athletic proportions. Moisture-managing fleece, ribbed cuffs, and a cut that moves.',
    price: 165, originalPrice: 195,
    size: 'S / M / L / XL', colorway: 'Oat', inStock: true,
    image: SPORT_HOODIE, hoverImage: HOODIE_FRONT,
  },

  // ── EMBRACE THE JOURNEY — T-SHIRTS (5 color variants) ───────────
  {
    id: 5, collection: 'embrace', category: 'tshirts',
    name: 'OVERSIZED TEE', subtitle: '240gsm Boxy Fit',
    description: 'Worn loose. Worn often.',
    longDescription: 'A 240gsm cotton jersey tee. Boxy fit. Dropped hem. Five colorways — same cut, different mood.',
    price: 68, originalPrice: null,
    size: 'XS / S / M / L / XL / XXL', colorway: 'Vintage Black', colorHex: '#1a1a1a',
    inStock: true, image: TEE_FRONT, hoverImage: TEE_OAT, modelImage: TEE_FRONT,
  },
  {
    id: 6, collection: 'embrace', category: 'tshirts',
    name: 'OVERSIZED TEE', subtitle: '240gsm Boxy Fit',
    description: 'Worn loose. Worn often.',
    longDescription: 'A 240gsm cotton jersey tee. Boxy fit. Dropped hem.',
    price: 68, originalPrice: null,
    size: 'XS / S / M / L / XL / XXL', colorway: 'Oat', colorHex: '#d8c9a8',
    inStock: true, image: TEE_OAT, hoverImage: TEE_FRONT,
  },
  {
    id: 7, collection: 'embrace', category: 'tshirts',
    name: 'OVERSIZED TEE', subtitle: '240gsm Boxy Fit',
    description: 'Worn loose. Worn often.',
    longDescription: 'A 240gsm cotton jersey tee. Boxy fit. Dropped hem.',
    price: 68, originalPrice: null,
    size: 'XS / S / M / L / XL / XXL', colorway: 'Faded Seal', colorHex: '#5a5751',
    inStock: true, image: POLO_BLACK, hoverImage: TEE_FRONT,
  },
  {
    id: 8, collection: 'embrace', category: 'tshirts',
    name: 'OVERSIZED TEE', subtitle: '240gsm Boxy Fit',
    description: 'Worn loose. Worn often.',
    longDescription: 'A 240gsm cotton jersey tee. Boxy fit. Dropped hem.',
    price: 68, originalPrice: null,
    size: 'XS / S / M / L / XL / XXL', colorway: 'Bone', colorHex: '#e8dfcf',
    inStock: true, image: TEE_OAT, hoverImage: POLO_BLACK,
  },
  {
    id: 9, collection: 'embrace', category: 'tshirts',
    name: 'OVERSIZED TEE', subtitle: '240gsm Boxy Fit',
    description: 'Worn loose. Worn often.',
    longDescription: 'A 240gsm cotton jersey tee. Boxy fit. Dropped hem.',
    price: 68, originalPrice: null,
    size: 'XS / S / M / L / XL / XXL', colorway: 'Olive Drab', colorHex: '#5a5a3a',
    inStock: true, image: TEE_FRONT, hoverImage: TEE_OAT,
  },

  // ── EMBRACE THE JOURNEY — SWEATPANTS (4) ────────────────────────
  {
    id: 10, collection: 'embrace', category: 'sweatpants',
    name: 'FOREVER SWEATPANT', subtitle: 'Classic Flare',
    description: 'The bottom half of the answer.',
    longDescription: 'A flared-leg sweatpant cut from heavyweight fleece. High-rise, elastic waistband, side-seam pockets.',
    price: 148, originalPrice: null,
    size: 'XS / S / M / L / XL / XXL', colorway: 'Faded Seal', inStock: true,
    image: PANT_SEAL, hoverImage: PANT_BLACK, modelImage: PANT_SEAL,
  },
  {
    id: 11, collection: 'embrace', category: 'sweatpants',
    name: 'FOREVER SWEATPANT', subtitle: 'Relaxed Fit',
    description: 'Unbothered. All the way down.',
    longDescription: 'A tapered relaxed sweatpant in garment-dyed fleece. Substantial without heaviness.',
    price: 148, originalPrice: null,
    size: 'XS / S / M / L / XL', colorway: 'Faded Black', inStock: true,
    image: PANT_BLACK, hoverImage: PANT_SEAL,
  },
  {
    id: 12, collection: 'embrace', category: 'sweatpants',
    name: 'SIGNATURE PANT', subtitle: 'With Piping',
    description: 'A detail that earns its place.',
    longDescription: 'A signature relaxed pant with contrast piping along the outseam. Heavy fleece, clean drape.',
    price: 158, originalPrice: 185,
    size: 'XS / S / M / L / XL', colorway: 'Vintage Black', inStock: true,
    image: PANT_PIPING, hoverImage: PANT_BLACK,
  },
  {
    id: 13, collection: 'embrace', category: 'sweatpants',
    name: 'TRACK PANT', subtitle: 'Tapered',
    description: 'Built for movement.',
    longDescription: 'A tapered track pant with elastic ankle, hidden side pockets, and ribbed waistband.',
    price: 138, originalPrice: null,
    size: 'XS / S / M / L / XL', colorway: 'Stone', inStock: true,
    image: PANT_SEAL, hoverImage: PANT_PIPING,
  },

  // ── THE BEGINNING — ARCHIVE HOODIES (3, all sold out) ───────────
  {
    id: 101, collection: 'beginning', category: 'hoodies',
    name: 'DROP 01 HOODIE', subtitle: 'Original Run',
    description: 'Where it started.',
    longDescription: 'The hoodie that started it all. 12oz fleece, raglan sleeves, original FOREVER tag. Limited to 200 units.',
    price: 220, originalPrice: null,
    size: 'M / L', colorway: 'Vintage Cream', inStock: false,
    image: HOODIE_MODEL, hoverImage: HOODIE_FRONT,
  },
  {
    id: 102, collection: 'beginning', category: 'hoodies',
    name: 'CHARTER HOODIE', subtitle: 'Founders Edition',
    description: 'Worn by the first.',
    longDescription: 'The Founders Edition hoodie. Embroidered tonal logo, garment-washed for vintage hand-feel.',
    price: 245, originalPrice: null,
    size: 'L', colorway: 'Faded Black', inStock: false,
    image: HOODIE_FRONT, hoverImage: SPORT_HOODIE,
  },
  {
    id: 103, collection: 'beginning', category: 'hoodies',
    name: 'PROTOTYPE HOODIE', subtitle: 'Sample Run',
    description: 'The one that almost was.',
    longDescription: 'A pre-production sample with hand-stitched pockets. Never offered again. Six units made.',
    price: 320, originalPrice: null,
    size: 'M', colorway: 'Faded Olive', inStock: false,
    image: HOODIE_BACK, hoverImage: HOODIE_MODEL,
  },
];

export const collections = [
  {
    id: 'hoodies', label: 'Hoodies', name: 'The Outer Layer',
    desc: 'Heavyweight fleece. Dropped shoulders. The piece you never take off.',
    image: HOODIE_MODEL,
  },
  {
    id: 'tshirts', label: 'T-Shirts', name: 'The Foundation',
    desc: 'Nothing extra. 240gsm cotton. The base of every outfit worth wearing.',
    image: TEE_FRONT,
  },
  {
    id: 'sweatpants', label: 'Sweatpants', name: 'The Bottom Half',
    desc: 'An outfit, not an afterthought. Heavyweight fleece, clean silhouette.',
    image: PANT_SEAL,
  },
];

// Style finder matrix — [q1: time][q2: vibe] → product index
export const finderMatrix = {
  morning: { clean: 3, bold: 4, quiet: 0 },
  evening: { clean: 6, bold: 1, quiet: 9 },
  always:  { clean: 0, bold: 4, quiet: 11 },
};

/* ───────────────────────────────────────────────────────────────
   IMAGE SPEC (public/products/)

   For each garment, ship 3 images on a transparent or pure-white
   background, named consistently:

     /products/{slug}-model.png   →  one full-body model shot
                                     1200 × 1500 px, transparent bg
                                     (cropped at hips for tops, at
                                     mid-shin for pants)

     /products/{slug}-front.png   →  flat-lay product front view
                                     1000 × 1000 px, transparent bg

     /products/{slug}-back.png    →  flat-lay product back view
                                     1000 × 1000 px, transparent bg

   For the 5 T-SHIRT colors, ship one front + one back per color:
     /products/tee-{color}-front.png   1000 × 1000 px
     /products/tee-{color}-back.png    1000 × 1000 px
   And ONE model shot wearing any single color (re-used as the
   feature image for the tees row).

   Keep file size < 250 KB each (use TinyPNG / WebP if possible).
   ─────────────────────────────────────────────────────────────── */
