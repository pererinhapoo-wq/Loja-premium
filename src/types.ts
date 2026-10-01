export type ProductCategory = 
  | 'Essenciais' 
  | 'Design' 
  | 'Tecnologia' 
  | 'Estilo' 
  | 'Casa' 
  | 'Bem-estar';

export interface ProductSpec {
  key: string;
  value: string;
}

export interface ProductColor {
  name: string;
  hex: string;
  border?: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  collection: string;
  price: number;
  originalPrice?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isWeeklyHighlight?: boolean;
  isSpotlight?: boolean;
  image: string;
  secondaryImages: string[];
  description: string;
  editorialNote: string;
  specs: ProductSpec[];
  materials: string[];
  dimensions: string;
  colors: ProductColor[];
  badge?: string;
  styleProfile: ('minimalista' | 'aluminio' | 'expressivo' | 'urbano')[];
  intentMatch: ('estilo' | 'casa' | 'diaadia' | 'presentear' | 'colecao')[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export type CuratedIntent = 
  | 'estilo' 
  | 'casa' 
  | 'diaadia' 
  | 'presentear' 
  | 'colecao';

export type CuratedStyle = 
  | 'minimalista' 
  | 'aluminio' 
  | 'expressivo' 
  | 'urbano';

export interface FilterState {
  searchQuery: string;
  category: string;
  collection: string;
  priceRange: [number, number];
  material: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'name';
}
