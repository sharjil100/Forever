// Product catalogue. Images live in /public/images/products/<slug>/1.jpg, 2.jpg, ...
// 1.jpg is the card image, 2.jpg shows on hover, the rest fill the product page gallery.

// family = which colours go together, used for "Complete the Look"
export const COLORS = {
  // hoodies + sweatpants
  'undying-black': { name: 'Undying Black', hex: '#161616', family: 'black' },
  'steel-grey':    { name: 'Steel Grey',    hex: '#5d5f63', family: 'grey' },
  'fossil':        { name: 'Fossil',        hex: '#8b7b74', family: 'light' },
  'cherry-wood':   { name: 'Cherry Wood',   hex: '#7b4a2d', family: 'brown' },
  // t-shirts
  'obsidian':      { name: 'Obsidian',      hex: '#121212', family: 'black' },
  'asphalt':       { name: 'Asphalt',       hex: '#5c5f6b', family: 'grey' },
  'bare-minimum':  { name: 'Bare Minimum',  hex: '#a88a8c', family: 'light' },
  'mocha':         { name: 'Mocha',         hex: '#5e2f20', family: 'brown' },
  'rust':          { name: 'Rust',          hex: '#b4503c', family: 'rust' },
};

export const CATEGORIES = [
  { id: 'hoodies',    label: 'Hoodies',    tile: '/images/tiles/hoodies.jpg' },
  { id: 'sweatpants', label: 'Sweatpants', tile: '/images/tiles/sweatpants.jpg' },
  { id: 'tshirts',    label: 'T-Shirts',   tile: '/images/tiles/tshirts.jpg' },
];

const SET_COLORS = ['undying-black', 'steel-grey', 'fossil', 'cherry-wood'];

const LINES = {
  hoodies: {
    base: 'hoodie',
    name: 'Heavyweight Hoodie',
    price: 1200,
    was: 2000,
    colors: SET_COLORS,
    sizes: ['M', 'L', 'XL'],
    // measurements in inches, from the brand size charts (size-charts/ folder)
    sizeChart: {
      columns: ['Chest', 'Shoulder', 'Length', 'Sleeve'],
      rows: { M: [50, 27, 27.5, 24], L: [52, 28, 28.5, 24], XL: [54, 29, 29.5, 24] },
    },
    description:
      'A heavyweight fleece hoodie with a relaxed, oversized fit and dropped shoulders. Tonal FRVR logo on the chest and a raised "Embrace The Journey" print across the back.',
    details: ['Heavyweight fleece', 'Oversized fit, dropped shoulders', 'Tonal FRVR chest logo', '"Embrace The Journey" back print', 'Pairs with the matching sweatpant'],
  },
  sweatpants: {
    base: 'sweatpant',
    name: 'Heavyweight Sweatpant',
    price: 720,
    was: 1200,
    colors: SET_COLORS,
    sizes: ['M', 'L', 'XL'],
    sizeChart: {
      columns: ['Waist', 'Length'],
      rows: { M: ['30–32', 41], L: ['33–35', 42], XL: ['36–38', 43] },
    },
    description:
      'A heavyweight fleece sweatpant with a relaxed straight leg and a drawstring waist. Finished with a tonal "Embrace The Journey" print on the thigh and a woven patch on the back pocket.',
    details: ['Heavyweight fleece', 'Relaxed straight leg', 'Elastic drawstring waist', 'Side and back pockets', 'Pairs with the matching hoodie'],
  },
  tshirts: {
    base: 'tee',
    name: 'Oversized Tee',
    price: 600,
    was: 1000,
    colors: ['obsidian', 'asphalt', 'rust', 'bare-minimum', 'mocha'],
    sizes: ['S', 'M', 'L', 'XL'],
    sizeChart: {
      columns: ['Chest', 'Length'],
      rows: { S: [42, 25], M: [44, 26], L: [46, 27], XL: [48, 28] },
    },
    outLabel: 'Available Soon',   // shown when stock is 0 (tees not counted yet)
    description:
      'A boxy, oversized tee with dropped shoulders and a heavyweight feel. Tonal "Embrace The Journey" print across the back with a woven label above it.',
    details: ['Heavyweight cotton feel', 'Boxy oversized fit', 'Dropped shoulders', '"Embrace The Journey" back print', 'Unisex'],
  },
};

// how many gallery images exist per product folder
const IMAGE_COUNT = {
  'hoodie-undying-black': 5, 'hoodie-steel-grey': 4, 'hoodie-fossil': 5, 'hoodie-cherry-wood': 5,
  'sweatpant-undying-black': 4, 'sweatpant-steel-grey': 3, 'sweatpant-fossil': 4, 'sweatpant-cherry-wood': 5,
  'tee-obsidian': 5, 'tee-asphalt': 5, 'tee-rust': 2, 'tee-bare-minimum': 5, 'tee-mocha': 4,
};

export const products = Object.entries(LINES).flatMap(([category, line]) =>
  line.colors.map((color) => {
    const slug = `${line.base}-${color}`;
    const images = Array.from({ length: IMAGE_COUNT[slug] }, (_, i) => `/images/products/${slug}/${i + 1}.jpg`);
    return {
      slug,
      category,
      name: line.name,
      color,
      colorName: COLORS[color].name,
      colorHex: COLORS[color].hex,
      family: COLORS[color].family,
      price: line.price,
      was: line.was,
      discount: Math.round((1 - line.price / line.was) * 100),
      sizes: line.sizes,
      outLabel: line.outLabel || 'Sold Out',
      sizeChart: line.sizeChart,
      description: line.description,
      details: line.details,
      images,
    };
  })
);

export const getProduct = (slug) => products.find((p) => p.slug === slug);
export const byCategory = (category) => products.filter((p) => p.category === category);

// other categories, same colour family first, then fill up to 4
export function completeTheLook(product) {
  const others = products.filter((p) => p.category !== product.category);
  const match = others.filter((p) => p.family === product.family);
  const rest = others.filter((p) => p.family !== product.family);
  return [...match, ...rest].slice(0, 4);
}
