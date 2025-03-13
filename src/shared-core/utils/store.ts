// [平台] 共享核心
// [功能] Zustand状态管理

import { create } from 'zustand';
import { Buyer, Message, ProductInfo, AISettings, UserSettings } from '../api/types';
import { buyers } from '../../mock/buyers';
import { messages } from '../../mock/messages';
import { products } from '../../mock/products';

/**
 * 回复建议类型
 */
interface SuggestionResponse {
  id: string;
  content: string;
  type: 'general' | 'product' | 'pricing' | 'shipping';
}

/**
 * 应用状态接口
 */
interface AppState {
  // 买家相关
  buyers: Buyer[];
  selectedBuyerId: string | null;
  selectBuyer: (buyerId: string) => void;
  clearUnreadMessages: (buyerId: string) => void;
  
  // 消息相关
  messages: Message[];
  sendMessage: (content: string) => void;
  
  // 商品相关
  recommendedProducts: ProductInfo[];
  sendProduct: (productId: string) => void;
  
  // AI设置
  aiSettings: AISettings;
  updateAISettings: (settings: Partial<AISettings>) => void;
  
  // 用户设置
  userSettings: UserSettings;
  updateUserSettings: (settings: Partial<UserSettings>) => void;
  
  // AI回复建议
  replySuggestions: SuggestionResponse[];
  generateReplySuggestions: () => void;
  sendSuggestion: (suggestionId: string) => void;
}

/**
 * 创建应用状态store
 */
