import { LoginForm } from "@/components/login/LoginForm";

export default function LoginPage() {
  return (
    <div 
      className="login-page relative grid lg:grid-cols-5 w-full min-h-screen"
      style={{ 
        background: '#4c1d95',
        backgroundImage: 'linear-gradient(135deg, #4c1d95 0%, #6b21a8 25%, #581c87 75%, #000000 100%)',
      }}
    >
      <div className="col-span-full lg:col-span-2 flex items-start sm:items-center justify-center p-4 sm:p-6 lg:p-8 xl:p-12 min-h-screen lg:min-h-auto pt-8 sm:pt-4 lg:pt-8 overflow-y-auto">
        <div className="w-full max-w-sm bg-neutral-900/70 backdrop-blur-md rounded-2xl sm:rounded-3xl lg:rounded-4xl shadow-lg my-4 sm:my-0">
          <LoginForm />
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
          CONECTE! CURTA! COLALÁ! 
        </h2>
      </div>
    </div>
  );
}