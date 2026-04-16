// All images from Fear of God Essentials CDN — used as dummy content
const FOG = 'https://fearofgod.com/cdn/shop/files';

export const products = [
  // ── HOODIES ──────────────────────────────────────────────────
  {
    id: 1,
    name: 'FOREVER HOODIE',
    subtitle: 'Heavyweight Fleece',
    description: 'The one you reach for every time.',
    longDescription:
      'Built from 14oz brushed fleece. Dropped shoulders. Oversized fit. The kind of hoodie that becomes part of how people remember you.',
    price: 168,
    originalPrice: null,
    size: 'S / M / L / XL / XXL',
    category: 'hoodies',
    colorway: 'Vintage Black',
    inStock: true,
    image: `${FOG}/192SP264462F_TRAINING_90S_HOODIE-FADED_DUNE_1_x800.jpg`,
    hoverImage: `${FOG}/192SP265072FW_CLASSIC_FULL_ZIP_HOODIE-VINTAGE_BLACK_2_x800.jpg`,
  },
  {
    id: 2,
    name: 'FOREVER HOODIE',
    subtitle: 'Classic Pullover',
    description: 'Clean. Heavy. Built to last.',
    longDescription:
      'A clean pullover silhouette with no excess. Heavyweight cotton-poly fleece, kangaroo pocket, and a fit that works whether you are standing still or in motion.',
    price: 158,
    originalPrice: null,
    size: 'S / M / L / XL / XXL',
    category: 'hoodies',
    colorway: 'Dark Sapphire',
    inStock: true,
    image: `${FOG}/192SP265542FW_CLASSIC_HOODIE-VINTAGE_BLACK_1_b54db34e-9f44-49c9-b929-c110f4cbe758_x600.jpg`,
    hoverImage: `${FOG}/RW00186-006_US_BASEBALL_SPORT_HOODIE-DARK_SAPPHIRE_1_x600.jpg`,
  },
  {
    id: 3,
    name: 'FOREVER ZIP HOODIE',
    subtitle: 'Full Zip',
    description: 'The one you never take off.',
    longDescription:
      'Garment-dyed after construction. Full-length YKK zip. A heavyweight shell that breaks in better with every wear — made for those who dress by feel, not by season.',
    price: 178,
    originalPrice: null,
    size: 'S / M / L / XL / XXL',
    category: 'hoodies',
    colorway: 'Faded Seal',
    inStock: true,
    image: `${FOG}/192SP265072FW_CLASSIC_FULL_ZIP_HOODIE-VINTAGE_BLACK_2_x800.jpg`,
    hoverImage: `${FOG}/192SP264462F_TRAINING_90S_HOODIE-FADED_DUNE_1_x800.jpg`,
  },
  {
    id: 4,
    name: 'SPORT HOODIE',
    subtitle: 'Athletic Fleece',
    description: 'Performance. Without the compromise.',
    longDescription:
      'A sport-weight hoodie with athletic proportions. Moisture-managing fleece, ribbed cuffs, and a cut that moves. The line between training and everyday is a line we ignore.',
    price: 165,
    originalPrice: 195,
    size: 'S / M / L / XL',
    category: 'hoodies',
    colorway: 'Oat',
    inStock: true,
    image: `${FOG}/RW00186-006_US_BASEBALL_SPORT_HOODIE-DARK_SAPPHIRE_1_x600.jpg`,
    hoverImage: `${FOG}/192SP265542FW_CLASSIC_HOODIE-VINTAGE_BLACK_1_b54db34e-9f44-49c9-b929-c110f4cbe758_x600.jpg`,
  },

  // ── T-SHIRTS ──────────────────────────────────────────────────
  {
    id: 5,
    name: 'FOREVER TEE',
    subtitle: '90s Heavyweight',
    description: 'Nothing extra. Nothing missing.',
    longDescription:
      'A 240gsm cotton jersey tee. Boxy fit. Dropped hem. The kind of blank that does not need graphics to say something — though it says everything.',
    price: 68,
    originalPrice: null,
    size: 'XS / S / M / L / XL / XXL',
    category: 'tshirts',
    colorway: 'Vintage Black',
    inStock: true,
    image: `${FOG}/125SP264411F_SIGNATURE_90S_SHORT_SLEEVE_TEE-VINTAGE_BLACK_1_x600.jpg`,
    hoverImage: `${FOG}/RW00184-0132_US_BASEBALL_MERCH_TEE-OAT_1_x800.jpg`,
  },
  {
    id: 6,
    name: 'MERCH TEE',
    subtitle: 'Graphic Series',
    description: 'Worn by those who were there.',
    longDescription:
      'A limited graphic tee from the FOREVER merch series. Heavy cotton, screen-printed artwork, and a fit built for layering or wearing alone. Edition one of one.',
    price: 85,
    originalPrice: null,
    size: 'S / M / L / XL / XXL',
    category: 'tshirts',
    colorway: 'Oat',
    inStock: true,
    image: `${FOG}/RW00184-0132_US_BASEBALL_MERCH_TEE-OAT_1_x800.jpg`,
    hoverImage: `${FOG}/125SP264411F_SIGNATURE_90S_SHORT_SLEEVE_TEE-VINTAGE_BLACK_1_x600.jpg`,
  },
  {
    id: 7,
    name: 'FOREVER POLO',
    subtitle: 'Knit Polo',
    description: 'The elevated everyday.',
    longDescription:
      'A knit polo shirt in a relaxed, elongated silhouette. Minimal branding. Heavy-gauge cotton. For those who want presence without decoration.',
    price: 95,
    originalPrice: null,
    size: 'S / M / L / XL',
    category: 'tshirts',
    colorway: 'Vintage Black',
    inStock: false,
    image: `${FOG}/192SP264911F_SIGNATURE_90S_KNIT_POLO-VINTAGE_BLACK_1_x600.jpg`,
    hoverImage: `${FOG}/125SP264411F_SIGNATURE_90S_SHORT_SLEEVE_TEE-VINTAGE_BLACK_1_x600.jpg`,
  },

  // ── SWEATPANTS ──────────────────────────────────────────────────
  {
    id: 8,
    name: 'FOREVER SWEATPANT',
    subtitle: 'Classic Flare',
    description: 'The bottom half of the answer.',
    longDescription:
      'A flared-leg sweatpant cut from heavyweight fleece. High-rise, elastic waistband, side seam pockets. Designed to be worn as an outfit, not an afterthought.',
    price: 148,
    originalPrice: null,
    size: 'XS / S / M / L / XL / XXL',
    category: 'sweatpants',
    colorway: 'Faded Seal',
    inStock: true,
    image: `${FOG}/130SP268653F_TRAINING_CLASSIC_FIT_FLARE_SWEATPANT-FADED_SEAL_1_x800.jpg`,
    hoverImage: `${FOG}/130SP268651F_TRAINING_CLASSIC_FIT_FLARE_SWEATPANT-FADED_BLACK_1_x600.jpg`,
  },
  {
    id: 9,
    name: 'FOREVER SWEATPANT',
    subtitle: 'Relaxed Fit',
    description: 'Unbothered. All the way down.',
    longDescription:
      'A tapered relaxed sweatpant in garment-dyed fleece. The perfect weight — substantial without heaviness. Wear it with everything we make, or nothing else at all.',
    price: 148,
    originalPrice: null,
    size: 'XS / S / M / L / XL',
    category: 'sweatpants',
    colorway: 'Faded Black',
    inStock: true,
    image: `${FOG}/130SP268651F_TRAINING_CLASSIC_FIT_FLARE_SWEATPANT-FADED_BLACK_1_x600.jpg`,
    hoverImage: `${FOG}/130SP268653F_TRAINING_CLASSIC_FIT_FLARE_SWEATPANT-FADED_SEAL_1_x800.jpg`,
  },
  {
    id: 10,
    name: 'SIGNATURE PANT',
    subtitle: 'With Piping',
    description: 'A detail that earns its place.',
    longDescription:
      'A signature relaxed pant with contrast piping along the outseam. Heavy fleece, clean drape, tonal contrast. A quiet flex in a loud world.',
    price: 158,
    originalPrice: 185,
    size: 'XS / S / M / L / XL',
    category: 'sweatpants',
    colorway: 'Vintage Black',
    inStock: true,
    image: `${FOG}/130SP265701FW_WOMENS_SIGNATURE_RELAXED_PANT_WITH_PIPING-VINTAGE_BLACK_2_x800.jpg`,
    hoverImage: `${FOG}/130SP268651F_TRAINING_CLASSIC_FIT_FLARE_SWEATPANT-FADED_BLACK_1_x600.jpg`,
  },
];

