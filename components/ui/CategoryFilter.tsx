import { Button } from '@/components/ui/button';
import { CategoryData } from '@/lib/events';

interface CategoryFilterProps {
  categories: CategoryData[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="mb-8 sm:mb-12 px-4 sm:px-0">
      {/* Mobile: Horizontal scroll */}
      <div className="flex sm:hidden overflow-x-auto gap-3 pb-2 -mx-4 px-4">
        {categories.map((category) => (
          <Button
            key={category.slug}
            onClick={() => onCategoryChange(category.slug)}
            className={`
              flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap min-h-[44px]
              ${activeCategory === category.slug
                ? 'bg-pink-600 text-white shadow-lg'
                : 'bg-white/10 text-white/70 hover:bg-white/20 border border-white/20'}
            `}
            variant="ghost"
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Desktop: Centered flex wrap */}
      <div className="hidden sm:flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <Button
            key={category.slug}
            onClick={() => onCategoryChange(category.slug)}
            className={`
              px-6 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${activeCategory === category.slug
                ? 'bg-pink-600 text-white shadow-lg hover:bg-pink-700'
                : 'bg-white/10 text-white/70 hover:bg-white/20 border border-white/20'}
            `}
            variant="ghost"
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
