import { RegisterForm } from "../../components/register/RegisterForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div 
      className="relative grid lg:grid-cols-5 w-full min-h-screen"
      style={{ 
        background: '#9333ea',
        backgroundImage: 'linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #2563eb 100%)',
        width: '100vw',
        minHeight: '100vh',
        position: 'fixed',
        top: 0,
        left: 0
      }}
    >
      <Link 
        href="/" 
        className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-10 lg:left-15 p-2 sm:p-4 lg:p-7 z-10 flex items-center space-x-2 text-white/70 hover:text-white transition-colors duration-200 group"
      >
        <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 group-hover:-translate-x-1 transition-transform duration-200" />
        <span className="text-xs sm:text-sm font-medium">Voltar</span>
      </Link>
      
      <div className="col-span-full lg:col-span-2 flex items-center justify-center p-4 sm:p-6 lg:p-8 xl:p-12 min-h-screen lg:min-h-auto overflow-y-auto">
        <div className="w-full max-w-sm bg-neutral-900/70 backdrop-blur-md rounded-2xl sm:rounded-3xl lg:rounded-4xl shadow-lg">
          <RegisterForm />
        </div>
      </div>

      <div className="col-span-3 hidden lg:flex items-center justify-end p-8 xl:p-16">
        <h2 
          className="text-[80px] xl:text-[120px] font-extrabold text-white opacity-80"
          style={{ 
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            lineHeight: '0.8',
            letterSpacing: '0.1em',
            textShadow: '0 0 10px rgba(139, 92, 246, 0.7)'
          }}
        >
          CADASTRE-SE! CONECTE! CURTA!
        </h2>
      </div>
    </div>
  );
}