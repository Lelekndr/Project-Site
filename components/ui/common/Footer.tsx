"use client";

import Link from 'next/link';

export function Footer() {
  return (
    <footer 
      className="bg-black/20 backdrop-blur-sm border-t border-white/10 mt-12 sm:mt-20 safe-area-bottom"
      role="contentinfo"
      aria-label="Rodapé do site"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl font-bold text-yellow-400" aria-hidden="true">★</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wider">COLALÁ</h3>
            </div>
            <p className="text-white/70 text-xs sm:text-sm max-w-md">
              Conecte-se aos melhores eventos da sua cidade. Descubra, participe e viva experiências únicas.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="sm:col-span-1">
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Links Rápidos</h4>
            <nav aria-label="Links de navegação rápida">
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-white/70">
                <li><Link href="/" className="hover:text-pink-400 transition-colors">Home</Link></li>
                <li><Link href="/eventos" className="hover:text-pink-400 transition-colors">Eventos</Link></li>
                <li><Link href="/meus-eventos" className="hover:text-pink-400 transition-colors">Meus Eventos</Link></li>
                <li><Link href="/meus-ingressos" className="hover:text-pink-400 transition-colors">Meus Ingressos</Link></li>
              </ul>
            </nav>
          </div>

          {/* Contato */}
          <div className="sm:col-span-1">
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contato</h4>
            <address className="not-italic">
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-white/70">
                <li>
                  <a 
                    href="mailto:contato@colala.com" 
                    className="hover:text-pink-400 transition-colors"
                    aria-label="Enviar email para contato@colala.com"
                  >
                    contato@colala.com
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+5511999999999" 
                    className="hover:text-pink-400 transition-colors"
                    aria-label="Ligar para (11) 9999-9999"
                  >
                    (11) 9999-9999
                  </a>
                </li>
                <li>Campo Grande, MS</li>
              </ul>
            </address>
          </div>
        </div>

        <div className="border-t border-white/10 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-white/50 text-xs sm:text-sm">
            © 2024 COLALÁ. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}