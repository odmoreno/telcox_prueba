import { create } from 'zustand';
import { clientApi } from '../resources/api';
import type { ClientConsumption, ApiState } from '../types';

interface ClientStore extends ApiState {
  // Cache state
  clientsLoaded: boolean;
  lastFetchTime: number | null;
  cacheExpiry: number; // 5 minutes in milliseconds
  
  // Actions
  fetchClients: () => Promise<void>;
  fetchClientById: (id: number) => Promise<void>;
  setSelectedClient: (client: ClientConsumption | null) => void;
  clearError: () => void;
  isCacheValid: () => boolean;
}

export const useClientStore = create<ClientStore>((set, get) => ({
  // Initial state
  clients: [],
  selectedClient: null,
  loading: false,
  error: null,
  clientsLoaded: false,
  lastFetchTime: null,
  cacheExpiry: 5 * 60 * 1000, // 5 minutes

  // Cache validation
  isCacheValid: () => {
    const { lastFetchTime, cacheExpiry } = get();
    if (!lastFetchTime) return false;
    return Date.now() - lastFetchTime < cacheExpiry;
  },

  // Actions
  fetchClients: async () => {
    const { clientsLoaded, isCacheValid } = get();
    
    // Si ya tenemos datos en cache y son válidos, no hacer fetch
    if (clientsLoaded && isCacheValid()) {
      return;
    }

    set({ loading: true, error: null });
    try {
      const clients = await clientApi.getAllClients();
      set({ 
        clients, 
        loading: false, 
        clientsLoaded: true,
        lastFetchTime: Date.now()
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error desconocido',
        loading: false 
      });
    }
  },

  fetchClientById: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const client = await clientApi.getClientById(id);
      set({ selectedClient: client, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error desconocido',
        loading: false 
      });
    }
  },

  setSelectedClient: (client) => {
    set({ selectedClient: client });
  },

  clearError: () => {
    set({ error: null });
  },
}));
