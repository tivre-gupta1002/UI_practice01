export const appConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'Entitled',
  version: process.env.NEXT_PUBLIC_APP_VERSION || '0.1.0',
  description: 'Professional legal property management and email organization platform',
  
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000'),
  },
  
  features: {
    darkMode: process.env.NEXT_PUBLIC_ENABLE_DARK_MODE !== 'false',
    animations: process.env.NEXT_PUBLIC_ENABLE_ANIMATIONS !== 'false',
    analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  },
  
  theme: {
    defaultTheme: 'light' as const,
    storageKey: 'ui-theme',
  },
  
  responsive: {
    breakpoints: {
      mobile: 320,
      tablet: 768,
      desktop: 1024,
      wide: 1440,
    },
  },
  
  performance: {
    lighthouse: {
      targetScore: 95,
    },
    bundle: {
      maxSize: '500KB',
    },
  },
}
