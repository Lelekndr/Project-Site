'use client';

import { useState } from 'react';
import { Header } from '@/components/ui/common/Header';
import { SearchBar } from '@/components/ui/common/SearchBar';
import { FeaturedEventsSwiper } from '@/components/ui/SwiperEvents';
import { EventCatalog } from '@/components/ui/EventCatalog';
import { Footer } from '@/components/ui/common/Footer';
import { featuredEvents, getAvailableCategories } from '@/lib/events';

const categories = getAvailableCategories();

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-0 sm:px-4">
        <div className="relative py-8 sm:py-12">
          <div className="text-center mb-8 sm:mb-12 px-4 sm:px-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold theme-text-primary mb-2 sm:mb-4">
              Eventos Destaques
            </h2>
            <p className="text-sm sm:text-base lg:text-lg theme-text-secondary max-w-2xl mx-auto">
              Confira os eventos mais populares e imperdíveis desta semana
            </p>
          </div>
          <FeaturedEventsSwiper events={featuredEvents} />
        </div>
      </div>
      <EventCatalog 
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchTerm={searchTerm}
        renderSearchBar={() => <SearchBar onSearch={handleSearch} />}
      />
      <Footer />
    </div>
  );
}