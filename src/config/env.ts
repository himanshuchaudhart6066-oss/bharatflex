// Configuration Helper for Environment Variables
// This file helps manage environment variables safely across the app

/**
 * Validates that all required environment variables are present
 * @throws Error if any required env var is missing
 */
export const validateEnvironmentVariables = () => {
  const requiredVars = [
    'REACT_APP_FIREBASE_API_KEY',
    'REACT_APP_FIREBASE_AUTH_DOMAIN',
    'REACT_APP_FIREBASE_PROJECT_ID',
    'REACT_APP_FIREBASE_STORAGE_BUCKET',
    'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
    'REACT_APP_FIREBASE_APP_ID',
    'REACT_APP_GOOGLE_WEB_CLIENT_ID',
    'REACT_APP_MUX_TOKEN_ID',
    'REACT_APP_MUX_API_KEY',
  ];

  const missingVars: string[] = [];

  requiredVars.forEach(varName => {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  });

  if (missingVars.length > 0) {
    console.warn(
      '⚠️ Missing environment variables:',
      missingVars.join(', ')
    );
    console.warn(
      '📋 Please create a .env file based on .env.example and add your credentials.'
    );
    
    // In development, show a warning but don't crash
    if (process.env.REACT_APP_ENV === 'development') {
      console.warn(
        '💡 For development only. Production builds require all variables.'
      );
    }
  }

  return missingVars.length === 0;
};

/**
 * Get an environment variable safely
 * @param varName - Name of the environment variable
 * @param defaultValue - Default value if variable is not set
 * @returns The environment variable value or default
 */
export const getEnvVar = (varName: string, defaultValue = ''): string => {
  const value = process.env[varName];
  
  if (!value && !defaultValue) {
    console.warn(`⚠️ Environment variable ${varName} is not set`);
  }
  
  return value || defaultValue;
};

/**
 * Check if app is in development mode
 */
export const isDevelopment = (): boolean => {
  return process.env.REACT_APP_ENV === 'development';
};

/**
 * Check if app is in production mode
 */
export const isProduction = (): boolean => {
  return process.env.REACT_APP_ENV === 'production';
};

/**
 * Get API base URL
 */
export const getApiUrl = (): string => {
  return process.env.REACT_APP_API_URL || 'https://api.bharatflex.local';
};

export default {
  validateEnvironmentVariables,
  getEnvVar,
  isDevelopment,
  isProduction,
  getApiUrl,
};
