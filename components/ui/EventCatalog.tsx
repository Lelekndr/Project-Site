"use client";

import { useState, useMemo } from 'react';
import { CategoryData, getEventsByCategory } from '@/lib/events';
import { SectionTitle } from './SectionTitle';
import { CategoryFilter } from './CategoryFilter';
import { EventsGrid } from './EventsGrid';
import { LoadMoreButton } from './LoadMoreButton';
import { EmptyState } from './EmptyState';

interface EventCatalogProps {
  categories: CategoryData[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function EventCatalog({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: EventCatalogProps) {
  const [visibleEvents, setVisibleEvents] = useState(12);

  const filteredEvents = useMemo(() => {
    return getEventsByCategory(activeCategory);
  }, [activeCategory]);

  const handleLoadMore = () => {
    setVisibleEvents(prev => prev + 12);
  };

  return (
    <div className="container mx-auto px-0 sm:px-4 py-8 sm:py-12">
      <div className="px-4 sm:px-0">
        <SectionTitle 
          title="Todos os Eventos"
          subtitle="Descubra os melhores eventos da sua cidade"
        />
      </div>

      <CategoryFilter 
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={onCategoryChange}
      />

      {filteredEvents.length === 0 ? (
        <div className="px-4 sm:px-0">
          <EmptyState message="Nenhum evento encontrado para esta categoria." />
        </div>
      ) : (
        <>
          <EventsGrid 
            events={filteredEvents}
            visibleCount={visibleEvents}
          />
          
          <div className="px-4 sm:px-0">
            <LoadMoreButton 
              hasMore={visibleEvents < filteredEvents.length}
              onLoadMore={handleLoadMore}
            />
          </div>
        </>
      )}
    </div>
  );
}