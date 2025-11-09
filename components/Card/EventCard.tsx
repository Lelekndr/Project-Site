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
    <Link 
      href={`/evento/${id}`} 
      className="block h-full"
      aria-label={`Ver detalhes do evento ${title}`}
    >
      <article 
        className={`relative h-[350px] sm:h-[400px] w-full max-w-sm overflow-hidden rounded-lg shadow-xl cursor-pointer
                      ${isFeatured ? 'border-2 sm:border-4 theme-border scale-100 sm:scale-105' : 'theme-border border'} 
                      transition-all duration-300 transform active:scale-95 sm:hover:scale-105 hover:shadow-2xl group`}
        role="article"
        aria-labelledby={`event-title-${id}`}
      >
      
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
                {/* Card Content */}
        <div className="relative p-4 sm:p-6 flex flex-col justify-end h-full theme-text-primary">
          
          {/* Main Title */}
          <h3 
            id={`event-title-${id}`}
            className={`text-lg sm:text-xl font-bold leading-tight mt-auto theme-text-primary group-hover:theme-pink transition-colors duration-300 ${isFeatured ? 'sm:text-2xl' : ''}`}
          >
            {title}
          </h3>
          
          {/* Subtitle */}
          {subtitle && (
            <p 
              className="mt-1 text-xs sm:text-sm theme-text-secondary group-hover:theme-text-primary transition-colors duration-300 line-clamp-2"
              aria-describedby={`event-title-${id}`}
            >
              {subtitle}
            </p>
          )}
          
          {/* Footer: Author/Category */}
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t theme-border">
            {author && category && (
              <div className="flex flex-col sm:flex-row text-xs space-y-1 sm:space-y-0 sm:space-x-2">
                <span className="font-bold theme-text-primary" aria-label={`Criado por ${author}`}>
                  BY {author.toUpperCase()}
                </span>
                <span 
                  className="theme-pink group-hover:theme-purple transition-colors duration-300 sm:border-l theme-border sm:pl-2"
                  aria-label={`Categoria: ${category}`}
                >
                  {category.toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Featured Badge */}
          {isFeatured && date && (
            <div 
              className="absolute top-3 sm:top-4 right-3 sm:right-4 theme-bg-pink px-2 sm:px-3 py-1 rounded-full text-xs font-bold theme-text-primary group-hover:theme-bg-purple transition-colors duration-300"
              aria-label={`Evento em destaque - Data: ${date}`}
              role="badge"
            >
              {date}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}