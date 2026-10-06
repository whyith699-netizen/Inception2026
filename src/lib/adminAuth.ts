import crypto from 'node:crypto';

const SECRET = process.env.ADMIN_SECRET_KEY || 'smansa_padmawijaya_2026';
const COOKIE_NAME = 'smansa_admin_session';

export function createToken(): string {
  const timestamp = Date.now().toString();
  const signature = crypto.createHmac('sha256', SECRET).update(timestamp).digest('hex');
  return `${timestamp}.${signature}`;
}

export function verifyToken(token?: string | null): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [timestamp, signature] = parts;

  // Expiry 24 jam
  const age = Date.now() - parseInt(timestamp, 10);
  if (isNaN(age) || age < 0 || age > 24 * 60 * 60 * 1000) {
    return false;
  }

  const expected = crypto.createHmac('sha256', SECRET).update(timestamp).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export function checkPassword(password: string): boolean {
  return password === SECRET;
}

export function getCookieHeader(token: string): string {
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`;
}

export function getClearCookieHeader(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`;
}

export function parseCookies(cookieHeader?: string | null): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;
  for (const pair of cookieHeader.split(';')) {
    const [k, v] = pair.trim().split('=');
    if (k && v) cookies[k] = decodeURIComponent(v);
  }
  return cookies;
}

export function isAuthenticated(request: Request): boolean {
  const cookies = parseCookies(request.headers.get('cookie'));
  return verifyToken(cookies[COOKIE_NAME]);
}
