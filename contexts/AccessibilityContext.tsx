"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  toggleReducedMotion: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Carregar preferências salvas
    const savedHighContrast = localStorage.getItem('accessibility-high-contrast') === 'true';
    const savedLargeText = localStorage.getItem('accessibility-large-text') === 'true';
    const savedReducedMotion = localStorage.getItem('accessibility-reduced-motion') === 'true';
    
    setHighContrast(savedHighContrast);
    setLargeText(savedLargeText);
    setReducedMotion(savedReducedMotion);

    // Verificar preferência do sistema para movimento reduzido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion && !localStorage.getItem('accessibility-reduced-motion')) {
      setReducedMotion(true);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('accessibility-high-contrast', highContrast.toString());
      localStorage.setItem('accessibility-large-text', largeText.toString());
      localStorage.setItem('accessibility-reduced-motion', reducedMotion.toString());
      
      // Aplicar classes no body
      const body = document.body;
      body.classList.toggle('accessibility-high-contrast', highContrast);
      body.classList.toggle('accessibility-large-text', largeText);
      body.classList.toggle('accessibility-reduced-motion', reducedMotion);
    }
  }, [highContrast, largeText, reducedMotion, mounted]);

  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
  };

  const toggleLargeText = () => {
    setLargeText(prev => !prev);
  };

  const toggleReducedMotion = () => {
    setReducedMotion(prev => !prev);
  };

  if (!mounted) {
    return null;
  }

  const value: AccessibilityContextType = {
    highContrast,
    largeText,
    reducedMotion,
    toggleHighContrast,
    toggleLargeText,
    toggleReducedMotion
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility deve ser usado dentro de um AccessibilityProvider');
  }
  return context;
}
