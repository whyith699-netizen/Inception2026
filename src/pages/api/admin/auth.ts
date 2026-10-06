import type { APIRoute } from 'astro';
import { checkPassword, createToken, getCookieHeader, getClearCookieHeader, isAuthenticated } from '../../../lib/adminAuth';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { password, action } = body;

    if (action === 'logout') {
      return new Response(JSON.stringify({ success: true, message: 'Logged out' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': getClearCookieHeader()
        }
      });
    }

    if (!password || !checkPassword(password)) {
      return new Response(JSON.stringify({ success: false, error: 'Kata sandi atau PIN salah' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const token = createToken();
    return new Response(JSON.stringify({ success: true, message: 'Login sukses' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': getCookieHeader(token)
      }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message || 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const GET: APIRoute = async ({ request }) => {
  const auth = isAuthenticated(request);
  return new Response(JSON.stringify({ authenticated: auth }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
