import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SearchBar() {
  return (
    <div className="flex justify-center py-4 sm:py-8 px-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full max-w-3xl bg-white/100 backdrop-blur-sm rounded-lg p-1 border border-white/70 shadow-lg gap-2 sm:gap-0">
        
        {/* Search Input Container */}
        <div className="flex items-center flex-1">
          <div className="p-2 sm:p-3 text-gray-400">
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          
          <Input
            type="text"
            placeholder="Buscar eventos"
            className="flex-grow bg-transparent p-2 sm:p-3 text-gray-800 placeholder-gray-500 focus-visible:ring-0 border-none h-auto text-base sm:text-lg font-medium"
          />
        </div>
        
        {/* Search Button */}
        <Button 
          type="submit"
          className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-4 sm:px-8 py-2 sm:py-3 rounded-md transition-colors text-sm sm:text-base w-full sm:w-auto min-h-[44px]"
        >
          Pesquisar
        </Button>
      </div>
    </div>
  );
}