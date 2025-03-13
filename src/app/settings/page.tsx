'use client';

import React, { useState, useEffect } from 'react';
import MainNavigation from '../../components/Navigation/MainNavigation';
import SideNavigation from '../../components/Navigation/SideNavigation';
import { PlusOutlined, CheckCircleOutlined } from '@ant-design/icons';

// 定义设置类型
interface AISettingsState {
  aiEnabled: boolean;
  defaultQuestions: {id: string; text: string; enabled: boolean}[];
  autoReplyQuestions: {id: string; enabled: boolean}[];
  responseDelay: number;
  communicationStyle: string;
  replyLength: string;
}

/**
 * AI设置页面组件
 * 提供客服agent开关控制和买家诉求问题定制功能
 */
export default function SettingsPage() {
  // 保存成功提示状态
  const [showSaveSuccess, setShowSaveSuccess] = useState<boolean>(false);
  
  // 默认设置
  const defaultSettings: AISettingsState = {
    responseDelay: 10,
    defaultQuestions: [
      { id: 'q1', text: 'Purchase Quantity', enabled: true },
      { id: 'q2', text: 'Destination Country/Region', enabled: true },
      { id: 'q3', text: 'Sample Requirements', enabled: false },
      { id: 'q4', text: 'Budget Range', enabled: true },
      { id: 'q5', text: 'Expected Delivery Time', enabled: false },
      { id: 'q6', text: 'Special Packaging Requirements', enabled: false },
      { id: 'q7', text: 'Payment Method Preference', enabled: false },
    ],
    autoReplyQuestions: [
      { id: 'question-1', enabled: true },
      { id: 'question-2', enabled: true },
      { id: 'question-3', enabled: true },
      { id: 'question-4', enabled: true },
      { id: 'question-5', enabled: false },
    ],
    aiEnabled: true,
    communicationStyle: 'friendly',
    replyLength: 'moderate'
  };
  
  // 响应时间延迟状态
  const [responseDelay, setResponseDelay] = useState<number>(defaultSettings.responseDelay);
  
  // 默认询问问题状态
  const [defaultQuestions, setDefaultQuestions] = useState<{id: string; text: string; enabled: boolean}[]>(
    defaultSettings.defaultQuestions
  );
  
  // 新问题输入状态
  const [newQuestion, setNewQuestion] = useState<string>('');
  const [showAddQuestion, setShowAddQuestion] = useState<boolean>(false);
  
  // 自动回复问题状态
  const [autoReplyQuestions, setAutoReplyQuestions] = useState<{id: string; enabled: boolean}[]>(
    defaultSettings.autoReplyQuestions
  );
  
  // AI开关状态
  const [aiEnabled, setAiEnabled] = useState<boolean>(defaultSettings.aiEnabled);
  
  // 通信风格状态
  const [communicationStyle, setCommunicationStyle] = useState<string>(defaultSettings.communicationStyle);
  
  // 回复长度状态
  const [replyLength, setReplyLength] = useState<string>(defaultSettings.replyLength);
  
  // 从localStorage加载设置
  useEffect(() => {
    const loadSettings = () => {
      try {
        const savedSettings = localStorage.getItem('aiSettings');
        if (savedSettings) {
          const parsedSettings: AISettingsState = JSON.parse(savedSettings);
          
          setResponseDelay(parsedSettings.responseDelay);
          setDefaultQuestions(parsedSettings.defaultQuestions);
          setAutoReplyQuestions(parsedSettings.autoReplyQuestions);
          setAiEnabled(parsedSettings.aiEnabled);
          setCommunicationStyle(parsedSettings.communicationStyle);
          setReplyLength(parsedSettings.replyLength);
          
          console.log('Settings loaded from localStorage:', parsedSettings);
        }
      } catch (error) {
        console.error('Error loading settings from localStorage:', error);
      }
    };
    
    loadSettings();
  }, []);

  // 处理滑块值变化
  const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResponseDelay(parseInt(e.target.value));
  };
  
  // 处理问题启用状态变化
  const handleQuestionToggle = (id: string) => {
    setDefaultQuestions(prev => 
      prev.map(q => q.id === id ? { ...q, enabled: !q.enabled } : q)
    );
  };
  
  // 处理自动回复问题启用状态变化
  const handleAutoReplyToggle = (id: string) => {
    setAutoReplyQuestions(prev => 
      prev.map(q => q.id === id ? { ...q, enabled: !q.enabled } : q)
    );
  };
  
  // 处理AI开关变化
  const handleAiToggle = () => {
    setAiEnabled(!aiEnabled);
  };
  
  // 处理通信风格变化
  const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCommunicationStyle(e.target.value);
  };
  
  // 处理回复长度变化
  const handleReplyLengthChange = (value: string) => {
    setReplyLength(value);
  };
  
  // 添加新问题
  const handleAddQuestion = () => {
    if (newQuestion.trim() === '') return;
    
    const newId = `q${defaultQuestions.length + 1}`;
    setDefaultQuestions(prev => [
      ...prev, 
      { id: newId, text: newQuestion.trim(), enabled: true }
    ]);
    
    setNewQuestion('');
    setShowAddQuestion(false);
  };
  
  // 保存设置
  const handleSaveSettings = () => {
    // 收集当前设置
    const currentSettings: AISettingsState = {
      aiEnabled,
      defaultQuestions,
      autoReplyQuestions,
      responseDelay,
      communicationStyle,
      replyLength
    };
    
    try {
      // 保存到localStorage
      localStorage.setItem('aiSettings', JSON.stringify(currentSettings));
      console.log('Settings saved to localStorage:', currentSettings);
      
      // 显示保存成功提示
      setShowSaveSuccess(true);
      
      // 3秒后隐藏提示
      setTimeout(() => {
        setShowSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving settings to localStorage:', error);
      alert('Failed to save settings. Please try again.');
    }
  };
  
  // 重置设置
  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      setResponseDelay(defaultSettings.responseDelay);
      setDefaultQuestions(defaultSettings.defaultQuestions);
      setAutoReplyQuestions(defaultSettings.autoReplyQuestions);
      setAiEnabled(defaultSettings.aiEnabled);
      setCommunicationStyle(defaultSettings.communicationStyle);
      setReplyLength(defaultSettings.replyLength);
      
      // 从localStorage中移除保存的设置
      localStorage.removeItem('aiSettings');
      
      // 显示保存成功提示
      setShowSaveSuccess(true);
      setTimeout(() => {
        setShowSaveSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* 主导航 */}
      <MainNavigation />
      
      {/* 主内容区域 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 侧边导航 */}
        <SideNavigation />
        
        {/* 设置内容区域 */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">AI Assistant Settings</h1>
            
            {/* AI客服开关 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold mb-2">AI Customer Assistant</h2>
                  <p className="text-gray-600 dark:text-gray-400">When enabled, AI will automatically reply to common buyer inquiries</p>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input 
                    type="checkbox" 
                    id="ai-switch" 
                    className="opacity-0 w-0 h-0" 
                    checked={aiEnabled}
                    onChange={handleAiToggle}
                    aria-label="Enable AI Assistant"
                  />
                  <label 
                    htmlFor="ai-switch" 
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 ${aiEnabled ? 'bg-blue-600' : 'bg-gray-400'} rounded-full transition duration-200 before:absolute before:content-[''] before:h-5 before:w-5 before:left-0.5 before:bottom-0.5 before:bg-white before:rounded-full before:transition before:duration-200 ${aiEnabled ? 'before:translate-x-6' : 'before:translate-x-0'}`}
                  ></label>
                </div>
              </div>
            </div>
            
            {/* 默认询问问题设置 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Default Buyer Questions</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Select questions that AI will ask buyers during initial conversations to collect essential information
              </p>
              
              <div className="space-y-3">
                {defaultQuestions.map(question => (
                  <div key={question.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={question.id} 
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" 
                        checked={question.enabled}
                        onChange={() => handleQuestionToggle(question.id)}
                      />
                      <label htmlFor={question.id} className="ml-2 text-gray-700 dark:text-gray-300">
                        {question.text}
                      </label>
                    </div>
                    <div className="flex items-center">
                      <span className={`px-2 py-1 text-xs rounded-full ${question.enabled ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'}`}>
                        {question.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* 添加新问题 */}
              {showAddQuestion ? (
                <div className="mt-4 p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Add New Question</h3>
                  <div className="flex items-center">
                    <input 
                      type="text" 
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      placeholder="Enter new question..."
                      className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                    <div className="flex ml-2">
                      <button 
                        onClick={() => setShowAddQuestion(false)}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 mr-2"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleAddQuestion}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-4">
                  <button 
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                    onClick={() => setShowAddQuestion(true)}
                  >
                    <PlusOutlined className="mr-1" /> Add Custom Question
                  </button>
                </div>
              )}
              
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-md">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <strong>Tip:</strong> Enabled questions will be automatically asked by AI during initial buyer conversations to help collect key purchasing information
                </p>
              </div>
            </div>
            
            {/* 响应时间设置 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Response Time Settings</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  AI Response Delay
                </label>
                <div className="flex items-center">
                  <input 
                    type="range" 
                    min="0" 
                    max="60" 
                    value={responseDelay}
                    onChange={handleDelayChange}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer" 
                    aria-label="AI Response Delay in seconds"
                  />
                  <div className="ml-3 text-gray-700 dark:text-gray-300 min-w-[60px] whitespace-nowrap">
                    {responseDelay} sec
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Set the delay time for AI responses to simulate human-like reply timing
                </p>
              </div>
            </div>
            
            {/* 自动回复问题设置 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Auto-Reply Question Settings</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Select the types of questions that AI can automatically answer
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="question-1" 
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" 
                    checked={autoReplyQuestions.find(q => q.id === 'question-1')?.enabled}
                    onChange={() => handleAutoReplyToggle('question-1')}
                  />
                  <label htmlFor="question-1" className="ml-2 text-gray-700 dark:text-gray-300">
                    Product specifications and parameters
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="question-2" 
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" 
                    checked={autoReplyQuestions.find(q => q.id === 'question-2')?.enabled}
                    onChange={() => handleAutoReplyToggle('question-2')}
                  />
                  <label htmlFor="question-2" className="ml-2 text-gray-700 dark:text-gray-300">
                    Pricing and discount inquiries
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="question-3" 
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" 
                    checked={autoReplyQuestions.find(q => q.id === 'question-3')?.enabled}
                    onChange={() => handleAutoReplyToggle('question-3')}
                  />
                  <label htmlFor="question-3" className="ml-2 text-gray-700 dark:text-gray-300">
                    Shipping and delivery time queries
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="question-4" 
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" 
                    checked={autoReplyQuestions.find(q => q.id === 'question-4')?.enabled}
                    onChange={() => handleAutoReplyToggle('question-4')}
                  />
                  <label htmlFor="question-4" className="ml-2 text-gray-700 dark:text-gray-300">
                    Payment methods and processes
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="question-5" 
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" 
                    checked={autoReplyQuestions.find(q => q.id === 'question-5')?.enabled}
                    onChange={() => handleAutoReplyToggle('question-5')}
                  />
                  <label htmlFor="question-5" className="ml-2 text-gray-700 dark:text-gray-300">
                    After-sales service and return policies
                  </label>
                </div>
              </div>
              
              <div className="mt-4">
                <button className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                  <span className="mr-1">+</span> Add Custom Question
                </button>
              </div>
            </div>
            
            {/* AI语言风格设置 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">AI Language Style Settings</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" id="communication-style-label">
                  Communication Style
                </label>
                <select 
                  className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md" 
                  value={communicationStyle}
                  onChange={handleStyleChange}
                  aria-labelledby="communication-style-label"
                >
                  <option value="professional">Professional</option>
                  <option value="friendly">Friendly</option>
                  <option value="casual">Casual</option>
                  <option value="enthusiastic">Enthusiastic</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Reply Length
                </label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="length-concise" 
                      name="reply-length" 
                      className="w-4 h-4" 
                      checked={replyLength === 'concise'}
                      onChange={() => handleReplyLengthChange('concise')}
                    />
                    <label htmlFor="length-concise" className="ml-2 text-gray-700 dark:text-gray-300">Concise</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="length-moderate" 
                      name="reply-length" 
                      className="w-4 h-4" 
                      checked={replyLength === 'moderate'}
                      onChange={() => handleReplyLengthChange('moderate')}
                    />
                    <label htmlFor="length-moderate" className="ml-2 text-gray-700 dark:text-gray-300">Moderate</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="length-detailed" 
                      name="reply-length" 
                      className="w-4 h-4" 
                      checked={replyLength === 'detailed'}
                      onChange={() => handleReplyLengthChange('detailed')}
                    />
                    <label htmlFor="length-detailed" className="ml-2 text-gray-700 dark:text-gray-300">Detailed</label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 保存和重置按钮 */}
            <div className="flex justify-between">
              <button 
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-6 rounded-md flex items-center"
                onClick={handleResetSettings}
              >
                Reset to Default
              </button>
              
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md flex items-center"
                onClick={handleSaveSettings}
              >
                Save Settings
              </button>
            </div>
            
            {/* 保存成功提示 */}
            {showSaveSuccess && (
              <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center shadow-lg">
                <CheckCircleOutlined className="text-green-500 mr-2" />
                <span>Settings saved successfully!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 