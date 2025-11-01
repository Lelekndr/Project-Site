import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, MapPin, Users, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { featuredEvents } from '@/lib/events';

interface EventPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventPage({ params }: EventPageProps) {
  // Await params em Next.js 15
  const { id } = await params;
  
  // Validação mais robusta do ID
  const eventId = parseInt(id);
  
  // Verifica se o ID é um número válido
  if (isNaN(eventId) || eventId <= 0) {
    notFound();
  }

  const event = featuredEvents.find(e => e.id === eventId);

  if (!event) {
    notFound();
  }

  return (
    <div className="colala-background min-h-screen">
      {/* Header com botão voltar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <Link 
          href="/" 
          className="inline-flex items-center space-x-2 text-white/70 hover:text-white transition-colors duration-200 group"
        >
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="text-xs sm:text-sm font-medium">Voltar aos eventos</span>
        </Link>
      </div>

      {/* Event Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Event Image */}
          <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden">
            <Image
              src={event.imageSrc}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* Event Info */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                <span className="bg-pink-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                  {event.category}
                </span>
                {event.date && (
                  <span className="bg-purple-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    {event.date}
                  </span>
                )}
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-3 sm:mb-4">
                {event.title}
              </h1>
              
              {event.subtitle && (
                <p className="text-base sm:text-lg lg:text-xl text-white/80 mb-4 sm:mb-6">
                  {event.subtitle}
                </p>
              )}
            </div>

            {/* Event Details */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-2 sm:space-x-3 text-white/70 text-sm sm:text-base">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-pink-400 flex-shrink-0" />
                <span>25 de Janeiro, 2024</span>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-3 text-white/70 text-sm sm:text-base">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-pink-400 flex-shrink-0" />
                <span>20:00 - 23:00</span>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-3 text-white/70 text-sm sm:text-base">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-pink-400 flex-shrink-0" />
                <span>Centro de Convenções, São Paulo - SP</span>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-3 text-white/70 text-sm sm:text-base">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-pink-400 flex-shrink-0" />
                <span>234 pessoas interessadas</span>
              </div>
              
              {event.author && (
                <div className="flex items-center space-x-2 sm:space-x-3 text-white/70 text-sm sm:text-base">
                  <span className="font-medium">Organizado por:</span>
                  <span className="text-pink-400">{event.author}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
              <Button 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-medium rounded-full transition-all duration-200 transform hover:scale-105 min-h-[48px]"
              >
                Inscrever-se no Evento
              </Button>
              
              <Button 
                variant="outline"
                className="border-2 border-white/20 text-white hover:bg-white/10 px-6 sm:px-8 py-3 text-base sm:text-lg font-medium rounded-full transition-all duration-200 min-h-[48px]"
              >
                Compartilhar
              </Button>
            </div>
          </div>
        </div>

        {/* Event Description */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Sobre o Evento</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-white/80 text-lg leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-white/80 text-lg leading-relaxed mb-4">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p className="text-white/80 text-lg leading-relaxed">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque 
                laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}