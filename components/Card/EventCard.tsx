import { EventData } from '@/lib/events';
import Image from 'next/image';
import Link from 'next/link';

interface EventCardProps {
  data: EventData;
  isFeatured?: boolean;
}

export function EventCard({ data, isFeatured = false }: EventCardProps) {
  const { id, imageSrc, title, subtitle, author, category, date } = data;

  return (
    <Link href={`/evento/${id}`} className="block h-full">
      <div className={`relative h-[350px] sm:h-[400px] w-full max-w-sm overflow-hidden rounded-lg shadow-xl cursor-pointer
                      ${isFeatured ? 'border-2 sm:border-4 border-pink-500/80 scale-100 sm:scale-105' : 'border border-white/10'} 
                      transition-all duration-300 transform active:scale-95 sm:hover:scale-105 hover:shadow-2xl group`}>
      
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src={imageSrc} 
            alt={title} 
            fill={true} 
            className="opacity-70 object-cover group-hover:opacity-90 group-hover:scale-110 transition-all duration-500"
            sizes="(max-width: 640px) 280px, (max-width: 768px) 300px, 350px"
          />
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300"></div>
        </div>
        
        {/* Card Content */}
        <div className="relative p-4 sm:p-6 flex flex-col justify-end h-full text-white">
          
          {/* Main Title */}
          <h3 className={`text-lg sm:text-xl font-bold leading-tight mt-auto group-hover:text-pink-200 transition-colors duration-300 ${isFeatured ? 'sm:text-2xl' : ''}`}>
            {title}
          </h3>
          
          {/* Subtitle */}
          {subtitle && (
            <p className="mt-1 text-xs sm:text-sm text-white/80 group-hover:text-white/90 transition-colors duration-300 line-clamp-2">
              {subtitle}
            </p>
          )}
          
          {/* Footer: Author/Category */}
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10">
            {author && category && (
              <div className="flex flex-col sm:flex-row text-xs space-y-1 sm:space-y-0 sm:space-x-2">
                <span className="font-bold">BY {author.toUpperCase()}</span>
                <span className="text-pink-400 group-hover:text-pink-300 transition-colors duration-300 sm:border-l sm:border-white/50 sm:pl-2">
                  {category.toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Featured Badge */}
          {isFeatured && date && (
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-pink-600 px-2 sm:px-3 py-1 rounded-full text-xs font-bold group-hover:bg-pink-500 transition-colors duration-300">
              {date}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}