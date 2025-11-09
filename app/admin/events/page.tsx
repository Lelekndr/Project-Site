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
  creatorCnpj?: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  category: string;
  participants: number;
  revenue: number;
  rejectionReason?: string;
}

export default function AdminEventsPage() {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedEvent, setSelectedEvent] = useState<AdminEvent | null>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectingEventId, setRejectingEventId] = useState<number | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [events, setEvents] = useState<AdminEvent[]>([
    {
      id: 1,
      title: "Festival de Música Eletrônica",
      creator: "DJ Productions",
      creatorCnpj: "12.345.678/0001-90",
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
      creatorCnpj: "98.765.432/0001-10",
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
      creatorCnpj: "11.222.333/0001-44",
      date: "2025-11-02",
      status: "rejected",
      category: "Educação",
      participants: 0,
      revenue: 0,
      rejectionReason: "Documentação incompleta e informações insuficientes sobre o instrutor."
    },
    {
      id: 4,
      title: "Conferência de Tecnologia",
      creator: "TechEvents",
      creatorCnpj: "55.666.777/0001-88",
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
      creatorCnpj: "33.444.555/0001-22",
      date: "2025-11-20",
      status: "pending",
      category: "Arte",
      participants: 67,
      revenue: 3350
    }
  ]);

  // Funções para ações dos botões
  const handleViewEvent = (event: AdminEvent) => {
    setSelectedEvent(event);
  };

  const handleApproveEvent = (eventId: number) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, status: 'approved' as 'pending' | 'approved' | 'rejected' }
        : event
    ));
    alert('Evento aprovado com sucesso!');
  };

  const handleRejectEvent = (eventId: number) => {
    setRejectingEventId(eventId);
    setShowRejectModal(true);
  };

  const confirmRejectEvent = () => {
    if (rejectingEventId && rejectionReason.trim()) {
      setEvents(events.map(event => 
        event.id === rejectingEventId 
          ? { ...event, status: 'rejected' as 'pending' | 'approved' | 'rejected', rejectionReason: rejectionReason.trim() }
          : event
      ));
      setShowRejectModal(false);
      setRejectingEventId(null);
      setRejectionReason('');
      alert('Evento rejeitado com observação registrada!');
    }
  };

  const cancelRejectEvent = () => {
    setShowRejectModal(false);
    setRejectingEventId(null);
    setRejectionReason('');
  };

  const filteredEvents = events.filter(event => 
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
              {/* Desktop View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-4 text-left text-white font-semibold">Evento</th>
                      <th className="px-6 py-4 text-left text-white font-semibold">Criador</th>
                      <th className="px-6 py-4 text-left text-white font-semibold">CNPJ</th>
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
                        <td className="px-6 py-4 text-white/70 font-mono text-sm">{event.creatorCnpj}</td>
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
                              onClick={() => handleViewEvent(event)}
                            >
                              <Eye className="w-3 h-3" />
                            </Button>
                            {event.status === 'pending' && (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
                                  onClick={() => handleApproveEvent(event.id)}
                                >
                                  <CheckCircle className="w-3 h-3" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                                  onClick={() => handleRejectEvent(event.id)}
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

              {/* Mobile View - Cards */}
              <div className="lg:hidden space-y-4 p-4">
                {filteredEvents.map((event) => (
                  <div key={event.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-white font-medium text-lg">{event.title}</h3>
                        <p className="text-white/70 text-sm">{event.category}</p>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(event.status)}`}>
                        {getStatusText(event.status)}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-white/60">Criador:</span>
                        <span className="text-white">{event.creator}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">CNPJ:</span>
                        <span className="text-white font-mono text-xs">{event.creatorCnpj}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Data:</span>
                        <span className="text-white"><DateFormatter date={event.date} /></span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Participantes:</span>
                        <span className="text-white">{event.participants}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Receita:</span>
                        <span className="text-green-400 font-medium">R$ {event.revenue.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white flex-1 min-w-[80px]"
                        onClick={() => handleViewEvent(event)}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Ver
                      </Button>
                      {event.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white flex-1 min-w-[80px]"
                            onClick={() => handleApproveEvent(event.id)}
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Aprovar
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white flex-1 min-w-[80px]"
                            onClick={() => handleRejectEvent(event.id)}
                          >
                            <XCircle className="w-3 h-3 mr-1" />
                            Rejeitar
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-white/70 text-lg">Nenhum evento encontrado para este filtro.</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal de Detalhes do Evento */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900/95 backdrop-blur-md rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Detalhes do Evento</h2>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <span className="sr-only">Fechar</span>
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Informações do Evento */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{selectedEvent.title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-white/60">Organizador: </span>
                      <span className="text-white">{selectedEvent.creator}</span>
                    </div>
                    <div>
                      <span className="text-white/60">CNPJ: </span>
                      <span className="text-white font-mono">{selectedEvent.creatorCnpj}</span>
                    </div>
                    <div>
                      <span className="text-white/60">Data: </span>
                      <span className="text-white"><DateFormatter date={selectedEvent.date} /></span>
                    </div>
                    <div>
                      <span className="text-white/60">Categoria: </span>
                      <span className="text-white">{selectedEvent.category}</span>
                    </div>
                    <div>
                      <span className="text-white/60">Status: </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        selectedEvent.status === 'approved' ? 'bg-green-600/20 text-green-400' :
                        selectedEvent.status === 'pending' ? 'bg-yellow-600/20 text-yellow-400' :
                        'bg-red-600/20 text-red-400'
                      }`}>
                        {selectedEvent.status === 'approved' ? 'Aprovado' :
                         selectedEvent.status === 'pending' ? 'Pendente' : 'Rejeitado'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Observação de Rejeição */}
                {selectedEvent.status === 'rejected' && selectedEvent.rejectionReason && (
                  <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-4">
                    <h4 className="text-red-400 font-semibold mb-2 flex items-center">
                      <XCircle className="w-4 h-4 mr-2" />
                      Motivo da Rejeição
                    </h4>
                    <p className="text-white/80 text-sm">{selectedEvent.rejectionReason}</p>
                  </div>
                )}

                {/* Métricas */}
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-3">Métricas</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-white/60">Participantes: </span>
                      <span className="text-white font-medium">{selectedEvent.participants}</span>
                    </div>
                    <div>
                      <span className="text-white/60">Receita: </span>
                      <span className="text-green-400 font-medium">R$ {selectedEvent.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Ações */}
                {selectedEvent.status === 'pending' && (
                  <div className="flex space-x-4 pt-4 border-t border-white/10">
                    <Button
                      onClick={() => {
                        handleApproveEvent(selectedEvent.id);
                        setSelectedEvent(null);
                      }}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Aprovar Evento
                    </Button>
                    <Button
                      onClick={() => {
                        handleRejectEvent(selectedEvent.id);
                      }}
                      variant="destructive"
                      className="flex-1"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Rejeitar Evento
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Modal de Rejeição com Observação */}
        {showRejectModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900/95 backdrop-blur-md rounded-lg p-6 max-w-md w-full border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Rejeitar Evento</h3>
                <button
                  onClick={cancelRejectEvent}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-white/80">
                  Por favor, informe o motivo da rejeição. Esta observação será registrada no sistema.
                </p>
                
                <div>
                  <label htmlFor="rejectionReason" className="block text-white/70 text-sm font-medium mb-2">
                    Motivo da rejeição *
                  </label>
                  <textarea
                    id="rejectionReason"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Ex: Documentação incompleta, informações insuficientes, não atende aos critérios..."
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    rows={4}
                    required
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    onClick={cancelRejectEvent}
                    variant="outline"
                    className="flex-1 border-white/30 text-white/70 hover:bg-white/10"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={confirmRejectEvent}
                    disabled={!rejectionReason.trim()}
                    variant="destructive"
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Confirmar Rejeição
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