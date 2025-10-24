// Tipos basados en los schemas del backend Flask
export interface ClientConsumption {
  client_name: string;
  balance: number;
  currency: string;
  data_used: number;
  data_total: number;
  data_unit: string;
  minutes_used: number;
  minutes_total: number;
  minutes_unit: string;
}

export interface ErrorResponse {
  code?: string;
  status?: string;
  message: string;
}

export interface ApiState {
  clients: ClientConsumption[];
  selectedClient: ClientConsumption | null;
  loading: boolean;
  error: string | null;
}
