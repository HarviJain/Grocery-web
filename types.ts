
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  image: string;
  description: string;
  isPopular?: boolean;
  calories?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface AIResponse {
  recipeName: string;
  ingredients: string[];
  instructions: string[];
  estimatedTime: string;
  tips: string;
}

export interface ShippingInfo {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
}

export interface PaymentInfo {
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export type CheckoutStep = 'cart' | 'shipping' | 'payment' | 'summary' | 'success';
