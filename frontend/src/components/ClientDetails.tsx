import React, { useState } from 'react';
import { Card, Button, Form, Spinner, Alert, ProgressBar, Row, Col } from 'react-bootstrap';
import { useClientStore } from '../store/clientStore';

const ClientDetails: React.FC = () => {
  const { selectedClient, loading, error, fetchClientById, clearError } = useClientStore();
  const [clientId, setClientId] = useState<string>('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = parseInt(clientId);
    if (!isNaN(id)) {
      await fetchClientById(id);
    }
  };

  const calculatePercentage = (used: number, total: number): number => {
    return total > 0 ? (used / total) * 100 : 0;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Detalles del Cliente</h2>
      
      <Card className="mb-4">
        <Card.Header>
          <h5 className="mb-0">Buscar Cliente por ID</h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSearch}>
            <Row className="align-items-end">
              <Col md={8} lg={9}>
                <Form.Group className="mb-0">
                  <Form.Label>ID del Cliente</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese el ID del cliente"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    required
                    size="lg"
                  />
                </Form.Group>
              </Col>
              <Col md={4} lg={3}>
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg"
                  className="w-100"
                >
                  Buscar
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {error && (
        <Alert variant="danger" dismissible onClose={clearError}>
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}

      {selectedClient && (
        <Card>
          <Card.Header>
            <h4>{selectedClient.client_name}</h4>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <h5>Información Financiera</h5>
                <div className="mb-3">
                  <strong>Saldo Actual:</strong>
                  <div className="fs-4 text-primary">
                    {selectedClient.balance} {selectedClient.currency}
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <h5>Uso de Datos</h5>
                <div className="mb-2">
                  <div className="d-flex justify-content-between">
                    <span>Usado: {selectedClient.data_used} {selectedClient.data_unit}</span>
                    <span>Total: {selectedClient.data_total} {selectedClient.data_unit}</span>
                  </div>
                  <ProgressBar 
                    now={calculatePercentage(selectedClient.data_used, selectedClient.data_total)}
                    variant={calculatePercentage(selectedClient.data_used, selectedClient.data_total) > 80 ? 'danger' : 'success'}
                    className="mt-1"
                  />
                </div>
              </Col>
            </Row>
            
            <hr />
            
            <Row>
              <Col md={6}>
                <h5>Uso de Minutos</h5>
                <div className="mb-2">
                  <div className="d-flex justify-content-between">
                    <span>Usado: {selectedClient.minutes_used} {selectedClient.minutes_unit}</span>
                    <span>Total: {selectedClient.minutes_total} {selectedClient.minutes_unit}</span>
                  </div>
                  <ProgressBar 
                    now={calculatePercentage(selectedClient.minutes_used, selectedClient.minutes_total)}
                    variant={calculatePercentage(selectedClient.minutes_used, selectedClient.minutes_total) > 80 ? 'danger' : 'success'}
                    className="mt-1"
                  />
                </div>
              </Col>
              <Col md={6}>
                <h5>Resumen</h5>
                <div className="text-muted">
                  <div>Datos restantes: {selectedClient.data_total - selectedClient.data_used} {selectedClient.data_unit}</div>
                  <div>Minutos restantes: {selectedClient.minutes_total - selectedClient.minutes_used} {selectedClient.minutes_unit}</div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default ClientDetails;
