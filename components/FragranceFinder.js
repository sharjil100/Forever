'use client';
import Image from 'next/image';
import { useState } from 'react';
import { products, finderMatrix } from '@/data/products';
import { useCart } from '@/context/CartContext';

const Q1 = [
  { label: 'Morning — focused, minimal',   value: 'morning' },
  { label: 'Evening — relaxed, present',   value: 'evening' },
  { label: 'All day — always dressed',     value: 'always'  },
];
const Q2 = [
  { label: 'Clean. Understated.',          value: 'clean' },
  { label: 'Bold. Hard to ignore.',        value: 'bold'  },
  { label: 'Quiet. But you notice.',       value: 'quiet' },
];

export default function StyleFinder() {
  const [step,   setStep]   = useState(1);
  const [a1,     setA1]     = useState(null);
  const [result, setResult] = useState(null);
  const { dispatch } = useCart();

  function pickQ1(val) { setA1(val); setStep(2); }

  function pickQ2(val) {
    const idx = finderMatrix[a1][val];
    setResult(products[idx]);
    setStep(3);
  }

  function restart() { setStep(1); setA1(null); setResult(null); }

  return (
    <section className="finder" id="finder">
      <div className="container">
        <span className="label">Discovery Tool</span>
        <h2 className="section-title" style={{ marginBottom: 48 }}>Find Your Fit</h2>

        <div className="finder-inner">
          {step === 1 && (
            <div>
              <p className="finder-question">When do you get dressed?</p>
              <div className="finder-options">
                {Q1.map((o) => (
                  <button key={o.value} className="finder-opt" onClick={() => pickQ1(o.value)}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <p className="finder-question">How do you want to show up?</p>
              <div className="finder-options">
                {Q2.map((o) => (
                  <button key={o.value} className="finder-opt" onClick={() => pickQ2(o.value)}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && result && (
            <div className="finder-result active">
              <div className="finder-result-label">Your piece</div>
              <div className="finder-result-card">
                <Image
                  src={result.image}
                  alt={result.name}
                  width={90} height={110}
                  className="finder-result-img"
                  style={{ objectFit: 'cover', width: 90, height: 110 }}
                />
                <div>
                  <div className="finder-result-name">{result.name}</div>
                  <p className="finder-result-desc">
                    {result.colorway} &mdash; {result.subtitle}
                  </p>
                  <button
                    className="btn btn-primary"
                    style={{ fontSize: 9, padding: '10px 22px' }}
                    onClick={() => { dispatch({ type: 'ADD', item: result }); restart(); }}
                  >
                    Add to Cart — ${result.price}
                  </button>
                </div>
              </div>
              <button className="finder-restart" onClick={restart}>Start over</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
