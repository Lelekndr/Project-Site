"use client";

import { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Eye, X, Search } from 'lucide-react';
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
  participationConfirmed?: boolean;
  category: string;
  description: string;
  price: string;
  organizer: string;
  rating?: number;
}

export default function UserEventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<UserEvent | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [eventToRate, setEventToRate] = useState<UserEvent | null>(null);
  const [currentRating, setCurrentRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [eventToConfirm, setEventToConfirm] = useState<UserEvent | null>(null);
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
      attended: true,
      category: "Tecnologia",
      description: "Workshop prático para desenvolvedores que querem dominar as tecnologias mais modernas do desenvolvimento web.",
      price: "R$ 120,00",
      organizer: "Dev Academy",
      rating: 5
    },
    {
      id: 4,
      title: "Meetup de UX/UI Design",
      subtitle: "Tendências e melhores práticas em design de interfaces",
      date: "20 de Outubro, 2025",
      time: "19:00",
      location: "Design Center",
      registered: true,
      attended: false,
      category: "Design",
      description: "Meetup para designers compartilharem experiências e conhecimentos sobre UX/UI.",
      price: "Gratuito",
      organizer: "UX Community"
    },
    {
      id: 5,
      title: "Workshop de Fotografia Digital",
      subtitle: "Técnicas avançadas de fotografia com smartphone",
      date: "25 de Outubro, 2025",
      time: "14:00",
      location: "Estúdio Foto Pro",
      registered: true,
      attended: false,
      category: "Arte",
      description: "Workshop prático sobre técnicas de fotografia digital para iniciantes e intermediários.",
      price: "R$ 65,00",
      organizer: "Foto Pro Academy"
    },
    {
      id: 6,
      title: "Conferência de Marketing Digital 2025",
      subtitle: "As últimas tendências do marketing online",
      date: "1 de Novembro, 2025",
      time: "09:00",
      location: "Centro de Convenções",
      registered: true,
      attended: false,
      category: "Negócios",
      description: "Conferência com especialistas em marketing digital e growth hacking.",
      price: "R$ 150,00",
      organizer: "Marketing Pro"
    }
  ]);



  const handleViewEvent = (event: UserEvent) => {
    setSelectedEvent(event);
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
  };

  // Função para verificar se o evento já ocorreu
  const isEventPast = (eventDate: string) => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // Janeiro é 0
    const currentDay = today.getDate();
    
    // Parse da data do evento (formato: "DD de MMMM, YYYY")
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    
    const dateParts = eventDate.split(' ');
    const eventDay = parseInt(dateParts[0]);
    const eventMonthName = dateParts[2].replace(',', '');
    const eventMonth = monthNames.indexOf(eventMonthName) + 1;
    
    // Comparar se o evento já passou (assumindo que estamos em novembro/2025)
    if (eventMonth < currentMonth) {
      return true;
    } else if (eventMonth === currentMonth && eventDay < currentDay) {
      return true;
    }
    return false;
  };

  // Função para confirmar participação
  const handleConfirmParticipation = (event: UserEvent) => {
    setEventToConfirm(event);
    setShowConfirmModal(true);
  };

  // Função para confirmar a participação definitivamente
  const confirmParticipation = () => {
    if (eventToConfirm) {
      setUserEvents(prev => prev.map(event => 
        event.id === eventToConfirm.id 
          ? { ...event, participationConfirmed: true, attended: true }
          : event
      ));
      setShowConfirmModal(false);
      setEventToConfirm(null);
    }
  };

  // Função para fechar modal de confirmação
  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setEventToConfirm(null);
  };

  // Filtrar eventos por busca
  const filteredEvents = userEvents.filter(event => {
    if (!searchTerm.trim()) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return event.title.toLowerCase().includes(searchLower) ||
           event.subtitle?.toLowerCase().includes(searchLower) ||
           event.category.toLowerCase().includes(searchLower) ||
           event.location.toLowerCase().includes(searchLower) ||
           event.description.toLowerCase().includes(searchLower);
  });

  return (
    <ProtectedRoute requiredRole="user">
      <div className="min-h-screen">
        <Header />
        
        <div className="container mx-auto px-4 py-12">
          {/* Header da página */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold theme-text-primary mb-4">
              Meus Eventos
            </h1>
            <p className="theme-text-secondary text-lg max-w-2xl mx-auto">
              Acompanhe todos os eventos que você se inscreveu e seu histórico de participação
            </p>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="theme-bg-card backdrop-blur-md rounded-lg p-6 border theme-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="theme-text-secondary text-sm">Eventos Inscritos</p>
                  <p className="text-2xl font-bold theme-text-primary">
                    {userEvents.filter(e => e.registered).length}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            
            <div className="theme-bg-card backdrop-blur-md rounded-lg p-6 border theme-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="theme-text-secondary text-sm">Participações</p>
                  <p className="text-2xl font-bold theme-text-primary">
                    {userEvents.filter(e => e.attended).length}
                  </p>
                </div>
                <Users className="w-8 h-8 theme-success" />
              </div>
            </div>
            
            <div className="theme-bg-card backdrop-blur-md rounded-lg p-6 border theme-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="theme-text-secondary text-sm">Próximos Eventos</p>
                  <p className="text-2xl font-bold theme-text-primary">
                    {userEvents.filter(e => e.registered && !e.attended).length}
                  </p>
                </div>
                <Clock className="w-8 h-8 theme-purple" />
              </div>
            </div>
          </div>

          {/* Lista de eventos */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-bold theme-text-primary">Meus Eventos</h2>
              
              {/* Campo de busca */}
              <div className="relative max-w-md w-full sm:w-auto">
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
            
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎟️</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {searchTerm.trim() ? 'Nenhum evento encontrado' : 'Nenhum evento encontrado'}
                </h3>
                <p className="text-white/70 mb-6">
                  {searchTerm.trim() 
                    ? `Nenhum evento corresponde à busca "${searchTerm}"` 
                    : 'Você ainda não se inscreveu em nenhum evento.'}
                </p>
                {!searchTerm.trim() && (
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-medium">
                    Explorar Eventos
                  </Button>
                )}
              </div>
            ) : (
              filteredEvents.map((event) => (
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
                      {event.participationConfirmed && (
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-emerald-600/30 text-emerald-300 text-sm rounded-full">
                            Participação Confirmada
                          </span>
                          {event.rating && (
                            <div className="flex items-center gap-1 px-2 py-1 bg-yellow-600/20 text-yellow-400 text-sm rounded-full">
                              <span>⭐</span>
                              <span>{event.rating}</span>
                            </div>
                          )}
                        </div>
                      )}
                      {/* Badge de participação removido para evitar conflito com confirmação */}
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleViewEvent(event)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
                          size="sm"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {isEventPast(event.date) && event.registered && !event.participationConfirmed && (
                          <Button 
                            onClick={() => handleConfirmParticipation(event)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
                            size="sm"
                            title="Confirmar participação"
                          >
                            ✓
                          </Button>
                        )}
                        {event.participationConfirmed && (
                          <Button 
                            onClick={() => {
                              setEventToRate(event);
                              setCurrentRating(event.rating || 0);
                              setShowRatingModal(true);
                            }}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded-lg"
                            size="sm"
                            title="Avaliar evento"
                          >
                            ⭐
                          </Button>
                        )}
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
                      {/* Badge de participou removido */}
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={closeEventModal}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white"
                    >
                      Fechar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Avaliação */}
        {showRatingModal && eventToRate && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900/95 backdrop-blur-md rounded-lg p-8 max-w-md w-full border border-white/20">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Avaliar Evento</h3>
                <p className="text-white/80 mb-6">
                  Como foi sua experiência no evento:<br />
                  <span className="font-semibold text-yellow-400">{eventToRate.title}</span>
                </p>
                
                {/* Sistema de Rating por Estrelas */}
                <div className="flex justify-center gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setCurrentRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="text-4xl transition-colors duration-200 hover:scale-110 transform"
                    >
                      <span className={`${
                        star <= (hoverRating || currentRating) 
                          ? 'text-yellow-400' 
                          : 'text-gray-600'
                      }`}>
                        ⭐
                      </span>
                    </button>
                  ))}
                </div>
                
                {/* Feedback textual */}
                <div className="text-white/70 mb-6">
                  {currentRating === 0 && "Clique nas estrelas para avaliar"}
                  {currentRating === 1 && "⭐ Muito Ruim"}
                  {currentRating === 2 && "⭐⭐ Ruim"}
                  {currentRating === 3 && "⭐⭐⭐ Regular"}
                  {currentRating === 4 && "⭐⭐⭐⭐ Bom"}
                  {currentRating === 5 && "⭐⭐⭐⭐⭐ Excelente"}
                </div>
                
                {/* Campo de comentário opcional */}
                {currentRating > 0 && (
                  <textarea
                    placeholder="Deixe um comentário sobre o evento (opcional)"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none mb-6"
                    rows={3}
                  />
                )}
                
                <div className="flex space-x-4">
                  <Button
                    onClick={() => {
                      setShowRatingModal(false);
                      setEventToRate(null);
                      setCurrentRating(0);
                      setHoverRating(0);
                    }}
                    variant="outline"
                    className="flex-1 bg-transparent border-white/20 text-white hover:bg-white/10"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={() => {
                      if (currentRating === 0) {
                        alert('Por favor, selecione uma avaliação antes de enviar.');
                        return;
                      }
                      
                      // Atualizar a avaliação do evento
                      setUserEvents(userEvents.map(event => 
                        event.id === eventToRate.id 
                          ? { ...event, rating: currentRating }
                          : event
                      ));
                      
                      alert(`🌟 Avaliação enviada com sucesso!\n\nSua nota: ${currentRating} estrela${currentRating > 1 ? 's' : ''}\n\nObrigado pelo seu feedback!`);
                      setShowRatingModal(false);
                      setEventToRate(null);
                      setCurrentRating(0);
                      setHoverRating(0);
                    }}
                    disabled={currentRating === 0}
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
                  >
                    Enviar Avaliação
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Confirmação de Participação */}
        {showConfirmModal && eventToConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Confirmar Participação</h3>
                <Button 
                  onClick={closeConfirmModal}
                  className="bg-transparent hover:bg-white/10 text-white p-2"
                  size="sm"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-medium text-white mb-2">{eventToConfirm.title}</h4>
                <div className="flex items-center gap-4 text-white/70 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{eventToConfirm.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{eventToConfirm.location}</span>
                  </div>
                </div>
                <p className="text-white/80 text-sm">
                  Você deseja confirmar que participou deste evento? Esta ação permitirá que você avalie o evento e será registrada em seu histórico.
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  onClick={closeConfirmModal}
                  className="flex-1 bg-gray-600 hover:bg-gray-700"
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={confirmParticipation}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Confirmar Participação
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
}