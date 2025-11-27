"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Calendar, Settings, X, Camera, Save, MapPin, Star, Eye, Users, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/common/Header';
import { Footer } from '@/components/ui/common/Footer';
import { ProtectedRoute } from '@/components/ui/common/ProtectedRoute';

export default function CreatorProfilePage() {
  const { user, updateUserProfile } = useAuth();
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [editingName, setEditingName] = useState(user?.name || '');
  const [editingImage, setEditingImage] = useState(user?.avatar || '');
  const [editingBio, setEditingBio] = useState('Criador de eventos apaixonado por experiências memoráveis');
  const [editingLocation, setEditingLocation] = useState('São Paulo, SP');
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <ProtectedRoute requiredRole="creator">
      <div className="min-h-screen colala-background bg-gradient-to-br from-violet-900 via-purple-900 to-black">
        <Header />
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Header do perfil */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 mb-8">
              <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 flex-1">
                  <div className="w-32 h-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center overflow-hidden">
                    {(user?.avatar && user.avatar !== '/images/creator-avatar.jpg') || editingImage ? (
                      <Image 
                        src={editingImage || user?.avatar || ''} 
                        alt="Avatar do criador" 
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
                    {user?.cnpj && (
                      <div className="flex items-center text-white/70 mb-2">
                        <Building className="w-4 h-4 mr-2" />
                        CNPJ: {user.cnpj}
                      </div>
                    )}
                    <div className="flex items-center text-white/70 mb-3">
                      <MapPin className="w-4 h-4 mr-2" />
                      {editingLocation}
                    </div>
                    <p className="text-white/80 text-lg max-w-md">{editingBio}</p>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-600/20 text-purple-400 text-sm">
                        <Star className="w-3 h-3 mr-1" />
                        Criador Verificado
                      </div>
                      <div className="flex items-center text-white/60 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        Membro desde Oct 2024
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

            {/* Estatísticas do Criador */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 text-center">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">12</h3>
                <p className="text-white/70 text-sm">Eventos Criados</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 text-center">
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">2.4K</h3>
                <p className="text-white/70 text-sm">Total de Participantes</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 text-center">
                <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">4.8</h3>
                <p className="text-white/70 text-sm">Avaliação Média</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 text-center">
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">15.2K</h3>
                <p className="text-white/70 text-sm">Visualizações Totais</p>
              </div>
            </div>

            {/* Seções de Conteúdo */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Eventos Recentes */}
              <div className="lg:col-span-2">
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Eventos Recentes</h2>
                    <Button 
                      className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2"
                      onClick={() => window.location.href = '/creator/events'}
                    >
                      Ver Todos
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Lista de eventos será implementada */}
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-white/30 mx-auto mb-3" />
                      <p className="text-white/50">Seus eventos aparecerão aqui</p>
                      <Button 
                        className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                        onClick={() => window.location.href = '/creator/create'}
                      >
                        Criar Primeiro Evento
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Painel Lateral */}
              <div className="space-y-6">
                {/* Performance */}
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                  <h3 className="text-lg font-semibold text-white mb-4">Performance Este Mês</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-sm">Novos Seguidores</span>
                      <span className="text-green-400 font-medium">+127</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-sm">Taxa de Conversão</span>
                      <span className="text-blue-400 font-medium">68%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-sm">Receita Gerada</span>
                      <span className="text-yellow-400 font-medium">R$ 8.4K</span>
                    </div>
                  </div>
                </div>

                {/* Próximas Ações */}
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                  <h3 className="text-lg font-semibold text-white mb-4">Ações Recomendadas</h3>
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white justify-start"
                      onClick={() => window.location.href = '/creator/create'}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Criar Novo Evento
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-white/20 text-white hover:bg-white/10 justify-start"
                      onClick={() => window.location.href = '/creator/events'}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Analisar Métricas
                    </Button>
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
                      placeholder="Conte sobre você..."
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