"use client";

import { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Eye, TrendingUp, DollarSign, Star, Edit, X, Plus, BarChart3, Activity, Search } from 'lucide-react';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [editingEvent, setEditingEvent] = useState<CreatorEvent | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    subtitle: '',
    date: '',
    time: '',
    location: '',
    category: '',
    description: '',
    price: ''
  });
  const [creatorEvents, setCreatorEvents] = useState<CreatorEvent[]>([
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

  // Funções para os botões de ação
  const handleViewAnalytics = (event: CreatorEvent) => {
    const conversionRate = ((event.metrics.registrations / event.metrics.totalViews) * 100);
    const conversionRateText = conversionRate.toFixed(2);
    alert(`📊 ANÁLISES DETALHADAS - "${event.title}"

🔍 MÉTRICAS PRINCIPAIS:
• Total de Visualizações: ${event.metrics.totalViews.toLocaleString()}
• Total de Inscrições: ${event.metrics.registrations}/${event.metrics.capacity}
• Taxa de Conversão: ${conversionRateText}%
• Receita Gerada: R$ ${event.metrics.revenue.toLocaleString()}
• Avaliação Média: ${event.metrics.rating > 0 ? event.metrics.rating.toFixed(1) : 'N/A'} ⭐
• Total de Avaliações: ${event.metrics.reviews}

📈 INSIGHTS:
• Status: ${getStatusText(event.status)}
• Ocupação: ${Math.round((event.metrics.registrations / event.metrics.capacity) * 100)}%
• Performance: ${conversionRate > 5 ? 'Excelente' : conversionRate > 2 ? 'Boa' : 'Precisa melhorar'}

💡 RECOMENDAÇÕES:
${event.metrics.registrations < event.metrics.capacity * 0.5 ? 
  '• Considere estratégias de marketing para aumentar inscrições' : 
  '• Evento com boa aceitação do público'}
${event.metrics.rating < 4 && event.metrics.rating > 0 ? 
  '• Analise feedbacks para melhorar próximos eventos' : 
  '• Continue com a qualidade atual'}
`);
  };

  const handleEditEvent = (event: CreatorEvent) => {
    setEditingEvent(event);
    setEditForm({
      title: event.title,
      subtitle: event.subtitle || '',
      date: event.date,
      time: event.time,
      location: event.location,
      category: event.category,
      description: event.description,
      price: event.price
    });
  };

  const handleSaveEdit = () => {
    if (!editingEvent) return;
    
    setCreatorEvents(creatorEvents.map(event => 
      event.id === editingEvent.id 
        ? { ...event, ...editForm }
        : event
    ));
    
    setEditingEvent(null);
    alert('Evento atualizado com sucesso!');
  };

  const handleCancelEvent = (event: CreatorEvent) => {
    const confirmed = confirm(`⚠️ CONFIRMAR CANCELAMENTO

Tem certeza que deseja cancelar o evento "${event.title}"?

⚠️ IMPACTOS:
• ${event.metrics.registrations} participantes serão notificados
• R$ ${event.metrics.revenue.toLocaleString()} em receita será reembolsada
• Evento será marcado como "Cancelado"
• Esta ação NÃO PODE ser desfeita

Clique em OK para confirmar o cancelamento.`);

    if (confirmed) {
      // Marca o evento como cancelado ao invés de remover
      setCreatorEvents(prevEvents => 
        prevEvents.map(e => 
          e.id === event.id 
            ? { ...e, status: 'cancelled' as 'upcoming' | 'ongoing' | 'completed' | 'cancelled' }
            : e
        )
      );

      // Mostra confirmação de cancelamento
      alert(`✅ EVENTO CANCELADO COM SUCESSO!

"${event.title}" foi cancelado.

🔄 AÇÕES EXECUTADAS:
• Evento marcado como cancelado
• ${event.metrics.registrations} participantes notificados
• Reembolsos automáticos processados
• Métricas preservadas para histórico
• Evento permanece no seu painel

📊 RESUMO:
• Receita reembolsada: R$ ${event.metrics.revenue.toLocaleString()}
• Visualizações totais: ${event.metrics.totalViews.toLocaleString()}
• Status: Cancelado`);
    }
  };

  const filteredEvents = creatorEvents.filter(event => {
    // Filtro por aba
    const matchesTab = selectedTab === 'all' || event.status === selectedTab;
    
    // Filtro por busca
    const matchesSearch = !searchTerm.trim() || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
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
      <div className="min-h-screen colala-background theme-bg-primary">
        <Header />
        
        <div className="container mx-auto px-4 py-12">
          {/* Header da página */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold theme-text-primary mb-4">
              Meus Eventos Criados
            </h1>
            <p className="theme-text-secondary text-lg max-w-2xl mx-auto">
              Gerencie todos os seus eventos e acompanhe suas métricas de performance
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
              <h3 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-1">
                {totalMetrics.totalViews.toLocaleString()}
              </h3>
              <p className="text-white/70 dark:text-white/70 light:text-gray-700 text-sm">Visualizações Totais</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-400" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-1">
                {totalMetrics.registrations}
              </h3>
              <p className="text-white/70 dark:text-white/70 light:text-gray-700 text-sm">Total de Inscrições</p>
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
              <h3 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-1">
                {totalMetrics.avgRating.toFixed(1)}
              </h3>
              <p className="text-white/70 dark:text-white/70 light:text-gray-700 text-sm">Avaliação Média</p>
            </div>
          </div>

          {/* Filtros e Ações */}
          <div className="flex flex-col gap-4 mb-8">
            {/* Linha superior: Filtros de aba e botão Novo Evento */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
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

            {/* Linha inferior: Campo de busca */}
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-white/50" />
              </div>
              <input
                type="text"
                placeholder="Buscar eventos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
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
                            <h3 className="text-xl font-semibold text-white dark:text-white light:text-gray-900">{event.title}</h3>
                            <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(event.status)}`}>
                              {getStatusText(event.status)}
                            </span>
                            <span className="px-3 py-1 bg-purple-600/30 text-purple-300 text-xs rounded-full">
                              {event.category}
                            </span>
                          </div>
                          
                          {event.subtitle && (
                            <p className="text-white/60 dark:text-white/60 light:text-gray-700 text-sm mb-3">{event.subtitle}</p>
                          )}
                          
                          <div className="flex flex-wrap items-center gap-4 text-white/70 dark:text-white/70 light:text-gray-700 text-sm">
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
                            onClick={() => handleViewAnalytics(event)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
                            size="sm"
                            title="Ver análises detalhadas"
                          >
                            <BarChart3 className="w-4 h-4" />
                          </Button>
                          <Button 
                            onClick={() => handleEditEvent(event)}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg"
                            size="sm"
                            title="Editar evento"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            onClick={() => handleCancelEvent(event)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"
                            size="sm"
                            title="Cancelar evento"
                          >
                            <X className="w-4 h-4" />
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

        {/* Modal de Edição de Evento */}
        {editingEvent && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900/95 backdrop-blur-md rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Editar Evento</h2>
                <button
                  onClick={() => setEditingEvent(null)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Título */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Título do Evento
                  </label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Nome do seu evento"
                  />
                </div>

                {/* Subtítulo */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Subtítulo
                  </label>
                  <input
                    type="text"
                    value={editForm.subtitle}
                    onChange={(e) => setEditForm({ ...editForm, subtitle: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Descrição breve do evento"
                  />
                </div>

                {/* Data e Hora */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Data
                    </label>
                    <input
                      type="text"
                      value={editForm.date}
                      onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Ex: 15 de Novembro, 2025"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Horário
                    </label>
                    <input
                      type="text"
                      value={editForm.time}
                      onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Ex: 19:00 - 22:00"
                    />
                  </div>
                </div>

                {/* Local */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Local
                  </label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Endereço do evento"
                  />
                </div>

                {/* Categoria e Preço */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Categoria
                    </label>
                    <select
                      value={editForm.category}
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="technology">Tecnologia</option>
                      <option value="music">Música</option>
                      <option value="education">Educação</option>
                      <option value="business">Negócios</option>
                      <option value="sports">Esportes</option>
                      <option value="art">Arte</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Preço
                    </label>
                    <input
                      type="text"
                      value={editForm.price}
                      onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Ex: R$ 50,00"
                    />
                  </div>
                </div>

                {/* Descrição */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    placeholder="Descreva seu evento em detalhes"
                  />
                </div>

                {/* Botões */}
                <div className="flex space-x-4 pt-4 border-t border-white/10">
                  <Button
                    onClick={() => setEditingEvent(null)}
                    variant="outline"
                    className="flex-1 bg-transparent border-white/20 text-white hover:bg-white/10"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleSaveEdit}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                  >
                    Salvar Alterações
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
}