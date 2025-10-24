import React, { useEffect } from 'react';
import { Container, Navbar, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ClientList from './ClientList';
import ClientDetailsPanel from './ClientDetailsPanel';
import { useClientStore } from '../store/clientStore';

const App: React.FC = () => {
  const { clients, setSelectedClient, fetchClients } = useClientStore();

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  // Seleccionar el primer cliente por defecto cuando se cargan los datos
  useEffect(() => {
    if (clients.length > 0) {
      setSelectedClient(clients[0]);
    }
  }, [clients, setSelectedClient]);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home">
            <i className="bi bi-phone"></i> Sistema de Consumo de Clientes
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container fluid>
        <Row className="two-panel-layout">
          {/* Panel Izquierdo - Lista de Clientes */}
          <Col lg={6} className="left-panel">
            <ClientList />
          </Col>
          
          {/* Panel Derecho - Detalles del Cliente */}
          <Col lg={6} className="right-panel">
            <ClientDetailsPanel />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
