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
        className="flex flex-col sm:flex-row items-stretch sm:items-center w-full max-w-3xl bg-white/10 dark:bg-white/10 light:bg-white/90 backdrop-blur-sm rounded-lg p-1 border border-white/20 dark:border-white/20 light:border-gray-300 shadow-lg gap-2 sm:gap-0"
        role="search"
        aria-label="Buscar eventos"
      >
        
        {/* Search Input Container */}
        <div className="flex items-center flex-1">
          <div className="p-2 sm:p-3 text-white/60 dark:text-white/60 light:text-gray-500" aria-hidden="true">
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          
          <Input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="flex-grow bg-transparent p-2 sm:p-3 text-white dark:text-white light:text-gray-900 placeholder:text-white/60 dark:placeholder:text-white/60 light:placeholder:text-gray-500 focus-visible:ring-0 border-none h-auto text-base sm:text-lg font-medium"
            aria-label="Campo de busca de eventos"
            id="search-input"
          />
        </div>
        
        {/* Search Button */}
        <Button 
          type="submit"
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 dark:bg-gradient-to-r dark:from-pink-500 dark:to-purple-600 dark:hover:from-pink-600 dark:hover:to-purple-700 light:bg-gradient-to-r light:from-pink-500 light:to-purple-600 light:hover:from-pink-600 light:hover:to-purple-700 text-white dark:text-white light:text-white font-medium px-4 sm:px-8 py-2 sm:py-3 rounded-md transition-colors text-sm sm:text-base w-full sm:w-auto min-h-[44px]"
          aria-label="Pesquisar eventos"
        >
          Pesquisar
        </Button>
      </form>
    </div>
  );
}