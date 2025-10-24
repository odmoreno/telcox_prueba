import React, { useEffect } from 'react';
import { Card, Button, Spinner, Alert, Row, Col } from 'react-bootstrap';
import { useClientStore } from '../store/clientStore';
import type { ClientConsumption } from '../types';

const ClientList: React.FC = () => {
  const { clients, loading, error, fetchClients, clientsLoaded, setSelectedClient, selectedClient } = useClientStore();

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleClientSelect = (client: ClientConsumption) => {
    setSelectedClient(client);
  };

  return (
    <div>
      <h2 className="mb-4">Lista de Clientes</h2>
      
      {error && (
        <Alert variant="danger" className="mb-4">
          <Alert.Heading>Error al cargar clientes</Alert.Heading>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={fetchClients}>
            Reintentar
          </Button>
        </Alert>
      )}

      {loading && !clientsLoaded && (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando clientes...</span>
          </Spinner>
        </div>
      )}

      {!loading && clients.length > 0 && (
        <Row>
          {clients.map((client, index) => (
            <Col key={index} md={6} lg={4} className="mb-3">
              <Card className={`h-100 client-card ${selectedClient?.client_name === client.client_name ? 'selected' : ''}`}>
                <Card.Header>
                  <h5 className="mb-0">{client.client_name}</h5>
                </Card.Header>
                <Card.Body>
                  <div className="mb-2">
                    <strong>Saldo:</strong> {client.balance} {client.currency}
                  </div>
                  <div className="mb-2">
                    <strong>Datos:</strong> {client.data_used}/{client.data_total} {client.data_unit}
                  </div>
                  <div className="mb-3">
                    <strong>Minutos:</strong> {client.minutes_used}/{client.minutes_total} {client.minutes_unit}
                  </div>
                  <Button 
                    variant="primary"
                    onClick={() => handleClientSelect(client)}
                    className="w-100"
                  >
                    Ver Detalles
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {!loading && clients.length === 0 && clientsLoaded && (
        <Alert variant="info">
          <Alert.Heading>No hay clientes disponibles</Alert.Heading>
          <p>No se encontraron clientes en el sistema.</p>
        </Alert>
      )}
    </div>
  );
};

export default ClientList;
