import { describe, it, expect, beforeAll } from 'vitest'
import { clientApi } from '../resources/api'
import type { ClientConsumption } from '../types'

// Configuración para tests de integración
const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:5000'

describe('API Integration Tests', () => {
  let isBackendAvailable = false

  beforeAll(async () => {
    // Verificar que el backend esté disponible
    try {
      const response = await fetch(`${API_BASE_URL}/client/`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000) // 5 segundos timeout
      })
      isBackendAvailable = response.ok
      console.log(`Backend disponible: ${isBackendAvailable}`)
    } catch (error) {
      console.warn('Backend no disponible para tests de integración:', error)
      isBackendAvailable = false
    }
  })

  describe('GET /client/ - Obtener todos los clientes', () => {
    it('debería obtener la lista de clientes', async () => {
      if (!isBackendAvailable) {
        console.log('⏭️ Saltando test - Backend no disponible')
        return
      }

      const clients = await clientApi.getAllClients()
      
      expect(Array.isArray(clients)).toBe(true)
      expect(clients.length).toBeGreaterThan(0)
      
      // Verificar estructura de un cliente
      if (clients.length > 0) {
        const client = clients[0]
        expect(client).toHaveProperty('client_name')
        expect(client).toHaveProperty('balance')
        expect(client).toHaveProperty('currency')
        expect(client).toHaveProperty('data_used')
        expect(client).toHaveProperty('data_total')
        expect(client).toHaveProperty('data_unit')
        expect(client).toHaveProperty('minutes_used')
        expect(client).toHaveProperty('minutes_total')
        expect(client).toHaveProperty('minutes_unit')
      }
    })
  })

  describe('GET /client/{id} - Obtener cliente por ID', () => {
    it('debería obtener un cliente específico por ID', async () => {
      if (!isBackendAvailable) {
        console.log('⏭️ Saltando test - Backend no disponible')
        return
      }

      const client = await clientApi.getClientById(1)
      
      expect(client).toBeDefined()
      expect(client).toHaveProperty('client_name')
      expect(client).toHaveProperty('balance')
      expect(client).toHaveProperty('currency')
      expect(typeof client.client_name).toBe('string')
      expect(typeof client.balance).toBe('number')
      expect(typeof client.currency).toBe('string')
    })
  })

  describe('Validación de tipos de datos', () => {
    it('debería retornar datos con tipos correctos', async () => {
      if (!isBackendAvailable) {
        console.log('⏭️ Saltando test - Backend no disponible')
        return
      }

      const clients = await clientApi.getAllClients()
      const client = clients[0]
      
      // Verificar tipos de datos
      expect(typeof client.client_name).toBe('string')
      expect(typeof client.balance).toBe('number')
      expect(typeof client.currency).toBe('string')
      expect(typeof client.data_used).toBe('number')
      expect(typeof client.data_total).toBe('number')
      expect(typeof client.data_unit).toBe('string')
      expect(typeof client.minutes_used).toBe('number')
      expect(typeof client.minutes_total).toBe('number')
      expect(typeof client.minutes_unit).toBe('string')
      
      // Verificar que los valores numéricos sean válidos
      expect(client.balance).toBeGreaterThanOrEqual(0)
      expect(client.data_used).toBeGreaterThanOrEqual(0)
      expect(client.data_total).toBeGreaterThan(0)
      expect(client.minutes_used).toBeGreaterThanOrEqual(0)
      expect(client.minutes_total).toBeGreaterThan(0)
    })
  })
})
