import pytest
import json
from unittest.mock import patch, MagicMock
from app import create_app
from db import db
from models.client import ClientConsumption
from config import TestingConfig

class TestClientEndpoint:
    """Tests para el endpoint de consumo de clientes."""
    
    @pytest.fixture
    def app(self):
        app = create_app('testing')
        app.config.from_object(TestingConfig)
        
        with app.app_context():
            db.create_all()
            yield app
            db.drop_all()
    
    @pytest.fixture
    def client(self, app):
        return app.test_client()
    
    @pytest.fixture
    def sample_client_data(self):
        return {
            'id': 1,
            'client_name': 'Oscar Moreno',
            'balance': 150.50,
            'currency': 'USD',
            'data_used': 2.5,
            'data_total': 10.0,
            'data_unit': 'GB',
            'minutes_used': 120.0,
            'minutes_total': 500.0,
            'minutes_unit': 'Min'
        }
    
    def test_get_client_consumption_success(self, client, sample_client_data):
        """Test: Obtener consumo de cliente existente exitosamente."""
        client_obj = ClientConsumption(**sample_client_data)
        db.session.add(client_obj)
        db.session.commit()
        
        response = client.get('/api/v1/client/1')
        assert response.status_code == 200
        
        data = json.loads(response.data)
        assert data['client_name'] == 'Juan Pérez'
        assert data['balance'] == 150.50
        assert data['currency'] == 'USD'
        assert data['data_used'] == 2.5
        assert data['data_total'] == 10.0
        assert data['data_unit'] == 'GB'
        assert data['minutes_used'] == 120.0
        assert data['minutes_total'] == 500.0
        assert data['minutes_unit'] == 'Min'
    
    def test_get_client_consumption_not_found(self, client):
        """Test: Cliente no encontrado retorna 404."""
        response = client.get('/api/v1/client/999')
        assert response.status_code == 404
        
        data = json.loads(response.data)
        assert 'message' in data
        assert 'Cliente no encontrado' in data['message']
    
    def test_get_client_consumption_invalid_id(self, client):
        """Test: ID inválido retorna 404."""
        response = client.get('/api/v1/client/abc')
        assert response.status_code == 404
    
    def test_get_client_consumption_database_error(self, client, sample_client_data):
        """Test: Error de base de datos retorna 500."""
        client_obj = ClientConsumption(**sample_client_data)
        db.session.add(client_obj)
        db.session.commit()
        
        with patch('db.db.session.get') as mock_get:
            mock_get.side_effect = Exception("Database connection error")
            
            response = client.get('/api/v1/client/1')
            assert response.status_code == 500
            
            data = json.loads(response.data)
            assert 'message' in data
            assert 'Error interno' in data['message']
    
    def test_get_client_consumption_response_schema(self, client, sample_client_data):
        """Test: Verificar que la respuesta cumple con el esquema esperado."""
        client_obj = ClientConsumption(**sample_client_data)
        db.session.add(client_obj)
        db.session.commit()
        
        response = client.get('/api/v1/client/1')
        assert response.status_code == 200
        
        data = json.loads(response.data)
        
        required_fields = [
            'client_name', 'balance', 'currency', 'data_used', 
            'data_total', 'data_unit', 'minutes_used', 'minutes_total', 'minutes_unit'
        ]
        
        for field in required_fields:
            assert field in data, f"Campo {field} no está presente en la respuesta"
        assert isinstance(data['client_name'], str)
        assert isinstance(data['balance'], (int, float))
        assert isinstance(data['currency'], str)
        assert isinstance(data['data_used'], (int, float))
        assert isinstance(data['data_total'], (int, float))
        assert isinstance(data['data_unit'], str)
        assert isinstance(data['minutes_used'], (int, float))
        assert isinstance(data['minutes_total'], (int, float))
        assert isinstance(data['minutes_unit'], str)

if __name__ == '__main__':
    pytest.main([__file__, '-v'])
