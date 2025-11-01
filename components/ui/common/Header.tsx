"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { getNavItems } from './navigationUtils';
import { AuthSection } from './AuthSection';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  
  const navItems = getNavItems(user, isAuthenticated);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="safe-area-top py-3 px-4 sm:py-4 sm:px-8 flex justify-between items-center text-white border-b border-white/10 relative">
      <Logo />
      
      {/* Desktop Navigation */}
      <Navigation navItems={navItems} />
      
      {/* Desktop User Section */}
      <div className="hidden md:flex items-center text-sm">
        <AuthSection />
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden p-2 text-white hover:text-pink-400 transition-colors"
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-[73px] right-0 left-0 bg-gray-900/95 backdrop-blur-md border-t border-white/10 z-50 md:hidden">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation */}
              <nav className="space-y-3">
                {navItems.map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href} 
                    className="flex items-center space-x-3 py-3 px-4 hover:bg-white/10 rounded-lg transition-colors text-base"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon && <item.icon className="w-5 h-5" />}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
              
              {/* Mobile User Section */}
              <div className="border-t border-white/10 pt-4 mt-4">
                {isAuthenticated && user ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 px-4 py-2">
                      <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {user.email?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user.email}</p>
                        <p className="text-xs text-white/60 capitalize">{user.role}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-white/10 rounded-lg transition-colors text-red-400"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      href="/login"
                      className="block w-full px-4 py-3 text-center bg-pink-600 hover:bg-pink-700 rounded-lg transition-colors font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="block w-full px-4 py-3 text-center border border-white/20 hover:bg-white/10 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Cadastre-se
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}