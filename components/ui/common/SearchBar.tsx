import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input'; // Importação do shadcn Input
import { Button } from '@/components/ui/button'; // Importação do shadcn Button

export function SearchBar() {
  return (
    <div className="flex justify-center py-8 ">
      <div className="flex items-center w-full max-w-3xl bg-white/100  backdrop-blur-sm  rounded-lg p-1 border border-white/70 shadow-lg">
        
        {/* Ícone de Busca (Lucide React) */}
        <div className="p-3 text-white/50">
          <Search className="w-5 h-5" />
        </div>
        
        {/* Input do shadcn/ui customizado */}
        <Input
          type="text"
          placeholder="Buscar eventos"
          // Classes Tailwind para anular o estilo padrão do shadcn e aplicar o design escuro
          className="flex-grow bg-transparent p-3 text-white placeholder-zinc-50/25 focus-visible:ring-0 border-none h-auto text-lg"
        />
        
        {/* Botão Pesquisar do shadcn/ui customizado */}
        <Button 
          type="submit"
          // Cor customizada para o botão de busca
          className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-8 py-3 rounded-md transition-colors text-base"
        >
          Pesquisar
        </Button>
      </div>
    </div>
  );
}