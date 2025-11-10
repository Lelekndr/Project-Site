"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Calendar, Settings, X, Camera, Save, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/common/Header';
import { Footer } from '@/components/ui/common/Footer';
import { ProtectedRoute } from '@/components/ui/common/ProtectedRoute';

export default function UserProfilePage() {
  const { user, updateUserProfile } = useAuth();
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [editingName, setEditingName] = useState(user?.name || '');
  const [editingImage, setEditingImage] = useState(user?.avatar || '');
  const [editingBio, setEditingBio] = useState('Usuário apaixonado por eventos incríveis');
  const [editingLocation, setEditingLocation] = useState('São Paulo, SP');
  const [isLoading, setIsLoading] = useState(false);
  
  // Estados para preferências
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [recommendedEvents, setRecommendedEvents] = useState(true);
  const [eventReminders, setEventReminders] = useState(false);

  // Carregar preferências salvas
  useEffect(() => {
    if (typeof window !== 'undefined' && user?.id) {
      const savedPreferences = localStorage.getItem(`user_preferences_${user.id}`);
      if (savedPreferences) {
        const preferences = JSON.parse(savedPreferences);
        setEmailNotifications(preferences.emailNotifications ?? true);
        setRecommendedEvents(preferences.recommendedEvents ?? true);
        setEventReminders(preferences.eventReminders ?? false);
      }
    }
  }, [user?.id]);

  // Sincronizar o estado quando o usuário mudar ou quando o modal abrir
  const openConfigModal = () => {
    setEditingName(user?.name || '');
    setEditingImage(user?.avatar || '');
    setShowConfigModal(true);
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      await updateUserProfile({
        name: editingName,
        avatar: editingImage
      });
      setShowConfigModal(false);
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setEditingImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePreferenceChange = (preference: string, value: boolean) => {
    // Salvar preferências no localStorage
    if (typeof window !== 'undefined') {
      const preferences = {
        emailNotifications,
        recommendedEvents,
        eventReminders,
        [preference]: value
      };
      localStorage.setItem(`user_preferences_${user?.id}`, JSON.stringify(preferences));
    }
  };

  return (
    <ProtectedRoute requiredRole="user">
      <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-black">
        <Header />
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Header do perfil */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 mb-8">
              <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 flex-1">
                  <div className="w-32 h-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center overflow-hidden">
                    {(user?.avatar && user.avatar !== '/images/user-avatar.jpg') || editingImage ? (
                      <Image 
                        src={editingImage || user?.avatar || ''} 
                        alt="Avatar do usuário" 
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold text-white mb-2">{user?.name}</h1>
                    <div className="flex items-center text-white/70 mb-2">
                      <Mail className="w-4 h-4 mr-2" />
                      {user?.email}
                    </div>
                    <div className="flex items-center text-white/70 mb-3">
                      <MapPin className="w-4 h-4 mr-2" />
                      {editingLocation}
                    </div>
                    <p className="text-white/80 text-lg max-w-md mb-4">{editingBio}</p>
                    <div className="flex items-center gap-4">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 text-sm">
                        <User className="w-3 h-3 mr-1" />
                        Usuário
                      </div>
                      <div className="flex items-center text-white/60 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        Membro desde Out 2024
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Botão de Configuração */}
                <Button
                  onClick={openConfigModal}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Configurações
                </Button>
              </div>
            </div>

            {/* Estatísticas do Usuário */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 text-center">
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">8</h3>
                <p className="text-white/70 text-sm">Eventos Inscritos</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 text-center">
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">5</h3>
                <p className="text-white/70 text-sm">Eventos Participados</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 text-center">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">3</h3>
                <p className="text-white/70 text-sm">Próximos Eventos</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 text-center">
                <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">Tecnologia</h3>
                <p className="text-white/70 text-sm">Categoria Favorita</p>
              </div>
            </div>

            {/* Seções de Conteúdo */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Atividade Recente */}
              <div className="lg:col-span-2">
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                  <h3 className="text-lg font-semibold text-white mb-6">Atividade Recente</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-white text-sm">Se inscreveu em <span className="font-medium">Workshop de Desenvolvimento</span></p>
                        <p className="text-white/60 text-xs">5 dias atrás</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-white text-sm">Avaliou o evento <span className="font-medium">Stand Up Comedy Night</span></p>
                        <p className="text-white/60 text-xs">1 semana atrás</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Painel Lateral */}
              <div className="space-y-6">
                {/* Preferências */}
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                  <h3 className="text-lg font-semibold text-white mb-4">Preferências</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-sm">Notificações por Email</span>
                      <button
                        onClick={() => {
                          setEmailNotifications(!emailNotifications);
                          handlePreferenceChange('emailNotifications', !emailNotifications);
                        }}
                        className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors border-2 ${
                          emailNotifications 
                            ? 'bg-purple-600 border-purple-400' 
                            : 'bg-gray-700 border-gray-500'
                        }`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform shadow-md ${
                          emailNotifications ? 'translate-x-6' : 'translate-x-0'
                        }`}></div>
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-sm">Eventos Recomendados</span>
                      <button
                        onClick={() => {
                          setRecommendedEvents(!recommendedEvents);
                          handlePreferenceChange('recommendedEvents', !recommendedEvents);
                        }}
                        className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors border-2 ${
                          recommendedEvents 
                            ? 'bg-purple-600 border-purple-400' 
                            : 'bg-gray-700 border-gray-500'
                        }`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform shadow-md ${
                          recommendedEvents ? 'translate-x-6' : 'translate-x-0'
                        }`}></div>
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-sm">Lembretes de Eventos</span>
                      <button
                        onClick={() => {
                          setEventReminders(!eventReminders);
                          handlePreferenceChange('eventReminders', !eventReminders);
                        }}
                        className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors border-2 ${
                          eventReminders 
                            ? 'bg-purple-600 border-purple-400' 
                            : 'bg-gray-700 border-gray-500'
                        }`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform shadow-md ${
                          eventReminders ? 'translate-x-6' : 'translate-x-0'
                        }`}></div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Informações Adicionais */}
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                  <h3 className="text-lg font-semibold text-white mb-4">Resumo da Conta</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-sm">Membro desde</span>
                      <span className="text-white text-sm">Out 2024</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-sm">Categoria Favorita</span>
                      <span className="text-white text-sm">Tecnologia</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-sm">Últimas Atividades</span>
                      <span className="text-white text-sm">2 dias atrás</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Modal de Configuração */}
        {showConfigModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-lg max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white">Configurações do Perfil</h2>
                  <Button
                    onClick={() => setShowConfigModal(false)}
                    className="bg-transparent hover:bg-white/10 text-white p-2"
                    size="sm"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {/* Foto de Perfil */}
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center overflow-hidden">
                      {editingImage ? (
                        <Image 
                          src={editingImage} 
                          alt="Preview" 
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-12 h-12 text-white" />
                      )}
                    </div>
                    
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="avatar-upload"
                      />
                      <label
                        htmlFor="avatar-upload"
                        className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg cursor-pointer transition-colors"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Alterar Foto
                      </label>
                    </div>
                  </div>
                  
                  {/* Nome */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Nome
                    </label>
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Seu nome"
                    />
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Biografia
                    </label>
                    <textarea
                      value={editingBio}
                      onChange={(e) => setEditingBio(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                      placeholder="Conte um pouco sobre você..."
                    />
                  </div>

                  {/* Localização */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Localização
                    </label>
                    <input
                      type="text"
                      value={editingLocation}
                      onChange={(e) => setEditingLocation(e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Sua cidade"
                    />
                  </div>
                  
                  {/* Botões */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={() => setShowConfigModal(false)}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white"
                      disabled={isLoading}
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleSaveProfile}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        'Salvando...'
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Salvar
                        </>
                      )}
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