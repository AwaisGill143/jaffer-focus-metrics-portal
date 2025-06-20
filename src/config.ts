/**
 * Application Configuration
 * 
 * This file centralizes all configuration settings for the application.
 * It handles different environments and provides fallback values.
 */

// Environment detection
const isProd = import.meta.env.PROD || import.meta.env.MODE === 'production';
const isDev = import.meta.env.DEV || import.meta.env.MODE === 'development';

// ✅ Corrected: config object
export const config = {
  // API URLs
  api: {
    baseUrl: isProd 
      ? 'https://rag-aws-maker-jbs.onrender.com'
      : import.meta.env.API_BASE_URL || 'http://localhost:5000'
  },
  // api: {

  //   baseUrl: 'http://localhost:5000'
  // },

 


  // Authentication
  auth: {
    tokenKey: 'jbs_auth_token',
  },
  
  // Feature flags
  features: {
    enableFallback: true,
  }
};

// Export individual configs for convenience
export const API_BASE_URL = config.api.baseUrl;
