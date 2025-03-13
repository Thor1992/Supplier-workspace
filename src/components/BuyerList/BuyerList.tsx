// [平台] Web端
// [功能] 买家列表组件

'use client';

import React, { useState } from 'react';
import { SearchOutlined, FilterOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useAppStore } from '@/shared-core/utils/store';

// 买家等级类型
type BuyerLevel = 'all' | 'important' | 'spam';

// 等级颜色配置
const LEVEL_COLORS = {
  all: 'bg-blue-500',
  important: 'bg-yellow-500',
  spam: 'bg-red-500'
};

/**
 * 买家列表组件
 * 显示所有买家及其基本信息
 */
const BuyerList: React.FC = () => {
  const { buyers, selectedBuyerId, selectBuyer } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<BuyerLevel>('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  
  // 根据买家ID获取等级
  const getBuyerLevel = (buyerId: string): BuyerLevel => {
    // 这里可以根据实际业务逻辑来确定买家等级
    // 示例：ID为1和3的买家为重要客户，ID为4的买家为垃圾信息
    if (['1', '3'].includes(buyerId)) return 'important';
    if (['4'].includes(buyerId)) return 'spam';
    return 'all';
  };
  
  // 获取等级对应的颜色
  const getLevelBorderColor = (level: BuyerLevel): string => {
    switch (level) {
      case 'important': return 'border-yellow-500 dark:border-yellow-400';
      case 'spam': return 'border-red-500 dark:border-red-400';
      default: return 'border-gray-300 dark:border-gray-600';
    }
  };
  
  // 根据搜索词和筛选条件过滤买家
  const filteredBuyers = buyers.filter(buyer => {
    // 先按搜索词过滤
    const matchesSearch = 
      buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      buyer.country.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 再按等级过滤
    const buyerLevel = getBuyerLevel(buyer.id);
    const matchesFilter = filterLevel === 'all' || buyerLevel === filterLevel;
    
    return matchesSearch && matchesFilter;
  });

  // 获取国家代码对应的国旗emoji
  const getCountryFlag = (countryCode: string) => {
    // 将国家代码转换为区域指示符（Regional Indicator Symbol）
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    
    // 将代码点转换为emoji
    return String.fromCodePoint(...codePoints);
  };

  return (
    <div className="h-full flex flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      {/* 搜索框和筛选按钮 */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          {/* 搜索框 */}
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchOutlined className="text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search buyers..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* 筛选按钮 */}
          <div className="relative">
            <button 
              className="flex items-center justify-center gap-1 px-3 py-2 border rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            >
              <FilterOutlined />
              <div className="hidden sm:flex items-center">
                <span className={`inline-block w-2 h-2 rounded-full ${LEVEL_COLORS[filterLevel]} mr-1.5`}></span>
                <span>{filterLevel === 'all' ? 'All' : filterLevel === 'important' ? 'Important' : 'Spam'}</span>
              </div>
              <CaretDownOutlined className="text-xs ml-1" />
            </button>
            
            {/* 筛选下拉菜单 */}
            {showFilterDropdown && (
              <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
                <ul>
                  <li 
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${filterLevel === 'all' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''} flex items-center`}
                    onClick={() => {
                      setFilterLevel('all');
                      setShowFilterDropdown(false);
                    }}
                  >
                    <span className={`inline-block w-3 h-3 rounded-full ${LEVEL_COLORS.all} mr-2`}></span>
                    All Buyers
                  </li>
                  <li 
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${filterLevel === 'important' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''} flex items-center`}
                    onClick={() => {
                      setFilterLevel('important');
                      setShowFilterDropdown(false);
                    }}
                  >
                    <span className={`inline-block w-3 h-3 rounded-full ${LEVEL_COLORS.important} mr-2`}></span>
                    Important
                  </li>
                  <li 
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${filterLevel === 'spam' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''} flex items-center`}
                    onClick={() => {
                      setFilterLevel('spam');
                      setShowFilterDropdown(false);
                    }}
                  >
                    <span className={`inline-block w-3 h-3 rounded-full ${LEVEL_COLORS.spam} mr-2`}></span>
                    Spam
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* 买家列表 */}
      <div className="flex-1 overflow-y-auto" onClick={() => showFilterDropdown && setShowFilterDropdown(false)}>
        {filteredBuyers.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            No buyers found
          </div>
        ) : (
          <ul>
            {filteredBuyers.map(buyer => {
              const buyerLevel = getBuyerLevel(buyer.id);
              const borderColorClass = getLevelBorderColor(buyerLevel);
              
              return (
                <li 
                  key={buyer.id}
                  className={`py-3 px-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    selectedBuyerId === buyer.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                  onClick={() => selectBuyer(buyer.id)}
                >
                  <div className="flex items-center">
                    {/* 买家头像和国旗 */}
                    <div className="relative flex-shrink-0">
                      <img 
                        src={buyer.avatar} 
                        alt={buyer.name} 
                        className={`w-10 h-10 rounded-full object-cover border-2 ${borderColorClass}`}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.classList.add('bg-gray-200', 'dark:bg-gray-700', 'flex', 'items-center', 'justify-center', 'w-10', 'h-10', 'rounded-full');
                          const icon = document.createElement('span');
                          icon.className = 'text-gray-600 dark:text-gray-300';
                          icon.innerHTML = '<svg viewBox="64 64 896 896" focusable="false" data-icon="user" width="1.5em" height="1.5em" fill="currentColor" aria-hidden="true"><path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path></svg>';
                          e.currentTarget.parentElement!.appendChild(icon);
                        }}
                      />
                      {/* 国旗显示在头像右下角 */}
                      <span className="absolute -bottom-1 -right-1 text-lg" title={buyer.country}>
                        {getCountryFlag(buyer.countryCode)}
                      </span>
                      
                      {/* 在线状态指示器 */}
                      {buyer.status === 'active' && (
                        <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
                      )}
                    </div>
                    
                    {/* 买家信息 */}
                    <div className="ml-3 flex-1 overflow-hidden">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">{buyer.name}</h3>
                        {buyer.unreadCount > 0 && (
                          <span className="bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs ml-2">
                            {buyer.unreadCount}
                          </span>
                        )}
                      </div>
                      
                      {/* 最后一条消息预览 */}
                      {buyer.lastMessage && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate mt-0.5">
                          {buyer.lastMessage}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BuyerList; 