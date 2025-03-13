'use client';

import React, { useState } from 'react';
import MainNavigation from '../../components/Navigation/MainNavigation';
import SideNavigation from '../../components/Navigation/SideNavigation';
import ResourceUpload from '../../components/ResourceUpload/ResourceUpload';

// 资源分类类型
type ResourceCategory = {
  id: string;
  name: string;
};

/**
 * 资料库页面组件
 * 提供资料分类导航和资料上传管理功能
 */
export default function ResourcesPage() {
  // 初始分类列表
  const [categories, setCategories] = useState<ResourceCategory[]>([
    { id: 'product-manuals', name: 'Product Manuals' },
    { id: 'company-intro', name: 'Company Introduction' },
    { id: 'faq', name: 'FAQ' },
    { id: 'shipping-info', name: 'Shipping Information' },
    { id: 'after-sales', name: 'After-sales Policy' }
  ]);
  
  // 当前选中的分类
  const [selectedCategory, setSelectedCategory] = useState<string>('product-manuals');
  
  // 显示添加分类对话框
  const [showAddCategoryDialog, setShowAddCategoryDialog] = useState<boolean>(false);
  
  // 新分类名称
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  
  // 待上传的文件列表
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  
  // 处理分类切换
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };
  
  // 处理添加新分类
  const handleAddCategory = () => {
    if (newCategoryName.trim() === '') return;
    
    const newCategory: ResourceCategory = {
      id: `category-${Date.now()}`,
      name: newCategoryName.trim()
    };
    
    setCategories([...categories, newCategory]);
    setNewCategoryName('');
    setShowAddCategoryDialog(false);
  };
  
  // 获取当前选中分类的名称
  const getCurrentCategoryName = () => {
    const category = categories.find(cat => cat.id === selectedCategory);
    return category ? category.name : 'Resources';
  };
  
  // 处理文件上传
  const handleFileUpload = (files: File[]) => {
    setPendingFiles(files);
  };
  
  // 处理上传按钮点击
  const handleUploadClick = () => {
    if (pendingFiles.length === 0) return;
    
    // 这里可以添加实际的上传逻辑
    alert(`上传 ${pendingFiles.length} 个文件到 "${getCurrentCategoryName()}" 分类`);
    
    // 上传完成后清空待上传文件列表
    setPendingFiles([]);
  };
  
  return (
    <div className="flex flex-col h-screen">
      {/* 主导航 */}
      <MainNavigation />
      
      {/* 主内容区域 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 侧边导航 */}
        <SideNavigation />
        
        {/* 资料分类导航 */}
        <div className="w-60 min-w-[240px] border-r border-gray-200 dark:border-gray-700 p-4 hidden md:block">
          <h2 className="text-xl font-bold mb-4">Resource Categories</h2>
          <ul className="space-y-2">
            {categories.map(category => (
              <li 
                key={category.id}
                className={`p-2 rounded-md cursor-pointer transition-colors ${
                  selectedCategory === category.id 
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
                onClick={() => handleCategorySelect(category.id)}
              >
                {category.name}
              </li>
            ))}
          </ul>
          
          <div className="mt-6">
            <button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
              onClick={() => setShowAddCategoryDialog(true)}
            >
              Add New Category
            </button>
          </div>
        </div>
        
        {/* 资料上传与管理区域 */}
        <div className="flex-1 p-4 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{getCurrentCategoryName()}</h1>
            <button 
              className={`flex items-center py-2 px-4 rounded-md transition-colors ${
                pendingFiles.length > 0
                  ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'
              }`}
              onClick={handleUploadClick}
              disabled={pendingFiles.length === 0}
            >
              <span className="mr-1">+</span> Upload Resource
            </button>
          </div>
          
          {/* 使用资料上传组件 */}
          <ResourceUpload onUpload={handleFileUpload} />
          
          {/* 资料列表 */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Uploaded Resources</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-md mr-3">
                    <span className="text-red-600 dark:text-red-400">PDF</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Product Specification Sheet.pdf</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Uploaded on 2023-03-10</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    View
                  </button>
                  <button className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                    Delete
                  </button>
                </div>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-md mr-3">
                    <span className="text-blue-600 dark:text-blue-400">DOC</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Product User Guide.docx</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Uploaded on 2023-03-05</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    View
                  </button>
                  <button className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                    Delete
                  </button>
                </div>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-md mr-3">
                    <span className="text-green-600 dark:text-green-400">XLS</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Product Price List.xlsx</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Uploaded on 2023-02-28</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    View
                  </button>
                  <button className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 添加分类对话框 */}
      {showAddCategoryDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
            <input
              type="text"
              placeholder="Category name"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 mb-4"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  setShowAddCategoryDialog(false);
                  setNewCategoryName('');
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                onClick={handleAddCategory}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 