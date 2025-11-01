"use client";

import { useAuth } from '@/contexts/AuthContext';
import { UserMenu } from './UserMenu';
import { GuestButtons } from './GuestButtons';

export function AuthSection() {
  const { user, isAuthenticated, isHydrated, logout } = useAuth();

  // Não renderizar nada durante a hidratação para evitar mismatch
  if (!isHydrated) {
    return (
      <div className="flex items-center space-x-4 h-10">
        {/* Placeholder durante carregamento */}
        <div className="w-20 h-8 bg-gray-300 animate-pulse rounded"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      {isAuthenticated && user ? (
        <UserMenu user={user} onLogout={logout} />
      ) : (
        <GuestButtons />
      )}
    </div>
  );
}