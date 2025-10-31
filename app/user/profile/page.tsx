"use client";

import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/common/Header';
import { Footer } from '@/components/ui/common/Footer';

export default function UserProfilePage() {
  const { user } = useAuth();

  if (!user || user.role !== 'user') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Acesso Negado</h1>
          <p className="text-white/70">Você não tem permissão para acessar esta página.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header do perfil */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 mb-8">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
                <div className="flex items-center text-white/70 mb-2">
                  <Mail className="w-4 h-4 mr-2" />
                  {user.email}
                </div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 text-sm">
                  <User className="w-3 h-3 mr-1" />
                  Usuário
                </div>
              </div>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center">
              <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-1">5</h3>
              <p className="text-white/70">Eventos Inscritos</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center">
              <Calendar className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-1">3</h3>
              <p className="text-white/70">Eventos Participados</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center">
              <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-1">2</h3>
              <p className="text-white/70">Eventos Futuros</p>
            </div>
          </div>

          {/* Próximos eventos */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Próximos Eventos</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div>
                  <h3 className="text-white font-semibold">Stand Up Comedy Night</h3>
                  <p className="text-white/70 text-sm">25 de Outubro, 2025 - 20:00</p>
                </div>
                <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white">
                  Ver Detalhes
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div>
                  <h3 className="text-white font-semibold">Festival de Música</h3>
                  <p className="text-white/70 text-sm">30 de Outubro, 2025 - 18:00</p>
                </div>
                <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white">
                  Ver Detalhes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}