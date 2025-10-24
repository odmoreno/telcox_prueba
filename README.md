# TelcoX - Sistema de Consumo de Clientes

Sistema completo de gestión de consumo de clientes con **Backend Flask** y **Frontend React**, containerizado con Docker.

## 🎯 Características

- **Backend**: API REST con Flask + SQLAlchemy + PostgreSQL
- **Frontend**: React + TypeScript + Vite + Bootstrap
- **Base de datos**: PostgreSQL con datos de ejemplo
- **Containerización**: Docker Compose completo
- **Documentación**: Swagger UI automática

## 🚀 Ejecución Rápida

### Prerrequisitos
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Configuración
1. **Clona el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd telcox_prueba
   ```

2. **Crea los archivos `.env` necesarios:**

   **Backend** (`backend/.env`):
   ```bash
   # Copia desde el archivo de ejemplo
   cp backend/.env.example backend/.env
   ```
   
   O crea manualmente `backend/.env`:
   ```env
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   POSTGRES_DB=telcox_db
   POSTGRES_HOST=db
   POSTGRES_PORT=5432
   ```

   **Frontend** (`frontend/.env`):
   ```bash
   # Copia desde el archivo de ejemplo
   cp frontend/.env.example frontend/.env
   ```
   
   O crea manualmente `frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

3. **Ejecuta todo el stack:**
   ```bash
   docker-compose up --build -d
   ```

## ✅ ¡ÉXITO! Docker Compose Completo Funcionando

### 🎉 Estado Actual:
- **✅ Base de datos**: PostgreSQL funcionando (puerto 5432)
- **✅ Backend**: Flask funcionando (puerto 5000)
- **✅ Frontend**: React + Nginx funcionando (puerto 3000)

### 🌐 URLs Disponibles:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Documentación API**: http://localhost:5000/docs
- **Base de datos**: localhost:5432

### 📋 Endpoints para Probar:
- `GET /client/` - Lista todos los clientes
- `GET /client/1` - Cliente específico por ID

### 🚀 Para la Demo:
1. **Abre http://localhost:3000** - Aplicación React completa
2. **Abre http://localhost:5000/docs** - Documentación de la API
3. **Prueba los endpoints** - Lista y detalles de clientes

## 🏗️ Arquitectura del Proyecto

```
telcox_prueba/
├── backend/                 # API Flask
│   ├── models/             # Modelos SQLAlchemy
│   ├── resources/          # Endpoints REST
│   ├── schemas.py          # Serialización Marshmallow
│   └── Dockerfile          # Imagen Python
├── frontend/               # App React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── store/          # Estado Zustand
│   │   ├── resources/      # Cliente Axios
│   │   └── types/          # Tipos TypeScript
│   ├── Dockerfile          # Imagen Node.js + Nginx
│   └── nginx.conf          # Configuración Nginx
└── docker-compose.yml      # Orquestación completa
```

## 🔧 Desarrollo Local (Alternativa)

### Configuración inicial
```bash
# 1. Crear archivos .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 2. Solo DB en Docker
docker-compose up db -d
```

### Backend Local
```bash
# Terminal 2 - Backend local
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend Local
```bash
# Terminal 3 - Frontend local
cd frontend
npm install
npm run dev
```

## 🧪 Testing

### Backend Tests
```bash
# Tests con Docker
docker-compose exec backend pytest

# Tests locales
cd backend
pytest

# Tests detallados
python -m pytest test_client_endpoint.py -v
```

### Frontend Tests
```bash
# Ejecutar tests del frontend
cd frontend
npm install
npm run test

# Tests con interfaz visual
npm run test:ui

# Tests con cobertura
npm run test:coverage
```

**Nota**: Los tests del frontend requieren que el backend esté disponible. Si no está disponible, los tests se saltarán automáticamente.

### Tests de Integración del Frontend

Los tests del frontend incluyen:

- **Tests de API**: Comunicación con endpoints del backend (`GET /client/`, `GET /client/{id}`)
- **Validación de datos**: Estructura, tipos y valores de respuesta
- **Manejo de errores**: Backend no disponible, timeouts, etc.

#### Ejecutar tests con backend disponible:
```bash
# Terminal 1: Backend
cd backend
python app.py

# Terminal 2: Tests del frontend
cd frontend
npm run test
```

#### Ejecutar tests sin backend:
```bash
cd frontend
npm run test
# Los tests se saltarán automáticamente si el backend no está disponible
```

## 📊 Datos de Ejemplo

El sistema incluye **10 clientes de ejemplo** con:
- Información personal
- Saldo y moneda
- Consumo de datos (GB)
- Consumo de minutos
- Barras de progreso visuales

## 🛠️ Comandos Útiles

```bash
# Ver estado de servicios
docker-compose ps

# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs backend
docker-compose logs frontend

# Detener todos los servicios
docker-compose down

# Reconstruir y ejecutar
docker-compose up --build -d

# Ejecutar solo backend + DB
docker-compose up db backend

# Ejecutar solo frontend
docker-compose up frontend

# Tests del frontend
cd frontend
npm run test

# Tests con interfaz visual
npm run test:ui
```

## 📁 Archivos de Configuración

### Archivos `.env` Requeridos

**Backend** (`backend/.env`):
```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=telcox_db
POSTGRES_HOST=db
POSTGRES_PORT=5432
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=postgresql://postgres:postgres@db:5432/telcox_db
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000
VITE_APP_TITLE=TelcoX - Sistema de Consumo de Clientes
VITE_APP_VERSION=1.0.0
VITE_API_TIMEOUT=10000
VITE_API_RETRY_ATTEMPTS=3
```

### Crear archivos `.env` desde ejemplos
```bash
# Backend
cp backend/.env.example backend/.env

# Frontend  
cp frontend/.env.example frontend/.env
```

## 🐛 Solución de Problemas

### Docker se queda en "sending tarball"
- **Solución**: Usar desarrollo local (DB en Docker + Backend/Frontend local)
- **Causa**: Docker en Windows puede ser lento con builds grandes

### Error de CORS
- **Verificar**: El backend tiene `CORS(app)` habilitado
- **URLs**: Frontend en puerto 3000, Backend en puerto 5000

### Puerto ocupado
- **Cambiar puertos** en `docker-compose.yml` si es necesario
- **Verificar**: `netstat -an | findstr :5000`

### Archivos `.env` faltantes
- **Error**: "Environment variable not found"
- **Solución**: Crear los archivos `.env` en `backend/` y `frontend/`
- **Verificar**: Que los archivos tengan las variables correctas

## 📝 Tecnologías Utilizadas

### Backend
- **Flask** - Framework web
- **SQLAlchemy** - ORM
- **PostgreSQL** - Base de datos
- **Marshmallow** - Serialización
- **Flask-Smorest** - API REST + Swagger

### Frontend
- **React 18** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Bundler rápido
- **Zustand** - Estado global
- **Axios** - Cliente HTTP
- **Bootstrap 5** - Framework CSS
- **Vitest** - Testing framework
- **React Testing Library** - Testing de componentes

### DevOps
- **Docker** - Containerización
- **Docker Compose** - Orquestación
- **Nginx** - Servidor web

## 🎯 Funcionalidades

### Lista de Clientes
- ✅ Muestra todos los clientes disponibles
- ✅ Tarjetas con información básica
- ✅ Botón para ver detalles

### Detalles del Cliente
- ✅ Búsqueda por ID
- ✅ Información completa del cliente
- ✅ Barras de progreso para datos y minutos
- ✅ Resumen de uso restante

¡La aplicación está completamente funcional en Docker!
