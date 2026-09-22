export interface Product {
  id: string;
  name: string;
  price: number; // Owner's selling price in PKR (Rs.)
  originalPrice?: number; // Optional compare-at price
  category: string;
  images: string[];
  description: string;
  sizes?: string[];
  colors?: string[];
  inStock: boolean;
  isFeatured?: boolean;
  freeDelivery: boolean;
  cashOnDelivery: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
  description: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  whatsappNumber: string; // international format e.g. "923001234567"
  whatsappDisplayNumber: string; // e.g. "0300 1234567"
  email: string;
  location: string;
  deliveryTime: string;
  customLogoUrl?: string;
  heroHeading: string;
  heroSubheading: string;
}

export type PageView = 'home' | 'shop' | 'categories' | 'about' | 'contact';
