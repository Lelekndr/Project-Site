import { CategoryData } from '@/events';
import { Button } from '@/components/ui/button'; // Importação do shadcn Button

const categories: CategoryData[] = [
  // ... (dados das categorias)
  { name: 'ALL', slug: 'all' },
  { name: 'STAND UP COMEDY', slug: 'stand-up' },
  { name: 'EVENTOS PET', slug: 'pet-events' },
  { name: 'FESTAS & SHOWS', slug: 'parties-shows' },
  { name: 'TEATROS', slug: 'theater' },
  { name: 'ESPORTES', slug: 'sports' },
];

interface CategoryNavProps {
    activeCategory: string;
    onSelectCategory: (slug: string) => void;
}

export function CategoryNav({ activeCategory, onSelectCategory }: CategoryNavProps) {
  return (
    <div className="flex flex-col px-8 py-4">
      <h2 className="text-white text-lg font-semibold mb-4 border-b border-white/10 inline-block w-fit">
        Categorias
      </h2>
      
      <div className="flex items-center space-x-4 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.slug}
            onClick={() => onSelectCategory(category.slug)}
            // Anulando estilos padrões e aplicando o design da categoria
            className={`
              whitespace-nowrap px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 h-auto
              ${activeCategory === category.slug 
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30 hover:bg-pink-700' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
              }
            `}
            variant="ghost" // Usando ghost para ter a base mais limpa
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
}