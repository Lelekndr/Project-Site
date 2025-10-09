'use client';

import { useState } from 'react';
import { Header } from '@/components/ui/common/Header';
import { SearchBar } from '@/components/ui/common/SearchBar';
import { CategoryNav } from '@/components/ui/common/CategoryNav';
import { FeaturedEventsSwiper } from '@/components/ui/SwiperEvents';
import { featuredEvents } from '@/lib/events';


export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="colala-background min-h-screen">
      <Header />
      <div className="container mx-auto">
        <SearchBar />
        <CategoryNav 
          activeCategory={activeCategory} 
          onSelectCategory={setActiveCategory} 
        />
        <div className="relative py-12 px-4 md:px-0">
          <FeaturedEventsSwiper events={featuredEvents} />
        </div>
      </div>
    </div>
  );
}