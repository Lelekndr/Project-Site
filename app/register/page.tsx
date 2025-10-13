import { RegisterForm } from "../../components/register/RegisterForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div 
      className="relative grid lg:grid-cols-5 w-full h-screen"
      style={{ 
        background: '#9333ea',
        backgroundImage: 'linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #2563eb 100%)',
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0
      }}
    >
      <Link 
        href="/" 
        className="absolute top-10 left-15 p-7 z-10 flex items-center space-x-2 text-white/70 hover:text-white transition-colors duration-200 group "
      >
        <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
        <span className="text-sm font-medium">Voltar</span>
      </Link>
      
      <div className="col-span-2 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-sm bg-neutral-900/70 backdrop-blur-md rounded-4xl shadow-lg">
          <RegisterForm />
        </div>
      </div>

      <div className="col-span-3 hidden md:flex items-center justify-end p-16">
        <h2 
          className="text-[120px] font-extrabold text-white opacity-80"
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