"use client";

import { Calendar, Users, DollarSign, TrendingUp, Eye, Star, Plus, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/common/Header';
import { Footer } from '@/components/ui/common/Footer';
import { ProtectedRoute } from '@/components/ui/common/ProtectedRoute';

export default function CreatorDashboardPage() {
  return (
    <ProtectedRoute requiredRole="creator">
      <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-black">
        <Header />
        
        <div className="container mx-auto px-4 py-12">
          {/* Header do Dashboard */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Dashboard do Criador
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Visão geral da sua performance e próximas ações
            </p>
          </div>

          {/* Métricas Principais */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-400" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">12</h3>
              <p className="text-white/70 text-sm">Eventos Criados</p>
              <p className="text-green-400 text-xs mt-1">+2 este mês</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-400" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">2.4K</h3>
              <p className="text-white/70 text-sm">Total de Participantes</p>
              <p className="text-green-400 text-xs mt-1">+380 este mês</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-yellow-400" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">R$ 45K</h3>
              <p className="text-white/70 text-sm">Receita Total</p>
              <p className="text-green-400 text-xs mt-1">+R$ 8.4K este mês</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-purple-400" />
                </div>
                <Eye className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">4.8</h3>
              <p className="text-white/70 text-sm">Avaliação Média</p>
              <p className="text-purple-400 text-xs mt-1">15.2K visualizações</p>
            </div>
          </div>

          {/* Grid de Conteúdo */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ações Rápidas */}
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-6">Ações Rápidas</h3>
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white justify-start"
                    onClick={() => window.location.href = '/creator/create'}
                  >
                    <Plus className="w-4 h-4 mr-3" />
                    Criar Novo Evento
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-white/20 text-white hover:bg-white/10 justify-start"
                    onClick={() => window.location.href = '/creator/events'}
                  >
                    <BarChart3 className="w-4 h-4 mr-3" />
                    Ver Métricas Detalhadas
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-white/20 text-white hover:bg-white/10 justify-start"
                    onClick={() => window.location.href = '/creator/profile'}
                  >
                    <Users className="w-4 h-4 mr-3" />
                    Editar Perfil
                  </Button>
                </div>
              </div>
            </div>

            {/* Performance Este Mês */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-6">Performance Este Mês</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Novos Seguidores</span>
                      <span className="text-green-400 font-semibold">+127</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{ width: '73%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Taxa de Conversão</span>
                      <span className="text-blue-400 font-semibold">68%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Engajamento</span>
                      <span className="text-purple-400 font-semibold">84%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-purple-400 h-2 rounded-full" style={{ width: '84%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Satisfação</span>
                      <span className="text-yellow-400 font-semibold">92%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Próximos Eventos */}
          <div className="mt-8">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Próximos Eventos</h3>
                <Button 
                  className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2"
                  onClick={() => window.location.href = '/creator/events'}
                >
                  Ver Todos
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Workshop de Desenvolvimento Web</h4>
                      <p className="text-white/60 text-sm">15 de Novembro, 2025 - 14:00</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-green-400 text-xs">45/50 inscritos</span>
                        <span className="text-blue-400 text-xs">1.2K visualizações</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">R$ 6.750</p>
                    <p className="text-white/60 text-sm">Receita atual</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Festival de Jazz Contemporâneo</h4>
                      <p className="text-white/60 text-sm">8 de Novembro, 2025 - 20:00</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-green-400 text-xs">180/200 inscritos</span>
                        <span className="text-blue-400 text-xs">2.8K visualizações</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">R$ 14.400</p>
                    <p className="text-white/60 text-sm">Receita atual</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
}