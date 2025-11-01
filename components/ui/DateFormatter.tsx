"use client";

import { useEffect, useState } from 'react';

interface DateFormatterProps {
  date: string | Date;
  locale?: string;
  options?: Intl.DateTimeFormatOptions;
}

export function DateFormatter({ 
  date, 
  locale = 'pt-BR', 
  options = { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit' 
  } 
}: DateFormatterProps) {
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    setFormattedDate(dateObj.toLocaleDateString(locale, options));
  }, [date, locale, options]);

  if (!isClient) {
    // Fallback para SSR - formato simples
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return <>{`${day}/${month}/${year}`}</>;
  }

  return <>{formattedDate}</>;
}