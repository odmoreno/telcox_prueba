from sqlalchemy import Column, Integer, String, Float, DateTime

from db import db

class ClientConsumption(db.Model):
    """
    Modelo para el consumo de clientes.
    Representa la información completa de un cliente incluyendo:
    - Información personal
    - Estado de cuenta (saldo y moneda)
    - Consumo de datos
    - Consumo de minutos
    """
    __tablename__ = 'client_consumption'

    id = Column(Integer, primary_key=True, autoincrement=True)
    
    client_name = Column(String(255), nullable=False, comment="Nombre completo del cliente")
    balance = Column(Float, nullable=False, comment="Saldo actual de la cuenta del cliente")
    currency = Column(String(10), nullable=False, default="USD", comment="Moneda utilizada")
    data_used = Column(Float, nullable=False, comment="Cantidad de datos consumidos")
    data_total = Column(Float, nullable=False, comment="Cantidad total de datos del plan")
    data_unit = Column(String(10), nullable=False, default="GB", comment="Unidad de medida para datos")
    minutes_used = Column(Float, nullable=False, comment="Cantidad de minutos consumidos")
    minutes_total = Column(Float, nullable=False, comment="Cantidad total de minutos del plan")
    minutes_unit = Column(String(10), nullable=False, default="Min", comment="Unidad de medida para minutos")
    
    def __repr__(self):
        return f"<ClientConsumption(id={self.id}, client_name='{self.client_name}', balance={self.balance})>"
