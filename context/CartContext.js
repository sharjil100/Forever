'use client';
import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const found = state.find((i) => i.id === action.item.id);
      if (found) return state.map((i) => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...state, { ...action.item, qty: 1 }];
    }
    case 'REMOVE':   return state.filter((i) => i.id !== action.id);
    case 'INC':      return state.map((i) => i.id === action.id ? { ...i, qty: i.qty + 1 } : i);
    case 'DEC':      return state.map((i) => i.id === action.id ? { ...i, qty: i.qty - 1 } : i).filter((i) => i.qty > 0);
    case 'HYDRATE':  return action.items;
    default:         return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('forever_cart');
      if (saved) dispatch({ type: 'HYDRATE', items: JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('forever_cart', JSON.stringify(items));
  }, [items]);

  const totalQty  = items.reduce((s, i) => s + i.qty, 0);
  const subtotal  = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping  = subtotal > 0 && subtotal < 200 ? 15 : 0;
  const grandTotal = subtotal + shipping;

  return (
    <CartContext.Provider value={{ items, dispatch, totalQty, subtotal, shipping, grandTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
