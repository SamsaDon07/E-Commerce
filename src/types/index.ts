export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'customer' | 'vendor' | 'admin';
  avatar?: string;
  createdAt: Date;
}

export interface Store {
  id: string;
  name: string;
  description: string;
  vendorId: string;
  logo?: string;
  banner?: string;
  status: 'active' | 'pending' | 'suspended';
  rating: number;
  totalProducts: number;
  totalSales: number;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  storeId: string;
  storeName: string;
  inventory: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  variants?: ProductVariant[];
  isFeatured: boolean;
  isActive: boolean;
  createdAt: Date;
}

export interface ProductVariant {
  id: string;
  name: string;
  options: string[];
  priceModifier?: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariant?: string;
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  variant?: string;
  image: string;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface Review {
  id: string;
  productId: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: Date;
  verified: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  parentId?: string;
  isActive: boolean;
}

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  status: 'pending' | 'succeeded' | 'failed';
  method: string;
  transactionId?: string;
  createdAt: Date;
}

export interface Analytics {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  growthRate: number;
  topProducts: Product[];
  salesData: { date: string; sales: number }[];
}

export interface Notification {
  id: string;
  userId: string;
  type: 'order' | 'payment' | 'system' | 'marketing';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}
