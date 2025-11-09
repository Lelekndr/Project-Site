'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch?: (searchTerm: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ onSearch, placeholder = "Buscar eventos", className = "" }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    } else {
      // Se não houver função de busca personalizada, redireciona para página principal com filtro
      const params = new URLSearchParams();
      if (searchTerm.trim()) {
        params.set('search', searchTerm.trim());
      }
      window.location.href = `/?${params.toString()}`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Busca em tempo real se onSearch estiver definido
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={`flex justify-center py-4 sm:py-8 px-4 ${className}`}>
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col sm:flex-row items-stretch sm:items-center w-full max-w-3xl theme-bg-card backdrop-blur-sm rounded-lg p-1 border theme-border shadow-lg gap-2 sm:gap-0"
        role="search"
        aria-label="Buscar eventos"
      >
        
        {/* Search Input Container */}
        <div className="flex items-center flex-1">
          <div className="p-2 sm:p-3 theme-text-muted" aria-hidden="true">
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          
          <Input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="flex-grow bg-transparent p-2 sm:p-3 theme-text-primary placeholder:theme-text-muted focus-visible:ring-0 border-none h-auto text-base sm:text-lg font-medium"
            aria-label="Campo de busca de eventos"
            id="search-input"
          />
        </div>
        
        {/* Search Button */}
        <Button 
          type="submit"
          className="theme-bg-pink hover:theme-bg-purple theme-text-primary font-medium px-4 sm:px-8 py-2 sm:py-3 rounded-md transition-colors text-sm sm:text-base w-full sm:w-auto min-h-[44px]"
          aria-label="Pesquisar eventos"
        >
          Pesquisar
        </Button>
      </form>
    </div>
  );
}