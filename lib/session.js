// Admin session: an HMAC-signed cookie "<expiry>.<signature>". Uses Web Crypto so it works in middleware (edge) and Node.
export const SESSION_COOKIE = 'fv_admin';
const MAX_AGE_SEC = 60 * 60 * 24 * 7; // 7 days

const enc = new TextEncoder();

async function hmac(message) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 16) throw new Error('ADMIN_SESSION_SECRET must be set (16+ characters)');
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, '0')).join('');
}

function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionToken() {
  const expires = Math.floor(Date.now() / 1000) + MAX_AGE_SEC;
  return { token: `${expires}.${await hmac(`admin:${expires}`)}`, maxAge: MAX_AGE_SEC };
}

export async function verifySessionToken(token) {
  if (!token) return false;
  const [expires, sig] = token.split('.');
  if (!expires || !sig || Number(expires) < Date.now() / 1000) return false;
  try {
    return safeEqual(sig, await hmac(`admin:${expires}`));
  } catch {
    return false;
  }
}

export async function passwordMatches(input) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !input) return false;
  // compare hashes so the comparison time doesn't depend on where the strings differ
  const [a, b] = await Promise.all([input, expected].map(async (s) => {
    const h = await crypto.subtle.digest('SHA-256', enc.encode(s));
    return Array.from(new Uint8Array(h), (x) => x.toString(16).padStart(2, '0')).join('');
  }));
  return safeEqual(a, b);
}
