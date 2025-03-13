// [平台] Web端
// [功能] 买家模拟数据

import { Buyer } from '../shared-core/api/types';

/**
 * 买家模拟数据
 * 包含不同国家的买家信息，用于展示买家列表和聊天功能
 */
export const buyers: Buyer[] = [
  {
    id: '1',
    name: 'Carlos Rodriguez',
    avatar: '/avatars/buyer1.jpg',
    country: 'Mexico',
    countryCode: 'MX',
    language: 'Spanish',
    lastMessage: '¿Cuándo puedes enviar los productos?',
    lastMessageTime: new Date('2023-05-15T10:30:00'),
    unreadCount: 3,
    purchaseInfo: {
      products: ['Phone Cases', 'Headphones', 'Chargers'],
      quantity: 1000,
      destinationCountry: 'Mexico',
      budget: '$5000',
    },
    communicationFocus: [
      'High quality requirements',
      'Concerned about delivery time',
      'Seeking exclusive distribution rights'
    ],
    status: 'active',
    online: true,
    orderCount: 5,
    totalSpent: 4850,
    customerSince: 'Jan 2023',
  },
  {
    id: '2',
    name: 'Hiroshi Tanaka',
    avatar: '/avatars/buyer2.jpg',
    country: 'Japan',
    countryCode: 'JP',
    language: 'Japanese',
    lastMessage: '製品の品質証明書を送ってください。',
    lastMessageTime: new Date('2023-05-14T16:45:00'),
    unreadCount: 0,
    purchaseInfo: {
      products: ['Smart Watches', 'Bluetooth Speakers'],
      quantity: 500,
      destinationCountry: 'Japan',
      budget: '$8000',
    },
    communicationFocus: [
      'Extremely focused on product quality',
      'Needs detailed specifications',
      'High packaging requirements'
    ],
    status: 'active',
    online: true,
    orderCount: 8,
    totalSpent: 7650,
    customerSince: 'Mar 2022',
  },
  {
    id: '3',
    name: 'Sophie Martin',
    avatar: '/avatars/buyer3.jpg',
    country: 'France',
    countryCode: 'FR',
    language: 'French',
    lastMessage: 'Pouvez-vous offrir un échantillon gratuit?',
    lastMessageTime: new Date('2023-05-15T09:15:00'),
    unreadCount: 1,
    purchaseInfo: {
      products: ['Cosmetics', 'Skincare Products'],
      quantity: 2000,
      destinationCountry: 'France',
      budget: '$12000',
    },
    communicationFocus: [
      'Concerned about product ingredients',
      'Requires EU certification',
      'Values brand image'
    ],
    status: 'active',
    online: true,
    orderCount: 12,
    totalSpent: 11200,
    customerSince: 'Nov 2022',
  },
  {
    id: '4',
    name: 'Mohammed Al-Farsi',
    avatar: '/avatars/buyer4.jpg',
    country: 'UAE',
    countryCode: 'AE',
    language: 'Arabic',
    lastMessage: 'هل يمكنك تقديم خصم للطلبات الكبيرة؟',
    lastMessageTime: new Date('2023-05-13T14:20:00'),
    unreadCount: 0,
    purchaseInfo: {
      products: ['Luxury Watches', 'Leather Goods'],
      quantity: 100,
      destinationCountry: 'UAE',
      budget: '$50000',
    },
    communicationFocus: [
      'Focused on product prestige',
      'Requests customization',
      'Concerned about after-sales service'
    ],
    status: 'inactive',
    online: false,
    orderCount: 3,
    totalSpent: 48500,
    customerSince: 'Apr 2023',
  },
  {
    id: '5',
    name: 'Anna Petrova',
    avatar: '/avatars/buyer5.jpg',
    country: 'Russia',
    countryCode: 'RU',
    language: 'Russian',
    lastMessage: 'Какие способы оплаты вы принимаете?',
    lastMessageTime: new Date('2023-05-12T11:50:00'),
    unreadCount: 0,
    purchaseInfo: {
      products: ['Winter Clothing', 'Thermal Products'],
      quantity: 3000,
      destinationCountry: 'Russia',
      budget: '$20000',
    },
    communicationFocus: [
      'Focused on logistics solutions',
      'Needs detailed payment terms',
      'Values long-term cooperation'
    ],
    status: 'active',
    online: false,
    orderCount: 15,
    totalSpent: 19200,
    customerSince: 'Feb 2022',
  }
]; 