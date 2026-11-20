import { Inter_Tight } from 'next/font/google';
import './globals.css';

const font = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'swap' });

export const metadata = {
  title: 'FOREVER — Heavyweight Hoodies, Sweatpants & Tees',
  description: "FOREVER is back. Flat 40% off heavyweight hoodies, sweatpants and oversized tees. Cash on delivery across Bangladesh.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
