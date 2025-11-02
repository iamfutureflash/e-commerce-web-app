export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}


export interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}