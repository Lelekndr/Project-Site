import { User, LogOut, Settings, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { User as UserType } from '@/types/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface UserMenuProps {
  user: UserType;
  onLogout: () => void;
}

export function UserMenu({ user, onLogout }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-white hover:text-pink-400 hover:bg-transparent">
          <User className="w-4 h-4 mr-2" />
          {user.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-zinc-900 border-zinc-700">
        <DropdownMenuItem className="text-white hover:bg-zinc-800">
          <User className="mr-2 h-4 w-4" />
          <span>Perfil</span>
        </DropdownMenuItem>
        {user.role === 'creator' && (
          <DropdownMenuItem className="text-white hover:bg-zinc-800">
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>Criar Evento</span>
          </DropdownMenuItem>
        )}
        {user.role === 'admin' && (
          <DropdownMenuItem className="text-white hover:bg-zinc-800">
            <Settings className="mr-2 h-4 w-4" />
            <span>Administração</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator className="bg-zinc-700" />
        <DropdownMenuItem 
          className="text-red-400 hover:bg-zinc-800"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
