"use client";

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="sm"
      className="relative h-9 w-9 rounded-full theme-bg-card hover:theme-bg-card-hover border theme-border transition-all duration-300"
      title={isDark ? 'Modo Claro' : 'Modo Escuro'}
    >
      <Sun className={`h-4 w-4 transition-all duration-300 ${isDark ? 'rotate-90 scale-0' : 'rotate-0 scale-100'} absolute theme-warning`} />
      <Moon className={`h-4 w-4 transition-all duration-300 ${isDark ? 'rotate-0 scale-100' : '-rotate-90 scale-0'} absolute theme-purple`} />
    </Button>
  );
}