export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string[];
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  description: string;
  isOpen: boolean;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVegetarian?: boolean;
  isPopular?: boolean;
  sizes?: { name: string; price: number }[];
  addons?: { name: string; price: number }[];
}

export interface ItemCustomization {
  size?: string;
  addons: string[];
  specialInstructions?: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  restaurant: Restaurant;
  customization?: ItemCustomization;
}

export interface Order {
  id: string;
  items: CartItem[];
  restaurant: Restaurant;
  total: number;
  status: 'preparing' | 'on-the-way' | 'delivered';
  deliveryAddress: string;
  orderTime: Date;
  estimatedDelivery: Date;
}