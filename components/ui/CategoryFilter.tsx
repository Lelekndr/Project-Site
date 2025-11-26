import { Button } from '@/components/ui/button';
import { CategoryData } from '@/lib/events';

interface CategoryFilterProps {
  categories: CategoryData[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <nav 
      className="mb-8 sm:mb-12 px-4 sm:px-0" 
      role="navigation" 
      aria-label="Filtros de categoria de eventos"
    >
      {/* Mobile: Horizontal scroll */}
      <div 
        className="flex sm:hidden overflow-x-auto gap-3 pb-2 -mx-4 px-4"
        role="tablist"
        aria-label="Categorias de eventos - versão mobile"
      >
        {categories.map((category) => (
          <Button
            key={category.slug}
            onClick={() => onCategoryChange(category.slug)}
            className={`
              flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap min-h-[44px]
              ${activeCategory === category.slug
                ? 'bg-pink-600 text-white shadow-lg'
                : 'bg-white/10 dark:bg-white/10 light:bg-white/80 text-white/80 dark:text-white/80 light:text-gray-700 hover:bg-white/20 dark:hover:bg-white/20 light:hover:bg-gray-100 border border-white/20 dark:border-white/20 light:border-gray-300'}
            `}
            variant="ghost"
            role="tab"
            aria-selected={activeCategory === category.slug}
            aria-controls={`category-${category.slug}-panel`}
            aria-label={`Filtrar por categoria ${category.name}`}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Desktop: Centered flex wrap */}
      <div 
        className="hidden sm:flex flex-wrap justify-center gap-3"
        role="tablist"
        aria-label="Categorias de eventos - versão desktop"
      >
        {categories.map((category) => (
          <Button
            key={category.slug}
            onClick={() => onCategoryChange(category.slug)}
            className={`
              px-6 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${activeCategory === category.slug
                ? 'bg-pink-600 text-white shadow-lg hover:bg-purple-600'
                : 'bg-white/10 dark:bg-white/10 light:bg-white/80 text-white/80 dark:text-white/80 light:text-gray-700 hover:bg-white/20 dark:hover:bg-white/20 light:hover:bg-gray-100 border border-white/20 dark:border-white/20 light:border-gray-300'}
            `}
            variant="ghost"
            role="tab"
            aria-selected={activeCategory === category.slug}
            aria-controls={`category-${category.slug}-panel`}
            aria-label={`Filtrar por categoria ${category.name}`}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </nav>
  );
}
