"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

interface NoSSRProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

function NoSSRComponent({ children, fallback = null }: NoSSRProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// Componente que nunca faz SSR
export const NoSSR = dynamic(() => Promise.resolve(NoSSRComponent), {
  ssr: false,
});