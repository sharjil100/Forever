'use client';
import { createContext, useContext, useReducer, useEffect, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'forever_bag_v3'; // bumped when product slugs changed

// each line is one product + size; key = `${slug}-${size}`
function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { item } = action;
      const found = state.find((i) => i.key === item.key);
      if (found) return state.map((i) => (i.key === item.key ? { ...i, qty: i.qty + 1 } : i));
      return [...state, { ...item, qty: 1 }];
    }
    case 'INC':    return state.map((i) => (i.key === action.key ? { ...i, qty: i.qty + 1 } : i));
    case 'DEC':    return state.map((i) => (i.key === action.key ? { ...i, qty: i.qty - 1 } : i)).filter((i) => i.qty > 0);
    case 'REMOVE': return state.filter((i) => i.key !== action.key);
    case 'CLEAR':  return [];
    case 'HYDRATE': return action.items;
    default:       return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, []);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) dispatch({ type: 'HYDRATE', items: JSON.parse(saved) });
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
  }, [items, hydrated]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  const totalQty = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const savings  = items.reduce((s, i) => s + (i.was - i.price) * i.qty, 0);

  const addItem = (product, size) => {
    dispatch({
      type: 'ADD',
      item: {
        key: `${product.slug}-${size}`,
        slug: product.slug,
        name: product.name,
        colorName: product.colorName,
        size,
        price: product.price,
        was: product.was,
        image: product.images[0],
      },
    });
    setOpen(true);
  };

  return (
    <CartContext.Provider
      value={{ items, dispatch, totalQty, subtotal, savings, addItem, isOpen, openCart: () => setOpen(true), closeCart: () => setOpen(false) }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
