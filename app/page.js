'use client';
import { useState } from 'react';
import Nav          from '@/components/Nav';
import Hero         from '@/components/Hero';
import Marquee      from '@/components/Marquee';
import Collections  from '@/components/Collections';
import Shop         from '@/components/Shop';
import Story        from '@/components/Story';
import FragranceFinder from '@/components/FragranceFinder';
import Join         from '@/components/Join';
import Footer       from '@/components/Footer';
import CartDrawer   from '@/components/CartDrawer';

export default function Page() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Nav onCartOpen={() => setCartOpen(true)} />
      <Hero />
      <Marquee />
      <Collections />
      <Shop />
      <Story />
      <FragranceFinder />
      <Join />
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
