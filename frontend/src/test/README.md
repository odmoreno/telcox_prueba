# Tests de Integración - Frontend

Este directorio contiene los tests de integración para el frontend, que prueban la comunicación con el backend.

## Estructura de Tests

### 📁 Archivos de Test

- **`api.integration.test.ts`** - Tests de integración para los endpoints de la API
- **`integration.config.ts`** - Configuración para tests de integración
- **`setup.ts`** - Configuración global de testing

### 🧪 Tipos de Tests

#### 1. Tests de API
- ✅ Comunicación con endpoints del backend
- ✅ Validación de estructura de datos
- ✅ Timeouts y performance
- ✅ Manejo de backend no disponible

## 🚀 Ejecutar Tests

### Prerequisitos
```bash
# Asegúrate de que el backend esté corriendo
cd ../backend
python app.py
```

### Comandos Disponibles

```bash
# Ejecutar todos los tests
npm run test

# Tests con interfaz visual
npm run test:ui

# Tests con cobertura
npm run test:coverage
```

### Variables de Entorno

```bash
# URL del backend para tests
export VITE_API_BASE_URL=http://localhost:5000

# Ejecutar tests con backend específico
VITE_API_BASE_URL=http://localhost:5000 npm run test:integration
```

## 🔧 Configuración

### Backend Requerido
Los tests de integración requieren que el backend esté disponible. Si no está disponible:
- Los tests se saltarán automáticamente
- Se mostrará un mensaje de advertencia
- Se ejecutarán solo las validaciones básicas

### Timeouts
- **API Response**: 5 segundos
- **Backend Check**: 5 segundos

## 📊 Cobertura de Tests

Los tests cubren:

### ✅ Funcionalidades Probadas
- [x] Carga de lista de clientes (`GET /client/`)
- [x] Búsqueda de cliente por ID (`GET /client/{id}`)
- [x] Validación de estructura de datos
- [x] Validación de tipos de datos
- [x] Performance y timeouts

### ✅ Casos de Error
- [x] Backend no disponible (tests se saltan automáticamente)
- [x] Manejo de timeouts
- [x] Validación de respuestas del servidor

### ✅ Validaciones
- [x] Estructura de datos del cliente
- [x] Tipos de datos (string, number)
- [x] Valores lógicos (balance >= 0, etc.)
- [x] Performance de respuesta

## 🐛 Debugging

### Tests Específicos
```bash
# Ejecutar un test específico
npm run test -- api.integration.test.ts

# Ejecutar con patrón
npm run test -- --grep "API Integration"
```

### Backend Debug
```bash
# Verificar que el backend esté disponible
curl http://localhost:5000/client/

# Verificar logs del backend
cd ../backend
python app.py
```

## 📝 Mejores Prácticas

### ✅ Do's
- Verificar que el backend esté disponible antes de ejecutar tests
- Validar estructura y tipos de datos
- Probar casos de error y timeouts
- Usar datos reales del backend

### ❌ Don'ts
- No asumir que el backend esté disponible
- No ignorar errores de red
- No hardcodear datos de prueba
- No usar datos de producción

## 🔄 CI/CD

### GitHub Actions
```yaml
- name: Run Tests
  run: |
    cd frontend
    npm run test
  env:
    VITE_API_BASE_URL: http://localhost:5000
```

### Docker
```bash
# Ejecutar tests en contenedor
docker-compose exec frontend npm run test
```

## 📈 Métricas

### Objetivos de Cobertura
- **API Endpoints**: 100% (GET /client/, GET /client/{id})
- **Validaciones**: 100% (estructura, tipos, valores)

### Performance
- **API Response**: < 5 segundos
- **Backend Check**: < 5 segundos
- **Test Execution**: < 10 segundos
