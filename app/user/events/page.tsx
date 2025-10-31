"use client";

import { useAuth } from '@/contexts/AuthContext';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/common/Header';
import { Footer } from '@/components/ui/common/Footer';

export default function UserEventsPage() {
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

  const mockEvents = [
    {
      id: 1,
      title: "Stand Up Comedy Night",
      date: "25 de Outubro, 2025",
      time: "20:00",
      location: "Teatro Municipal",
      registered: true,
      attended: false,
      category: "Comédia"
    },
    {
      id: 2,
      title: "Festival de Música",
      date: "30 de Outubro, 2025",
      time: "18:00",
      location: "Parque Central",
      registered: true,
      attended: false,
      category: "Música"
    },
    {
      id: 3,
      title: "Exposição de Arte",
      date: "15 de Outubro, 2025",
      time: "14:00",
      location: "Galeria Arte Moderna",
      registered: true,
      attended: true,
      category: "Arte"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header da página */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Meus Eventos</h1>
            <p className="text-white/70 text-lg">Gerencie suas inscrições e acompanhe seus eventos</p>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Todos os Eventos
            </Button>
            <Button 
              variant="outline" 
              className="border-white/20 text-white/70 hover:bg-white/10"
            >
              Próximos
            </Button>
            <Button 
              variant="outline" 
              className="border-white/20 text-white/70 hover:bg-white/10"
            >
              Participados
            </Button>
          </div>

          {/* Lista de eventos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockEvents.map((event) => (
              <div key={event.id} className="bg-white/10 backdrop-blur-md rounded-lg p-6 hover:bg-white/15 transition-all duration-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                    <div className="inline-flex items-center px-2 py-1 rounded-full bg-purple-600/20 text-purple-400 text-xs">
                      {event.category}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {event.registered && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-600/20 text-green-400 text-xs">
                        Inscrito
                      </span>
                    )}
                    {event.attended && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-600/20 text-blue-400 text-xs">
                        Participado
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-white/70">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-white/70">
                    <Clock className="w-4 h-4 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-white/70">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                  >
                    Ver Detalhes
                  </Button>
                  {!event.attended && event.registered && (
                    <Button 
                      variant="outline" 
                      className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                    >
                      Cancelar Inscrição
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Botão para explorar mais eventos */}
          <div className="text-center mt-12">
            <Button 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-medium"
            >
              <Users className="w-4 h-4 mr-2" />
              Explorar Mais Eventos
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}