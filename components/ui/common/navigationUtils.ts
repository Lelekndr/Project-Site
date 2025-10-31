import { User as UserIcon, PlusCircle, Users, BarChart3 } from 'lucide-react';
import { User } from '@/types/auth';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }> | null;
}

export function getNavItems(user: User | null, isAuthenticated: boolean): NavItem[] {
  if (!isAuthenticated || !user) return [];

  switch (user.role) {
    case 'user':
      return [
        { name: 'Home', href: '/', icon: null },
        { name: 'Meus Eventos', href: '/user/events', icon: null },
        { name: 'Perfil', href: '/user/profile', icon: UserIcon }
      ];
    case 'creator':
      return [
        { name: 'Home', href: '/', icon: null },
        { name: 'Meus Eventos', href: '/creator/events', icon: null },
        { name: 'Criar Evento', href: '/creator/create', icon: PlusCircle },
        { name: 'Perfil', href: '/creator/profile', icon: UserIcon }
      ];
    case 'admin':
      return [
        { name: 'Home', href: '/', icon: null },
        { name: 'Gerenciar Eventos', href: '/admin/events', icon: BarChart3 },
        { name: 'Usuários', href: '/admin/users', icon: Users },
        { name: 'Dashboard', href: '/admin/dashboard', icon: BarChart3 }
      ];
    default:
      return [];
  }
}
