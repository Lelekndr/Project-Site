// Define a estrutura para os dados que o seu Card de Evento irá receber.
export interface EventData {
  id: number;
  imageSrc: string;
  title: string;
  subtitle?: string; // Para o primeiro card, onde o subtítulo é o texto em português
  date?: string; // Para cards que mostram datas
  author?: string; // Para cards de artigo
  category?: string; // Para tags/categorias secundárias
  link: string;
}

// Define a estrutura para os dados da Categoria
export interface CategoryData {
    name: string;
    slug: string;
}