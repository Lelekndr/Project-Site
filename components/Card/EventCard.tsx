import { EventData } from '@/events';
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
      <div className={`relative h-[400px] w-full max-w-sm overflow-hidden rounded-lg shadow-xl cursor-pointer
                      ${isFeatured ? 'border-4 border-pink-500/80 scale-105' : 'border border-white/10'} 
                      transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group`}>
      
      {/* Imagem de Fundo (Simulada para fins de demonstração, use a tag Image do Next) */}
      <div className="absolute inset-0">
        <Image 
          src={imageSrc} 
          alt={title} 
          fill={true} 
          className="opacity-70 object-cover group-hover:opacity-90 group-hover:scale-110 transition-all duration-500" 
        />
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300"></div>
      </div>
      
      {/* Conteúdo do Card */}
      <div className="relative p-6 flex flex-col justify-end h-full text-white">
        
        {/* Título Principal */}
        <h3 className={`text-xl font-bold leading-tight mt-auto group-hover:text-pink-200 transition-colors duration-300 ${isFeatured ? 'text-2xl' : ''}`}>
          {title}
        </h3>
        
        {/* Subtítulo / Conteúdo adicional */}
        {subtitle && <p className="mt-1 text-sm text-white/80 group-hover:text-white/90 transition-colors duration-300">{subtitle}</p>}
        
        {/* Rodapé: Autor/Categoria */}
        <div className="mt-4 pt-4 border-t border-white/10">
          {author && category && (
            <div className="flex text-xs space-x-2">
              <span className="font-bold border-r border-white/50 pr-2">BY {author.toUpperCase()}</span>
              <span className="text-pink-400 group-hover:text-pink-300 transition-colors duration-300">{category.toUpperCase()}</span>
            </div>
          )}
        </div>

        {/* Informações de Destaque (ex: Data no card do meio) - Exemplo */}
        {isFeatured && date && (
          <div className="absolute top-4 right-4 bg-pink-600 px-3 py-1 rounded-full text-xs font-bold group-hover:bg-pink-500 transition-colors duration-300">
            {date}
          </div>
        )}
      </div>
      </div>
    </Link>
  );
}