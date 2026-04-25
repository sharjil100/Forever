'use client';
import { useEffect } from 'react';

// Single global IntersectionObserver that watches every element
// with a `.reveal` class and adds `.in-view` when it scrolls into
// the viewport. Works for content added dynamically (route change,
// modal open, etc.) via a MutationObserver.
export default function RevealObserver() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in-view'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const observe = (root) => {
      root.querySelectorAll?.('.reveal:not(.in-view)').forEach((el) => io.observe(el));
    };

    observe(document);

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          if (node.classList?.contains('reveal')) io.observe(node);
          observe(node);
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
