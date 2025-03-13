// [平台] Web端
// [功能] 买家信息侧边栏组件

'use client';

import React, { useState } from 'react';
import { useAppStore } from '../../shared-core/utils/store';
import { TagOutlined, ShoppingOutlined, GlobalOutlined, DollarOutlined, SendOutlined, CheckOutlined, LoadingOutlined } from '@ant-design/icons';

/**
 * 买家信息侧边栏组件
 * 显示当前选中买家的详细信息和推荐商品
 */
const BuyerInfo: React.FC = () => {
  const { buyers, selectedBuyerId, recommendedProducts, sendProduct } = useAppStore();
  
  // 发送状态管理
  const [sendingProductId, setSendingProductId] = useState<string | null>(null);
  const [sentProductIds, setSentProductIds] = useState<string[]>([]);
  
  // 获取当前选中的买家
  const selectedBuyer = buyers.find(buyer => buyer.id === selectedBuyerId);
  
  // 处理发送商品
  const handleSendProduct = (productId: string) => {
    // 如果已经发送过，不再重复发送
    if (sentProductIds.includes(productId)) return;
    
    // 设置发送中状态
    setSendingProductId(productId);
    
    // 发送商品
    sendProduct(productId);
    
    // 模拟发送延迟，更新状态
    setTimeout(() => {
      setSendingProductId(null);
      setSentProductIds(prev => [...prev, productId]);
    }, 1000);
  };
  
  // 获取按钮状态
  const getButtonState = (productId: string) => {
    if (sendingProductId === productId) {
      return {
        text: 'Sending...',
        icon: <LoadingOutlined className="mr-1" />,
        className: "inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-blue-500 cursor-wait"
      };
    } else if (sentProductIds.includes(productId)) {
      return {
        text: 'Sent',
        icon: <CheckOutlined className="mr-1" />,
        className: "inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-green-600"
      };
    } else {
      return {
        text: 'Send',
        icon: <SendOutlined className="mr-1" />,
        className: "inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      };
    }
  };
  
  // 如果没有选中买家，显示提示信息
  if (!selectedBuyer) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
        Please select a buyer to view details
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
      {/* 买家基本信息 */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center">
          <div className="h-16 w-16 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
            {selectedBuyer.avatar ? (
              <img src={selectedBuyer.avatar} alt={selectedBuyer.name} className="h-full w-full object-cover" />
            ) : (
              <span className="text-2xl font-semibold text-gray-600 dark:text-gray-300">
                {selectedBuyer.name.charAt(0)}
              </span>
            )}
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">{selectedBuyer.name}</h2>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <GlobalOutlined className="mr-1" />
              <span>{selectedBuyer.country}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* 采购信息 */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Purchase Information</h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <ShoppingOutlined className="text-gray-400 mt-0.5 mr-2" />
            <div>
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Products</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {selectedBuyer.purchaseInfo.products.map((product, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                  >
                    {product}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-start">
            <TagOutlined className="text-gray-400 mt-0.5 mr-2" />
            <div>
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Quantity</p>
              <p className="text-sm text-gray-900 dark:text-gray-100">{selectedBuyer.purchaseInfo.quantity} pcs</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <GlobalOutlined className="text-gray-400 mt-0.5 mr-2" />
            <div>
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Destination</p>
              <p className="text-sm text-gray-900 dark:text-gray-100">{selectedBuyer.purchaseInfo.destinationCountry}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <DollarOutlined className="text-gray-400 mt-0.5 mr-2" />
            <div>
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Budget</p>
              <p className="text-sm text-gray-900 dark:text-gray-100">{selectedBuyer.purchaseInfo.budget}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 沟通重点 */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Communication Focus</h3>
        <div className="space-y-2">
          {selectedBuyer.communicationFocus.map((focus, index) => (
            <div
              key={index}
              className="flex items-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-md"
            >
              <div className="h-2 w-2 rounded-full bg-yellow-400 mr-2"></div>
              <p className="text-sm text-yellow-800 dark:text-yellow-200">{focus}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* 推荐商品 */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">AI Recommended Products</h3>
          <button
            type="button"
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            aria-label="查看更多推荐商品"
          >
            View More
          </button>
        </div>
        
        <div className="space-y-3">
          {recommendedProducts.map((product) => {
            const buttonState = getButtonState(product.id);
            
            return (
              <div
                key={product.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 flex h-24"
              >
                {/* 左侧商品图片 - 1:1比例 */}
                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // 图片加载失败时显示默认图标
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                        const icon = document.createElement('span');
                        icon.className = 'text-2xl text-gray-400';
                        icon.innerHTML = '<svg viewBox="64 64 896 896" focusable="false" data-icon="shopping" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M832 312H696v-16c0-101.6-82.4-184-184-184s-184 82.4-184 184v16H192c-17.7 0-32 14.3-32 32v536c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V344c0-17.7-14.3-32-32-32zm-432-16c0-61.9 50.1-112 112-112s112 50.1 112 112v16H400v-16zm392 544H232V384h96v88c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-88h224v88c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-88h96v456z"></path></svg>';
                        e.currentTarget.parentElement!.appendChild(icon);
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <ShoppingOutlined className="text-2xl" />
                    </div>
                  )}
                </div>
                
                {/* 右侧商品信息 */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1">
                      {product.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                      {product.description}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {product.price} {product.currency}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Stock: {product.stock}
                      </p>
                    </div>
                    
                    <button
                      type="button"
                      className={buttonState.className}
                      onClick={() => handleSendProduct(product.id)}
                      disabled={sendingProductId === product.id || sentProductIds.includes(product.id)}
                      aria-label={`${buttonState.text} ${product.name}`}
                    >
                      {buttonState.icon}
                      {buttonState.text}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BuyerInfo; 