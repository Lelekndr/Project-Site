import { EventCard } from '../Card/EventCard';
import { EventData } from '@/lib/events';

interface EventsGridProps {
  events: EventData[];
  visibleCount: number;
}

export function EventsGrid({ events, visibleCount }: EventsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 px-4 sm:px-0">
      {events.slice(0, visibleCount).map((event) => (
        <div key={event.id} className="h-[350px] sm:h-[400px]">
          <EventCard data={event} />
        </div>
      ))}
    </div>
  );
}
