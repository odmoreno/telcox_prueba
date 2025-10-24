from flask import Flask, jsonify
from flask_cors import CORS
from flask_smorest import Api, Blueprint
from config import DevelopmentConfig # Importar la configuración
from db import db

from resources.client import blp as consumptionBlueprint

def create_app(config_name=None):
    """
    Función factoría para crear y configurar la aplicación Flask.
    """
    app = Flask(__name__)
    
    app.config.from_object(DevelopmentConfig)

    db.init_app(app)

    CORS(app) 
    
    api = Api(app) 
    
    api.register_blueprint(consumptionBlueprint)

    return app

app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)