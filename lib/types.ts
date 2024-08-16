
export interface Category {
    name: string;
    src: string;
    category: string;
    synopsis?: string; 
  }
export interface CardProps {
    categories: Category[];
} 