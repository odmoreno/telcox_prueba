#!/usr/bin/env python3
"""
Script de seed para rellenar la tabla ClientConsumption con datos de ejemplo.
Este script crea registros de prueba para simular clientes con diferentes
estados de cuenta y consumos.
"""

import sys
import os
from datetime import datetime

# Agregar el directorio backend al path para importar módulos
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import create_app
from db import db
from models.client import ClientConsumption

def create_seed_data():
    """
    Crea datos de ejemplo para la tabla ClientConsumption.
    """
    # Datos de ejemplo para diferentes tipos de clientes
    seed_data = [
        {
            "client_name": "Juan Pérez García",
            "balance": 125.50,
            "currency": "USD",
            "data_used": 2.3,
            "data_total": 5.0,
            "data_unit": "GB",
            "minutes_used": 180.5,
            "minutes_total": 500.0,
            "minutes_unit": "Min"
        },
        {
            "client_name": "María López Rodríguez",
            "balance": 89.25,
            "currency": "USD",
            "data_used": 4.7,
            "data_total": 10.0,
            "data_unit": "GB",
            "minutes_used": 450.0,
            "minutes_total": 1000.0,
            "minutes_unit": "Min"
        },
        {
            "client_name": "Carlos Martínez Silva",
            "balance": 0.00,
            "currency": "USD",
            "data_used": 8.9,
            "data_total": 15.0,
            "data_unit": "GB",
            "minutes_used": 890.0,
            "minutes_total": 2000.0,
            "minutes_unit": "Min"
        },
        {
            "client_name": "Ana González Torres",
            "balance": 250.75,
            "currency": "USD",
            "data_used": 1.2,
            "data_total": 3.0,
            "data_unit": "GB",
            "minutes_used": 95.0,
            "minutes_total": 300.0,
            "minutes_unit": "Min"
        },
        {
            "client_name": "Roberto Fernández Díaz",
            "balance": 45.80,
            "currency": "USD",
            "data_used": 12.5,
            "data_total": 20.0,
            "data_unit": "GB",
            "minutes_used": 1200.0,
            "minutes_total": 3000.0,
            "minutes_unit": "Min"
        },
        {
            "client_name": "Laura Sánchez Moreno",
            "balance": 175.30,
            "currency": "USD",
            "data_used": 0.8,
            "data_total": 2.0,
            "data_unit": "GB",
            "minutes_used": 45.0,
            "minutes_total": 200.0,
            "minutes_unit": "Min"
        },
        {
            "client_name": "Miguel Ruiz Castro",
            "balance": 5.50,
            "currency": "USD",
            "data_used": 6.2,
            "data_total": 8.0,
            "data_unit": "GB",
            "minutes_used": 650.0,
            "minutes_total": 1500.0,
            "minutes_unit": "Min"
        },
        {
            "client_name": "Isabel Jiménez Vega",
            "balance": 300.00,
            "currency": "USD",
            "data_used": 0.5,
            "data_total": 1.0,
            "data_unit": "GB",
            "minutes_used": 25.0,
            "minutes_total": 100.0,
            "minutes_unit": "Min"
        },
        {
            "client_name": "David Herrera Luna",
            "balance": 78.90,
            "currency": "USD",
            "data_used": 3.8,
            "data_total": 6.0,
            "data_unit": "GB",
            "minutes_used": 320.0,
            "minutes_total": 800.0,
            "minutes_unit": "Min"
        },
        {
            "client_name": "Carmen Vargas Flores",
            "balance": 0.00,
            "currency": "USD",
            "data_used": 9.5,
            "data_total": 12.0,
            "data_unit": "GB",
            "minutes_used": 1100.0,
            "minutes_total": 2500.0,
            "minutes_unit": "Min"
        }
    ]
    
    return seed_data

def seed_database():
    """
    Ejecuta el seed de la base de datos.
    """
    app = create_app()
    
    with app.app_context():
        # Crear todas las tablas si no existen
        db.create_all()
        
        # Verificar si ya hay datos
        existing_count = ClientConsumption.query.count()
        if existing_count > 0:
            print(f"⚠️  Ya existen {existing_count} registros en la tabla ClientConsumption.")
            response = input("¿Desea eliminar los datos existentes y crear nuevos? (s/n): ")
            if response.lower() in ['s', 'si', 'sí', 'y', 'yes']:
                print("🗑️  Eliminando datos existentes...")
                ClientConsumption.query.delete()
                db.session.commit()
            else:
                print("❌ Operación cancelada.")
                return
        
        # Obtener datos de seed
        seed_data = create_seed_data()
        
        print(f"🌱 Insertando {len(seed_data)} registros de ejemplo...")
        
        # Insertar datos
        for data in seed_data:
            client = ClientConsumption(**data)
            db.session.add(client)
        
        # Confirmar cambios
        db.session.commit()
        
        print("✅ Seed completado exitosamente!")
        print(f"📊 Se insertaron {len(seed_data)} registros en la tabla ClientConsumption.")
        
        # Mostrar resumen de los datos insertados
        print("\n📋 Resumen de datos insertados:")
        clients = ClientConsumption.query.all()
        for client in clients:
            print(f"  • {client.client_name}: ${client.balance:.2f} {client.currency} | "
                  f"Datos: {client.data_used:.1f}/{client.data_total:.1f} {client.data_unit} | "
                  f"Minutos: {client.minutes_used:.0f}/{client.minutes_total:.0f} {client.minutes_unit}")

def clear_database():
    """
    Limpia todos los datos de la tabla ClientConsumption.
    """
    app = create_app()
    
    with app.app_context():
        count = ClientConsumption.query.count()
        if count > 0:
            print(f"🗑️  Eliminando {count} registros de la tabla ClientConsumption...")
            ClientConsumption.query.delete()
            db.session.commit()
            print("✅ Base de datos limpiada exitosamente!")
        else:
            print("ℹ️  La tabla ClientConsumption ya está vacía.")

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Script de seed para ClientConsumption")
    parser.add_argument("--clear", action="store_true", help="Limpiar la base de datos antes de insertar datos")
    parser.add_argument("--only-clear", action="store_true", help="Solo limpiar la base de datos sin insertar datos")
    
    args = parser.parse_args()
    
    if args.only_clear:
        clear_database()
    else:
        if args.clear:
            print("🧹 Limpiando base de datos...")
            clear_database()
        seed_database()
