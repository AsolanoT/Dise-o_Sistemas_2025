# **Levantamiento de Requerimientos - ERP Tributario**

## Integrantes

- Ángel Gustavo Solano Trujillo
- Juan Sebastián Agudelo Quintero
- Jordan Ramírez Gallego

## **1. Introducción**

### **1.1 Propósito**

El presente documento de Especificación de Requerimientos de Software (ERS) tiene como objetivo definir de manera estructurada y detallada los requisitos funcionales y no funcionales del sistema ERP Tributario para la Alcaldía de Neiva. Este documento servirá como guía fundamental para el desarrollo, implementación y validación del software, asegurando que la solución final cumpla con las necesidades operativas y regulatorias de la administración tributaria municipal.

### **1.2 Ámbito del Sistema**

El sistema se desarrollará como una aplicación web con:

- **Frontend**: Ionic + React (aplicación híbrida multiplataforma)
- **Backend**: Spring Boot (framework Java)
- **Base de Datos**: MySQL (SGBD relacional)

_Justificación técnica_:  
Ionic React permite desarrollar interfaces móviles y web con un solo código base, mientras que Spring Boot ofrece robustez para el manejo de transacciones tributarias.

### **1.3 Definiciones y Acrónimos**

| Término  | Definición                            |
| -------- | ------------------------------------- |
| **MVP**  | Producto Mínimo Viable                |
| **JWT**  | JSON Web Token (Autenticación segura) |
| **JPA**  | Java Persistence API                  |
| **REST** | Arquitectura para APIs web            |
| **SGBD** | Sistema Gestor de Base de Datos       |

## **Contexto del Proyecto - ERP Tributario**

## 1. Antecedentes

Actualmente, la **Alcaldía de Neiva** maneja un **proceso manual** para la generación de facturas tributarias dirigidas a:

- **Personas Naturales** (Impuesto Predial, Industria y Comercio, Multas de Tránsito, Multas de Movilidad).
- **Personas Jurídicas** (Impuestos comerciales y sanciones administrativas).

Este proceso es **ineficiente**, propenso a errores y carece de transparencia en el seguimiento de pagos.

## 2. Problema Actual

- **Generación manual de facturas** (en papel o formatos digitales no estandarizados).
- **Falta de un sistema centralizado** para consultar el estado de pagos.
- **Dificultad para actualizar datos** de los contribuyentes.
- **No hay un historial digital** de facturas emitidas y su estado (pagado/pendiente).

## 3. Objetivo del Proyecto

Desarrollar un **ERP Tributario Local (MVP)** que permita:  
✅ **Automatizar la generación de facturas** (vista previa/imprimible).  
✅ **Clasificar contribuyentes** (naturales/jurídicos) y sus obligaciones.  
✅ **Permitir autogestión** (actualización de datos por parte del contribuyente).  
✅ **Consultar el estado de pagos** (para contribuyentes y la entidad pública).  
✅ **Generar reportes básicos** (recaudos, morosos).

## 4. Alcance (MVP Académico)

🔹 **Sistema local** (no requiere conexión a Internet, pero puede incluir sincronización opcional).  
🔹 **Roles definidos**:

- **SuperAdmin** (Alcaldía): Registra contribuyentes, genera reportes.
- **Contribuyente**: Actualiza sus datos, consulta y paga facturas.
- **Entidad Pública**: Consulta estados de pago y genera reportes.  
  🔹 **Facturas simplificadas** (vista previa/imprimible, sin integración con SAT).  
  🔹 **Base de datos** (MySQL para pruebas).

## 5. Beneficios Esperados

✔ **Eliminar procesos manuales** en la generación de facturas.  
✔ **Mayor transparencia** en el seguimiento de pagos.  
✔ **Acceso rápido** al historial tributario de los contribuyentes.  
✔ **Reducción de errores** en cálculos y registros.

## 6. Limitaciones (MVP Académico)

⚠ **No es un sistema en producción**, solo un prototipo funcional.  
⚠ **Sin integración con bancos o pasarelas de pago** (solo simulación).  
⚠ **Datos de prueba** para demostración en clase.

