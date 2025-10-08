import { Star, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Importação do shadcn Button

export function Header() {
  const navItems = [
    { name: 'Home', href: '/' }, 
    { name: 'Meus eventos', href: '/meus-eventos' }, 
    { name: 'Meus ingressos', href: '/meus-ingressos' }
  ];

  return (
    <header className="py-4 px-8 flex justify-between items-center text-white border-b border-white/10">
      
      {/* Logo Colalá */}
      <div className="flex items-center space-x-1 text-2xl font-bold">
        <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
        <span className="font-extrabold tracking-wider">COLALÁ</span>
      </div>

      {/* Navegação Principal */}
      <nav className="hidden md:flex space-x-6 text-sm">
        {navItems.map((item) => (
          // Usando <a> simples, mas poderia ser um shadcn button com variant="link"
          <a key={item.name} href={item.href} className="hover:text-pink-400 transition-colors">
            {item.name}
          </a>
        ))}
      </nav>

      {/* Botões de Ação */}
      <div className="flex items-center space-x-4 text-sm">
        {/* Usando o componente Button do shadcn/ui, com o 'variant' setado para 'link' ou 'ghost' customizado */}
        <Button variant="ghost" className="text-white hover:text-pink-400 hover:bg-transparent p-0 h-auto" asChild>
            <a href="/login">Login</a>
        </Button>

        {/* Botão de Cadastro customizado */}
        <Button 
            className="px-4 py-1 bg-transparent border border-white hover:border-pink-400 hover:text-pink-400 transition-colors rounded-full text-white" 
            variant="outline"
        >
            <a href="/cadastro">Cadastre-se</a>
        </Button>

        <button className="md:hidden">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}