"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, MapPin, Clock, Users, Trash2, Eye, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/common/Header';
import { Footer } from '@/components/ui/common/Footer';
import { ProtectedRoute } from '@/components/ui/common/ProtectedRoute';

interface UserEvent {
  id: number;
  title: string;
  subtitle?: string;
  date: string;
  time: string;
  location: string;
  registered: boolean;
  attended: boolean;
  category: string;
  description: string;
  price: string;
  organizer: string;
}

export default function UserEventsPage() {
  const { user } = useAuth();
  const [selectedEvent, setSelectedEvent] = useState<UserEvent | null>(null);
  const [userEvents, setUserEvents] = useState<UserEvent[]>([
    {
      id: 1,
      title: "Stand Up Comedy Night com Comediantes Nacionais",
      subtitle: "Uma noite repleta de risadas e boa comédia brasileira",
      date: "25 de Outubro, 2025",
      time: "20:00",
      location: "Teatro Municipal",
      registered: true,
      attended: false,
      category: "Comédia",
      description: "Uma noite especial com os melhores comediantes do cenário nacional. Prepare-se para muitas risadas com apresentações de stand-up comedy de alta qualidade.",
      price: "R$ 45,00",
      organizer: "Comedy Club São Paulo"
    },
    {
      id: 2,
      title: "Festival de Jazz do Brasil: 3 Noites Especiais",
      subtitle: "O melhor do jazz nacional e internacional",
      date: "30 de Outubro, 2025",
      time: "19:00",
      location: "Centro Cultural",
      registered: true,
      attended: true,
      category: "Música",
      description: "Festival que reúne grandes nomes do jazz brasileiro e internacional. Uma experiência única para os amantes da boa música.",
      price: "R$ 80,00",
      organizer: "Jazz Brasil"
    },
    {
      id: 3,
      title: "DevBootcamp: React, Next.js e TypeScript",
      subtitle: "Workshop intensivo de desenvolvimento web moderno",
      date: "5 de Novembro, 2025",
      time: "14:00",
      location: "TechHub",
      registered: true,
      attended: false,
      category: "Tecnologia",
      description: "Workshop prático para desenvolvedores que querem dominar as tecnologias mais modernas do desenvolvimento web.",
      price: "R$ 120,00",
      organizer: "Dev Academy"
    }
  ]);

  const handleRemoveEvent = (eventId: number) => {
    if (confirm('Tem certeza que deseja remover este evento da sua lista?')) {
      const updatedEvents = userEvents.filter(event => event.id !== eventId);
      setUserEvents(updatedEvents);
      
      // Salvar no localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(`user_events_${user?.id}`, JSON.stringify(updatedEvents));
      }
    }
  };

  const handleViewEvent = (event: UserEvent) => {
    setSelectedEvent(event);
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
  };

  return (
    <ProtectedRoute requiredRole="user">
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Header />
        
        <div className="container mx-auto px-4 py-12">
          {/* Header da página */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Meus Eventos
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Acompanhe todos os eventos que você se inscreveu e seu histórico de participação
            </p>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Eventos Inscritos</p>
                  <p className="text-2xl font-bold text-white">
                    {userEvents.filter(e => e.registered).length}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Participações</p>
                  <p className="text-2xl font-bold text-white">
                    {userEvents.filter(e => e.attended).length}
                  </p>
                </div>
                <Users className="w-8 h-8 text-green-400" />
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Próximos Eventos</p>
                  <p className="text-2xl font-bold text-white">
                    {userEvents.filter(e => e.registered && !e.attended).length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </div>

          {/* Lista de eventos */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Meus Eventos</h2>
            
            {userEvents.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎟️</div>
                <h3 className="text-xl font-semibold text-white mb-2">Nenhum evento encontrado</h3>
                <p className="text-white/70 mb-6">Você ainda não se inscreveu em nenhum evento.</p>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-medium">
                  Explorar Eventos
                </Button>
              </div>
            ) : (
              userEvents.map((event) => (
                <div 
                  key={event.id}
                  className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-colors group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 cursor-pointer" onClick={() => handleViewEvent(event)}>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-white group-hover:text-pink-300 transition-colors">{event.title}</h3>
                        <span className="px-3 py-1 bg-purple-600/30 text-purple-300 text-xs rounded-full">
                          {event.category}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-white/70 mb-2">
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
                      </div>
                      
                      {event.subtitle && (
                        <p className="text-white/60 text-sm">{event.subtitle}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {event.registered && (
                        <span className="px-3 py-1 bg-green-600/30 text-green-300 text-sm rounded-full">
                          Inscrito
                        </span>
                      )}
                      {event.attended && (
                        <span className="px-3 py-1 bg-blue-600/30 text-blue-300 text-sm rounded-full">
                          Participou
                        </span>
                      )}
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleViewEvent(event)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
                          size="sm"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          onClick={() => handleRemoveEvent(event.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"
                          size="sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
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
              Não encontrou o que procura? Explore nossa seleção completa de eventos.
            </p>
            <Button 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-medium"
            >
              <Users className="w-4 h-4 mr-2" />
              Explorar Mais Eventos
            </Button>
          </div>
        </div>
        
        {/* Modal de Visualização de Evento */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-white pr-4">{selectedEvent.title}</h2>
                  <Button
                    onClick={closeEventModal}
                    className="bg-transparent hover:bg-white/10 text-white p-2"
                    size="sm"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {selectedEvent.subtitle && (
                    <p className="text-white/80 text-lg">{selectedEvent.subtitle}</p>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-white/70">
                        <Calendar className="w-4 h-4" />
                        <span>{selectedEvent.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/70">
                        <Clock className="w-4 h-4" />
                        <span>{selectedEvent.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/70">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedEvent.location}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="text-white/70">
                        <span className="font-medium">Categoria:</span> {selectedEvent.category}
                      </div>
                      <div className="text-white/70">
                        <span className="font-medium">Preço:</span> {selectedEvent.price}
                      </div>
                      <div className="text-white/70">
                        <span className="font-medium">Organizador:</span> {selectedEvent.organizer}
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-white/20 pt-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Descrição</h3>
                    <p className="text-white/80">{selectedEvent.description}</p>
                  </div>
                  
                  <div className="border-t border-white/20 pt-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Status</h3>
                    <div className="flex gap-2">
                      {selectedEvent.registered && (
                        <span className="px-3 py-1 bg-green-600/30 text-green-300 text-sm rounded-full">
                          Inscrito
                        </span>
                      )}
                      {selectedEvent.attended && (
                        <span className="px-3 py-1 bg-blue-600/30 text-blue-300 text-sm rounded-full">
                          Participou
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={closeEventModal}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white"
                    >
                      Fechar
                    </Button>
                    <Button
                      onClick={() => {
                        handleRemoveEvent(selectedEvent.id);
                        closeEventModal();
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-6"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remover
                    </Button>
                  </div>
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