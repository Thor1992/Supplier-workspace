// [平台] Web端
// [功能] 聊天框组件

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../../shared-core/utils/store';
import { SendOutlined, PaperClipOutlined, SmileOutlined, RobotOutlined, TagOutlined, DollarOutlined, GlobalOutlined } from '@ant-design/icons';
import { getLanguageCode } from '../../shared-core/translation/translationService';

/**
 * 聊天框组件
 * 显示与当前选中买家的聊天记录，并提供发送消息功能
 */
const ChatBox: React.FC = () => {
  const { messages, buyers, selectedBuyerId, sendMessage, replySuggestions, generateReplySuggestions, sendSuggestion } = useAppStore();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // 获取当前选中的买家
  const selectedBuyer = buyers.find(buyer => buyer.id === selectedBuyerId);
  
  // 过滤出当前买家的消息
  const buyerMessages = messages.filter(message => message.buyerId === selectedBuyerId);
  
  // 滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // 当消息列表更新或选中买家变化时，滚动到底部
  useEffect(() => {
    scrollToBottom();
  }, [buyerMessages, selectedBuyerId]);
  
  // 当选中买家变化时，生成回复建议
  useEffect(() => {
    if (selectedBuyerId) {
      generateReplySuggestions();
    }
  }, [selectedBuyerId, generateReplySuggestions]);
  
  // 处理发送消息
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    sendMessage(inputValue);
    setInputValue('');
  };
  
  // 处理按键事件
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // 处理发送建议回复
  const handleSendSuggestion = (suggestionId: string) => {
    sendSuggestion(suggestionId);
  };
  
  // 获取建议类型图标
  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'product':
        return <TagOutlined className="text-blue-500" />;
      case 'pricing':
        return <DollarOutlined className="text-green-500" />;
      case 'shipping':
        return <GlobalOutlined className="text-purple-500" />;
      default:
        return <RobotOutlined className="text-gray-500" />;
    }
  };
  
  // 如果没有选中买家，显示提示信息
  if (!selectedBuyer) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
        请选择一个买家开始聊天
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* 聊天头部 */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
            {selectedBuyer.avatar ? (
              <img src={selectedBuyer.avatar} alt={selectedBuyer.name} className="h-full w-full object-cover" />
            ) : (
              <span className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                {selectedBuyer.name.charAt(0)}
              </span>
            )}
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">{selectedBuyer.name}</h3>
            <div className="flex items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">{selectedBuyer.country}</span>
              <span className="mx-1 text-gray-300 dark:text-gray-600">•</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{selectedBuyer.language}</span>
              {selectedBuyer.status === 'active' && (
                <>
                  <span className="mx-1 text-gray-300 dark:text-gray-600">•</span>
                  <span className="inline-flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">在线</span>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* 聊天消息区域 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {buyerMessages.map((message) => {
          const isSeller = message.senderType === 'seller';
          const isSystem = message.senderType === 'system';
          const isAI = message.senderType === 'ai';
          
          // 系统消息样式
          if (isSystem) {
            return (
              <div key={message.id} className="flex justify-center">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full px-4 py-1">
                  <span className="text-xs text-gray-600 dark:text-gray-300">{message.content}</span>
                </div>
              </div>
            );
          }
          
          // AI消息样式
          if (isAI) {
            return (
              <div key={message.id} className="flex justify-start">
                <div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg px-4 py-2 max-w-[80%]">
                  <div className="flex items-center mb-1">
                    <span className="text-xs font-medium text-purple-600 dark:text-purple-400">AI助手</span>
                  </div>
                  <p className="text-sm text-gray-800 dark:text-gray-200">{message.content}</p>
                </div>
              </div>
            );
          }
          
          return (
            <div key={message.id} className={`flex ${isSeller ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  isSeller
                    ? 'bg-blue-100 dark:bg-blue-900/30'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <p className={`text-sm ${isSeller ? 'text-gray-800 dark:text-gray-200' : 'text-gray-800 dark:text-gray-200'}`}>
                  {message.content}
                </p>
                
                {/* 翻译内容 */}
                {message.translatedContent && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 italic">
                    {message.translatedContent}
                  </p>
                )}
                
                {/* 附件 */}
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-2">
                    {message.attachments.map(attachment => (
                      <div key={attachment.id} className="mt-2">
                        {attachment.type === 'image' && (
                          <img
                            src={attachment.url}
                            alt={attachment.name}
                            className="max-h-40 rounded-md"
                          />
                        )}
                        {attachment.type === 'product' && attachment.productInfo && (
                          <div className="border border-gray-200 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-800">
                            <div className="flex">
                              <img
                                src={attachment.url}
                                alt={attachment.name}
                                className="h-16 w-16 object-cover rounded-md"
                              />
                              <div className="ml-2">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                  {attachment.productInfo.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {attachment.productInfo.price} {attachment.productInfo.currency}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  库存: {attachment.productInfo.stock}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                {/* 消息时间 */}
                <div className={`text-xs text-gray-400 mt-1 ${isSeller ? 'text-right' : 'text-left'}`}>
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      
      {/* AI回复建议区域 */}
      {replySuggestions.length > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3">
          <div className="flex items-center mb-2">
            <RobotOutlined className="text-blue-500 mr-2" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">AI回复建议</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {replySuggestions.map(suggestion => (
              <button
                key={suggestion.id}
                className="flex items-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                onClick={() => handleSendSuggestion(suggestion.id)}
                aria-label={`发送建议回复: ${suggestion.content}`}
              >
                <span className="mr-2" aria-hidden="true">{getSuggestionIcon(suggestion.type)}</span>
                <span className="line-clamp-1">{suggestion.content.length > 60 ? suggestion.content.substring(0, 60) + '...' : suggestion.content}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* 输入区域 */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
        <div className="flex items-end">
          <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
            <textarea
              className="w-full bg-transparent border-0 focus:ring-0 text-gray-900 dark:text-gray-100 resize-none outline-none"
              placeholder={`用英语给 ${selectedBuyer.name} 发消息...`}
              rows={2}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="flex justify-between items-center mt-2">
              <div className="flex space-x-2">
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  aria-label="添加附件"
                >
                  <PaperClipOutlined />
                </button>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  aria-label="添加表情"
                >
                  <SmileOutlined />
                </button>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                将自动翻译为{selectedBuyer.language}
              </div>
            </div>
          </div>
          <button
            type="button"
            className="ml-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 flex items-center justify-center"
            onClick={handleSendMessage}
            aria-label="发送消息"
          >
            <SendOutlined />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox; 