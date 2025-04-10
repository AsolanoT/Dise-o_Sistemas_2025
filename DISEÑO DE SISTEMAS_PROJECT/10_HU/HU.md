# 🔐 HU-001: Autenticación Segura por Roles

**Como** administrador de la Alcaldía de Neiva,  
**Quiero** un sistema de login robusto  
**Para** garantizar que solo personal autorizado acceda al sistema.

## Criterios de Aceptación Detallados:

### 1. Frontend:
- Formulario con:
  - Campos para email y contraseña.
  - Validación en tiempo real (ej: icono de check/error usando IonIcon).
  - Botón "Olvidé mi contraseña" (sin funcionalidad en MVP, pero con diseño).
- Diseño responsive:
  - 2 columnas en desktop, 1 columna en móvil (IonGrid).

### 2. Backend:
- Endpoint `POST /auth/login` que retorne:
  - Token JWT válido por 8 horas.
  - Rol del usuario (SuperAdmin/Contribuyente/Entidad).
- Hash de contraseñas con BCrypt.

### 3. Flujos Alternativos:
- Credenciales incorrectas: Mostrar mensaje: `"Usuario o contraseña inválidos. Intente nuevamente."`.
- Campos vacíos: Deshabilitar botón de login hasta que ambos campos estén llenos.

---

# 👤 HU-002: Registro de Personas Naturales

**Como** funcionario de la Alcaldía,  
**Quiero** registrar personas naturales con sus obligaciones tributarias  
**Para** mantener un padrón actualizado.

## Especificaciones Extendidas:

### 1. Campos Obligatorios:

```json
{
  "tipoDocumento": "CC|CE|PASAPORTE", 
  "numeroDocumento": "123456789",     
  "nombreCompleto": "Juan Pérez",     
  "direccion": "Calle 123 #45-67",  
  "telefono": "3001234567",  
  "email": "juan@example.com" 
}
```

### 2. Asignación Automática de Obligaciones:
Si el contribuyente es persona natural, asignar:

- Impuesto Predial (tarifa básica).
- Multas de Tránsito (si aplica, según historial).

### 3. Diseño UI/UX:
- Progreso: Barra superior que muestre `"Paso 1 de 3"`.
- Guardado: Snackbar con mensaje `"Contribuyente registrado exitosamente"`.

---

# 📄 HU-003: Generación de Facturas en PDF

**Como** tesorero municipal,  
**Quiero** generar facturas con formato profesional  
**Para** entregarlas a contribuyentes físicos o digitales.

## Detalles Técnicos:

### 1. Estructura del PDF:

```
[Logo Alcaldía de Neiva]
Factura Tributaria #FAC-001-2023
-------------------------------
Contribuyente: Juan Pérez (CC 123456789)
Concepto: Impuesto Predial - Periodo 2023
Valor: $1,200,000
Fecha límite: 10/Abr/2025
```

### 2. Validaciones:
- Si el contribuyente no existe → Retornar error 404.
- Si no hay obligaciones pendientes → Mostrar: `"No hay facturas para generar"`.

---

# 🔍 HU-004: Consulta de Facturas Pendientes

**Como** contribuyente,  
**Quiero** filtrar mis facturas por tipo y período  
**Para** organizar mis pagos tributarios.

## Flujo Completo:

### 1. Pantalla Principal:
- Listado de facturas con:
  - Icono de estado (`IonIcon name="alert-circle"` si está vencida).
  - Filtros superiores (`IonSelect` para tipo y `IonDatetime` para período).

### 2. Búsqueda Avanzada:
- Si hay más de 10 facturas → Paginación con `IonInfiniteScroll`.

### 3. Detalle de Factura:
- Al hacer clic → Modal con:
  - Base de cálculo (ej: Avalúo catastral).
  - Historial de pagos (si aplica).
