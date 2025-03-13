// [平台] Web端
// [功能] 可调整大小的分隔线组件

'use client';

import React, { useState, useCallback, useEffect } from 'react';

interface ResizableDividerProps {
  direction: 'horizontal' | 'vertical';
  onResize: (delta: number) => void;
  className?: string;
}

/**
 * 可调整大小的分隔线组件
 * 用于在两个区块之间提供可拖动的分隔线，实现区块大小调整
 */
const ResizableDivider: React.FC<ResizableDividerProps> = ({ 
  direction, 
  onResize,
  className = ''
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  
  // 处理拖动开始
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartPosition({ x: e.clientX, y: e.clientY });
    
    // 添加全局拖动样式
    document.body.classList.add(direction === 'horizontal' ? 'resizing-horizontal' : 'resizing-vertical');
    
    // 添加遮罩层防止文本选中
    const overlay = document.createElement('div');
    overlay.className = 'resize-overlay';
    document.body.appendChild(overlay);
  }, [direction]);
  
  // 处理拖动过程
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const delta = direction === 'horizontal' 
      ? e.clientX - startPosition.x 
      : e.clientY - startPosition.y;
    
    if (delta !== 0) {
      onResize(delta);
      setStartPosition({ x: e.clientX, y: e.clientY });
    }
  }, [isDragging, direction, onResize, startPosition]);
  
  // 处理拖动结束
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    
    // 移除全局拖动样式
    document.body.classList.remove('resizing-horizontal', 'resizing-vertical');
    
    // 移除遮罩层
    const overlay = document.querySelector('.resize-overlay');
    if (overlay) {
      overlay.parentNode?.removeChild(overlay);
    }
  }, []);
  
  // 添加和移除全局事件监听器
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);
  
  return (
    <div 
      className={`
        ${direction === 'horizontal' ? 'cursor-col-resize w-1 hover:w-2' : 'cursor-row-resize h-1 hover:h-2'} 
        bg-gray-300 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-blue-600 transition-all
        ${isDragging ? 'bg-blue-500 dark:bg-blue-700 z-50' : ''}
        ${className}
      `}
      onMouseDown={handleMouseDown}
    />
  );
};

export default ResizableDivider; 