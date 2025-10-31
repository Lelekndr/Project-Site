"use client";

import { useState, useMemo } from 'react';
import { EventData, CategoryData } from '@/lib/events';
import { SectionTitle } from './SectionTitle';
import { CategoryFilter } from './CategoryFilter';
import { EventsGrid } from './EventsGrid';
import { LoadMoreButton } from './LoadMoreButton';
import { EmptyState } from './EmptyState';

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
      <SectionTitle 
        title="Todos os Eventos"
        subtitle="Descubra os melhores eventos da sua cidade"
      />

      <CategoryFilter 
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={onCategoryChange}
      />

      {filteredEvents.length === 0 ? (
        <EmptyState message="Nenhum evento encontrado para esta categoria." />
      ) : (
        <>
          <EventsGrid 
            events={filteredEvents}
            visibleCount={visibleEvents}
          />
          
          <LoadMoreButton 
            hasMore={visibleEvents < filteredEvents.length}
            onLoadMore={handleLoadMore}
          />
        </>
      )}
    </div>
  );
}