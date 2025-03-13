// [平台] 共享核心
// [功能] API类型定义

/**
 * 买家信息接口
 */
export interface Buyer {
  id: string;
  name: string;
  avatar: string;
  country: string;
  countryCode: string;
  language: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  purchaseInfo: {
    products: string[];
    quantity: number;
    destinationCountry: string;
    budget: string;
  };
  communicationFocus: string[];
  status: 'active' | 'inactive';
  online?: boolean;
  orderCount?: number;
  totalSpent?: number;
  customerSince?: string;
}

/**
 * 消息类型
 */
export interface Message {
  id: string;
  buyerId: string;
  senderId: string;
  senderType: 'buyer' | 'seller' | 'system' | 'ai';
  content: string;
  translatedContent?: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  attachments?: Attachment[];
}

/**
 * 附件类型
 */
export interface Attachment {
  id: string;
  type: 'image' | 'document' | 'product';
  url: string;
  name: string;
  size?: number;
  productInfo?: ProductInfo;
}

/**
 * 商品信息
 */
export interface ProductInfo {
  id: string;
  name: string;
  description: string;
  price: string;
  currency: string;
  images: string[];
  stock: number;
  specifications: Record<string, string>;
}

/**
 * 资料库项目
 */
export interface ResourceItem {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  fileUrl?: string;
  fileType?: string;
}

/**
 * AI设置
 */
export interface AISettings {
  enabled: boolean;
  autoReply: boolean;
  supportedLanguages: string[];
  customPrompts: string[];
  selectedQuestions: string[];
}

/**
 * 用户设置
 */
export interface UserSettings {
  language: string;
  notifications: {
    email: boolean;
    browser: boolean;
    mobile: boolean;
  };
  aiSettings: AISettings;
  theme: 'light' | 'dark' | 'system';
}

/**
 * 翻译请求
 */
export interface TranslationRequest {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
}

/**
 * 翻译响应
 */
export interface TranslationResponse {
  translatedText: string;
  detectedLanguage?: string;
}

/**
 * API响应包装器
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
} 