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
    <div className="colala-background min-h-screen">
      <Header />
      <div className="container mx-auto px-0 sm:px-4">
        <SearchBar onSearch={handleSearch} />
        <div className="relative py-8 sm:py-12">
          <FeaturedEventsSwiper events={featuredEvents} />
        </div>
      </div>
      
      <EventCatalog 
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchTerm={searchTerm}
      />
      
      <Footer />
    </div>
  );
}