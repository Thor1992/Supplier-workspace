// [平台] Web端
// [功能] 侧边导航组件

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageOutlined, FileOutlined, SettingOutlined } from '@ant-design/icons';

/**
 * 侧边导航组件
 * 提供应用的主要导航功能，显示在页面左侧
 */
const SideNavigation: React.FC = () => {
  const pathname = usePathname();
  
  // 导航项定义
  const navItems = [
    {
      label: 'Chat Workspace',
      path: '/',
      icon: <MessageOutlined />
    },
    {
      label: 'Resources',
      path: '/resources',
      icon: <FileOutlined />
    },
    {
      label: 'AI Settings',
      path: '/settings',
      icon: <SettingOutlined />
    }
  ];
  
  return (
    <div className="h-full bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 w-16 md:w-56 flex-shrink-0">
      <div className="flex flex-col h-full">
        {/* 导航菜单 */}
        <div className="flex-1 py-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    pathname === item.path
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="ml-3 hidden md:block">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideNavigation; 