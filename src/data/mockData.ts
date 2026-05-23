import { Product, Store, User, Order, Review, Category } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'customer@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    email: 'vendor@example.com',
    firstName: 'Sarah',
    lastName: 'Smith',
    role: 'vendor',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    createdAt: new Date('2024-01-20')
  },
  {
    id: '3',
    email: 'admin@example.com',
    firstName: 'Mike',
    lastName: 'Johnson',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    createdAt: new Date('2024-01-01')
  }
];

export const mockStores: Store[] = [
  {
    id: '1',
    name: 'TechGear Pro',
    description: 'Premium electronics and tech accessories for modern life',
    vendorId: '2',
    logo: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
    banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=400&fit=crop',
    status: 'active',
    rating: 4.8,
    totalProducts: 156,
    totalSales: 1234,
    createdAt: new Date('2024-01-20')
  },
  {
    id: '2',
    name: 'Urban Fashion',
    description: 'Trendy clothing and accessories for the modern urbanite',
    vendorId: '3',
    logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop',
    banner: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
    status: 'active',
    rating: 4.6,
    totalProducts: 89,
    totalSales: 892,
    createdAt: new Date('2024-02-10')
  },
  {
    id: '3',
    name: 'Home Essentials',
    description: 'Everything you need to make your house a home',
    vendorId: '2',
    logo: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=200&h=200&fit=crop',
    banner: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200&h=400&fit=crop',
    status: 'pending',
    rating: 0,
    totalProducts: 45,
    totalSales: 0,
    createdAt: new Date('2024-03-01')
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Noise-Canceling Headphones',
    description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and superior sound quality.',
    price: 299.99,
    comparePrice: 399.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop'
    ],
    category: 'Electronics',
    subcategory: 'Audio',
    storeId: '1',
    storeName: 'TechGear Pro',
    inventory: 45,
    rating: 4.7,
    reviewCount: 123,
    tags: ['headphones', 'wireless', 'noise-canceling', 'bluetooth'],
    variants: [
      { id: 'v1', name: 'Color', options: ['Black', 'Silver', 'Rose Gold'], priceModifier: 0 },
      { id: 'v2', name: 'Model', options: ['Standard', 'Pro'], priceModifier: 50 }
    ],
    isFeatured: true,
    isActive: true,
    createdAt: new Date('2024-01-25')
  },
  {
    id: '2',
    name: 'Smart Watch Series 6',
    description: 'Advanced fitness tracking, heart rate monitoring, GPS, and smartphone integration in a sleek design.',
    price: 449.99,
    comparePrice: 549.99,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&h=600&fit=crop'
    ],
    category: 'Electronics',
    subcategory: 'Wearables',
    storeId: '1',
    storeName: 'TechGear Pro',
    inventory: 32,
    rating: 4.8,
    reviewCount: 89,
    tags: ['smartwatch', 'fitness', 'health', 'gps'],
    variants: [
      { id: 'v3', name: 'Color', options: ['Black', 'White', 'Blue'], priceModifier: 0 },
      { id: 'v4', name: 'Size', options: ['40mm', '44mm'], priceModifier: 30 }
    ],
    isFeatured: true,
    isActive: true,
    createdAt: new Date('2024-02-01')
  },
  {
    id: '3',
    name: 'Designer Leather Jacket',
    description: 'Genuine leather biker jacket with modern cut and premium hardware.',
    price: 599.99,
    comparePrice: 799.99,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&h=600&fit=crop'
    ],
    category: 'Fashion',
    subcategory: 'Outerwear',
    storeId: '2',
    storeName: 'Urban Fashion',
    inventory: 15,
    rating: 4.9,
    reviewCount: 67,
    tags: ['leather', 'jacket', 'outerwear', 'premium'],
    variants: [
      { id: 'v5', name: 'Size', options: ['S', 'M', 'L', 'XL', 'XXL'], priceModifier: 0 },
      { id: 'v6', name: 'Color', options: ['Black', 'Brown'], priceModifier: 0 }
    ],
    isFeatured: true,
    isActive: true,
    createdAt: new Date('2024-02-15')
  },
  {
    id: '4',
    name: '4K Webcam with Microphone',
    description: 'Professional-grade webcam with 4K resolution, auto-focus, and built-in noise-canceling microphone.',
    price: 149.99,
    comparePrice: 199.99,
    images: [
      'https://images.unsplash.com/photo-1598986646512-9330bcc4c0dc?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1595126739121-68ab4225f9cf?w=600&h=600&fit=crop'
    ],
    category: 'Electronics',
    subcategory: 'Accessories',
    storeId: '1',
    storeName: 'TechGear Pro',
    inventory: 78,
    rating: 4.5,
    reviewCount: 234,
    tags: ['webcam', '4k', 'microphone', 'streaming'],
    isFeatured: false,
    isActive: true,
    createdAt: new Date('2024-03-01')
  },
  {
    id: '5',
    name: 'Minimalist Backpack',
    description: 'Water-resistant backpack with laptop compartment and USB charging port.',
    price: 89.99,
    comparePrice: 119.99,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&h=600&fit=crop'
    ],
    category: 'Fashion',
    subcategory: 'Accessories',
    storeId: '2',
    storeName: 'Urban Fashion',
    inventory: 56,
    rating: 4.6,
    reviewCount: 178,
    tags: ['backpack', 'laptop', 'water-resistant', 'usb'],
    variants: [
      { id: 'v7', name: 'Color', options: ['Black', 'Gray', 'Navy'], priceModifier: 0 }
    ],
    isFeatured: false,
    isActive: true,
    createdAt: new Date('2024-03-10')
  },
  {
    id: '6',
    name: 'Ceramic Dinnerware Set',
    description: '16-piece handcrafted ceramic dinnerware set, microwave and dishwasher safe.',
    price: 129.99,
    comparePrice: 159.99,
    images: [
      'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1525974160448-038dacadcc71?w=600&h=600&fit=crop'
    ],
    category: 'Home & Garden',
    subcategory: 'Kitchen',
    storeId: '3',
    storeName: 'Home Essentials',
    inventory: 23,
    rating: 4.4,
    reviewCount: 45,
    tags: ['ceramic', 'dinnerware', 'kitchen', 'handcrafted'],
    isFeatured: false,
    isActive: true,
    createdAt: new Date('2024-03-15')
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerId: '1',
    items: [
      {
        productId: '1',
        name: 'Wireless Noise-Canceling Headphones',
        price: 299.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop'
      },
      {
        productId: '5',
        name: 'Minimalist Backpack',
        price: 89.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop'
      }
    ],
    totalAmount: 479.97,
    status: 'delivered',
    paymentStatus: 'paid',
    shippingAddress: {
      id: 'addr1',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      isDefault: true
    },
    paymentMethod: 'card',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-05')
  },
  {
    id: 'ORD-002',
    customerId: '1',
    items: [
      {
        productId: '2',
        name: 'Smart Watch Series 6',
        price: 449.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop'
      }
    ],
    totalAmount: 449.99,
    status: 'shipped',
    paymentStatus: 'paid',
    shippingAddress: {
      id: 'addr1',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      isDefault: true
    },
    paymentMethod: 'card',
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-18')
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    productId: '1',
    customerId: '1',
    customerName: 'John Doe',
    rating: 5,
    comment: 'Absolutely love these headphones! The noise cancellation is incredible and the battery life exceeds expectations.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop'
    ],
    createdAt: new Date('2024-02-10'),
    verified: true
  },
  {
    id: '2',
    productId: '1',
    customerId: '2',
    customerName: 'Sarah Smith',
    rating: 4,
    comment: 'Great sound quality and comfortable for long wear. Only issue is the carrying case could be better.',
    createdAt: new Date('2024-02-15'),
    verified: true
  }
];

