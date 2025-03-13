// [平台] Web端
// [功能] 产品卡片组件

'use client';

import React from 'react';
import { ProductInfo } from '../../shared-core/api/types';
import { ShoppingOutlined, SendOutlined } from '@ant-design/icons';

interface ProductCardProps {
  product: ProductInfo;
  onSend: (productId: string) => void;
  compact?: boolean;
}

/**
 * 产品卡片组件
 * 显示商品信息，可以发送给买家
 */
const ProductCard: React.FC<ProductCardProps> = ({ product, onSend, compact = false }) => {
  return (
    <div className={`border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 ${compact ? '' : 'hover:shadow-md transition-shadow'}`}>
      {/* 商品图片 */}
      <div className={`bg-gray-200 dark:bg-gray-700 ${compact ? 'h-24' : 'h-40'}`}>
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <ShoppingOutlined className="text-2xl" />
          </div>
        )}
      </div>
      
      {/* 商品信息 */}
      <div className="p-3">
        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1">
          {product.name}
        </h4>
        
        {!compact && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
            {product.description}
          </p>
        )}
        
        <div className="flex justify-between items-center mt-2">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {product.price} {product.currency}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              库存: {product.stock}
            </p>
          </div>
          
          <button
            type="button"
            className={`inline-flex items-center border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              compact ? 'px-2 py-1' : 'px-2.5 py-1.5'
            }`}
            onClick={() => onSend(product.id)}
          >
            <SendOutlined className={compact ? '' : 'mr-1'} />
            {!compact && <span>发送</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 