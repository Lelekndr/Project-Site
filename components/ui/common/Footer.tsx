"use client";

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 mt-20">
      <div className="container mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold text-yellow-400">★</span>
              <h3 className="text-2xl font-bold text-white tracking-wider">COLALÁ</h3>
            </div>
            <p className="text-white/70 text-sm max-w-md">
              Conecte-se aos melhores eventos da sua cidade. Descubra, participe e viva experiências únicas.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-white font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/" className="hover:text-pink-400 transition-colors">Home</Link></li>
              <li><Link href="/eventos" className="hover:text-pink-400 transition-colors">Eventos</Link></li>
              <li><Link href="/meus-eventos" className="hover:text-pink-400 transition-colors">Meus Eventos</Link></li>
              <li><Link href="/meus-ingressos" className="hover:text-pink-400 transition-colors">Meus Ingressos</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>contato@colala.com</li>
              <li>(11) 9999-9999</li>
              <li>São Paulo, SP</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-white/50 text-sm">
            © 2024 COLALÁ. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}