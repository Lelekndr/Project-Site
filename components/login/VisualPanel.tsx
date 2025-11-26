// components/login/VisualPanel.tsx
import Image from 'next/image';

export function VisualPanel() {
  return (
    <div className="col-span-3 hidden md:block relative h-screen">
      
      {/* 1. Imagem de Fundo (Ajuste o caminho 'src' para sua imagem) */}
      <Image
        src="/images/login-bg.jpg" // Certifique-se que esta imagem está na sua pasta 'public'
        alt="Pessoas em uma festa com fogos de artifício"
        fill
        className="object-cover"
      />
      
      {/* 2. Overlay Escuro */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
      
      {/* 3. O Texto Grande (usando div simples para evitar importações desnecessárias) */}
      <div className="absolute inset-0 flex items-center justify-end p-16">
        <h2 
          className="text-[120px] font-extrabold text-white dark:text-white light:text-gray-900 opacity-80"
          style={{ 
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            lineHeight: '0.8',
            letterSpacing: '0.1em',
            textShadow: '0 0 10px rgba(139, 92, 246, 0.7)'
          }}
        >
          CONECTE! CURTA! COLALÁ! 
        </h2>
      </div>
    </div>
  );
}