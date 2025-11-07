"use client";

import { useState } from 'react';
import { Shield, Calendar, BarChart3, CheckCircle, XCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/common/Header';
import { Footer } from '@/components/ui/common/Footer';
import { DateFormatter } from '@/components/ui/DateFormatter';
import { ProtectedRoute } from '@/components/ui/common/ProtectedRoute';

interface AdminEvent {
  id: number;
  title: string;
  creator: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  category: string;
  participants: number;
  revenue: number;
}

export default function AdminEventsPage() {
  const [activeTab, setActiveTab] = useState('pending');

  const mockEvents: AdminEvent[] = [
    {
      id: 1,
      title: "Festival de Música Eletrônica",
      creator: "DJ Productions",
      date: "2025-11-15",
      status: "pending",
      category: "Música",
      participants: 245,
      revenue: 12250
    },
    {
      id: 2,
      title: "Stand Up Comedy Night",
      creator: "ComedyClub SP",
      date: "2025-10-28",
      status: "approved",
      category: "Comédia",
      participants: 89,
      revenue: 4450
    },
    {
      id: 3,
      title: "Workshop de Fotografia",
      creator: "PhotoStudio",
      date: "2025-11-02",
      status: "rejected",
      category: "Educação",
      participants: 0,
      revenue: 0
    },
    {
      id: 4,
      title: "Conferência de Tecnologia",
      creator: "TechEvents",
      date: "2025-12-01",
      status: "approved",
      category: "Tecnologia",
      participants: 156,
      revenue: 18720
    },
    {
      id: 5,
      title: "Feira de Arte Local",
      creator: "Artistas Unidos",
      date: "2025-11-20",
      status: "pending",
      category: "Arte",
      participants: 67,
      revenue: 3350
    }
  ];

  const filteredEvents = mockEvents.filter(event => 
    activeTab === 'all' || event.status === activeTab
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-600/20';
      case 'approved': return 'text-green-400 bg-green-600/20';
      case 'rejected': return 'text-red-400 bg-red-600/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'approved': return 'Aprovado';
      case 'rejected': return 'Rejeitado';
      default: return status;
    }
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-black">
        <Header />
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Header da página */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-red-400 mr-3" />
                <h1 className="text-4xl font-bold text-white">Administração de Eventos</h1>
              </div>
              <p className="text-white/70 text-lg">Gerencie e modere todos os eventos da plataforma</p>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center">
                <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-white mb-1">127</h3>
                <p className="text-white/70">Total de Eventos</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center">
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-white mb-1">98</h3>
                <p className="text-white/70">Aprovados</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center">
                <XCircle className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-white mb-1">15</h3>
                <p className="text-white/70">Pendentes</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center">
                <BarChart3 className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-white mb-1">R$ 125k</h3>
                <p className="text-white/70">Receita Total</p>
              </div>
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Button 
                onClick={() => setActiveTab('all')}
                className={`${activeTab === 'all' ? 'bg-purple-600' : 'bg-white/10'} hover:bg-purple-700 text-white`}
              >
                Todos os Eventos
              </Button>
              <Button 
                onClick={() => setActiveTab('pending')}
                className={`${activeTab === 'pending' ? 'bg-yellow-600' : 'bg-white/10'} hover:bg-yellow-700 text-white`}
              >
                Pendentes
              </Button>
              <Button 
                onClick={() => setActiveTab('approved')}
                className={`${activeTab === 'approved' ? 'bg-green-600' : 'bg-white/10'} hover:bg-green-700 text-white`}
              >
                Aprovados
              </Button>
              <Button 
                onClick={() => setActiveTab('rejected')}
                className={`${activeTab === 'rejected' ? 'bg-red-600' : 'bg-white/10'} hover:bg-red-700 text-white`}
              >
                Rejeitados
              </Button>
            </div>

            {/* Lista de eventos */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-4 text-left text-white font-semibold">Evento</th>
                      <th className="px-6 py-4 text-left text-white font-semibold">Criador</th>
                      <th className="px-6 py-4 text-left text-white font-semibold">Data</th>
                      <th className="px-6 py-4 text-left text-white font-semibold">Status</th>
                      <th className="px-6 py-4 text-left text-white font-semibold">Participantes</th>
                      <th className="px-6 py-4 text-left text-white font-semibold">Receita</th>
                      <th className="px-6 py-4 text-left text-white font-semibold">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEvents.map((event) => (
                      <tr key={event.id} className="border-t border-white/10 hover:bg-white/5">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-white font-medium">{event.title}</div>
                            <div className="text-white/70 text-sm">{event.category}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-white/70">{event.creator}</td>
                        <td className="px-6 py-4 text-white/70">
                          <DateFormatter date={event.date} />
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(event.status)}`}>
                            {getStatusText(event.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white/70">{event.participants}</td>
                        <td className="px-6 py-4 text-white/70">R$ {event.revenue.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                            >
                              <Eye className="w-3 h-3" />
                            </Button>
                            {event.status === 'pending' && (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
                                >
                                  <CheckCircle className="w-3 h-3" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                                >
                                  <XCircle className="w-3 h-3" />
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-white/70 text-lg">Nenhum evento encontrado para este filtro.</p>
              </div>
            )}
          </div>
        </div>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
}