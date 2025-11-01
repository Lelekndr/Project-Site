"use client";

import { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Eye, TrendingUp, DollarSign, Star, Edit, Trash2, Plus, BarChart3, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/common/Header';
import { Footer } from '@/components/ui/common/Footer';
import { ProtectedRoute } from '@/components/ui/common/ProtectedRoute';

interface CreatorEvent {
  id: number;
  title: string;
  subtitle?: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  price: string;
  image: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  metrics: {
    totalViews: number;
    registrations: number;
    capacity: number;
    revenue: number;
    rating: number;
    reviews: number;
  };
}

export default function CreatorEventsPage() {
  const [selectedTab, setSelectedTab] = useState<'all' | 'upcoming' | 'completed'>('all');
  
  const [creatorEvents] = useState<CreatorEvent[]>([
    {
      id: 1,
      title: "Workshop de Desenvolvimento Web Moderno",
      subtitle: "React, Next.js e TypeScript do Zero ao Avançado",
      date: "15 de Novembro, 2025",
      time: "14:00",
      location: "TechHub São Paulo",
      category: "Tecnologia",
      description: "Workshop completo sobre as tecnologias mais modernas do desenvolvimento web.",
      price: "R$ 150,00",
      image: "/images/tech-workshop.jpg",
      status: "upcoming",
      metrics: {
        totalViews: 1250,
        registrations: 45,
        capacity: 50,
        revenue: 6750,
        rating: 4.9,
        reviews: 23
      }
    },
    {
      id: 2,
      title: "Festival de Jazz Contemporâneo",
      subtitle: "Uma noite especial com grandes artistas nacionais",
      date: "8 de Novembro, 2025",
      time: "20:00",
      location: "Centro Cultural São Paulo",
      category: "Música",
      description: "Festival reunindo os melhores nomes do jazz contemporâneo brasileiro.",
      price: "R$ 80,00",
      image: "/images/jazz-festival.jpg",
      status: "upcoming",
      metrics: {
        totalViews: 2840,
        registrations: 180,
        capacity: 200,
        revenue: 14400,
        rating: 4.8,
        reviews: 67
      }
    },
    {
      id: 3,
      title: "Stand Up Comedy Night Premium",
      subtitle: "Os melhores comediantes do cenário nacional",
      date: "2 de Novembro, 2025",
      time: "21:00",
      location: "Teatro Municipal",
      category: "Comédia",
      description: "Noite especial de stand-up comedy com apresentações exclusivas.",
      price: "R$ 60,00",
      image: "/images/comedy-night.jpg",
      status: "completed",
      metrics: {
        totalViews: 3200,
        registrations: 150,
        capacity: 150,
        revenue: 9000,
        rating: 4.7,
        reviews: 89
      }
    },
    {
      id: 4,
      title: "Bootcamp de UX/UI Design",
      subtitle: "Design de experiências digitais memoráveis",
      date: "25 de Outubro, 2025",
      time: "09:00",
      location: "Design Hub",
      category: "Design",
      description: "Bootcamp intensivo sobre design de experiência do usuário e interface.",
      price: "R$ 200,00",
      image: "/images/ux-bootcamp.jpg",
      status: "completed",
      metrics: {
        totalViews: 1800,
        registrations: 35,
        capacity: 40,
        revenue: 7000,
        rating: 4.9,
        reviews: 31
      }
    },
    {
      id: 5,
      title: "Conferência de Empreendedorismo Digital",
      subtitle: "O futuro dos negócios digitais",
      date: "20 de Dezembro, 2025",
      time: "08:00",
      location: "Centro de Convenções",
      category: "Negócios",
      description: "Conferência sobre as tendências do empreendedorismo digital.",
      price: "R$ 120,00",
      image: "/images/entrepreneur-conf.jpg",
      status: "upcoming",
      metrics: {
        totalViews: 980,
        registrations: 25,
        capacity: 100,
        revenue: 3000,
        rating: 0,
        reviews: 0
      }
    }
  ]);

  const filteredEvents = creatorEvents.filter(event => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'upcoming') return event.status === 'upcoming';
    if (selectedTab === 'completed') return event.status === 'completed';
    return true;
  });

  const totalMetrics = creatorEvents.reduce((acc, event) => ({
    totalViews: acc.totalViews + event.metrics.totalViews,
    registrations: acc.registrations + event.metrics.registrations,
    revenue: acc.revenue + event.metrics.revenue,
    avgRating: event.metrics.rating > 0 ? 
      (acc.avgRating + event.metrics.rating) / (acc.events + 1) : 
      acc.avgRating / (acc.events || 1),
    events: acc.events + 1
  }), { totalViews: 0, registrations: 0, revenue: 0, avgRating: 0, events: 0 });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-600/20 text-blue-400';
      case 'ongoing': return 'bg-green-600/20 text-green-400';
      case 'completed': return 'bg-gray-600/20 text-gray-400';
      case 'cancelled': return 'bg-red-600/20 text-red-400';
      default: return 'bg-gray-600/20 text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'Próximo';
      case 'ongoing': return 'Em Andamento';
      case 'completed': return 'Concluído';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  return (
    <ProtectedRoute requiredRole="creator">
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Header />
        
        <div className="container mx-auto px-4 py-12">
          {/* Header da página */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Meus Eventos
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Gerencie seus eventos e acompanhe as métricas de performance
            </p>
          </div>

          {/* Métricas Globais */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-blue-400" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {totalMetrics.totalViews.toLocaleString()}
              </h3>
              <p className="text-white/70 text-sm">Visualizações Totais</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-400" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {totalMetrics.registrations}
              </h3>
              <p className="text-white/70 text-sm">Total de Inscrições</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-yellow-400" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                R$ {(totalMetrics.revenue / 1000).toFixed(1)}K
              </h3>
              <p className="text-white/70 text-sm">Receita Total</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-purple-400" />
                </div>
                <Activity className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {totalMetrics.avgRating.toFixed(1)}
              </h3>
              <p className="text-white/70 text-sm">Avaliação Média</p>
            </div>
          </div>

          {/* Filtros e Ações */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex gap-2">
              <Button
                onClick={() => setSelectedTab('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedTab === 'all' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                Todos ({creatorEvents.length})
              </Button>
              <Button
                onClick={() => setSelectedTab('upcoming')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedTab === 'upcoming' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                Próximos ({creatorEvents.filter(e => e.status === 'upcoming').length})
              </Button>
              <Button
                onClick={() => setSelectedTab('completed')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedTab === 'completed' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                Concluídos ({creatorEvents.filter(e => e.status === 'completed').length})
              </Button>
            </div>
            
            <Button 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-lg"
              onClick={() => window.location.href = '/creator/create'}
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Evento
            </Button>
          </div>

          {/* Lista de Eventos */}
          <div className="space-y-6">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-xl font-semibold text-white mb-2">Nenhum evento encontrado</h3>
                <p className="text-white/70 mb-6">
                  {selectedTab === 'all' 
                    ? 'Você ainda não criou nenhum evento.' 
                    : `Nenhum evento ${selectedTab === 'upcoming' ? 'próximo' : 'concluído'} encontrado.`}
                </p>
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-medium"
                  onClick={() => window.location.href = '/creator/create'}
                >
                  Criar Primeiro Evento
                </Button>
              </div>
            ) : (
              filteredEvents.map((event) => (
                <div 
                  key={event.id}
                  className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Imagem do Evento */}
                    <div className="w-full lg:w-48 h-32 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg flex items-center justify-center overflow-hidden">
                      <Calendar className="w-8 h-8 text-white/50" />
                    </div>
                    
                    {/* Informações do Evento */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                            <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(event.status)}`}>
                              {getStatusText(event.status)}
                            </span>
                            <span className="px-3 py-1 bg-purple-600/30 text-purple-300 text-xs rounded-full">
                              {event.category}
                            </span>
                          </div>
                          
                          {event.subtitle && (
                            <p className="text-white/60 text-sm mb-3">{event.subtitle}</p>
                          )}
                          
                          <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              <span>{event.price}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
                            size="sm"
                          >
                            <BarChart3 className="w-4 h-4" />
                          </Button>
                          <Button 
                            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg"
                            size="sm"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"
                            size="sm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Métricas do Evento */}
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 bg-white/5 rounded-lg">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-blue-400 mb-1">
                            <Eye className="w-4 h-4" />
                          </div>
                          <p className="text-white font-semibold">{event.metrics.totalViews}</p>
                          <p className="text-white/60 text-xs">Visualizações</p>
                        </div>
                        
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-green-400 mb-1">
                            <Users className="w-4 h-4" />
                          </div>
                          <p className="text-white font-semibold">
                            {event.metrics.registrations}/{event.metrics.capacity}
                          </p>
                          <p className="text-white/60 text-xs">Inscrições</p>
                        </div>
                        
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-yellow-400 mb-1">
                            <DollarSign className="w-4 h-4" />
                          </div>
                          <p className="text-white font-semibold">R$ {event.metrics.revenue}</p>
                          <p className="text-white/60 text-xs">Receita</p>
                        </div>
                        
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-purple-400 mb-1">
                            <Star className="w-4 h-4" />
                          </div>
                          <p className="text-white font-semibold">
                            {event.metrics.rating > 0 ? event.metrics.rating.toFixed(1) : '-'}
                          </p>
                          <p className="text-white/60 text-xs">Avaliação</p>
                        </div>
                        
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-orange-400 mb-1">
                            <BarChart3 className="w-4 h-4" />
                          </div>
                          <p className="text-white font-semibold">
                            {Math.round((event.metrics.registrations / event.metrics.capacity) * 100)}%
                          </p>
                          <p className="text-white/60 text-xs">Taxa</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Call to action */}
          <div className="text-center mt-12">
            <p className="text-white/70 mb-6">
              Pronto para criar seu próximo evento de sucesso?
            </p>
            <Button 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-medium"
              onClick={() => window.location.href = '/creator/create'}
            >
              <Plus className="w-4 h-4 mr-2" />
              Criar Novo Evento
            </Button>
          </div>
        </div>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
}