## 7. Tecnologías Propuestas

- **Frontend**: Ionic React (aplicación híbrida)
- **Backend**: Spring Boot (Java)
- **Base de Datos**: MySQL
- **Autenticación**: Sesiones básicas (JWT si se requiere más seguridad)

## **Requerimientos Funcionales**

### RF01: Registro de Contribuyentes

**Definición**: Sistema para registrar los dos tipos de contribuyentes (naturales y jurídicos) con sus datos básicos y obligaciones tributarias asociadas.

- Campos para persona natural: Nombre completo, documento identidad, dirección, teléfono, correo
- Campos para persona jurídica: Razón social, NIT, dirección legal, representante legal
- Asignación automática de obligaciones según tipo de contribuyente

### RF02: Gestión de Obligaciones Tributarias

**Definición**: Catálogo de los impuestos locales con sus parámetros de cálculo.

- Tipos: Predial, Industria y Comercio, Multas de tránsito, Multas de movilidad
- Parámetros por cada tipo: Base de cálculo, tarifas, periodicidad
- Relación contribuyente-obligaciones según actividades declaradas

### RF03: Generación de Facturas/Declaraciones

**Definición**: Creación de documentos imprimibles con la información de pago.

- Vista previa de factura con datos del contribuyente
- Detalle del tributo: concepto, periodo, valor a pagar
- Estado actual (pendiente/cancelado)
- Botón de impresión directa desde navegador

### RF04: Consulta de Estado de Pagos

**Definición**: Sistema para verificar el estado de las obligaciones tributarias.

- Para contribuyentes: Ver sus propias facturas y estados
- Para entidad pública: Búsqueda por documento/NIT para consultar historial
- Filtros por periodo y tipo de tributo

### RF05: Autogestión para Contribuyentes

**Definición**: Panel donde los contribuyentes pueden actualizar sus datos y consultar obligaciones.

- Actualización de datos de contacto (dirección, teléfono, email)
- Cambio de contraseña
- Visualización de historial de pagos
- Consulta de obligaciones pendientes

### RF06: Módulo de Reportes Básicos

**Definición**: Generación de reportes simples para la entidad pública.

- Listado de contribuyentes morosos por periodo
- Recaudo total por tipo de tributo
- Cantidad de facturas generadas en rango de fechas

## Requerimientos No Funcionales

### RNF01: Gestión de Roles

**Definición**: Sistema de autenticación por tres roles con permisos diferenciados.

- Superadmin (Alcaldía): Acceso total
- Contribuyente: Solo autogestión y consultas propias
- Entidad Pública: Solo consultas y reportes

### RNF02: Interfaz Sencilla

**Definición**: UI intuitiva con máximo 3 niveles de profundidad.

- Diseño responsive (adaptable a móviles)
- Menú contextual según rol
- Formularios con validación en tiempo real

### RNF03: Base de Datos

**Definición**: Almacenamiento sin requerir conexión externa.

- MySQL para desarrollo
- Estructura normalizada hasta 3FN

### RNF04: Funcionalidad Offline/Online

**Definición**: Capacidad de trabajar sin conexión.

- Operaciones básicas disponibles sin internet
- Sincronización con servidor central cuando hay conexión

### RNF05: Rendimiento Aceptable

**Definición**: Tiempos de respuesta adecuados para contexto académico.

- Carga inicial en menos de 3 segundos
- Generación de facturas en menos de 2 segundos
- Consultas con filtros en menos de 1 segundo

### RNF06: Seguridad y Transparencia con JWT

**Definición**: Sistema de autenticación simplificado que garantice un acceso seguro pero práctico para los usuarios.

- Autenticación mediante usuario y contraseña
- Contraseñas almacenadas con hash básico (SHA-256)
- Sesiones con tiempo de expiración (8 horas)
- Protección contra intentos repetidos (máximo 5 intentos)
- Roles diferenciados (Superadmin, Contribuyente, Entidad Pública)
