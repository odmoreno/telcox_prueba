// Configuración para tests de integración
export const integrationConfig = {
  // URL base del backend para tests
  API_BASE_URL: process.env.VITE_API_BASE_URL || 'http://localhost:5000',
  
  // Timeouts para tests
  TIMEOUTS: {
    API_RESPONSE: 10000, // 10 segundos
    COMPONENT_RENDER: 5000, // 5 segundos
    USER_INTERACTION: 2000 // 2 segundos
  },
  
  // Configuración de retry para tests de integración
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000 // 1 segundo entre intentos
  },
  
  // Datos de prueba
  TEST_DATA: {
    VALID_CLIENT_IDS: [1, 2, 3], // IDs que deberían existir
    INVALID_CLIENT_IDS: [99999, -1, 0], // IDs que no deberían existir
    EXPECTED_MIN_CLIENTS: 1 // Mínimo número de clientes esperados
  }
}

// Helper para verificar si el backend está disponible
export const isBackendAvailable = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${integrationConfig.API_BASE_URL}/client/`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000) // 5 segundos timeout
    })
    return response.ok
  } catch (error) {
    console.warn('Backend no disponible:', error)
    return false
  }
}

// Helper para esperar con retry
export const waitWithRetry = async <T>(
  fn: () => Promise<T>,
  maxAttempts: number = integrationConfig.RETRY.MAX_ATTEMPTS,
  delay: number = integrationConfig.RETRY.DELAY
): Promise<T> => {
  let lastError: Error
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      if (attempt < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }
  
  throw lastError!
}
