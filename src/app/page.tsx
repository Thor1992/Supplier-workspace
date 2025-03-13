'use client';

import { useState, useEffect } from 'react';
import MainNavigation from '../components/Navigation/MainNavigation';
import SideNavigation from '../components/Navigation/SideNavigation';
import BuyerList from '../components/BuyerList/BuyerList';
import ChatBox from '../components/ChatBox/ChatBox';
import BuyerInfo from '../components/BuyerInfo/BuyerInfo';
import ResizableDivider from '../components/ResizableDivider/ResizableDivider';

// 默认宽度设置
const DEFAULT_BUYER_LIST_WIDTH = 280; // 买家列表宽度
const DEFAULT_BUYER_INFO_WIDTH = 320; // 买家信息宽度
const MIN_BUYER_LIST_WIDTH = 240; // 买家列表最小宽度
const MIN_BUYER_INFO_WIDTH = 280; // 买家信息最小宽度
const MAX_BUYER_LIST_WIDTH = 400; // 买家列表最大宽度
const MAX_BUYER_INFO_WIDTH = 500; // 买家信息最大宽度

/**
 * 主页面组件
 * 整合买家列表、聊天框和买家信息组件，支持调整区块大小
 */
export default function Home() {
  // 状态管理各区块宽度
  const [buyerListWidth, setBuyerListWidth] = useState(DEFAULT_BUYER_LIST_WIDTH);
  const [buyerInfoWidth, setBuyerInfoWidth] = useState(DEFAULT_BUYER_INFO_WIDTH);
  const [showBuyerList, setShowBuyerList] = useState(true);
  const [showBuyerInfo, setShowBuyerInfo] = useState(true);
  
  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      // 在小屏幕上自动调整显示
      if (width < 768) {
        setShowBuyerList(false);
        setShowBuyerInfo(false);
      } else if (width < 1200) {
        setShowBuyerList(true);
        setShowBuyerInfo(false);
      } else {
        setShowBuyerList(true);
        setShowBuyerInfo(true);
      }
    };
    
    // 初始化
    handleResize();
    
    // 保存宽度到本地存储
    const savedBuyerListWidth = localStorage.getItem('buyerListWidth');
    const savedBuyerInfoWidth = localStorage.getItem('buyerInfoWidth');
    
    if (savedBuyerListWidth) {
      setBuyerListWidth(Number(savedBuyerListWidth));
    }
    
    if (savedBuyerInfoWidth) {
      setBuyerInfoWidth(Number(savedBuyerInfoWidth));
    }
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // 处理买家列表宽度调整
  const handleBuyerListResize = (delta: number) => {
    setBuyerListWidth(prevWidth => {
      const newWidth = prevWidth + delta;
      const clampedWidth = Math.min(Math.max(newWidth, MIN_BUYER_LIST_WIDTH), MAX_BUYER_LIST_WIDTH);
      localStorage.setItem('buyerListWidth', clampedWidth.toString());
      return clampedWidth;
    });
  };
  
  // 处理买家信息宽度调整
  const handleBuyerInfoResize = (delta: number) => {
    setBuyerInfoWidth(prevWidth => {
      const newWidth = prevWidth - delta;
      const clampedWidth = Math.min(Math.max(newWidth, MIN_BUYER_INFO_WIDTH), MAX_BUYER_INFO_WIDTH);
      localStorage.setItem('buyerInfoWidth', clampedWidth.toString());
      return clampedWidth;
    });
  };
  
  // 切换买家列表显示
  const toggleBuyerList = () => {
    setShowBuyerList(prev => !prev);
  };
  
  // 切换买家信息显示
  const toggleBuyerInfo = () => {
    setShowBuyerInfo(prev => !prev);
  };
  
  return (
    <div className="flex flex-col h-screen">
      {/* 主导航 */}
      <MainNavigation 
        onToggleBuyerList={toggleBuyerList}
        onToggleBuyerInfo={toggleBuyerInfo}
      />
      
      {/* 主内容区域 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 侧边导航 */}
        <SideNavigation />
        
        {/* 买家列表 */}
        {showBuyerList && (
          <>
            <div style={{ width: `${buyerListWidth}px` }} className="h-full">
              <BuyerList />
            </div>
            <ResizableDivider direction="horizontal" onResize={handleBuyerListResize} />
          </>
        )}
        
        {/* 聊天框 - 自适应宽度 */}
        <div className="flex-1">
          <ChatBox />
        </div>
        
        {/* 买家信息 */}
        {showBuyerInfo && (
          <>
            <ResizableDivider direction="horizontal" onResize={handleBuyerInfoResize} />
            <div style={{ width: `${buyerInfoWidth}px` }} className="h-full">
              <BuyerInfo />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
