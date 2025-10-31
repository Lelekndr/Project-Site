import { User, Zap, Shield } from "lucide-react";
import { TEST_CREDENTIALS } from "@/types/auth";

interface TestCredentialsProps {
  onFillCredentials: (role: 'user' | 'creator' | 'admin') => void;
}

export function TestCredentials({ onFillCredentials }: TestCredentialsProps) {
  return (
    <div className="bg-zinc-900 rounded-lg p-4 mb-6 space-y-3">
      <h3 className="text-sm font-semibold text-purple-400 mb-2">
        Credenciais de Teste:
      </h3>
      
      <div className="space-y-2 text-xs">
        <button 
          onClick={() => onFillCredentials('user')}
          className="flex items-center w-full p-2 rounded bg-blue-600/20 hover:bg-blue-600/30 transition-colors"
        >
          <User className="h-4 w-4 mr-2 text-blue-400" />
          <div className="text-left">
            <div className="text-blue-400 font-medium">Usuário</div>
            <div className="text-zinc-400">
              {TEST_CREDENTIALS.user.email} | {TEST_CREDENTIALS.user.password}
            </div>
          </div>
        </button>
        
        <button 
          onClick={() => onFillCredentials('creator')}
          className="flex items-center w-full p-2 rounded bg-green-600/20 hover:bg-green-600/30 transition-colors"
        >
          <Zap className="h-4 w-4 mr-2 text-green-400" />
          <div className="text-left">
            <div className="text-green-400 font-medium">Criador</div>
            <div className="text-zinc-400">
              {TEST_CREDENTIALS.creator.email} | {TEST_CREDENTIALS.creator.password}
            </div>
          </div>
        </button>
        
        <button 
          onClick={() => onFillCredentials('admin')}
          className="flex items-center w-full p-2 rounded bg-red-600/20 hover:bg-red-600/30 transition-colors"
        >
          <Shield className="h-4 w-4 mr-2 text-red-400" />
          <div className="text-left">
            <div className="text-red-400 font-medium">Administrador</div>
            <div className="text-zinc-400">
              {TEST_CREDENTIALS.admin.email} | {TEST_CREDENTIALS.admin.password}
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
