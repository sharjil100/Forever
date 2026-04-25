import './globals.css';
import { CartProvider } from '@/context/CartContext';
import RevealObserver from '@/components/RevealObserver';

export const metadata = {
  title: 'FOREVER — Clothing',
  description: 'A clothing brand built on permanence. Hoodies, T-Shirts, Sweatpants.',
};

// Runs synchronously in the document head, before React hydrates.
// Sets the .dark class on <html> so the page never flashes the
// wrong theme on first paint or route change.
const themeBootstrap = `
(function() {
  try {
    var saved = localStorage.getItem('forever-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = saved || (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>
        <CartProvider>
          <RevealObserver />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
