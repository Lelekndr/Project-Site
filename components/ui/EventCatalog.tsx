"use client";

import { useState, useMemo } from 'react';
import { EventCard } from '../Card/EventCard';
import { EventData, CategoryData } from '@/events';
import { Button } from '@/components/ui/button';

interface EventCatalogProps {
  events: EventData[];
  categories: CategoryData[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function EventCatalog({ 
  events, 
  categories, 
  activeCategory, 
  onCategoryChange 
}: EventCatalogProps) {
  const [visibleEvents, setVisibleEvents] = useState(12);

  // Filter events by category
  const filteredEvents = useMemo(() => {
    if (activeCategory === 'all') {
      return events;
    }
    return events.filter(event => 
      event.category?.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [events, activeCategory]);

  const handleLoadMore = () => {
    setVisibleEvents(prev => prev + 12);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          Todos os Eventos
        </h2>
        <p className="text-white/70 text-lg">
          Descubra os melhores eventos da sua cidade
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
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

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {filteredEvents.slice(0, visibleEvents).map((event) => (
          <div key={event.id} className="h-[400px]">
            <EventCard data={event} />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleEvents < filteredEvents.length && (
        <div className="text-center">
          <Button
            onClick={handleLoadMore}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-200"
          >
            Carregar Mais Eventos
          </Button>
        </div>
      )}

      {/* No Events Message */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/70 text-lg">
            Nenhum evento encontrado para esta categoria.
          </p>
        </div>
      )}
    </div>
  );
}