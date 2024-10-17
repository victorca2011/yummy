import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    // Redireciona para a página de login se o usuário não estiver autenticado
    return NextResponse.redirect(new URL('/api/auth/signin', req.url));
  }

  return NextResponse.next(); // Se autenticado, prossegue para a página
}

// Protege rotas que correspondem a '/private'
export const config = {
  matcher: ['/private/:path*'],
};
