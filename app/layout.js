import './globals.css';
import { CartProvider } from '@/context/CartContext';

export const metadata = {
  title: 'FOREVER — Clothing',
  description: 'A clothing brand built on permanence. Hoodies, T-Shirts, Sweatpants.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