export const useAppStore = create<AppState>((set, get) => ({
  // 初始化买家数据
  buyers,
  selectedBuyerId: buyers.length > 0 ? buyers[0].id : null,
  selectBuyer: (buyerId) => {
    set({ selectedBuyerId: buyerId });
    // 选择买家时自动清除未读消息
    get().clearUnreadMessages(buyerId);
    // 选择买家时生成回复建议
    setTimeout(() => {
      get().generateReplySuggestions();
    }, 500);
  },
  
  // 清除未读消息计数
  clearUnreadMessages: (buyerId) => {
    set((state) => ({
      buyers: state.buyers.map(buyer => 
        buyer.id === buyerId 
          ? { ...buyer, unreadCount: 0 } 
          : buyer
      )
    }));
  },
  
  // 初始化消息数据
  messages,
  sendMessage: (content) => {
    const { selectedBuyerId } = get();
    if (!selectedBuyerId) return;
    
    // 创建新消息
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      buyerId: selectedBuyerId,
      senderId: 'seller-1',
      senderType: 'seller',
      content,
      timestamp: new Date(),
      status: 'sent',
    };
    
    // 更新消息列表
    set((state) => ({
      messages: [...state.messages, newMessage]
    }));
    
    // 模拟买家回复
    setTimeout(() => {
      const buyerReply: Message = {
        id: `msg-${Date.now() + 1}`,
        buyerId: selectedBuyerId,
        senderId: selectedBuyerId,
        senderType: 'buyer',
        content: 'OK, I understand. Thank you for your reply!',
        translatedContent: 'OK, I understand. Thank you for your reply!',
        timestamp: new Date(),
        status: 'delivered',
      };
      
      // 更新消息列表和未读消息计数
      set((state) => ({
        messages: [...state.messages, buyerReply],
        buyers: state.buyers.map(buyer => 
          buyer.id === selectedBuyerId 
            ? { 
                ...buyer, 
                lastMessage: buyerReply.content,
                lastMessageTime: buyerReply.timestamp,
                unreadCount: state.selectedBuyerId === selectedBuyerId ? 0 : buyer.unreadCount + 1
              } 
            : buyer
        )
      }));
      
      // 生成新的回复建议
      setTimeout(() => {
        get().generateReplySuggestions();
      }, 500);
    }, 2000);
  },
  
  // 初始化推荐商品 - 选择有效图片的商品
  recommendedProducts: [
    products.find(p => p.id === 'p001')!, // Phone Case
    products.find(p => p.id === 'p002')!, // Headphones
    products.find(p => p.id === 'p003')!  // Fast Charger
  ],
  sendProduct: (productId) => {
    const { selectedBuyerId } = get();
    if (!selectedBuyerId) return;
    
    // 查找商品
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // 创建带有商品信息的消息
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      buyerId: selectedBuyerId,
      senderId: 'seller-1',
      senderType: 'seller',
      content: `I would like to recommend our ${product.name}. It's priced at ${product.price} ${product.currency} and we have ${product.stock} units in stock.`,
      timestamp: new Date(),
      status: 'sent',
      attachments: [
        {
          id: `att-${Date.now()}`,
          type: 'product',
          url: product.images[0],
          name: product.name,
          productInfo: product
        }
      ]
    };
    
    // 更新消息列表
    set((state) => ({
      messages: [...state.messages, newMessage]
    }));
    
    // 生成新的回复建议
    setTimeout(() => {
      get().generateReplySuggestions();
    }, 500);
  },
  
  // 初始化AI设置
  aiSettings: {
    enabled: true,
    autoReply: false,
    supportedLanguages: ['en', 'es', 'fr', 'ja', 'zh'],
    customPrompts: [],
    selectedQuestions: ['Product Specifications', 'Pricing Inquiries', 'Shipping Time', 'Payment Methods']
  },
  updateAISettings: (settings) => {
    set((state) => ({
      aiSettings: {
        ...state.aiSettings,
        ...settings
      }
    }));
  },
  
  // 初始化用户设置
  userSettings: {
    language: 'en',
    notifications: {
      email: true,
      browser: true,
      mobile: false
    },
    aiSettings: {
      enabled: true,
      autoReply: false,
      supportedLanguages: ['en', 'es', 'fr', 'ja', 'zh'],
      customPrompts: [],
      selectedQuestions: ['Product Specifications', 'Pricing Inquiries', 'Shipping Time', 'Payment Methods']
    },
    theme: 'light'
  },
  updateUserSettings: (settings) => {
    set((state) => ({
      userSettings: {
        ...state.userSettings,
        ...settings
      }
    }));
  },
  
  // 初始化AI回复建议
  replySuggestions: [],
  
  // 生成回复建议
  generateReplySuggestions: () => {
    const { selectedBuyerId, buyers, messages } = get();
    if (!selectedBuyerId) return;
    
    // 获取当前买家
    const buyer = buyers.find(b => b.id === selectedBuyerId);
    if (!buyer) return;
    
    // 获取与当前买家的最近消息
    const buyerMessages = messages
      .filter(m => m.buyerId === selectedBuyerId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5);
    
    // 根据买家信息和历史消息生成回复建议
    const suggestions: SuggestionResponse[] = [];
    
    // 产品信息建议
    if (buyer.purchaseInfo.products.length > 0) {
      suggestions.push({
        id: `sug-product-${Date.now()}`,
        content: `We have ${buyer.purchaseInfo.products.join(', ')} available in stock. I can provide detailed specifications and customization options if you're interested.`,
        type: 'product'
      });
    }
    
    // 价格建议
    suggestions.push({
      id: `sug-price-${Date.now()}`,
      content: `For your order quantity of ${buyer.purchaseInfo.quantity} units, we can offer a competitive price within your budget of ${buyer.purchaseInfo.budget}. Would you like me to send you a detailed quotation?`,
      type: 'pricing'
    });
    
    // 物流建议
    suggestions.push({
      id: `sug-shipping-${Date.now()}`,
      content: `We can ship to ${buyer.purchaseInfo.destinationCountry} within 15-20 days via sea freight, or 5-7 days via air freight. Would you prefer faster delivery or more economical shipping?`,
      type: 'shipping'
    });
    
    // 一般回复建议
    suggestions.push({
      id: `sug-general-${Date.now()}`,
      content: `Thank you for your interest in our products. We're a professional manufacturer with over 10 years of experience. How can I assist you further with your requirements?`,
      type: 'general'
    });
    
    // 更新回复建议
    set({ replySuggestions: suggestions });
  },
  
  // 发送建议回复
  sendSuggestion: (suggestionId) => {
    const { replySuggestions } = get();
    const suggestion = replySuggestions.find(s => s.id === suggestionId);
    
    if (suggestion) {
      get().sendMessage(suggestion.content);
    }
  }
})); 