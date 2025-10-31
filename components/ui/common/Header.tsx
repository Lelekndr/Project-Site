"use client";

import { useAuth } from '@/contexts/AuthContext';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { UserMenu } from './UserMenu';
import { GuestButtons } from './GuestButtons';
import { getNavItems } from './navigationUtils';

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const navItems = getNavItems(user, isAuthenticated);

  return (
    <header className="py-4 px-8 flex justify-between items-center text-white border-b border-white/10">
      <Logo />
      <Navigation navItems={navItems} />
      
      <div className="flex items-center m-6 text-sm">
        {isAuthenticated && user ? (
          <UserMenu user={user} onLogout={logout} />
        ) : (
          <GuestButtons />
        )}
      </div>
    </header>
  );
}