export const mockCategories: Category[] = [
  { id: '1', name: 'Electronics', slug: 'electronics', description: 'Latest electronic gadgets and devices including iPhone 17 Pro and MacBook', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop', parentId: undefined, isActive: true },
  { id: '2', name: 'Fashion', slug: 'fashion', description: 'Clothing, shoes, and accessories', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop', parentId: undefined, isActive: true },
  { id: '3', name: 'Home & Garden', slug: 'home-garden', description: 'Everything for your home and garden', image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=300&fit=crop', parentId: undefined, isActive: true },
  { id: '4', name: 'Sports & Outdoors', slug: 'sports-outdoors', description: 'Fitness gear, outdoor equipment and sports accessories', image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=400&h=300&fit=crop', parentId: undefined, isActive: true },
  { id: '5', name: 'Books & Media', slug: 'books-media', description: 'Books, movies, music and digital content', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop', parentId: undefined, isActive: true },
  { id: '6', name: 'Toys & Games', slug: 'toys-games', description: 'Toys, games and entertainment for all ages', image: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=400&h=300&fit=crop', parentId: undefined, isActive: true },
  { id: '7', name: 'Beauty & Health', slug: 'beauty-health', description: 'Cosmetics, skincare and wellness products', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop', parentId: undefined, isActive: true },
  { id: '8', name: 'Automotive', slug: 'automotive', description: 'Car accessories and automotive tools', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9a7?w=400&h=300&fit=crop', parentId: undefined, isActive: true },
  { id: '9', name: 'Audio', slug: 'audio', description: 'Headphones, speakers, and audio equipment', image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop', parentId: '1', isActive: true },
  { id: '10', name: 'Wearables', slug: 'wearables', description: 'Smart watches and fitness trackers', image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=300&fit=crop', parentId: '1', isActive: true },
  { id: '11', name: 'Accessories', slug: 'accessories', description: 'Tech accessories and gadgets', image: 'https://images.unsplash.com/photo-1595126739121-68ab4225f9cf?w=400&h=300&fit=crop', parentId: '1', isActive: true },
  { id: '12', name: 'Outerwear', slug: 'outerwear', description: 'Jackets, coats, and outerwear', image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=300&fit=crop', parentId: '2', isActive: true },
  { id: '13', name: 'Bags', slug: 'bags', description: 'Backpacks, handbags, and luggage', image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&h=300&fit=crop', parentId: '2', isActive: true },
  { id: '14', name: 'Kitchen', slug: 'kitchen', description: 'Kitchenware and dining essentials', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop', parentId: '3', isActive: true }
];

export const mockSalesData = [
  { month: 'Jan', sales: 45000, orders: 120 },
  { month: 'Feb', sales: 52000, orders: 145 },
  { month: 'Mar', sales: 48000, orders: 132 },
  { month: 'Apr', sales: 61000, orders: 168 },
  { month: 'May', sales: 58000, orders: 155 },
  { month: 'Jun', sales: 67000, orders: 189 }
];
