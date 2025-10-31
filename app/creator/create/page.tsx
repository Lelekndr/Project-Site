"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, MapPin, Clock, Image as ImageIcon, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Header } from '@/components/ui/common/Header';
import { Footer } from '@/components/ui/common/Footer';

export default function CreatorCreateEventPage() {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user || user.role !== 'creator') {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular criação do evento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Evento criado com sucesso!');
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header da página */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Criar Novo Evento</h1>
            <p className="text-white/70 text-lg">Preencha as informações para criar seu evento</p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Informações básicas */}
              <div className="md:col-span-2">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Informações Básicas
                </h2>
              </div>

              <div>
                <Label className="text-white mb-2 block">Título do Evento</Label>
                <Input 
                  type="text"
                  placeholder="Ex: Festival de Música de Verão"
                  className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                  required
                />
              </div>

              <div>
                <Label className="text-white mb-2 block">Categoria</Label>
                <select className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-md text-white">
                  <option value="">Selecione uma categoria</option>
                  <option value="music">Música</option>
                  <option value="comedy">Comédia</option>
                  <option value="theater">Teatro</option>
                  <option value="sports">Esportes</option>
                  <option value="art">Arte</option>
                  <option value="food">Gastronomia</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <Label className="text-white mb-2 block">Descrição</Label>
                <textarea 
                  rows={4}
                  placeholder="Descreva seu evento..."
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-md text-white placeholder:text-zinc-500 resize-none"
                  required
                />
              </div>

              {/* Data e horário */}
              <div className="md:col-span-2 mt-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Data e Horário
                </h2>
              </div>

              <div>
                <Label className="text-white mb-2 block">Data do Evento</Label>
                <Input 
                  type="date"
                  className="bg-zinc-900 border-zinc-700 text-white"
                  required
                />
              </div>

              <div>
                <Label className="text-white mb-2 block">Horário de Início</Label>
                <Input 
                  type="time"
                  className="bg-zinc-900 border-zinc-700 text-white"
                  required
                />
              </div>

              <div>
                <Label className="text-white mb-2 block">Horário de Término</Label>
                <Input 
                  type="time"
                  className="bg-zinc-900 border-zinc-700 text-white"
                />
              </div>

              {/* Local */}
              <div className="md:col-span-2 mt-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Local
                </h2>
              </div>

              <div>
                <Label className="text-white mb-2 block">Nome do Local</Label>
                <Input 
                  type="text"
                  placeholder="Ex: Teatro Municipal"
                  className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                  required
                />
              </div>

              <div>
                <Label className="text-white mb-2 block">Endereço</Label>
                <Input 
                  type="text"
                  placeholder="Rua, número, bairro"
                  className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                  required
                />
              </div>

              <div>
                <Label className="text-white mb-2 block">Cidade</Label>
                <Input 
                  type="text"
                  placeholder="Ex: São Paulo"
                  className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                  required
                />
              </div>

              <div>
                <Label className="text-white mb-2 block">CEP</Label>
                <Input 
                  type="text"
                  placeholder="00000-000"
                  className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                />
              </div>

              {/* Ingressos */}
              <div className="md:col-span-2 mt-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Ingressos
                </h2>
              </div>

              <div>
                <Label className="text-white mb-2 block">Capacidade Máxima</Label>
                <Input 
                  type="number"
                  placeholder="Ex: 500"
                  className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                  required
                />
              </div>

              <div>
                <Label className="text-white mb-2 block">Preço do Ingresso (R$)</Label>
                <Input 
                  type="number"
                  step="0.01"
                  placeholder="Ex: 50.00"
                  className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                />
              </div>

              <div className="md:col-span-2 mt-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <ImageIcon className="w-5 h-5 mr-2" />
                  Imagem do Evento
                </h2>
                <div className="border-2 border-dashed border-zinc-600 rounded-lg p-6 text-center">
                  <ImageIcon className="w-12 h-12 mx-auto text-zinc-500 mb-4" />
                  <p className="text-white/70 mb-2">Clique para fazer upload da imagem</p>
                  <p className="text-zinc-500 text-sm">PNG, JPG até 5MB</p>
                  <Input 
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="flex space-x-4 mt-8">
              <Button 
                type="button"
                variant="outline"
                className="flex-1 border-zinc-600 text-white hover:bg-zinc-800"
              >
                Salvar como Rascunho
              </Button>
              <Button 
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Criando...' : 'Publicar Evento'}
              </Button>
            </div>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}