export const collections = [
  {
    id: 'hoodies',
    label: 'Hoodies',
    name: 'The Outer Layer',
    desc: 'Heavyweight fleece. Dropped shoulders. The piece you never take off.',
    image: `${FOG}/192SP264462F_TRAINING_90S_HOODIE-FADED_DUNE_1_x800.jpg`,
  },
  {
    id: 'tshirts',
    label: 'T-Shirts',
    name: 'The Foundation',
    desc: 'Nothing extra. 240gsm cotton. The base of every outfit worth wearing.',
    image: `${FOG}/125SP264411F_SIGNATURE_90S_SHORT_SLEEVE_TEE-VINTAGE_BLACK_1_x600.jpg`,
  },
  {
    id: 'sweatpants',
    label: 'Sweatpants',
    name: 'The Bottom Half',
    desc: 'An outfit, not an afterthought. Heavyweight fleece, clean silhouette.',
    image: `${FOG}/130SP268653F_TRAINING_CLASSIC_FIT_FLARE_SWEATPANT-FADED_SEAL_1_x800.jpg`,
  },
];

// Style finder matrix — [q1: time][q2: vibe] → product index
export const finderMatrix = {
  morning: { clean: 4, bold:  5, quiet: 0  },
  evening: { clean: 7, bold:  2, quiet: 8  },
  always:  { clean: 1, bold:  5, quiet: 9  },
};
