import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EventCard } from '../Card/EventCard';
import { EventData } from '@/events';

interface FeaturedEventsSwiperProps {
  events: EventData[];
}

export function FeaturedEventsSwiper({ events }: FeaturedEventsSwiperProps) {
  return (
    <div className="relative min-h-[400px]">
      <Swiper
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
        {events.map((event) => (
          <SwiperSlide
            key={event.id}
            className="!w-[300px] md:!w-[350px] !h-[400px] transition-all duration-300"
          >
            {({ isActive }) => (
              <EventCard data={event} isFeatured={isActive} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="swiper-button-prev-custom absolute top-1/2 -left-4 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm text-white transition-colors hidden md:block">
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button className="swiper-button-next-custom absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm text-white transition-colors hidden md:block">
        <ChevronRight className="w-8 h-8" />
      </button>
    </div>
  );
}