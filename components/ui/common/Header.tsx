"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, User } from 'lucide-react';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { getNavItems } from './navigationUtils';
import { AuthSection } from './AuthSection';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  
  const navItems = getNavItems(user, isAuthenticated);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className="safe-area-top py-3 px-4 sm:py-4 sm:px-8 flex justify-between items-center text-white dark:text-white light:text-gray-900 border-b border-white/10 dark:border-white/10 light:border-gray-200 relative backdrop-blur-sm bg-white/5 dark:bg-white/5 light:bg-white/80"
      role="banner"
      aria-label="Cabeçalho principal do site"
    >
      <Logo />
      
      {/* Desktop Navigation */}
      <Navigation navItems={navItems} />
      
      {/* Desktop User Section */}
      <div className="hidden md:flex items-center text-sm gap-3">
        <ThemeToggle />
        <AuthSection />
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden p-2 text-white dark:text-white light:text-gray-900 hover:text-pink-400 transition-colors"
        aria-label={isMobileMenuOpen ? "Fechar menu mobile" : "Abrir menu mobile"}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
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
                    <div 
            id="mobile-menu"
            className="fixed top-[73px] right-0 left-0 bg-white/10 dark:bg-white/10 light:bg-white/95 backdrop-blur-md border-t border-white/20 dark:border-white/20 light:border-gray-200 z-50 md:hidden"
            role="navigation"
            aria-label="Menu mobile de navegação"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation */}
              <nav className="space-y-3" role="menubar">
                {navItems.map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href} 
                    className="flex items-center space-x-3 py-3 px-4 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-gray-100 rounded-lg transition-colors text-base text-white dark:text-white light:text-gray-900"
                    onClick={() => setIsMobileMenuOpen(false)}
                    role="menuitem"
                    aria-label={`Navegar para ${item.name}`}
                  >
                    {item.icon && <item.icon className="w-5 h-5" />}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
              
              {/* Mobile Theme Toggle */}
              <div className="flex justify-center border-t theme-border pt-4 mt-4">
                <ThemeToggle />
              </div>
              
              {/* Mobile User Section */}
              <div className="border-t theme-border pt-4 mt-4">
                {isAuthenticated && user ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 px-4 py-2">
                      <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white dark:text-white light:text-gray-900">{user.email}</p>
                        <p className="text-xs text-white/70 dark:text-white/70 light:text-gray-600 capitalize">{user.role}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                        className="w-full text-left px-4 py-3 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-gray-100 rounded-lg transition-colors text-red-400"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      href="/login"
                      className="block w-full px-4 py-3 text-center bg-pink-600 hover:bg-purple-600 rounded-lg transition-colors font-medium text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="block w-full px-4 py-3 text-center border border-white/20 dark:border-white/20 light:border-gray-300 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-gray-100 rounded-lg transition-colors text-white dark:text-white light:text-gray-900"
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