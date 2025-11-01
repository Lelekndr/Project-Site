"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'creator' | 'admin';
  fallbackMessage?: string;
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  fallbackMessage = "Você precisa estar logado para acessar esta página." 
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isHydrated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Aguardar hidratação antes de verificar autenticação
    if (!isHydrated || isLoading) return;

    // Se não estiver autenticado, redirecionar para login
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Se tiver role específico requerido e o usuário não tiver o role correto
    if (requiredRole && user?.role !== requiredRole) {
      router.push('/');
      return;
    }
  }, [isAuthenticated, user, requiredRole, router, isHydrated, isLoading]);

  // Mostrar loading durante verificação inicial
  if (!isHydrated || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p>Verificando acesso...</p>
        </div>
      </div>
    );
  }

  // Se não estiver autenticado, mostrar página de fallback
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
            <div className="text-6xl mb-6">🔒</div>
            <h1 className="text-2xl font-bold text-white mb-4">Acesso Restrito</h1>
            <p className="text-white/80 mb-6">{fallbackMessage}</p>
            
            <div className="space-y-3">
              <Link 
                href="/login"
                className="block w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Fazer Login
              </Link>
              
              <Link 
                href="/"
                className="flex items-center justify-center space-x-2 w-full bg-transparent border border-white/20 hover:bg-white/10 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Voltar para Home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Se tiver role específico requerido e o usuário não tiver o role correto
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
            <div className="text-6xl mb-6">⛔</div>
            <h1 className="text-2xl font-bold text-white mb-4">Acesso Negado</h1>
            <p className="text-white/80 mb-6">
              Você não tem permissão para acessar esta área. Esta página é restrita para usuários do tipo &quot;{requiredRole}&quot;.
            </p>
            
            <div className="space-y-3">
              <button 
                onClick={() => router.back()}
                className="flex items-center justify-center space-x-2 w-full bg-transparent border border-white/20 hover:bg-white/10 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar</span>
              </button>
              
              <Link 
                href="/"
                className="flex items-center justify-center space-x-2 w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Ir para Home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Se tudo estiver ok, renderizar o conteúdo protegido
  return <>{children}</>;
}