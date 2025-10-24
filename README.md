# TelcoX BSS Mock API

API mock para simular un sistema BSS (Business Support System) de telecomunicaciones.

## 🚀 Ejecución con Docker Compose

### Prerrequisitos
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Configuración
1. **Clona el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd telcox_prueba
   ```

2. **Crea el archivo `.env` en `backend/`:**
   ```env
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   POSTGRES_DB=telcox_db
   POSTGRES_HOST=db
   POSTGRES_PORT=5432
   ```

3. **Ejecuta el proyecto:**
   ```bash
   docker-compose build
   docker-compose up -d
   ```

### 🎯 Acceso
- **API:** http://localhost:5000
- **Swagger:** http://localhost:5000/docs

## 🔧 Ejecución sin Docker Compose

### Prerrequisitos
- Python 3.8+
- PostgreSQL

### Configuración
1. **Instala dependencias:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Configura PostgreSQL:**
   - Crea una base de datos llamada `telcox_db`
   - Configura las variables de entorno o modifica `config.py`

3. **Ejecuta la aplicación:**
   ```bash
   python app.py
   ```

## 🧪 Ejecutar Tests

```bash
# Con Docker Compose
docker-compose exec backend pytest

# Sin Docker Compose
cd backend
pytest

# Con más detalle (verbose)
python -m pytest test_client_endpoint.py -v
```

### Comandos útiles
```bash
# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Reconstruir
docker-compose up --build -d
```
