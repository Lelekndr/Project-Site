export type UserRole = 'user' | 'creator' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  cnpj?: string; // Para usuários do tipo creator pessoa jurídica
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Credenciais de teste para cada tipo de usuário
export const TEST_CREDENTIALS = {
  user: {
    email: 'usuario@test.com',
    password: 'user123456',
    userData: {
      id: '1',
      name: 'João Silva',
      email: 'usuario@test.com',
      role: 'user' as UserRole,
      avatar: '/images/user-avatar.jpg'
    }
  },
  creator: {
    email: 'criador@test.com',
    password: 'creator123456',
    userData: {
      id: '2',
      name: 'Eventos Premium Ltda',
      email: 'criador@test.com',
      role: 'creator' as UserRole,
      avatar: '/images/creator-avatar.jpg',
      cnpj: '12.345.678/0001-90'
    }
  },
  admin: {
    email: 'admin@test.com',
    password: 'admin123456',
    userData: {
      id: '3',
      name: 'Carlos Admin',
      email: 'admin@test.com',
      role: 'admin' as UserRole,
      avatar: '/images/admin-avatar.jpg'
    }
  }
};