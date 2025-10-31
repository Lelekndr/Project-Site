# Sistema de Autenticação Multi-Role

Este projeto implementa um sistema de autenticação com 3 tipos de usuários: **Usuário**, **Criador** e **Administrador**, cada um com funcionalidades específicas.

## 🚀 Funcionalidades Implementadas

### ✅ Sistema de Autenticação
- **Autenticação por role**: Usuário, Criador e Administrador
- **Contexto de autenticação** global com React Context
- **Middleware de proteção** de rotas baseado em roles
- **Interface de login** com credenciais de teste pré-configuradas

### ✅ Tipos de Usuário

#### 👤 Usuário (User)
**Credenciais de teste:**
- Email: `usuario@test.com`
- Senha: `user123456`

**Funcionalidades:**
- ✅ Visualizar perfil pessoal com estatísticas
- ✅ Gerenciar eventos inscritos
- ✅ Se inscrever em novos eventos
- ✅ Cancelar inscrições
- ✅ Navegação específica no header

**Páginas disponíveis:**
- `/user/profile` - Perfil do usuário
- `/user/events` - Eventos do usuário

#### ⚡ Criador (Creator)
**Credenciais de teste:**
- Email: `criador@test.com`
- Senha: `creator123456`

**Funcionalidades:**
- ✅ Criar novos eventos com formulário completo
- ✅ Gerenciar eventos criados
- ✅ Acessar perfil de criador
- ✅ Navegação específica no header

**Páginas disponíveis:**
- `/creator/create` - Criar novo evento
- `/creator/profile` - Perfil do criador
- `/creator/events` - Gerenciar eventos

#### 🛡️ Administrador (Admin)
**Credenciais de teste:**
- Email: `admin@test.com`
- Senha: `admin123456`

**Funcionalidades:**
- ✅ Gerenciar todos os eventos da plataforma
- ✅ Aprovar/rejeitar eventos pendentes
- ✅ Visualizar estatísticas globais
- ✅ Administrar usuários e criadores
- ✅ Dashboard administrativo

**Páginas disponíveis:**
- `/admin/events` - Gerenciamento de eventos
- `/admin/users` - Gerenciamento de usuários
- `/admin/dashboard` - Dashboard administrativo

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Lucide React** - Ícones
- **Radix UI** - Componentes de interface
- **React Context** - Gerenciamento de estado global

## 📁 Estrutura do Projeto

```
├── app/
│   ├── admin/
│   │   └── events/page.tsx        # Gerenciamento de eventos (admin)
│   ├── creator/
│   │   └── create/page.tsx        # Criar eventos (criador)
│   ├── user/
│   │   ├── profile/page.tsx       # Perfil do usuário
│   │   └── events/page.tsx        # Eventos do usuário
│   ├── demo/page.tsx              # Página de demonstração
│   ├── login/page.tsx             # Página de login
│   └── layout.tsx                 # Layout principal com AuthProvider
├── components/
│   ├── login/
│   │   └── LoginForm.tsx          # Formulário de login atualizado
│   └── ui/
│       ├── common/
│       │   └── Header.tsx         # Header com navegação por role
│       └── dropdown-menu.tsx      # Componente dropdown menu
├── contexts/
│   └── AuthContext.tsx            # Contexto de autenticação
├── types/
│   └── auth.ts                    # Tipos de autenticação
└── middleware.ts                  # Middleware de proteção de rotas
```

## 🎯 Como Testar

### 1. Acesse a página de demonstração
Vá para: `http://localhost:3000/demo`

Esta página mostra:
- Status atual do usuário
- Credenciais de teste para cada tipo
- Funcionalidades disponíveis por role
- Links de acesso rápido

### 2. Teste o Login
1. Vá para `/login`
2. Use uma das credenciais de teste:
   - **Usuário**: `usuario@test.com` / `user123`
   - **Criador**: `criador@test.com` / `creator123`
   - **Administrador**: `admin@test.com` / `admin123`
3. Clique nos botões de credenciais para preencher automaticamente

### 3. Explore as funcionalidades
Após o login, observe:
- **Header atualizado** com navegação específica do role
- **Menu dropdown** com opções personalizadas
- **Acesso às páginas** específicas do seu tipo de usuário
- **Proteção de rotas** - tente acessar URLs de outros roles

### 4. Teste a proteção de rotas
- Tente acessar `/admin/events` como usuário comum
- Tente acessar `/creator/create` como usuário comum
- Você será redirecionado automaticamente

## 🔒 Segurança

- ✅ **Middleware de proteção** verifica permissões antes de acessar rotas
- ✅ **Verificação de role** em cada página protegida
- ✅ **Redirecionamento automático** para usuários não autorizados
- ✅ **Context API** para gerenciamento seguro do estado de autenticação
- ✅ **Cookies seguros** para persistência de sessão

## 🎨 Interface

- ✅ **Design responsivo** com Tailwind CSS
- ✅ **Temas escuros** com gradientes visuais
- ✅ **Componentes reutilizáveis** com Radix UI
- ✅ **Navegação intuitiva** baseada em roles
- ✅ **Feedback visual** para diferentes estados

## 🚦 Próximos Passos

Para produção, considere implementar:
- [ ] Integração com backend real
- [ ] JWT tokens para autenticação
- [ ] Criptografia de senhas
- [ ] Refresh tokens
- [ ] Auditoria de acessos
- [ ] Rate limiting
- [ ] Verificação de email
- [ ] Recuperação de senha

## 📝 Observações

Este é um sistema de demonstração com:
- **Autenticação simulada** (não conecta com backend real)
- **Dados mockados** para demonstração das funcionalidades
- **Credenciais fixas** para facilitar os testes
- **Foco na estrutura** e experiência do usuário

O sistema está totalmente funcional para demonstrar a arquitetura e fluxos de um sistema multi-role real.