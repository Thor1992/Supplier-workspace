// [平台] 共享核心
// [功能] 翻译服务模拟实现

import { TranslationRequest, TranslationResponse } from '../api/types';

/**
 * 语言代码映射
 */
const languageMap: Record<string, string> = {
  'English': 'en',
  'Spanish': 'es',
  'Japanese': 'ja',
  'French': 'fr',
  'Arabic': 'ar',
  'Russian': 'ru',
  'Chinese': 'zh',
  'German': 'de',
  'Italian': 'it',
  'Portuguese': 'pt',
  'Korean': 'ko',
  'Dutch': 'nl',
  'Swedish': 'sv',
  'Polish': 'pl',
  'Turkish': 'tr',
  'Thai': 'th',
  'Vietnamese': 'vi',
  'Indonesian': 'id',
  'Hindi': 'hi',
  'Greek': 'el'
};

/**
 * 模拟翻译服务
 * 在实际项目中，这里应该调用真实的翻译API，如Google Translate或DeepL
 */
export const translateText = async (request: TranslationRequest): Promise<TranslationResponse> => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 简单的模拟翻译逻辑
  const { text, sourceLanguage, targetLanguage } = request;
  
  // 如果源语言和目标语言相同，直接返回原文
  if (sourceLanguage === targetLanguage) {
    return {
      translatedText: text,
      detectedLanguage: sourceLanguage
    };
  }
  
  // 模拟翻译结果
  // 在实际项目中，这里应该调用真实的翻译API
  let translatedText = text;
  
  // 模拟一些简单的翻译结果
  if (text.includes('Hello') && targetLanguage === 'es') {
    translatedText = text.replace('Hello', '¡Hola');
  } else if (text.includes('Thank you') && targetLanguage === 'es') {
    translatedText = text.replace('Thank you', 'Gracias');
  } else if (text.includes('Hello') && targetLanguage === 'fr') {
    translatedText = text.replace('Hello', 'Bonjour');
  } else if (text.includes('Thank you') && targetLanguage === 'fr') {
    translatedText = text.replace('Thank you', 'Merci');
  } else if (text.includes('Hello') && targetLanguage === 'ja') {
    translatedText = text.replace('Hello', 'こんにちは');
  } else if (text.includes('Thank you') && targetLanguage === 'ja') {
    translatedText = text.replace('Thank you', 'ありがとう');
  }
  
  return {
    translatedText,
    detectedLanguage: sourceLanguage
  };
};

/**
 * 获取语言代码
 * @param language 语言名称
 * @returns 语言代码
 */
export const getLanguageCode = (language: string): string => {
  return languageMap[language] || 'en';
};

/**
 * 自动检测语言
 * 在实际项目中，这里应该调用语言检测API
 * @param text 要检测的文本
 * @returns 检测到的语言代码
 */
export const detectLanguage = async (text: string): Promise<string> => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // 简单的模拟语言检测逻辑
  if (text.match(/[¿¡áéíóúüñ]/i)) return 'es';
  if (text.match(/[àâçéèêëîïôùûüÿ]/i)) return 'fr';
  if (text.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/)) return 'ja';
  if (text.match(/[\u0600-\u06FF]/)) return 'ar';
  if (text.match(/[\u0400-\u04FF]/)) return 'ru';
  
  return 'en';
}; 