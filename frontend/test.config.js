// Configuración para tests de integración
export default {
  // URL base del backend para tests
  apiBaseUrl: process.env.VITE_API_BASE_URL || 'http://localhost:5000',
  
  // Configuración de timeouts
  timeouts: {
    api: 10000,      // 10 segundos para respuestas de API
    component: 5000, // 5 segundos para renderizado de componentes
    user: 2000        // 2 segundos para interacciones de usuario
  },
  
  // Configuración de retry
  retry: {
    maxAttempts: 3,
    delay: 1000
  },
  
  // Configuración de debugging
  debug: process.env.DEBUG === 'true',
  
  // Configuración de cobertura
  coverage: {
    threshold: {
      lines: 80,
      functions: 90,
      branches: 70,
      statements: 80
    }
  }
}
