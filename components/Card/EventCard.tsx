import { EventData } from '@/events';
import Image from 'next/image';

interface EventCardProps {
  data: EventData;
  isFeatured?: boolean;
}

export function EventCard({ data, isFeatured = false }: EventCardProps) {
  const { imageSrc, title, subtitle, author, category, date } = data;

  return (
    // Largura padrão para o card no Swiper. A classe 'swiper-slide' será adicionada automaticamente.
    <div className={`relative h-[400px] w-full max-w-sm overflow-hidden rounded-lg shadow-xl 
                    ${isFeatured ? 'border-4 border-pink-500/80 scale-105' : 'border border-white/10'} 
                    transition-all duration-300 transform`}>
      
      {/* Imagem de Fundo (Simulada para fins de demonstração, use a tag Image do Next) */}
      <div className="absolute inset-0">
        <Image 
          src={imageSrc} 
          alt={title} 
          fill={true} 
 
          className="opacity-70 object group-hover:opacity-100 transition-opacity" 
        />
        <div className="absolute inset-0 bg-black/50 hover:bg-black/40 transition-colors"></div>
      </div>
      
      {/* Conteúdo do Card */}
      <div className="relative p-6 flex flex-col justify-end h-full text-white">
        
        {/* Título Principal */}
        <h3 className={`text-xl font-bold leading-tight mt-auto ${isFeatured ? 'text-2xl' : ''}`}>
          {title}
        </h3>
        
        {/* Subtítulo / Conteúdo adicional */}
        {subtitle && <p className="mt-1 text-sm text-white/80">{subtitle}</p>}
        
        {/* Rodapé: Autor/Categoria */}
        <div className="mt-4 pt-4 border-t border-white/10">
          {author && category && (
            <div className="flex text-xs space-x-2">
              <span className="font-bold border-r border-white/50 pr-2">BY {author.toUpperCase()}</span>
              <span className="text-pink-400">{category.toUpperCase()}</span>
            </div>
          )}
        </div>

        {/* Informações de Destaque (ex: Data no card do meio) - Exemplo */}
        {isFeatured && date && (
          <div className="absolute top-4 right-4 bg-pink-600 px-3 py-1 rounded-full text-xs font-bold">
            {date}
          </div>
        )}
      </div>
    </div>
  );
}