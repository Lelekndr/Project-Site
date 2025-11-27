"use client";

import { useState } from 'react';
import { Shield, Users, Trash2, Eye, UserCheck, UserX, Calendar, MapPin, Crown, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/common/Header';
import { Footer } from '@/components/ui/common/Footer';
import { DateFormatter } from '@/components/ui/DateFormatter';
import { ProtectedRoute } from '@/components/ui/common/ProtectedRoute';

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'creator' | 'admin';
  avatar?: string;
  location?: string;
  joinDate: string;
  lastLogin: string;
  status: 'active' | 'inactive' | 'suspended';
  eventsCreated?: number;
  eventsAttended?: number;
  totalSpent?: number;
}

export default function AdminUsersPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([
    {
      id: 1,
      name: "Maria Silva",
      email: "maria.silva@email.com",
      role: "user",
      location: "São Paulo, SP",
      joinDate: "2025-10-15",
      lastLogin: "2025-11-07",
      status: "active",
      eventsAttended: 12,
      totalSpent: 850.00
    },
    {
      id: 2,
      name: "João Santos",
      email: "joao.santos@email.com",
      role: "creator",
      location: "Rio de Janeiro, RJ",
      joinDate: "2025-09-20",
      lastLogin: "2025-11-06",
      status: "active",
      eventsCreated: 8,
      eventsAttended: 3,
      totalSpent: 320.00
    },
    {
      id: 3,
      name: "Ana Costa",
      email: "ana.costa@email.com",
      role: "user",
      location: "Belo Horizonte, MG",
      joinDate: "2025-11-01",
      lastLogin: "2025-11-07",
      status: "active",
      eventsAttended: 2,
      totalSpent: 150.00
    },
    {
      id: 4,
      name: "Carlos Oliveira",
      email: "carlos.oliveira@email.com",
      role: "creator",
      location: "Porto Alegre, RS",
      joinDate: "2025-08-10",
      lastLogin: "2025-10-25",
      status: "inactive",
      eventsCreated: 15,
      eventsAttended: 5,
      totalSpent: 680.00
    },
    {
      id: 5,
      name: "Lucia Ferreira",
      email: "lucia.ferreira@email.com",
      role: "user",
      location: "Salvador, BA",
      joinDate: "2025-07-30",
      lastLogin: "2025-09-15",
      status: "suspended",
      eventsAttended: 1,
      totalSpent: 80.00
    }
  ]);

  const handleDeleteUser = (userId: number) => {
    if (confirm('Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.')) {
      setUsers(users.filter(user => user.id !== userId));
      alert('Usuário excluído com sucesso!');
    }
  };

  const handleSuspendUser = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'suspended' ? 'active' : 'suspended' as 'active' | 'inactive' | 'suspended' }
        : user
    ));
  };

  const handleViewDetails = (user: AdminUser) => {
    setSelectedUser(user);
  };

  const handleViewUser = (user: AdminUser) => {
    setSelectedUser(user);
  };

  const handleEditUser = (user: AdminUser) => {
    alert(`Editando usuário: ${user.name}\nFuncionalidade em desenvolvimento...`);
  };

  const filteredUsers = users.filter(user => {
    switch (activeTab) {
      case 'new': return new Date(user.joinDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      case 'creators': return user.role === 'creator';
      case 'users': return user.role === 'user';
      case 'suspended': return user.status === 'suspended';
      default: return true;
    }
  });

  const getStatusBadge = (status: AdminUser['status']) => {
    switch (status) {
      case 'active': return 'bg-green-600/20 text-green-400';
      case 'inactive': return 'bg-yellow-600/20 text-yellow-400';
      case 'suspended': return 'bg-red-600/20 text-red-400';
      default: return 'bg-gray-600/20 text-gray-400';
    }
  };

  const getStatusText = (status: AdminUser['status']) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'inactive': return 'Inativo';
      case 'suspended': return 'Suspenso';
      default: return status;
    }
  };

  const getRoleIcon = (role: AdminUser['role']) => {
    switch (role) {
      case 'admin': return <Crown className="w-4 h-4" />;
      case 'creator': return <UserCheck className="w-4 h-4" />;
      case 'user': return <User className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getRoleText = (role: AdminUser['role']) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'creator': return 'Criador';
      case 'user': return 'Usuário';
      default: return role;
    }
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen colala-background bg-gradient-to-br from-violet-900 via-purple-900 to-black">
        <Header />
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Header da página */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-red-400 mr-3" />
                <h1 className="text-4xl font-bold text-white">Administração de Usuários</h1>
              </div>
              <p className="text-white/70 text-lg">Gerencie todos os usuários da plataforma</p>
            </div>

            {/* Tabs de filtro */}
            <div className="flex flex-wrap gap-2 mb-8 bg-white/5 backdrop-blur-md rounded-lg p-2">
              {[
                { key: 'all', label: 'Todos', icon: Users },
                { key: 'new', label: 'Novos (7 dias)', icon: UserCheck },
                { key: 'creators', label: 'Criadores', icon: Crown },
                { key: 'users', label: 'Usuários', icon: User },
                { key: 'suspended', label: 'Suspensos', icon: UserX }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === key
                      ? 'bg-purple-600 text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Lista de usuários */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden border border-white/20">
              {/* Desktop View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-6 text-white/90 font-semibold">Usuário</th>
                      <th className="text-left p-6 text-white/90 font-semibold">Tipo</th>
                      <th className="text-left p-6 text-white/90 font-semibold">Status</th>
                      <th className="text-left p-6 text-white/90 font-semibold">Cadastro</th>
                      <th className="text-left p-6 text-white/90 font-semibold">Atividade</th>
                      <th className="text-left p-6 text-white/90 font-semibold">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-6">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                              <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-white font-semibold">{user.name}</h3>
                              <p className="text-white/60 text-sm">{user.email}</p>
                              {user.location && (
                                <div className="flex items-center text-white/50 text-xs mt-1">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {user.location}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex items-center space-x-2">
                            {getRoleIcon(user.role)}
                            <span className="text-white/80">{getRoleText(user.role)}</span>
                          </div>
                        </td>
                        <td className="p-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(user.status)}`}>
                            {getStatusText(user.status)}
                          </span>
                        </td>
                        <td className="p-6">
                          <div className="text-white/80">
                            <DateFormatter date={user.joinDate} />
                          </div>
                          <div className="text-white/50 text-xs">
                            Último login: <DateFormatter date={user.lastLogin} />
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="text-white/80 text-sm">
                            {user.role === 'creator' && (
                              <div>Eventos criados: {user.eventsCreated || 0}</div>
                            )}
                            <div>Eventos participados: {user.eventsAttended || 0}</div>
                            <div className="text-green-400">Total gasto: R$ {user.totalSpent?.toFixed(2) || '0.00'}</div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex items-center space-x-2">
                            <Button
                              onClick={() => handleViewDetails(user)}
                              size="sm"
                              variant="outline"
                              className="bg-transparent border-white/20 text-white hover:bg-white/10"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              onClick={() => handleSuspendUser(user.id)}
                              size="sm"
                              variant="outline"
                              className={`bg-transparent border-white/20 text-white hover:bg-white/10 ${
                                user.status === 'suspended' ? 'text-green-400' : 'text-yellow-400'
                              }`}
                            >
                              {user.status === 'suspended' ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                            </Button>
                            <Button
                              onClick={() => handleDeleteUser(user.id)}
                              size="sm"
                              variant="outline"
                              className="bg-transparent border-red-500/50 text-red-400 hover:bg-red-500/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View - Cards */}
              <div className="lg:hidden space-y-4 p-4">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{user.name}</h3>
                          <p className="text-white/60 text-sm">{user.email}</p>
                          {user.location && (
                            <div className="flex items-center text-white/50 text-xs mt-1">
                              <MapPin className="w-3 h-3 mr-1" />
                              {user.location}
                            </div>
                          )}
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(user.status)}`}>
                        {getStatusText(user.status)}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white/60">Tipo:</span>
                        <div className="flex items-center space-x-2">
                          {getRoleIcon(user.role)}
                          <span className="text-white/80">{getRoleText(user.role)}</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Cadastro:</span>
                        <span className="text-white"><DateFormatter date={user.joinDate} /></span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Último login:</span>
                        <span className="text-white/70 text-xs">{user.lastLogin}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white flex-1 min-w-[70px]"
                        onClick={() => handleViewUser(user)}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Ver
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white flex-1 min-w-[70px]"
                        onClick={() => handleEditUser(user)}
                      >
                        <Settings className="w-3 h-3 mr-1" />
                        Editar
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white flex-1 min-w-[70px]"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Excluir
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white/70 mb-2">Nenhum usuário encontrado</h3>
                  <p className="text-white/50">Não há usuários nesta categoria no momento.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal de detalhes do usuário */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900/95 backdrop-blur-md rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Detalhes do Usuário</h2>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <span className="sr-only">Fechar</span>
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Informações básicas */}
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedUser.name}</h3>
                    <p className="text-white/70">{selectedUser.email}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        {getRoleIcon(selectedUser.role)}
                        <span className="text-white/80">{getRoleText(selectedUser.role)}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(selectedUser.status)}`}>
                        {getStatusText(selectedUser.status)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Informações detalhadas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-3 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Datas
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-white/60">Cadastro: </span>
                        <span className="text-white"><DateFormatter date={selectedUser.joinDate} /></span>
                      </div>
                      <div>
                        <span className="text-white/60">Último login: </span>
                        <span className="text-white"><DateFormatter date={selectedUser.lastLogin} /></span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-3 flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Localização
                    </h4>
                    <p className="text-white/80">{selectedUser.location || 'Não informado'}</p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-3">Atividade</h4>
                    <div className="space-y-2 text-sm">
                      {selectedUser.role === 'creator' && (
                        <div>
                          <span className="text-white/60">Eventos criados: </span>
                          <span className="text-white">{selectedUser.eventsCreated || 0}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-white/60">Eventos participados: </span>
                        <span className="text-white">{selectedUser.eventsAttended || 0}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-3">Financeiro</h4>
                    <div className="text-2xl font-bold text-green-400">
                      R$ {selectedUser.totalSpent?.toFixed(2) || '0.00'}
                    </div>
                    <p className="text-white/60 text-sm">Total gasto na plataforma</p>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex space-x-4 pt-4 border-t border-white/10">
                  <Button
                    onClick={() => handleSuspendUser(selectedUser.id)}
                    className={`flex-1 ${
                      selectedUser.status === 'suspended'
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-yellow-600 hover:bg-yellow-700'
                    }`}
                  >
                    {selectedUser.status === 'suspended' ? (
                      <>
                        <UserCheck className="w-4 h-4 mr-2" />
                        Reativar Usuário
                      </>
                    ) : (
                      <>
                        <UserX className="w-4 h-4 mr-2" />
                        Suspender Usuário
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => {
                      handleDeleteUser(selectedUser.id);
                      setSelectedUser(null);
                    }}
                    variant="destructive"
                    className="flex-1"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Excluir Usuário
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