'use client';
import { useState } from 'react';

export default function Join() {
  const [email,     setEmail]     = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
  }

  return (
    <section className="join" id="join">
      <div className="container">
        <div className="join-inner">
          <h2 className="join-title">Join the Conversation</h2>
          <p className="join-sub">New collections. Limited releases. Nothing else.</p>

          {submitted ? (
            <p style={{ color: 'var(--gold)', fontSize: 15, letterSpacing: '.05em' }}>
              Thank you. You&apos;re on the list.
            </p>
          ) : (
            <form className="join-form" onSubmit={handleSubmit}>
              <input
                type="email"
                className="join-input"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          )}

          <p className="join-fine">
            Free shipping over $200 &nbsp;·&nbsp; Worldwide delivery &nbsp;·&nbsp; Easy returns
          </p>
        </div>
      </div>
    </section>
  );
}
