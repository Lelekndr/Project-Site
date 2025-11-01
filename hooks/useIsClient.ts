"use client";

import { useEffect, useState } from 'react';

/**
 * Hook que retorna true apenas no lado do cliente, após a hidratação
 * Útil para evitar diferenças entre SSR e client-side rendering
 */
export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}