"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { User } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: { name: string; email: string; password: string; role: string }) => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (userData: { name?: string; avatar?: string }) => Promise<boolean>;
  isLoading: boolean;
  isHydrated: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Garantir que estamos no cliente antes de acessar localStorage
    if (typeof window === 'undefined') return;
    
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Erro ao carregar usuário do localStorage:', error);
      localStorage.removeItem('user');
    } finally {
      setIsLoading(false);
      setIsHydrated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Mock de usuários para demonstração
      const users = [
        { id: '1', name: 'Admin', email: 'admin@test.com', password: 'admin123456', role: 'admin' as const },
        { id: '2', name: 'Criador', email: 'criador@test.com', password: 'creator123456', role: 'creator' as const },
        { id: '3', name: 'Usuário', email: 'usuario@test.com', password: 'user123456', role: 'user' as const }
      ];

      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const userWithoutPassword = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role
        };
        
        setUser(userWithoutPassword);
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          // Também salvar em cookie para o middleware
          document.cookie = `user=${JSON.stringify(userWithoutPassword)}; path=/; max-age=86400`; // 24 horas
        }
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: { name: string; email: string; password: string; role: string }): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simular registro (em produção, fazer requisição à API)
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        role: userData.role as 'admin' | 'creator' | 'user'
      };
      
      setUser(newUser);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(newUser));
        // Também salvar em cookie para o middleware
        document.cookie = `user=${JSON.stringify(newUser)}; path=/; max-age=86400`; // 24 horas
      }
      
      return true;
    } catch (error) {
      console.error('Erro no registro:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      // Também remover o cookie
      document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      
      // Redirecionamento automático se estiver em página protegida
      const protectedRoutes = ['/user', '/creator', '/admin'];
      const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
      
      if (isProtectedRoute) {
        router.push('/');
      }
    }
  };

  const updateUserProfile = async (userData: { name?: string; avatar?: string }): Promise<boolean> => {
    try {
      if (!user) return false;
      
      setIsLoading(true);
      
      const updatedUser = {
        ...user,
        ...(userData.name && { name: userData.name }),
        ...(userData.avatar && { avatar: userData.avatar })
      };
      
      setUser(updatedUser);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        // Também atualizar o cookie
        document.cookie = `user=${JSON.stringify(updatedUser)}; path=/; max-age=86400`;
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    updateUserProfile,
    isLoading,
    isHydrated,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}