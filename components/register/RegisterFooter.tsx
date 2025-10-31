import Link from "next/link";

export function RegisterFooter() {
  return (
    <div className="text-center space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/20"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-neutral-900/70 text-gray-400">ou</span>
        </div>
      </div>

      <p className="text-sm text-gray-300">
        Já tem uma conta?{" "}
        <Link 
          href="/login" 
          className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
        >
          Entre aqui
        </Link>
      </p>
    </div>
  );
}
