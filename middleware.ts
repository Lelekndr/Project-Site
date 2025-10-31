import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Pegar informações do usuário do localStorage (simulado via cookie)
  const userCookie = request.cookies.get('user');
  let user = null;

  if (userCookie) {
    try {
      user = JSON.parse(userCookie.value);
    } catch {
      // Se não conseguir parsear o cookie, continua como usuário não autenticado
    }
  }

  // Rotas protegidas para usuários autenticados
  const userProtectedRoutes = ['/user'];
  const creatorProtectedRoutes = ['/creator'];
  const adminProtectedRoutes = ['/admin'];

  // Verificar se está tentando acessar rota de usuário
  if (userProtectedRoutes.some(route => pathname.startsWith(route))) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (user.role !== 'user') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Verificar se está tentando acessar rota de criador
  if (creatorProtectedRoutes.some(route => pathname.startsWith(route))) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (user.role !== 'creator') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Verificar se está tentando acessar rota de admin
  if (adminProtectedRoutes.some(route => pathname.startsWith(route))) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (user.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/user/:path*',
    '/creator/:path*',
    '/admin/:path*'
  ]
};