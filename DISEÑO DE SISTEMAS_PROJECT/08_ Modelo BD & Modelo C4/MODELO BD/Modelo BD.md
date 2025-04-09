# ERP TRIBUTARIO NEIVA - Ejemplo de Flujo Funcional

Este documento describe un **flujo funcional típico** dentro del sistema ERP TRIBUTARIO NEIVA, desde el registro inicial de un usuario hasta la emisión de una factura tributaria.

---

## 🔄 Ejemplo de Flujo de Datos

1. **Registro del Usuario:**

   - Un nuevo usuario se crea en el sistema y se le asigna un rol específico, como "Contribuyente".

2. **Registro del Contribuyente:**

   - El usuario, actuando como contribuyente, proporciona su información personal y es registrado en el sistema con su tipo de contribuyente (natural o jurídico).

3. **Asociación de Actividades Económicas:**

   - El sistema vincula al contribuyente con una o más actividades económicas, según su negocio o profesión.

4. **Asignación de Obligaciones Tributarias:**

   - Con base en las actividades del contribuyente, el sistema le asigna obligaciones tributarias específicas, con sus respectivos periodos y valores estimados.

5. **Emisión de Factura:**

   - Cuando el contribuyente realiza el pago de sus tributos, el sistema genera una factura con todos los detalles asociados, incluyendo el tipo de tributo y el periodo correspondiente.

6. **Registro en Auditoría:**
   - Todas las acciones realizadas por el usuario son registradas automáticamente en la tabla de auditoría para garantizar trazabilidad y transparencia del sistema.

# Modelo de Base de Datos - ERP Tributario Neiva (MVP)

Este modelo de base de datos está diseñado para la gestión eficiente de las obligaciones tributarias en la ciudad de Neiva, integrando usuarios, contribuyentes, actividades económicas y facturación. A continuación, se describen las entidades, sus atributos principales y las relaciones entre ellas.

---

## 🧩 Entidades Principales

### 🔐 Usuario

- **id_usuario** (PK): Identificador único del usuario.
- **username**, **email**: Credenciales únicas.
- **password**: Cifrado SHA-256.
- **estado**: Activo/inactivo.
- **id_rol** (FK): Rol asignado al usuario.

> Nota: Se implementa control de sesión de 8 horas, bloqueo tras 5 intentos fallidos.

---

### 🧷 Rol

- **id_rol** (PK): Identificador del rol.
- **nombre**: Rol único (admin, auditor, etc.).
- **descripcion**: Descripción del rol.

---

### 🧾 Contribuyente

- **id_contribuyente** (PK): Identificador único.
- **documento_identidad**: Único por ciudadano/empresa.
- **id_tipo_contribuyente** (FK): Clasificación natural o jurídica.
- **id_usuario** (FK, opcional): Usuario asociado (si aplica).

---

### 🧮 TipoContribuyente

- **id_tipo_contribuyente** (PK): Natural o Jurídica.
- **nombre**: Nombre del tipo.
- **descripcion**: Detalle adicional.

---

### 📊 TipoTributo

- **id_tipo_tributo** (PK): Identificador del tipo de impuesto.
- **codigo**: Código corto (ej. PRED, INDYCOM).
- **periodicidad**: Frecuencia de cobro (Mensual, Trimestral, etc.).
- **tarifa_base** y **formula_calculo**: Base para el cálculo tributario.

> Ejemplos: Predial, Industria y Comercio, Multas Tránsito.

---

### 📅 ObligacionTributaria

- **id_obligacion** (PK): ID único de la obligación.
- **id_contribuyente** (FK): Contribuyente que la debe.
- **id_tipo_tributo** (FK): Impuesto correspondiente.
- **estado**: Pendiente, Cancelada, Morosa.

---

### 🧾 Factura

- **id_factura** (PK): Identificador único.
- **numero_factura**: Formato `F-YYYYMMDD-XXXX`.
- **id_obligacion** (FK): Obligación tributaria asociada.
- **estado**: Generada, Pagada o Anulada.
- **valor_total**: Resultado del cálculo del tributo.

> Incluye medios y comprobantes de pago, así como fechas.

---

### 🧭 ActividadEconomica

- **id_actividad** (PK): Código único.
- **nombre**, **descripcion**: Nombre y detalle de la actividad.
- **tarifa_especial**: En caso de descuentos o beneficios.

---

### 🔁 ContribuyenteActividad

- **id_contribuyente_actividad** (PK): ID de la relación.
- **id_contribuyente** (FK): Persona o entidad registrada.
- **id_actividad** (FK): Actividad que desarrolla.
- **principal**: Marca si es la actividad principal.

---

### 📋 Auditoria

- **id_auditoria** (PK): Registro del evento.
- **tabla_afectada**, **id_registro**: Referencias al cambio.
- **accion**: INSERT, UPDATE o DELETE.
- **id_usuario** (FK, opcional): Quién hizo la acción.
- **valores_anteriores**, **valores_nuevos**: En JSON.

---

## 🔗 Relaciones

| Entidad Origen         | Entidad Destino      | Tipo Relación | Descripción                                      |
| ---------------------- | -------------------- | ------------- | ------------------------------------------------ |
| Usuario                | Rol                  | Muchos a Uno  | Cada usuario tiene un solo rol.                  |
| Contribuyente          | TipoContribuyente    | Muchos a Uno  | Clasifica a los contribuyentes.                  |
| Contribuyente          | Usuario (opcional)   | Muchos a Uno  | Usuario asociado, si existe.                     |
| ObligacionTributaria   | Contribuyente        | Muchos a Uno  | Cada obligación pertenece a un contribuyente.    |
| ObligacionTributaria   | TipoTributo          | Muchos a Uno  | Define el tipo de impuesto.                      |
| Factura                | ObligacionTributaria | Uno a Uno     | Cada obligación genera una factura.              |
| ContribuyenteActividad | Contribuyente        | Muchos a Uno  | Un contribuyente puede tener varias actividades. |
| ContribuyenteActividad | ActividadEconomica   | Muchos a Uno  | Relación con actividad económica.                |
| Auditoria              | Usuario (opcional)   | Muchos a Uno  | Quién generó el cambio, si aplica.               |

## 📌 Alcance del MVP

Este diseño cubre las funcionalidades mínimas viables para:

- Registro y autenticación de usuarios.
- Gestión de contribuyentes y sus actividades.
- Creación de obligaciones y generación de facturas.
- Registro de auditoría sobre los cambios del sistema.
