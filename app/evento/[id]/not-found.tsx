import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="colala-background min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-6xl font-bold text-white">404</h1>
        <h2 className="text-2xl font-semibold text-white/80">Evento não encontrado</h2>
        <p className="text-white/60 max-w-md mx-auto">
          O evento que você está procurando não existe ou foi removido.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar aos eventos</span>
        </Link>
      </div>
    </div>
  );
}