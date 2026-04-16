'use client';
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const RoomScene = dynamic(() => import('./RoomScene'), { ssr: false });

export default function Hero() {
  const outerRef    = useRef(null);
  const kawsRef     = useRef(null);
  const textRef     = useRef(null);   // editorial left-side text
  const labelRef    = useRef(null);   // big FOREVER brand reveal
  const hintRef     = useRef(null);   // scroll hint
  const hoodieRef   = useRef(null);   // hoodie SVG overlay on character
  const armsUpRef   = useRef(null);   // arms-raised version
  const armsDownRef = useRef(null);   // arms-normal version

  // leg groups
  const sittingRef  = useRef(null);
  const standingRef = useRef(null);
  const walkingRef  = useRef(null);

  useEffect(() => {
    let ctx;

    async function init() {
      try {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const kaws     = kawsRef.current;
        const hint     = hintRef.current;
        const sLegs    = sittingRef.current;
        const stLegs   = standingRef.current;
        const wLegs    = walkingRef.current;
        const hoodie   = hoodieRef.current;
        const armsUp   = armsUpRef.current;
        const armsDown = armsDownRef.current;
        const label    = labelRef.current;
        const heroText = textRef.current;

        // Guard: if any critical ref is missing, bail out safely
        if (!kaws || !sLegs || !stLegs || !wLegs || !hoodie || !armsUp || !armsDown || !label || !heroText) return;

        /* ─────────────────────────────────────────────────────────
           Master timeline — pinned to hero-outer scroll canvas
           Total scroll = 600vh, scrub = smooth
        ───────────────────────────────────────────────────────── */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: outerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.4,
          },
        });

        // ── [0 → 0.05] Scroll hint fades out immediately ──
        tl.to(hint, { opacity: 0, duration: 0.05 }, 0);

        // ── [0 → 0.22] STAND UP ──
        // sitting legs out, standing legs in
        tl.to(sLegs,  { opacity: 0, duration: 0.12 }, 0);
        tl.to(stLegs, { opacity: 1, duration: 0.14 }, 0.06);
        // character rises slightly
        tl.fromTo(kaws,
          { yPercent: 0 },
          { yPercent: -3, duration: 0.22, ease: 'power2.out' },
          0
        );

        // ── [0.22 → 0.38] WALK / BOUNCE a few steps ──
        // switch to walking legs
        tl.to(stLegs, { opacity: 0, duration: 0.04 }, 0.22);
        tl.to(wLegs,  { opacity: 1, duration: 0.04 }, 0.24);
        // small left-right bounce to sell the walk
        tl.to(kaws, {
          x: '+=18',
          yoyo: true,
          repeat: 1,
          ease: 'sine.inOut',
          duration: 0.08,
        }, 0.26);
        tl.to(kaws, { x: '+=0', duration: 0.04 }, 0.42); // settle back

        // ── [0.38 → 0.60] PUT ON HOODIE ──
        // stop walking, switch back to standing
        tl.to(wLegs,  { opacity: 0, duration: 0.04 }, 0.38);
        tl.to(stLegs, { opacity: 1, duration: 0.04 }, 0.40);

        // arms go UP (reaching for hoodie)
        tl.to(armsDown, { opacity: 0, duration: 0.06 }, 0.40);
        tl.to(armsUp,   { opacity: 1, duration: 0.06 }, 0.42);

        // hoodie drops from top (y: -120 → 0) and becomes visible
        gsap.set(hoodie, { y: -120, opacity: 0 });
        tl.to(hoodie, {
          y: 0,
          opacity: 1,
          duration: 0.16,
          ease: 'bounce.out',
        }, 0.46);

        // arms come back DOWN — hoodie is on
        tl.to(armsUp,   { opacity: 0, duration: 0.07 }, 0.62);
        tl.to(armsDown, { opacity: 1, duration: 0.07 }, 0.64);

        // ── [0.62 → 0.80] HERO TEXT FADES OUT ──
        tl.to(heroText, { opacity: 0, x: -40, duration: 0.18 }, 0.60);

        // ── [0.72 → 0.92] BIG "FOREVER" BRAND TEXT APPEARS ──
        tl.to(label, { opacity: 1, duration: 0.18 }, 0.72);

        // Character gently scales down / centres as FOREVER text dominates
        tl.to(kaws, {
          scale: 0.82,
          yPercent: 6,
          duration: 0.20,
          ease: 'power1.inOut',
        }, 0.72);

        // ── [0.90 → 1.00] Label fades out — site content begins ──
        tl.to(label, { opacity: 0, duration: 0.10 }, 0.90);
        tl.to(kaws,  { opacity: 0, duration: 0.10 }, 0.90);
      });
      } catch (err) {
        console.warn('FOREVER hero animation failed to init:', err);
      }
    }

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section className="hero-outer" ref={outerRef}>
      <div className="hero-sticky">

        {/* Three.js 3D room */}
        <div className="hero-canvas">
          <RoomScene scrollRef={outerRef} />
        </div>

        {/* Gradient overlay */}
        <div className="hero-overlay" />

        {/* Editorial text — left */}
        <div className="hero-text" ref={textRef}>
          <p className="hero-eyebrow">New Collection — 2026</p>
          <h1 className="hero-title">
            Wear it<br />
            like you<br />
            <em>mean it.</em>
          </h1>
          <div className="hero-actions">
            <a href="#shop"  className="btn btn-primary">Shop Now</a>
            <a href="#story" className="btn btn-ghost">Our Story</a>
          </div>
        </div>

        {/* ── KAWS Character ── */}
        <div className="kaws-wrap" ref={kawsRef}>
          <svg
            className="kaws-svg"
            viewBox="0 0 200 340"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Shadow */}
            <ellipse className="k-shadow" cx="100" cy="332" rx="50" ry="9" />

            {/* ── SITTING LEGS ── */}
            <g ref={sittingRef}>
              <path className="k-body"
                d="M76,222 Q50,242 38,264 Q33,276 45,280 Q57,284 67,268 Q78,252 82,232Z" />
              <path className="k-body"
                d="M124,222 Q150,242 162,264 Q167,276 155,280 Q143,284 133,268 Q122,252 118,232Z" />
              <ellipse className="k-foot" cx="44"  cy="277" rx="18" ry="10" transform="rotate(-12 44 277)" />
              <ellipse className="k-foot" cx="156" cy="277" rx="18" ry="10" transform="rotate(12 156 277)" />
            </g>

            {/* ── STANDING LEGS ── */}
            <g ref={standingRef} style={{ opacity: 0 }}>
              <rect className="k-body" x="73"  y="218" width="26" height="72" rx="13" />
              <rect className="k-body" x="101" y="218" width="26" height="72" rx="13" />
              <ellipse className="k-foot" cx="86"  cy="292" rx="20" ry="11" />
              <ellipse className="k-foot" cx="114" cy="292" rx="20" ry="11" />
            </g>

            {/* ── WALKING LEGS (CSS animated) ── */}
            <g ref={walkingRef} style={{ opacity: 0 }}>
              <rect className="k-body walk-l" x="73"  y="218" width="26" height="72" rx="13" />
              <rect className="k-body walk-r" x="101" y="218" width="26" height="72" rx="13" />
              <ellipse className="k-foot" cx="86"  cy="292" rx="20" ry="11" />
              <ellipse className="k-foot" cx="114" cy="292" rx="20" ry="11" />
            </g>

            {/* ── TORSO (base, always visible) ── */}
            <rect className="k-body" x="63" y="152" width="74" height="78" rx="20" />
            {/* small chest seam details */}
            <line className="k-skull" x1="100" y1="158" x2="100" y2="224" />

            {/* ── ARMS NORMAL (down) ── */}
            <g ref={armsDownRef}>
              {/* left arm */}
              <rect className="k-body" x="37" y="156" width="30" height="22" rx="11" />
              <ellipse className="k-hand" cx="26" cy="167" rx="18" ry="15" />
              <line className="k-xmark" x1="18" y1="160" x2="34" y2="174" />
              <line className="k-xmark" x1="34" y1="160" x2="18" y2="174" />
              {/* right arm */}
              <rect className="k-body" x="133" y="156" width="30" height="22" rx="11" />
              <ellipse className="k-hand" cx="174" cy="167" rx="18" ry="15" />
              <line className="k-xmark" x1="166" y1="160" x2="182" y2="174" />
              <line className="k-xmark" x1="182" y1="160" x2="166" y2="174" />
            </g>

            {/* ── ARMS RAISED (reaching up for hoodie) ── */}
            <g ref={armsUpRef} style={{ opacity: 0 }}>
              {/* left arm raised */}
              <rect className="k-body" x="30" y="118" width="22" height="48" rx="11"
                transform="rotate(-30 41 142)" />
              <ellipse className="k-hand" cx="18" cy="108" rx="16" ry="14" />
              <line className="k-xmark" x1="11" y1="102" x2="25" y2="115" />
              <line className="k-xmark" x1="25" y1="102" x2="11" y2="115" />
              {/* right arm raised */}
              <rect className="k-body" x="148" y="118" width="22" height="48" rx="11"
                transform="rotate(30 159 142)" />
              <ellipse className="k-hand" cx="182" cy="108" rx="16" ry="14" />
              <line className="k-xmark" x1="175" y1="102" x2="189" y2="115" />
              <line className="k-xmark" x1="189" y1="102" x2="175" y2="115" />
            </g>

            {/* ── HOODIE OVERLAY (drops onto body) ── */}
            <g ref={hoodieRef} style={{ opacity: 0 }}>
              {/* hoodie body */}
              <rect className="k-hoodie-body" x="56" y="148" width="88" height="90" rx="22" />
              {/* hood shape */}
              <path className="k-hoodie-hood"
                d="M72,148 Q72,110 100,106 Q128,110 128,148Z" />
              {/* kangaroo pocket */}
              <rect className="k-hoodie-pocket" x="78" y="196" width="44" height="28" rx="6" />
              {/* drawstrings */}
              <line className="k-hoodie-string" x1="94"  y1="150" x2="89"  y2="178" />
              <line className="k-hoodie-string" x1="106" y1="150" x2="111" y2="178" />
              {/* FOREVER text on hoodie chest */}
              <text className="k-hoodie-text" x="100" y="185" textAnchor="middle">FOREVER</text>
              {/* hoodie sleeve stubs (over arm area) */}
              <rect className="k-hoodie-sleeve" x="24"  y="156" width="42" height="22" rx="11" />
              <rect className="k-hoodie-sleeve" x="134" y="156" width="42" height="22" rx="11" />
            </g>

            {/* ── HEAD (always on top) ── */}
            <g>
              {/* ears */}
              <ellipse className="k-ear" cx="54"  cy="72" rx="17" ry="22" transform="rotate(-14 54 72)" />
              <ellipse className="k-ear" cx="146" cy="72" rx="17" ry="22" transform="rotate(14 146 72)" />
              {/* head */}
              <circle className="k-body" cx="100" cy="106" r="54" />
              {/* skull cheek */}
              <path className="k-skull" d="M56,113 Q64,120 73,114" />
              <path className="k-skull" d="M127,113 Q136,120 144,114" />
              {/* left X eye */}
              <line className="k-eye" x1="72"  y1="93" x2="88"  y2="110" />
              <line className="k-eye" x1="88"  y1="93" x2="72"  y2="110" />
              {/* right X eye */}
              <line className="k-eye" x1="112" y1="93" x2="128" y2="110" />
              <line className="k-eye" x1="128" y1="93" x2="112" y2="110" />
              {/* mouth */}
              <path className="k-mouth" d="M82,128 Q100,142 118,128" />
              <line className="k-tooth" x1="92"  y1="129" x2="92"  y2="137" />
              <line className="k-tooth" x1="100" y1="130" x2="100" y2="138" />
              <line className="k-tooth" x1="108" y1="129" x2="108" y2="137" />
            </g>
          </svg>
        </div>

        {/* Big FOREVER brand reveal */}
        <div className="forever-label" ref={labelRef}>
          <div className="forever-label-text">FOREVER</div>
        </div>

        {/* Scroll hint */}
        <div className="scroll-hint" ref={hintRef}>
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>

      </div>
    </section>
  );
}
