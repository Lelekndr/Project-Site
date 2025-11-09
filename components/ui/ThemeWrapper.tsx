"use client";

import { ReactNode } from 'react';

interface ThemeWrapperProps {
  children: ReactNode;
}

export function ThemeWrapper({ children }: ThemeWrapperProps) {
  return (
    <div 
      className="min-h-screen transition-all duration-300 theme-text-primary"
      style={{ 
        background: 'var(--theme-gradient)',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
      }}
    >
      {children}
    </div>
  );
}