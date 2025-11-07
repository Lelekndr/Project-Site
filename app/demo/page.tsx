"use client";

import { useAuth } from '@/contexts/AuthContext';
import { User, Shield, Zap, Calendar, Users, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/common/Header';
import { Footer } from '@/components/ui/common/Footer';

export default function DemoPage() {
  const { user, isAuthenticated } = useAuth();

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'user': return 'from-blue-600 to-cyan-600';
      case 'creator': return 'from-green-600 to-emerald-600';
      case 'admin': return 'from-red-600 to-pink-600';
      default: return 'from-gray-600 to-gray-700';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'user': return User;
      case 'creator': return Zap;
      case 'admin': return Shield;
      default: return User;
    }
  };

  const getRolePermissions = (role: string) => {
    switch (role) {
      case 'user':
        return [
          'Visualizar eventos disponíveis',
          'Se inscrever em eventos',
          'Gerenciar inscrições pessoais',
          'Acessar perfil pessoal',
          'Cancelar inscrições'
        ];
      case 'creator':
        return [
          'Criar novos eventos',
          'Gerenciar eventos criados',
          'Visualizar estatísticas dos eventos',
          'Editar informações dos eventos',
          'Acessar perfil de criador'
        ];
      case 'admin':
        return [
          'Gerenciar todos os eventos',
          'Aprovar/rejeitar eventos',
          'Visualizar estatísticas globais',
          'Gerenciar usuários e criadores',
          'Acesso total ao sistema'
        ];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-black">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header da página */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Sistema de Autenticação Multi-Role</h1>
            <p className="text-white/70 text-lg">
              Demonstração do sistema com 3 tipos de usuários: Usuário, Criador e Administrador
            </p>
          </div>

          {isAuthenticated && user ? (
            <>
              {/* Status do usuário logado */}
              <div className={`bg-gradient-to-r ${getRoleColor(user.role)} rounded-lg p-8 mb-8 text-white`}>
                <div className="flex items-center space-x-4">
                  {(() => {
                    const IconComponent = getRoleIcon(user.role);
                    return <IconComponent className="w-12 h-12" />;
                  })()}
                  <div>
                    <h2 className="text-2xl font-bold">Logado como {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</h2>
                    <p className="text-white/90">{user.name} - {user.email}</p>
                  </div>
                </div>
              </div>

              {/* Permissões do usuário */}
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 mb-8">
                <h3 className="text-2xl font-bold text-white mb-6">Suas Permissões</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getRolePermissions(user.role).map((permission, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-white/80">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Links rápidos baseados no role */}
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Acesso Rápido</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {user.role === 'user' && (
                    <>
                      <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white h-16">
                        <a href="/user/profile" className="flex items-center justify-center space-x-2">
                          <User className="w-5 h-5" />
                          <span>Meu Perfil</span>
                        </a>
                      </Button>
                      <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white h-16">
                        <a href="/user/events" className="flex items-center justify-center space-x-2">
                          <Calendar className="w-5 h-5" />
                          <span>Meus Eventos</span>
                        </a>
                      </Button>
                    </>
                  )}

                  {user.role === 'creator' && (
                    <>
                      <Button asChild className="bg-green-600 hover:bg-green-700 text-white h-16">
                        <a href="/creator/create" className="flex items-center justify-center space-x-2">
                          <Zap className="w-5 h-5" />
                          <span>Criar Evento</span>
                        </a>
                      </Button>
                      <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white h-16">
                        <a href="/creator/profile" className="flex items-center justify-center space-x-2">
                          <User className="w-5 h-5" />
                          <span>Meu Perfil</span>
                        </a>
                      </Button>
                      <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white h-16">
                        <a href="/creator/events" className="flex items-center justify-center space-x-2">
                          <Calendar className="w-5 h-5" />
                          <span>Meus Eventos</span>
                        </a>
                      </Button>
                    </>
                  )}

                  {user.role === 'admin' && (
                    <>
                      <Button asChild className="bg-red-600 hover:bg-red-700 text-white h-16">
                        <a href="/admin/events" className="flex items-center justify-center space-x-2">
                          <Calendar className="w-5 h-5" />
                          <span>Gerenciar Eventos</span>
                        </a>
                      </Button>
                      <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white h-16">
                        <a href="/admin/users" className="flex items-center justify-center space-x-2">
                          <Users className="w-5 h-5" />
                          <span>Gerenciar Usuários</span>
                        </a>
                      </Button>
                      <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white h-16">
                        <a href="/admin/dashboard" className="flex items-center justify-center space-x-2">
                          <Settings className="w-5 h-5" />
                          <span>Dashboard</span>
                        </a>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* Instruções para login */
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-6">Faça Login para Testar o Sistema</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-600/20 rounded-lg p-6">
                  <User className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Usuário</h3>
                  <p className="text-white/70 text-sm mb-4">Pode se inscrever em eventos e gerenciar seu perfil</p>
                  <div className="text-xs text-white/60">
                    <p>Email: usuario@test.com</p>
                    <p>Senha: user123456</p>
                  </div>
                </div>

                <div className="bg-green-600/20 rounded-lg p-6">
                  <Zap className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Criador</h3>
                  <p className="text-white/70 text-sm mb-4">Pode criar e gerenciar eventos</p>
                  <div className="text-xs text-white/60">
                    <p>Email: criador@test.com</p>
                    <p>Senha: creator123456</p>
                  </div>
                </div>

                <div className="bg-red-600/20 rounded-lg p-6">
                  <Shield className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Administrador</h3>
                  <p className="text-white/70 text-sm mb-4">Pode gerenciar tudo na plataforma</p>
                  <div className="text-xs text-white/60">
                    <p>Email: admin@test.com</p>
                    <p>Senha: admin123456</p>
                  </div>
                </div>
              </div>

              <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3">
                <a href="/login">Ir para Login</a>
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}