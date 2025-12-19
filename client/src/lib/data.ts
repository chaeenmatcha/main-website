import matchaProductImage from '@assets/image_1765777067758.png';

export interface Product {
  id: string;
  name: string;
  weight: string;
  originalPrice: number;
  price: number;
  description: string;
  benefits: string[];
  image: string;
  category: 'ceremonial' | 'culinary' | 'sets';
}

export const products: Product[] = [
  {
    id: 'chaeen-matcha-30g',
    name: 'CHAEEN MATCHA – Ceremonial Grade A',
    weight: '30g',
    originalPrice: 999,
    price: 899,
    description: "Premium Ceremonial Grade A matcha sourced directly from Shizuoka, Japan. Rich in antioxidants, supports heart health, immunity, and glowing skin. Stone-ground, vibrant green, and smooth umami taste.",
    benefits: ['Rich in Antioxidants', 'Supports Heart Health', 'Boosts Immunity', 'Promotes Glowing Skin'],
    image: matchaProductImage,
    category: 'ceremonial'
  },
  {
    id: 'chaeen-matcha-15g',
    name: 'CHAEEN MATCHA – Ceremonial Grade A',
    weight: '15g',
    originalPrice: 559,
    price: 469,
    description: "The same premium quality in a smaller pack. Perfect for trying out or gifting. Sourced from Shizuoka, Japan.",
    benefits: ['Rich in Antioxidants', 'Supports Heart Health', 'Boosts Immunity'],
    image: matchaProductImage,
    category: 'ceremonial'
  }
];
