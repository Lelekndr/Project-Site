"use client";

import { useEffect } from 'react';

export function HydrationDebugger() {
  useEffect(() => {
    // Log quando a hidratação é concluída
    console.log('✅ Hydration completed');
    
    // Detectar problemas de hidratação
    const originalError = console.error;
    console.error = (...args) => {
      if (args[0]?.includes?.('hydration') || args[0]?.includes?.('Hydration')) {
        console.log('🚨 Hydration error detected:', args);
      }
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  if (process.env.NODE_ENV === 'development') {
    return (
      <div className="fixed top-0 right-0 z-[9999] bg-black/80 text-white p-2 text-xs">
        Hydration Debug
      </div>
    );
  }

  return null;
}