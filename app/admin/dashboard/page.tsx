"use client";

import { Shield, Calendar, Users, BarChart3, Settings, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/common/Header';
import { Footer } from '@/components/ui/common/Footer';
import { ProtectedRoute } from '@/components/ui/common/ProtectedRoute';
import Link from 'next/link';

export default function AdminDashboardPage() {
  // Dados mockados para o dashboard
  const stats = {
    totalUsers: 1247,
    newUsersThisWeek: 23,
    totalEvents: 89,
    pendingEvents: 5,
    totalRevenue: 45680.50,
    activeCreators: 156
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen colala-background bg-gradient-to-br from-violet-900 via-purple-900 to-black">
        <Header />
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Header do Dashboard */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-red-400 mr-3" />
                <h1 className="text-4xl font-bold text-white">Painel Administrativo</h1>
              </div>
              <p className="text-white/70 text-lg">Visão geral da plataforma e ferramentas de gestão</p>
            </div>

            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <span className="text-green-400 text-sm font-medium">+{stats.newUsersThisWeek} esta semana</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stats.totalUsers.toLocaleString()}</h3>
                <p className="text-white/60">Total de Usuários</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-purple-400" />
                  </div>
                  <span className="text-yellow-400 text-sm font-medium">{stats.pendingEvents} pendentes</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stats.totalEvents}</h3>
                <p className="text-white/60">Total de Eventos</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                  <span className="text-green-400 text-sm font-medium">+12% este mês</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">R$ {stats.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
                <p className="text-white/60">Receita Total</p>
              </div>
            </div>

            {/* Seções de Administração */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Gestão de Usuários */}
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Gestão de Usuários</h2>
                    <p className="text-white/60">Administre todos os usuários da plataforma</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Usuários Ativos</span>
                    <span className="text-green-400 font-semibold">{stats.totalUsers - 43}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Criadores Ativos</span>
                    <span className="text-purple-400 font-semibold">{stats.activeCreators}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Novos esta semana</span>
                    <span className="text-blue-400 font-semibold">{stats.newUsersThisWeek}</span>
                  </div>
                </div>

                <Link href="/admin/users">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Users className="w-4 h-4 mr-2" />
                    Gerenciar Usuários
                  </Button>
                </Link>
              </div>

              {/* Gestão de Eventos */}
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mr-4">
                    <Calendar className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Gestão de Eventos</h2>
                    <p className="text-white/60">Modere e aprove eventos da plataforma</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <AlertTriangle className="w-4 h-4 text-yellow-400 mr-2" />
                      <span className="text-white/80">Pendentes</span>
                    </div>
                    <span className="text-yellow-400 font-semibold">{stats.pendingEvents}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      <span className="text-white/80">Aprovados</span>
                    </div>
                    <span className="text-green-400 font-semibold">{stats.totalEvents - stats.pendingEvents}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Total de Eventos</span>
                    <span className="text-purple-400 font-semibold">{stats.totalEvents}</span>
                  </div>
                </div>

                <Link href="/admin/events">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Calendar className="w-4 h-4 mr-2" />
                    Gerenciar Eventos
                  </Button>
                </Link>
              </div>
            </div>

            {/* Ações Rápidas */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <Settings className="w-5 h-5 mr-3" />
                Ações Rápidas
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/admin/users?tab=new">
                  <Button variant="outline" className="w-full bg-transparent border-white/20 text-white hover:bg-white/10">
                    <Users className="w-4 h-4 mr-2" />
                    Novos Usuários
                  </Button>
                </Link>
                
                <Link href="/admin/events?tab=pending">
                  <Button variant="outline" className="w-full bg-transparent border-white/20 text-white hover:bg-white/10">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Eventos Pendentes
                  </Button>
                </Link>
                
                <Link href="/admin/users?tab=suspended">
                  <Button variant="outline" className="w-full bg-transparent border-white/20 text-white hover:bg-white/10">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Usuários Suspensos
                  </Button>
                </Link>
                
                <Button 
                  onClick={() => {
                    alert(`📊 RELATÓRIOS DO SISTEMA

📈 MÉTRICAS PRINCIPAIS:
• Usuários Ativos: ${stats.totalUsers - 43}
• Novos Usuários (7 dias): ${stats.newUsersThisWeek}
• Total de Eventos: ${stats.totalEvents}
• Eventos Pendentes: ${stats.pendingEvents}
• Receita Total: R$ ${stats.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}

📊 RELATÓRIOS DISPONÍVEIS:
• Relatório de Usuários (PDF)
• Relatório de Eventos (Excel)
• Relatório Financeiro (PDF)
• Relatório de Performance (Dashboard)

📧 Os relatórios serão enviados para seu email em até 5 minutos.

[Funcionalidade completa será implementada em breve]`);
                  }}
                  variant="outline" 
                  className="w-full bg-transparent border-white/20 text-white hover:bg-white/10"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Relatórios
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}