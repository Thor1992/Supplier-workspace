// [平台] Web端
// [功能] 商品模拟数据

import { ProductInfo } from '../shared-core/api/types';

/**
 * 商品模拟数据
 * 用于展示AI推荐商品卡片功能
 */
export const products: ProductInfo[] = [
  {
    id: 'p001',
    name: 'Premium Phone Case',
    description: 'High-quality phone case for various models, providing excellent drop protection.',
    price: '5.99',
    currency: 'USD',
    images: ['/products/phone-case-1.jpg'],
    stock: 5000,
    specifications: {
      'Material': 'Eco-friendly TPU + PC',
      'Colors': 'Black, Clear, Blue',
      'Compatibility': 'Compatible with iPhone and mainstream Android models',
      'Features': 'Drop-proof, Scratch-resistant, Precise cutouts'
    }
  },
  {
    id: 'p002',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless Bluetooth headphones with long battery life and comfortable fit.',
    price: '15.99',
    currency: 'USD',
    images: ['/products/headphones-1.jpg'],
    stock: 2000,
    specifications: {
      'Connection': 'Bluetooth 5.0',
      'Battery Life': '8 hours playback time',
      'Charging': 'Type-C fast charging',
      'Water Resistance': 'IPX5',
      'Colors': 'Black, White, Red'
    }
  },
  {
    id: 'p003',
    name: 'Fast Charger',
    description: '18W fast charger compatible with multiple devices, safe and reliable.',
    price: '8.99',
    currency: 'USD',
    images: ['/products/charger-1.jpg'],
    stock: 3000,
    specifications: {
      'Input': '100-240V~50/60Hz 0.5A',
      'Output': '5V/3A, 9V/2A, 12V/1.5A',
      'Ports': 'USB-A + Type-C',
      'Safety Certifications': 'CE, FCC, RoHS',
      'Color': 'White'
    }
  },
  {
    id: 'p004',
    name: 'Smart Watch',
    description: 'Multifunctional smart watch with health monitoring, notifications, and long battery life.',
    price: '29.99',
    currency: 'USD',
    images: ['/products/smartwatch-1.jpg'],
    stock: 1000,
    specifications: {
      'Screen': '1.3-inch color touchscreen',
      'Water Resistance': 'IP68',
      'Battery': '7-day battery life',
      'Functions': 'Heart rate monitoring, Sleep tracking, Activity tracking',
      'Compatibility': 'iOS 9.0+, Android 5.0+'
    }
  },
  {
    id: 'p005',
    name: 'Portable Bluetooth Speaker',
    description: 'Compact portable Bluetooth speaker with excellent sound quality and waterproof design.',
    price: '19.99',
    currency: 'USD',
    images: ['/products/headphones-1.jpg'],
    stock: 1500,
    specifications: {
      'Power': '10W',
      'Connection': 'Bluetooth 5.0',
      'Water Resistance': 'IPX7',
      'Battery': '12 hours playback time',
      'Dimensions': '8.6 x 8.6 x 8.9 cm'
    }
  },
  {
    id: 'p006',
    name: 'Moisturizing Cream',
    description: 'Deep moisturizing cream suitable for all skin types, hydrating without feeling greasy.',
    price: '12.99',
    currency: 'USD',
    images: ['/products/phone-case-1.jpg'],
    stock: 2000,
    specifications: {
      'Volume': '50ml',
      'Ingredients': 'Hyaluronic Acid, Glycerin, Vitamin E',
      'Skin Type': 'All skin types',
      'Certification': 'EU certified',
      'Shelf Life': '36 months'
    }
  },
  {
    id: 'p007',
    name: 'Facial Serum',
    description: 'High-concentration serum that improves skin texture and brightens complexion.',
    price: '16.99',
    currency: 'USD',
    images: ['/products/smartwatch-1.jpg'],
    stock: 1800,
    specifications: {
      'Volume': '30ml',
      'Ingredients': 'Niacinamide, Hyaluronic Acid, Vitamin C',
      'Skin Type': 'All skin types',
      'Certification': 'EU certified',
      'Shelf Life': '24 months'
    }
  },
  {
    id: 'p008',
    name: 'Face Mask Set',
    description: 'Multi-effect face mask set to meet different skin needs.',
    price: '9.99',
    currency: 'USD',
    images: ['/products/charger-1.jpg'],
    stock: 3000,
    specifications: {
      'Quantity': '10 sheets/box',
      'Types': 'Hydrating, Brightening, Soothing',
      'Skin Type': 'All skin types',
      'Certification': 'EU certified',
      'Shelf Life': '36 months'
    }
  },
  {
    id: 'p009',
    name: 'Luxury Watch',
    description: 'Exquisite luxury watch with Swiss movement and leather strap.',
    price: '299.99',
    currency: 'USD',
    images: ['/products/smartwatch-1.jpg'],
    stock: 100,
    specifications: {
      'Movement': 'Swiss quartz movement',
      'Case': '316L stainless steel',
      'Strap': 'Genuine leather',
      'Water Resistance': '50 meters',
      'Warranty': '2-year international warranty'
    }
  },
  {
    id: 'p010',
    name: 'Premium Leather Wallet',
    description: 'High-quality genuine leather wallet with exquisite craftsmanship and multiple card slots.',
    price: '49.99',
    currency: 'USD',
    images: ['/products/phone-case-1.jpg'],
    stock: 200,
    specifications: {
      'Material': 'Top-grain leather',
      'Dimensions': '12 x 9.5 x 2 cm',
      'Colors': 'Black, Brown',
      'Card Slots': '8 card slots',
      'Features': 'RFID blocking'
    }
  }
]; 