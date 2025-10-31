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
    imageSrc: "/images/image1.png",
    title: "Carnaval vibrante com desfiles coloridos e música animada",
    subtitle: "Texto descritivo do evento em português",
    author: "Chiari Sato",
    category: "parties-shows",
    link: "#",
  },
  {
    id: 2,
    imageSrc: "/images/image2.jpg",
    title: "Stand Up Comedy Night",
    author: "Olivia Wilson",
    category: "stand-up",
    date: "21 JULY",
    link: "#",
  },
  {
    id: 3,
    imageSrc: "/images/image3.jpg",
    title: "Festival Pet Friendly",
    subtitle: "Evento para toda família e seus pets",
    author: "Pet Events",
    category: "pet-events",
    link: "#",
  },
  {
    id: 4,
    imageSrc: "/images/image4.avif",
    title: "Tech Innovation Summit 2024",
    author: "Tech Team",
    category: "tech",
    link: "#",
  },
  {
    id: 5,
    imageSrc: "/images/image4.avif",
    title: "Peça Teatral: Romeo e Julieta",
    subtitle: "Uma adaptação moderna do clássico",
    author: "Teatro Municipal",
    category: "theater",
    link: "#",
  },
  {
    id: 6,
    imageSrc: "/images/image4.avif",
    title: "Campeonato de Futebol Regional",
    author: "Liga Esportiva",
    category: "sports",
    date: "15 FEV",
    link: "#",
  },
  {
    id: 7,
    imageSrc: "/images/image4.avif",
    title: "Marketing Digital Conference",
    subtitle: "As últimas tendências em marketing",
    author: "Marketing Pro",
    category: "marketing",
    link: "#",
  },
  {
    id: 8,
    imageSrc: "/images/image4.avif",
    title: "Show de Rock Nacional",
    author: "Produtora Musical",
    category: "parties-shows",
    date: "20 MAR",
    link: "#",
  },
  {
    id: 9,
    imageSrc: "/images/image4.avif",
    title: "Workshop de Desenvolvimento Web",
    subtitle: "Aprenda React e Next.js na prática",
    author: "Dev Academy",
    category: "tech",
    link: "#",
  },
  {
    id: 10,
    imageSrc: "/images/image4.avif",
    title: "Noite de Comédia ao Vivo",
    author: "Comedy Club",
    category: "stand-up",
    date: "10 ABR",
    link: "#",
  },
  {
    id: 11,
    imageSrc: "/images/image4.avif",
    title: "Exposição Canina",
    subtitle: "Concurso de beleza canina e adoção responsável",
    author: "Pet Society",
    category: "pet-events",
    link: "#",
  },
  {
    id: 12,
    imageSrc: "/images/image4.avif",
    title: "Festival de Jazz",
    author: "Jazz Brasil",
    category: "parties-shows",
    date: "25 MAI",
    link: "#",
  }];
