from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask import current_app, jsonify

from db import db
from models.client import ClientConsumption
from schemas import ConsumptionResponseSchema, ErrorResponseSchema

blp = Blueprint('Consumption', __name__, url_prefix='/api/v1/client', description='API para consulta de consumo de clientes')

@blp.route('/<int:client_id>')
class ClientConsumptionResource(MethodView):
    """
    Recurso para consulta de consumo de clientes.
    """
    
    @blp.doc(description="Obtiene el estado de consumo en tiempo real del cliente.")
    @blp.response(200, ConsumptionResponseSchema, description="Datos de consumo obtenidos exitosamente.")
    @blp.response(404, ErrorResponseSchema, description="Cliente no encontrado en el sistema BSS.")
    @blp.response(500, ErrorResponseSchema, description="Error interno del sistema BSS o de la base de datos.")
    def get(self, client_id):
        """
        Obtener información de consumo de un cliente específico.
        """
        try:
            current_app.logger.info(f"Buscando cliente con ID: {client_id}")
            
            client = db.session.get(ClientConsumption, client_id)

            if not client:
                current_app.logger.warning(f"Cliente con ID: {client_id} no encontrado.")
                abort(404, message="Cliente no encontrado en el sistema BSS.")
            
            schema = ConsumptionResponseSchema()
            serialized_data = schema.dump(client)
            return jsonify(serialized_data)

        except Exception as e:
            current_app.logger.error(f"Error en endpoint: {str(e)}", exc_info=True)
            abort(500, message=f"Error interno del servidor: {str(e)}", code="INTERNAL_SERVER_ERROR", status="500")
