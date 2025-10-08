'use client';

import { useState } from 'react';
import { Header } from '@/components/ui/common/Header';
import { SearchBar } from '@/components/ui/common/SearchBar';
import { CategoryNav } from '@/components/ui/common/CategoryNav';
import { EventCard }  from '@/components/Card/EventCard';
import { EventData } from '@/events';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules'; 
import { ChevronLeft, ChevronRight } from 'lucide-react';

const featuredEvents: EventData[] = [
  // ... (Seus dados de evento permanecem aqui)
  {
    id: 1,
    imageSrc: '/images/image1.png',
    title: 'Carnaval vibrante com desfiles coloridos e música animada',
    subtitle: 'Texto descritivo do evento em português',
    author: 'Chiari Sato',
    category: 'Case Studies',
    link: '#',
  },
  {
    id: 2,
    imageSrc: '/public/images/',
    title: 'The Future of Marketing: Predictions for the Next 5 Years',
    author: 'Olivia Wilson',
    category: 'Marketing Trends',
    date: '21 JULY',
    link: '#',
  },
  {
    id: 3,
    imageSrc: '/images/card3.jpg',
    title: 'Crafting a Killer Content Strategy: Tips and Tricks for Success',
    author: 'Olivia Wilson',
    category: 'Content Strategy',
    link: '#',
  },
  { id: 4, imageSrc: '/images/card4.jpg', title: 'Tech Innovation Summit 2024', author: 'Tech Team', category: 'Tech' , link: '#' },
];

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
          
          <div className="relative">
            <Swiper
              // Configurações do Swiper
              modules={[Navigation, EffectCoverflow]}
              effect={'coverflow'}
              centeredSlides={true}
              slidesPerView={'auto'}
              spaceBetween={30}
              loop={false}
              watchSlidesProgress={true}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
                slideShadows: false,
              }}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              className="mySwiper !pb-20"
            >
              
              {featuredEvents.map((event) => (
                <SwiperSlide key={event.id} className="!w-[300px] md:!w-[350px] transition-all duration-300">
                  {({ isActive }) => (
                    <EventCard 
                      data={event} 
                      isFeatured={isActive} 
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navegação Customizada (Setas) */}
            <button className="swiper-button-prev-custom absolute top-1/2 -left-4 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm text-white transition-colors hidden md:block">
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button className="swiper-button-next-custom absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm text-white transition-colors hidden md:block">
              <ChevronRight className="w-8 h-8" />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}