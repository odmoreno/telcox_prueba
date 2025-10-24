import React from 'react';
import { Card, ProgressBar, Row, Col } from 'react-bootstrap';
import { useClientStore } from '../store/clientStore';

const ClientDetailsPanel: React.FC = () => {
  const { selectedClient } = useClientStore();

  const calculatePercentage = (used: number, total: number): number => {
    return total > 0 ? (used / total) * 100 : 0;
  };

  if (!selectedClient) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="text-center text-muted">
          <h4>Selecciona un cliente</h4>
          <p>Haz clic en "Ver Detalles" de cualquier cliente para ver su información completa.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Detalles del Cliente</h2>
      
      <Card className="h-100">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">{selectedClient.client_name}</h4>
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
    </div>
  );
};

export default ClientDetailsPanel;
