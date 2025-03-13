// [平台] Web端
// [功能] 主导航组件

'use client';

import React from 'react';
import { MessageOutlined, FileOutlined, SettingOutlined, MenuOutlined, InfoCircleOutlined } from '@ant-design/icons';

interface MainNavigationProps {
  onToggleBuyerList?: () => void;
  onToggleBuyerInfo?: () => void;
}

/**
 * 主导航组件
 * 提供应用的主要导航功能
 */
const MainNavigation: React.FC<MainNavigationProps> = ({ 
  onToggleBuyerList,
  onToggleBuyerInfo
}) => {
  return (
    <nav className="bg-gray-900 border-b border-gray-700 shadow-lg flex justify-between items-center h-16 px-4 z-10">
      {/* Logo和品牌名称 - 左侧 */}
      <div className="flex items-center">
        {/* 移动端菜单按钮 */}
        {onToggleBuyerList && (
          <button 
            type="button"
            className="mr-3 text-gray-300 hover:text-white md:hidden"
            onClick={onToggleBuyerList}
            aria-label="Toggle buyer list"
          >
            <MenuOutlined className="text-xl" />
          </button>
        )}
        
        <span className="text-xl font-bold text-blue-400">Cross-Border Merchant Workspace</span>
      </div>
      
      {/* 用户信息和操作按钮 - 右侧 */}
      <div className="flex items-center space-x-4">
        {/* 买家信息切换按钮 */}
        {onToggleBuyerInfo && (
          <button
            type="button"
            className="text-gray-300 hover:text-white hidden md:block"
            onClick={onToggleBuyerInfo}
            aria-label="Toggle buyer info"
          >
            <InfoCircleOutlined className="text-xl" />
          </button>
        )}
        
        {/* 用户头像 */}
        <div className="relative">
          <div className="flex items-center">
            <button
              type="button"
              className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <img 
                src="/avatars/merchant.jpg" 
                alt="Merchant" 
                className="h-8 w-8 rounded-full object-cover border-2 border-gray-700"
                onError={(e) => {
                  // 图片加载失败时显示默认图标
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.classList.add('bg-gray-700', 'flex', 'items-center', 'justify-center', 'h-8', 'w-8', 'rounded-full', 'border-2', 'border-gray-600');
                  const icon = document.createElement('span');
                  icon.className = 'text-gray-300';
                  icon.innerHTML = '<svg viewBox="64 64 896 896" focusable="false" data-icon="user" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path></svg>';
                  e.currentTarget.parentElement!.appendChild(icon);
                }}
              />
            </button>
            <span className="ml-2 text-sm text-gray-300 hidden md:block">John Smith</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation; 