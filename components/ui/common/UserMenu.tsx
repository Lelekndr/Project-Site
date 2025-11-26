import { User, LogOut, Settings, PlusCircle } from 'lucide-react';
import Image from 'next/image';
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
        <Button variant="ghost" className="text-white dark:text-white light:text-gray-900 hover:text-pink-400 hover:bg-transparent flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center overflow-hidden">
            {user.avatar ? (
              <Image 
                src={user.avatar} 
                alt={user.name} 
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-4 h-4 text-white dark:text-white light:text-gray-900" />
            )}
          </div>
          {user.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-zinc-900 border-zinc-700">
        <DropdownMenuItem className="text-white dark:text-white light:text-gray-900 hover:bg-zinc-800 dark:hover:bg-zinc-800 light:hover:bg-gray-100">
          <User className="mr-2 h-4 w-4" />
          <span>Perfil</span>
        </DropdownMenuItem>
        {user.role === 'creator' && (
          <DropdownMenuItem className="text-white dark:text-white light:text-gray-900 hover:bg-zinc-800 dark:hover:bg-zinc-800 light:hover:bg-gray-100">
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>Criar Evento</span>
          </DropdownMenuItem>
        )}
        {user.role === 'admin' && (
          <DropdownMenuItem className="text-white dark:text-white light:text-gray-900 hover:bg-zinc-800 dark:hover:bg-zinc-800 light:hover:bg-gray-100">
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
