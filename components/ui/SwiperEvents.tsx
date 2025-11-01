import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EventCard } from '../Card/EventCard';
import { EventData } from '@/lib/events';

interface FeaturedEventsSwiperProps {
  events: EventData[];
}

export function FeaturedEventsSwiper({ events }: FeaturedEventsSwiperProps) {
  const carouselEvents = events.slice(0, 6);
  
  return (
    <div className="relative min-h-[350px] sm:min-h-[400px] px-4 sm:px-0">
      <Swiper
        modules={[Navigation, EffectCoverflow, Pagination]}
        effect={'coverflow'}
        centeredSlides={true}
        slidesPerView={'auto'}
        spaceBetween={20}
        loop={false}
        watchSlidesProgress={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
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
        breakpoints={{
          320: {
            spaceBetween: 15,
            coverflowEffect: {
              rotate: 0,
              stretch: 0,
              depth: 50,
              modifier: 1.5,
              slideShadows: false,
            },
          },
          640: {
            spaceBetween: 20,
            coverflowEffect: {
              rotate: 0,
              stretch: 0,
              depth: 80,
              modifier: 2,
              slideShadows: false,
            },
          },
          768: {
            spaceBetween: 30,
            coverflowEffect: {
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            },
          },
        }}
        className="mySwiper pb-16 sm:pb-20"
      >
        {carouselEvents.map((event) => (
          <SwiperSlide
            key={event.id}
            className="swiper-slide-custom transition-all duration-300"
          >
            {({ isActive }) => (
              <EventCard data={event} isFeatured={isActive} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Navigation Buttons - Hidden on mobile, visible on tablet+ */}
      <button className="swiper-button-prev-custom absolute top-1/2 -left-2 lg:-left-4 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm text-white transition-colors hidden sm:block">
        <ChevronLeft className="w-6 h-6 lg:w-8 lg:h-8" />
      </button>
      <button className="swiper-button-next-custom absolute top-1/2 -right-2 lg:-right-4 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm text-white transition-colors hidden sm:block">
        <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8" />
      </button>
    </div>
  );
}