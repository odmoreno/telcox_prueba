# Frontend - Sistema de Consumo de Clientes

Aplicación React con TypeScript para probar los endpoints del backend Flask.

## 🚀 Desarrollo Local (RECOMENDADO)

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Backend Flask ejecutándose en puerto 5000

### Configuración de Variables de Entorno

1. **Crear archivo `.env`** en la raíz del frontend:
```bash
# Backend API Configuration
VITE_API_BASE_URL=http://localhost:5000

# Environment
VITE_NODE_ENV=development
```

2. **Para producción**, cambiar la URL:
```bash
VITE_API_BASE_URL=https://tu-api-backend.com
```

### Instalación y Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno (ver ENV_SETUP.md)
cp .env.example .env

# 3. Ejecutar en modo desarrollo
npm run dev
```

La aplicación estará disponible en: **http://localhost:5173**

### Comandos Disponibles

```bash
# Desarrollo (con hot reload)
npm run dev

# Construir para producción
npm run build

# Preview de la construcción
npm run preview

# Linting
npm run lint
```

## 🔧 Configuración

### Backend URL
Por defecto se conecta a: `http://localhost:5000`

Para cambiar la URL del backend, edita:
```typescript
// src/store/clientStore.ts
const response = await fetch('http://localhost:5000/client/');
```

### Variables de Entorno
Crea un archivo `.env` en la raíz del frontend:
```env
VITE_API_URL=http://localhost:5000
```

## 📱 Funcionalidades

### Lista de Clientes
- ✅ Muestra todos los clientes
- ✅ Tarjetas con información básica
- ✅ Botón para ver detalles

### Detalles del Cliente  
- ✅ Búsqueda por ID
- ✅ Información completa
- ✅ Barras de progreso
- ✅ Resumen de uso

## 🛠️ Tecnologías

- **React 18** + TypeScript
- **Vite** (bundler rápido)
- **Zustand** (estado global)
- **Axios** (peticiones HTTP)
- **Bootstrap 5** (estilos)

## 📁 Estructura

```
src/
├── components/          # Componentes React
│   ├── App.tsx         # App principal
│   ├── ClientList.tsx  # Lista de clientes
│   └── ClientDetails.tsx # Detalles cliente
├── store/              # Estado global
│   └── clientStore.ts  # Store Zustand
├── resources/          # API
│   └── api.ts         # Config Axios
├── types/             # Tipos TS
│   └── index.ts       # Definiciones
└── main.tsx           # Entry point
```

## 🐳 Docker (Opcional)

```bash
# Construir imagen
docker build -t telcox-frontend .

# Ejecutar contenedor
docker run -p 3000:80 telcox-frontend
```

## 🔗 Endpoints Utilizados

- `GET /client/` - Lista todos los clientes
- `GET /client/{id}` - Cliente específico por ID

## 🚨 Solución de Problemas

### Error de CORS
Si hay problemas de CORS, verifica que el backend tenga:
```python
CORS(app)  # En app.py
```

### Backend no responde
Verifica que el backend esté ejecutándose:
```bash
# En otra terminal
cd ../backend
python app.py
```

### Puerto ocupado
Si el puerto 5173 está ocupado, Vite usará automáticamente el siguiente disponible.