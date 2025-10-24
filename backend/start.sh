#!/bin/bash

# Script de inicio para el backend
# Este script ejecuta el seed de la base de datos si no existen datos

set -e  # Salir si cualquier comando falla

echo "🚀 Iniciando TelcoX Backend..."

# Función para verificar si ya existen datos
check_data() {
    python -c "
from app import create_app
from db import db
from models.client import ClientConsumption

app = create_app()
with app.app_context():
    try:
        count = ClientConsumption.query.count()
        print('EXISTS' if count > 0 else 'EMPTY')
    except:
        print('NO_TABLE')
" 2>/dev/null
}

# Verificar si ya existen datos
echo "🔍 Verificando datos existentes..."
result=$(check_data)

if [[ "$result" == "EXISTS" ]]; then
    echo "✅ Ya existen datos - saltando seed"
elif [[ "$result" == "EMPTY" || "$result" == "NO_TABLE" ]]; then
    echo "🌱 Ejecutando seed de datos..."
    python seed_data.py
    echo "✅ Seed completado"
else
    echo "⚠️  Error verificando datos - ejecutando seed por seguridad"
    python seed_data.py
fi

echo "✅ Backend listo!"

# Ejecutar Gunicorn
echo "🚀 Iniciando servidor Gunicorn..."
#exec gunicorn --bind 0.0.0.0:5000 app:app

exec flask run --host=0.0.0.0 --port=5000
