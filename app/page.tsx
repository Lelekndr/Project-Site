'use client';

import { useState } from 'react';
import { Header } from '@/components/ui/common/Header';
import { SearchBar } from '@/components/ui/common/SearchBar';
import { CategoryNav } from '@/components/ui/common/CategoryNav';
import { FeaturedEventsSwiper } from '@/components/ui/SwiperEvents';
import { EventCatalog } from '@/components/ui/EventCatalog';
import { Footer } from '@/components/ui/common/Footer';
import { featuredEvents } from '@/lib/events';
import { CategoryData } from '@/events';


const categories: CategoryData[] = [
  { name: 'ALL', slug: 'all' },
  { name: 'STAND UP COMEDY', slug: 'stand-up' },
  { name: 'EVENTOS PET', slug: 'pet-events' },
  { name: 'FESTAS & SHOWS', slug: 'parties-shows' },
  { name: 'TEATROS', slug: 'theater' },
  { name: 'ESPORTES', slug: 'sports' },
  { name: 'TECH', slug: 'tech' },
  { name: 'MARKETING', slug: 'marketing' },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="colala-background min-h-screen">
      <Header />
      <div className="container mx-auto">
        <SearchBar />
        <div className="relative py-12 px-4 md:px-0">
          <FeaturedEventsSwiper events={featuredEvents} />
        </div>
      </div>
      
      <EventCatalog 
        events={featuredEvents}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      
      <Footer />
    </div>
  );
}