export interface EventData {
  id: number;
  imageSrc: string;
  title: string;
  subtitle?: string;
  author: string;
  category: string;
  date?: string;
  link: string;
}

// Define a estrutura para os dados da Categoria
export interface CategoryData {
  name: string;
  slug: string;
}

export const featuredEvents: EventData[] = [
  {
    id: 1,
    imageSrc: "/images/pexels-bertellifotografia-3321793.jpg",
    title: "Carnaval de Rua 2024: Blocos e Trios Elétricos",
    subtitle: "Grande festa popular com desfiles coloridos e música animada",
    author: "Chiari Sato",
    category: "parties-shows",
    link: "#",
  },
  {
    id: 2,
    imageSrc: "/images/comedy-club.jpg",
    title: "Stand Up Comedy Night com Comediantes Nacionais",
    subtitle: "Uma noite repleta de risadas e boa comédia brasileira",
    author: "Olivia Wilson",
    category: "stand-up",
    date: "21 JULY",
    link: "#",
  },
  {
    id: 3,
    imageSrc: "/images/feira-de-adoçao.jpg",
    title: "Pet Fest: Festival de Adoção e Diversão Canina",
    subtitle: "Evento para toda família e seus pets com atividades e adoção responsável",
    author: "Pet Events",
    category: "pet-events",
    link: "#",
  },
  {
    id: 4,
    imageSrc: "/images/tech-commit.jpg",
    title: "TechConnect Summit 2024: Inovação e IA",
    subtitle: "Conferência sobre as últimas tendências em tecnologia e inteligência artificial",
    author: "Tech Team",
    category: "tech",
    link: "#",
  },
  {
    id: 5,
    imageSrc: "/images/teatro.jpg",
    title: "Teatro: Romeo e Julieta - Versão Contemporânea",
    subtitle: "Uma adaptação moderna do clássico shakespeariano",
    author: "Teatro Municipal",
    category: "theater",
    link: "#",
  },
  {
    id: 6,
    imageSrc: "/images/futebol-amador.jpg",
    title: "Copa Regional de Futebol Amador 2024",
    subtitle: "Campeonato com 32 times da região metropolitana",
    author: "Liga Esportiva",
    category: "sports",
    date: "15 FEV",
    link: "#",
  },
  {
    id: 7,
    imageSrc: "/images/marketing-summit.jpg",
    title: "Marketing Digital Expo: Estratégias para 2024",
    subtitle: "As últimas tendências em marketing digital e growth hacking",
    author: "Marketing Pro",
    category: "marketing",
    link: "#",
  },
  {
    id: 8,
    imageSrc: "/images/pexels-alxs-919734.jpg",
    title: "Rock Brasil Festival: 3 Dias de Música Nacional",
    subtitle: "Festival com as melhores bandas do rock nacional",
    author: "Produtora Musical",
    category: "parties-shows",
    date: "20 MAR",
    link: "#",
  },
  {
    id: 9,
    imageSrc: "/images/bootcamp.jpg",
    title: "DevBootcamp: React, Next.js e TypeScript",
    subtitle: "Workshop intensivo de desenvolvimento web moderno",
    author: "Dev Academy",
    category: "tech",
    link: "#",
  },
  {
    id: 10,
    imageSrc: "/images/comedy-club.jpg",
    title: "Comedy Club: Noite de Humor com 5 Comediantes",
    subtitle: "Stand-up comedy ao vivo com artistas renomados",
    author: "Comedy Club",
    category: "stand-up",
    date: "10 ABR",
    link: "#",
  },
  {
    id: 11,
    imageSrc: "/images/feira-de-adoçao.jpg",
    title: "Expo Pet: Concurso Canino e Feira de Adoção",
    subtitle: "Concurso de beleza canina, feira de adoção e produtos pet",
    author: "Pet Society",
    category: "pet-events",
    link: "#",
  },
  {
    id: 12,
    imageSrc: "/images/feira-de-jazz.jpg",
    title: "Festival de Jazz do Brasil: 3 Noites Especiais",
    subtitle: "O melhor do jazz nacional e internacional",
    author: "Jazz Brasil",
    category: "parties-shows",
    date: "25 MAI",
    link: "#",
  },
  {
    id: 13,
    imageSrc: "/images/teatro.jpg",
    title: "Teatro Musical: O Rei Leão em Português",
    subtitle: "Espetáculo musical da Broadway adaptado para o Brasil",
    author: "Teatro Alfa",
    category: "theater",
    date: "12 JUN",
    link: "#",
  },
  {
    id: 14,
    imageSrc: "/images/corrida-pet.jpg",
    title: "Pet Run: Corrida com Cães para Caridade",
    subtitle: "Corrida beneficente de 5km com seu melhor amigo",
    author: "ONG AnimaisVida",
    category: "pet-events",
    date: "08 JUL",
    link: "#",
  },
  {
    id: 15,
    imageSrc: "/images/hacktaton.jpg",
    title: "Hackathon de IA: 48h de Inovação",
    subtitle: "Maratona de programação focada em inteligência artificial",
    author: "TechHub",
    category: "tech",
    date: "15 AGO",
    link: "#",
  },
  {
    id: 16,
    imageSrc: "/images/tenis-amador.jpg",
    title: "Open de Tênis Amador da Cidade",
    subtitle: "Torneio aberto para todas as categorias",
    author: "Clube de Tênis Municipal",
    category: "sports",
    date: "22 SET",
    link: "#",
  },
  {
    id: 17,
    imageSrc: "/images/comedy-club.jpg",
    title: "Stand Up: Batalha de Novos Talentos",
    subtitle: "Competição de comédia com comediantes iniciantes",
    author: "Risadaria Comedy",
    category: "stand-up",
    date: "05 OUT",
    link: "#",
  },
  {
    id: 18,
    imageSrc: "/images/marketing-summit.jpg",
    title: "Marketing Summit: ROI e Performance",
    subtitle: "Conferência sobre métricas e resultados em marketing",
    author: "Growth Academy",
    category: "marketing",
    date: "18 NOV",
    link: "#",
  }];

// Função para obter eventos por categoria
export function getEventsByCategory(category: string): EventData[] {
  if (category === 'all') {
    return featuredEvents;
  }
  return featuredEvents.filter(event => event.category === category);
}

// Função para obter estatísticas das categorias
export function getCategoryStats() {
  const stats: Record<string, number> = {};
  
  featuredEvents.forEach(event => {
    stats[event.category] = (stats[event.category] || 0) + 1;
  });
  
  return stats;
}

// Função para obter categorias disponíveis
export function getAvailableCategories(): CategoryData[] {
  return [
    { name: 'ALL', slug: 'all' },
    { name: 'STAND UP COMEDY', slug: 'stand-up' },
    { name: 'EVENTOS PET', slug: 'pet-events' },
    { name: 'FESTAS & SHOWS', slug: 'parties-shows' },
    { name: 'TEATROS', slug: 'theater' },
    { name: 'ESPORTES', slug: 'sports' },
    { name: 'TECH', slug: 'tech' },
    { name: 'MARKETING', slug: 'marketing' },
  ];
}
