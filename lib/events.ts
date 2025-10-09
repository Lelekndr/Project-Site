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

export const featuredEvents: EventData[] = [
  {
    id: 1,
    imageSrc: "/images/image1.png",
    title: "Carnaval vibrante com desfiles coloridos e música animada",
    subtitle: "Texto descritivo do evento em português",
    author: "Chiari Sato",
    category: "Case Studies",
    link: "#",
  },
  {
    id: 2,
    imageSrc: "/images/image2.jpg",
    title: "The Future of Marketing: Predictions for the Next 5 Years",
    author: "Olivia Wilson",
    category: "Marketing Trends",
    date: "21 JULY",
    link: "#",
  },
  {
    id: 3,
    imageSrc: "/images/image3.jpg",
    title: "Crafting a Killer Content Strategy: Tips and Tricks for Success",
    author: "Olivia Wilson",
    category: "Content Strategy",
    link: "#",
  },
  {
    id: 4,
    imageSrc: "/images/image4.avif",
    title: "Tech Innovation Summit 2024",
    author: "Tech Team",
    category: "Tech",
    link: "#",
  },
  {
    id: 5,
    imageSrc: "/images/image5.jpg",
    title: "Tech Innovation Summit 2024",
    author: "Tech Team",
    category: "Tech",
    link: "#",
  },
  
];

// ...outros eventos
