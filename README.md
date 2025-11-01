# 🎫 EventHub - Plataforma de Eventos

Uma plataforma moderna e responsiva para descoberta, criação e gerenciamento de eventos, construída com as tecnologias mais avançadas do ecossistema React.

## 🚀 Tecnologias Utilizadas

### **Frontend Framework**
- ![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?logo=next.js&logoColor=white) - Framework React com SSR e App Router
- ![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react&logoColor=white) - Biblioteca principal para interface
- ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white) - Tipagem estática para JavaScript

### **Estilização & UI**
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?logo=tailwind-css&logoColor=white) - Framework CSS utilitário
- ![Radix UI](https://img.shields.io/badge/Radix_UI-Latest-8B5CF6?logo=radix-ui&logoColor=white) - Componentes primitivos acessíveis
  - `@radix-ui/react-dropdown-menu` - Menus dropdown
  - `@radix-ui/react-checkbox` - Checkboxes customizados
  - `@radix-ui/react-label` - Labels semânticos
  - `@radix-ui/react-slot` - Composição de componentes
- ![Lucide React](https://img.shields.io/badge/Lucide_React-0.545.0-FF6B6B?logo=lucide&logoColor=white) - Ícones SVG modernos
- `class-variance-authority` - Variantes de componentes
- `clsx` & `tailwind-merge` - Gerenciamento de classes CSS

### **Formulários & Validação**
- ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7.64.0-EC5990?logo=react-hook-form&logoColor=white) - Gerenciamento de formulários performático
- ![Zod](https://img.shields.io/badge/Zod-4.1.12-3E67B1?logo=zod&logoColor=white) - Validação de esquemas TypeScript-first
- `@hookform/resolvers` - Integração React Hook Form + Zod

### **Componentes Avançados**
- ![Swiper](https://img.shields.io/badge/Swiper-12.0.2-6332F6?logo=swiper&logoColor=white) - Carrossel responsivo e touch-friendly

### **Desenvolvimento & Qualidade**
- ![ESLint](https://img.shields.io/badge/ESLint-9.x-4B32C3?logo=eslint&logoColor=white) - Linting e padrões de código
- `eslint-config-next` - Configuração ESLint para Next.js
- `@tailwindcss/postcss` - Processamento CSS
- `tw-animate-css` - Animações CSS com Tailwind

### **Build & Performance**
- **Turbopack** - Bundler ultra-rápido do Next.js
- **App Router** - Sistema de roteamento moderno do Next.js 13+
- **Server Components** - Renderização no servidor
- **Image Optimization** - Otimização automática de imagens

## ✨ Funcionalidades Principais

### 🔐 **Sistema de Autenticação Multi-Role**
- **3 tipos de usuário:** Usuário comum, Criador de eventos, Administrador
- **Autenticação persistente** com localStorage e cookies
- **Rotas protegidas** com middleware personalizado
- **Redirecionamento automático** baseado no role do usuário

### 👤 **Gerenciamento de Perfil**
- **Configuração de perfil** com nome e avatar personalizáveis
- **Upload de imagem** com preview em tempo real
- **Sincronização automática** entre contexto e UI
- **Interface responsiva** para todas as telas

### 🎪 **Catálogo de Eventos**
- **Visualização em grid** e carrossel interativo
- **Filtros por categoria** (Música, Tecnologia, Comédia, Arte, Esporte)
- **Sistema de busca** em tempo real
- **Paginação inteligente** com botão "Carregar mais"
- **Cards responsivos** com informações detalhadas

### 📊 **Dashboard do Usuário**
- **"Meus Eventos"** - Gestão completa de eventos inscritos
- **Estatísticas visuais** - Eventos inscritos, participações, próximos eventos
- **Modal detalhado** para visualização completa de eventos
- **Remoção de eventos** com confirmação
- **Estados vazios** com call-to-actions

### 🎨 **Design System Consistente**
- **Paleta de cores moderna** com gradientes roxo/azul
- **Componentes reutilizáveis** com variantes
- **Animações suaves** e micro-interações
- **Dark mode** por padrão
- **Acessibilidade** seguindo padrões WCAG

### 📱 **Responsividade Completa**
- **Mobile-first** design approach
- **Breakpoints otimizados** para todas as telas
- **Touch-friendly** com gestos intuitivos
- **Performance** otimizada para dispositivos móveis

## 🗂️ Estrutura do Projeto

```
├── app/                    # App Router (Next.js 13+)
│   ├── admin/             # Painel administrativo
│   ├── creator/           # Dashboard do criador
│   ├── user/              # Dashboard do usuário
│   │   ├── events/        # Gerenciamento de eventos
│   │   └── profile/       # Configurações de perfil
│   ├── evento/[id]/       # Páginas dinâmicas de eventos
│   └── login/             # Autenticação
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Sistema de design
│   │   ├── common/       # Componentes compartilhados
│   │   └── ...           # Componentes base
│   ├── login/            # Componentes de login
│   └── register/         # Componentes de registro
├── contexts/             # Context API (Estado global)
├── hooks/                # Custom hooks
├── lib/                  # Utilitários e configurações
├── types/                # Definições TypeScript
└── public/               # Assets estáticos
```

## 🎯 Padrões de Desenvolvimento

### **Arquitetura de Componentes**
- **Composition over Inheritance** com Radix UI
- **Props typing** completa com TypeScript
- **Error boundaries** para tratamento de erros
- **Lazy loading** para otimização de performance

### **Estado e Contexto**
- **Context API** para estado global de autenticação
- **useState** local para estados de componente
- **Custom hooks** para lógica reutilizável
- **Persistência** com localStorage e cookies

### **Estilização**
- **Utility-first** com Tailwind CSS
- **Design tokens** consistentes
- **Responsive design** mobile-first
- **CSS-in-TS** com class-variance-authority

## 🚀 Começando

### **Pré-requisitos**
- Node.js 18.x ou superior
- npm, yarn, pnpm ou bun

### **Instalação**

```bash
# Clone o repositório
git clone <repository-url>

# Entre no diretório
cd project-site

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

### **Scripts Disponíveis**

```bash
npm run dev      # Servidor de desenvolvimento com Turbopack
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Verificação de código
```

## 🔑 Credenciais de Teste

### **Usuário Normal**
- **Email:** usuario@test.com
- **Senha:** user123456

### **Criador de Eventos**
- **Email:** criador@test.com
- **Senha:** creator123456

### **Administrador**
- **Email:** admin@test.com
- **Senha:** admin123456

## 🌟 Funcionalidades em Destaque

- ✅ **Autenticação multi-role** com middleware
- ✅ **Configuração de perfil** com upload de avatar
- ✅ **Gestão completa de eventos** do usuário
- ✅ **Interface responsiva** e moderna
- ✅ **Performance otimizada** com Next.js 15
- ✅ **Tipagem completa** com TypeScript
- ✅ **Acessibilidade** com Radix UI
- ✅ **Design system** consistente

---

**Desenvolvido com ❤️ usando as melhores práticas de desenvolvimento web moderno.**
