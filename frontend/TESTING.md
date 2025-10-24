# 🧪 Guía de Testing - Frontend

Esta guía explica cómo ejecutar y entender los tests de integración del frontend.

## 🚀 Inicio Rápido

### 1. Instalar Dependencias
```bash
cd frontend
npm install
```

### 2. Ejecutar Tests
```bash
# Todos los tests
npm run test

# Solo tests de integración
npm run test:integration

# Tests con interfaz visual
npm run test:ui
```

## 📋 Tipos de Tests

### 🔧 Tests Unitarios
- **Archivos**: `*.test.ts`, `*.test.tsx`
- **Propósito**: Probar funciones y componentes aislados
- **Ejecutar**: `npm run test:unit`

### 🌐 Tests de Integración
- **Archivos**: `*.integration.test.*`
- **Propósito**: Probar comunicación con el backend
- **Ejecutar**: `npm run test:integration`

### 🎯 Tests End-to-End
- **Archivos**: `e2e.integration.test.ts`
- **Propósito**: Probar flujo completo de la aplicación
- **Ejecutar**: `npm run test:api`

## 🏗️ Estructura de Tests

```
src/test/
├── api.integration.test.ts      # Tests de endpoints
├── store.integration.test.ts    # Tests del store
├── components.integration.test.tsx # Tests de componentes
├── e2e.integration.test.ts      # Tests end-to-end
├── integration.config.ts        # Configuración
├── setup.ts                     # Setup global
└── README.md                    # Documentación
```

## 🔧 Configuración

### Variables de Entorno
```bash
# URL del backend
export VITE_API_BASE_URL=http://localhost:5000

# Modo debug
export DEBUG=true
```

### Backend Requerido
Los tests de integración requieren que el backend esté disponible:

```bash
# Terminal 1: Backend
cd ../backend
python app.py

# Terminal 2: Tests
cd frontend
npm run test:integration
```

## 📊 Cobertura de Tests

### ✅ Funcionalidades Probadas

#### API Endpoints
- [x] `GET /client/` - Lista de clientes
- [x] `GET /client/{id}` - Cliente específico
- [x] Manejo de errores 404, 500
- [x] Timeouts de red
- [x] Validación de datos

#### Store (Zustand)
- [x] `fetchClients()` - Cargar clientes
- [x] `fetchClientById()` - Buscar cliente
- [x] `setSelectedClient()` - Seleccionar cliente
- [x] Cache y validación
- [x] Manejo de errores

#### Componentes React
- [x] `ClientList` - Lista de clientes
- [x] `ClientDetails` - Detalles del cliente
- [x] Estados de carga
- [x] Manejo de errores
- [x] Interacciones de usuario

#### Flujo End-to-End
- [x] Carga inicial de clientes
- [x] Selección de cliente
- [x] Búsqueda por ID
- [x] Manejo de errores
- [x] Performance

## 🐛 Debugging

### Logs Detallados
```bash
# Ejecutar con logs
DEBUG=true npm run test:integration

# Tests específicos
npm run test -- --grep "API Integration"
```

### Backend Debug
```bash
# Verificar backend
curl http://localhost:5000/client/

# Logs del backend
cd ../backend
python app.py --debug
```

## 📈 Métricas y Objetivos

### Cobertura Mínima
- **Líneas**: 80%
- **Funciones**: 90%
- **Branches**: 70%
- **Statements**: 80%

### Performance
- **API Response**: < 5 segundos
- **Component Render**: < 2 segundos
- **Test Execution**: < 30 segundos

## 🔄 CI/CD

### GitHub Actions
```yaml
- name: Run Frontend Tests
  run: |
    cd frontend
    npm install
    npm run test:integration
  env:
    VITE_API_BASE_URL: http://localhost:5000
```

### Docker
```bash
# Tests en contenedor
docker-compose exec frontend npm run test:integration
```

## 🚨 Troubleshooting

### Problemas Comunes

#### 1. Backend No Disponible
```
❌ Backend no disponible: Error de conexión
```
**Solución**: Asegúrate de que el backend esté corriendo en `http://localhost:5000`

#### 2. Tests Fallan por Timeout
```
❌ Test timeout: API response > 10s
```
**Solución**: Verifica que el backend responda rápidamente

#### 3. Dependencias Faltantes
```
❌ Module not found: @testing-library/react
```
**Solución**: Ejecuta `npm install`

#### 4. Tests Inconsistentes
```
❌ Test flaky: Sometimes passes, sometimes fails
```
**Solución**: Revisa la configuración de retry y timeouts

### Comandos de Diagnóstico

```bash
# Verificar dependencias
npm list

# Verificar configuración
npm run test -- --help

# Limpiar cache
npm run test -- --no-cache

# Ejecutar tests específicos
npm run test -- api.integration.test.ts
```

## 📝 Mejores Prácticas

### ✅ Do's
- Usar datos de prueba realistas
- Probar casos de error y edge cases
- Validar performance y timeouts
- Limpiar estado entre tests
- Usar mocks apropiadamente

### ❌ Don'ts
- No hardcodear datos de prueba
- No asumir que el backend esté disponible
- No ignorar errores de red
- No hacer tests dependientes entre sí
- No usar datos de producción

## 🔗 Enlaces Útiles

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Zustand Testing](https://github.com/pmndrs/zustand#testing)
- [Axios Testing](https://axios-http.com/docs/intro)
