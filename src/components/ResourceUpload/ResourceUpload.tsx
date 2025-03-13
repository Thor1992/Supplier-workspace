'use client';

import React, { useState, useRef, useEffect } from 'react';
import { UploadOutlined, FileOutlined, FilePdfOutlined, FileWordOutlined, FileExcelOutlined, FilePptOutlined, FileImageOutlined } from '@ant-design/icons';

// 定义组件属性类型
interface ResourceUploadProps {
  onUpload?: (files: File[]) => void;
}

/**
 * 资源上传组件
 * 支持拖拽上传和文件选择上传
 */
export default function ResourceUpload({ onUpload }: ResourceUploadProps) {
  // 文件列表状态
  const [files, setFiles] = useState<File[]>([]);
  // 错误信息状态
  const [errors, setErrors] = useState<string[]>([]);
  // 拖拽状态
  const [isDragging, setIsDragging] = useState(false);
  // 文件输入引用
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 文件大小限制 (10MB)
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  // 允许的文件类型
  const ALLOWED_FILE_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'image/jpeg',
    'image/png',
    'image/gif',
    'text/plain',
    'application/zip',
    'application/x-rar-compressed'
  ];

  // 当文件列表变化时，调用onUpload回调
  useEffect(() => {
    if (onUpload) {
      onUpload(files);
    }
  }, [files, onUpload]);

  // 触发文件选择
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // 清除错误信息
  const clearErrors = () => {
    setErrors([]);
  };

  // 处理文件选择
  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: File[] = [];
    const newErrors: string[] = [];

    // 检查每个文件
    Array.from(selectedFiles).forEach(file => {
      // 检查文件大小
      if (file.size > MAX_FILE_SIZE) {
        newErrors.push(`文件 "${file.name}" 超过大小限制 (10MB)`);
        return;
      }

      // 检查文件类型
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        newErrors.push(`文件 "${file.name}" 类型不支持`);
        return;
      }

      // 检查文件是否已存在
      if (files.some(existingFile => existingFile.name === file.name)) {
        newErrors.push(`文件 "${file.name}" 已添加`);
        return;
      }

      newFiles.push(file);
    });

    // 更新文件列表和错误信息
    if (newFiles.length > 0) {
      setFiles(prev => [...prev, ...newFiles]);
    }

    if (newErrors.length > 0) {
      setErrors(prev => [...prev, ...newErrors]);
    }
  };

  // 处理拖拽开始
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  // 处理拖拽结束
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  // 处理拖拽悬停
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  // 处理文件放置
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  // 处理文件删除
  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  // 处理错误消息关闭
  const handleCloseError = (index: number) => {
    setErrors(prev => prev.filter((_, i) => i !== index));
  };

  // 获取文件类型图标
  const getFileTypeIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return <FilePdfOutlined className="text-red-600 dark:text-red-400 text-2xl" />;
      case 'doc':
      case 'docx':
        return <FileWordOutlined className="text-blue-600 dark:text-blue-400 text-2xl" />;
      case 'xls':
      case 'xlsx':
        return <FileExcelOutlined className="text-green-600 dark:text-green-400 text-2xl" />;
      case 'ppt':
      case 'pptx':
        return <FilePptOutlined className="text-orange-600 dark:text-orange-400 text-2xl" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <FileImageOutlined className="text-purple-600 dark:text-purple-400 text-2xl" />;
      default:
        return <FileOutlined className="text-gray-600 dark:text-gray-400 text-2xl" />;
    }
  };

  // 格式化文件大小
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="space-y-4">
      {/* 错误消息 */}
      {errors.length > 0 && (
        <div className="space-y-2">
          {errors.map((error, index) => (
            <div key={index} className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-md flex justify-between items-center">
              <span>{error}</span>
              <button 
                onClick={() => handleCloseError(index)}
                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 拖放区域 */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10' 
            : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600'
        } transition-colors cursor-pointer`}
        onClick={triggerFileInput}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center">
          <UploadOutlined className="text-3xl text-gray-400 dark:text-gray-500 mb-2" />
          <p className="text-gray-700 dark:text-gray-300 mb-1">
            拖放文件到此处，或 <span className="text-blue-600 dark:text-blue-400">点击选择文件</span>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            支持 PDF, Word, Excel, PowerPoint, 图片和压缩文件 (最大 10MB)
          </p>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
        />
      </div>

      {/* 文件列表 */}
      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">待上传文件</h3>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-md p-3 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="p-2 rounded-md">
                    {getFileTypeIcon(file.name)}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}