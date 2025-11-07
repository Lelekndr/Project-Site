"use client";

import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Header } from '@/components/ui/common/Header';
import { Footer } from '@/components/ui/common/Footer';
import { ProtectedRoute } from '@/components/ui/common/ProtectedRoute';

export default function CreatorCreateEventPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulação de criação de evento
    setTimeout(() => {
      alert('Evento criado com sucesso!');
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <ProtectedRoute requiredRole="creator">
      <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-black">
        <Header />

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header da página */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">
                Criar Novo Evento
              </h1>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Preencha as informações abaixo para criar um evento incrível
              </p>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Nome do Evento */}
                <div className="md:col-span-2">
                  <Label htmlFor="eventName" className="text-white mb-2 block">Nome do Evento *</Label>
                  <Input
                    id="eventName"
                    type="text"
                    placeholder="Ex: Festival de Música Eletrônica"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>

                {/* Categoria */}
                <div>
                  <Label htmlFor="category" className="text-white mb-2 block">Categoria *</Label>
                  <select
                    id="category"
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="parties-shows">Festas & Shows</option>
                    <option value="stand-up">Stand Up Comedy</option>
                    <option value="pet-events">Eventos Pet</option>
                    <option value="theater">Teatro</option>
                    <option value="sports">Esportes</option>
                    <option value="tech">Tecnologia</option>
                    <option value="marketing">Marketing</option>
                  </select>
                </div>

                {/* Data */}
                <div>
                  <Label htmlFor="eventDate" className="text-white mb-2 block">Data do Evento *</Label>
                  <Input
                    id="eventDate"
                    type="datetime-local"
                    required
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>

                {/* Localização */}
                <div>
                  <Label htmlFor="location" className="text-white mb-2 block">Local *</Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="Ex: Teatro Municipal de São Paulo"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>

                {/* Preço */}
                <div>
                  <Label htmlFor="price" className="text-white mb-2 block">Preço (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </div>

              {/* Descrição */}
              <div className="mb-6">
                <Label htmlFor="description" className="text-white mb-2 block">Descrição do Evento *</Label>
                <textarea
                  id="description"
                  rows={6}
                  placeholder="Descreva seu evento, incluindo informações importantes para os participantes..."
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/50 resize-none"
                />
              </div>

              {/* Upload de Imagem */}
              <div className="mb-8">
                <Label htmlFor="eventImage" className="text-white mb-2 block">Imagem do Evento</Label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                  <ImageIcon className="w-12 h-12 text-white/50 mx-auto mb-4" />
                  <p className="text-white/70 mb-2">Clique para fazer upload ou arraste uma imagem</p>
                  <p className="text-white/50 text-sm">PNG, JPG ou GIF até 5MB</p>
                  <Input
                    id="eventImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="px-8 py-3 border-white/20 text-white hover:bg-white/10"
                >
                  Salvar como Rascunho
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Criando Evento...
                    </>
                  ) : (
                    'Criar Evento'
                  )}
                </Button>
              </div>
            </form>

            {/* Dicas */}
            <div className="mt-8 bg-blue-600/10 backdrop-blur-md rounded-lg p-6 border border-blue-500/20">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">💡 Dicas para um evento de sucesso:</h3>
              <ul className="text-blue-200 space-y-2 text-sm">
                <li>• Use um título claro e atrativo que descreva bem seu evento</li>
                <li>• Adicione uma imagem de alta qualidade para chamar atenção</li>
                <li>• Seja específico sobre localização, data e horário</li>
                <li>• Escreva uma descrição detalhada incluindo o que esperar</li>
                <li>• Defina um preço justo considerando seu público-alvo</li>
              </ul>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
}