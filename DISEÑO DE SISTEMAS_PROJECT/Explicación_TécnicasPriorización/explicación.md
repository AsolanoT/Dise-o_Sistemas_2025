### **1. Técnicas de Desarrollo**  
#### **a. Desarrollo Iterativo e Incremental (Prototipado)**  
- **Por qué**:  
  - Ideal para un **MVP académico**, ya que permite entregar funcionalidades básicas primero (ej: generación de facturas) y refinarlas en iteraciones posteriores.  
  - Facilita la retroalimentación temprana de los stakeholders (profesores, equipo).  

#### **b. Arquitectura por Capas (Backend Spring Boot)**  
- **Por qué**:  
  - Separa claramente la lógica de negocio (servicios), persistencia (JPA/MySQL) y presentación (REST API).  
  - Favorece la mantenibilidad y escalabilidad futura.  

#### **c. Componentes Reutilizables (Frontend Ionic React)**  
- **Por qué**:  
  - Ionic permite crear componentes UI (ej: formularios de contribuyentes) que se reutilizan en móvil y web.  
  - React facilita la gestión del estado (ej: datos de facturas) con hooks o context API.  

---

### **2. Técnicas de Gestión de Requerimientos**  
#### **a. MoSCoW (Priorización)**  
- **Por qué**:  
  - Ya aplicada en la priorización anterior. Ayuda a enfocarse en lo esencial (Must have: RF01-RF03) y descartar lo innecesario (ej: integración con bancos).  

#### **b. User Stories (Historias de Usuario)**  
- **Por qué**:  
  - Ejemplo: *"Como SuperAdmin, quiero registrar un contribuyente jurídico para asignarle obligaciones tributarias"*.  
  - Son ideales para un equipo ágil y contextualizan los requerimientos en necesidades reales.  

#### **c. Diagramas de Casos de Uso (UML)**  
- **Por qué**:  
  - Visualizan las interacciones entre actores (roles) y el sistema (ej: generar factura, consultar pago).  
  - Útil para validar el alcance con los stakeholders.  

---

### **3. Técnicas de Modelado y Diseño**  
#### **a. Diagrama Entidad-Relación (Base de Datos)**  
- **Por qué**:  
  - MySQL es relacional; el modelo debe reflejar entidades clave: `Contribuyente`, `Factura`, `ObligaciónTributaria`.  
  - Ayuda a normalizar hasta 3FN (evitar redundancias).  

#### **b. Mockups de UI (Figma/Balsamiq)**  
- **Por qué**:  
  - Ionic React requiere definir flujos de usuario (ej: pantallas de autogestión).  
  - Los mockups ahorran tiempo en desarrollo y validan la usabilidad temprana.  

#### **c. API First (Swagger/OpenAPI)**  
- **Por qué**:  
  - Spring Boot expone endpoints REST. Definir la API primero (ej: `/api/facturas`) asegura consistencia entre frontend y backend.  

---

### **4. Técnicas de Calidad y Pruebas**  
#### **a. Pruebas Unitarias (JUnit + Jest)**  
- **Por qué**:  
  - **Backend**: Probar servicios de cálculo tributario (ej: tarifas de impuestos).  
  - **Frontend**: Validar componentes React (ej: formulario de registro).  

#### **b. Pruebas de Integración (TestContainers para MySQL)**  
- **Por qué**:  
  - Verificar que los módulos funcionen juntos (ej: que el frontend consuma correctamente la API de facturas).  

#### **c. Pruebas Manuales (Casos de Uso Clave)**  
- **Por qué**:  
  - En un MVP académico, es práctico probar manualmente flujos críticos:  
    - Generar factura → Imprimir PDF.  
    - Consultar estado de pagos.  

---

### **5. Técnicas de Seguridad**  
#### **a. Autenticación Básica (Spring Security)**  
- **Por qué**:  
  - El MVP no requiere alta seguridad; roles fijos (SuperAdmin, Contribuyente) pueden gestionarse con sesiones simples.  
  - JWT sería over-engineering en esta fase.  

#### **b. Hash de Contraseñas (SHA-256)**  
- **Por qué**:  
  - Suficiente para el contexto académico (no se manejan datos reales sensibles).  

---

### **6. Técnicas de Despliegue y Operación**  
#### **a. Docker (Contenedorización)**  
- **Por qué**:  
  - Empaquetar la app (frontend + backend + MySQL) en contenedores facilita la demostración en clase.  

#### **b. Scripts SQL de Población (Datos de Prueba)**  
- **Por qué**:  
  - Pre-insertar contribuyentes y facturas para mostrar funcionalidades sin depender de registros manuales.  

---

### **¿Por qué NO usar otras técnicas?**  
- **SCRUM/Kanban**: 
    - El proyecto es pequeño; basta con un tablero simple (Trello) y hitos semanales. 
    - SCRUM funciona mejor en proyectos con requisitos cambiantes y entregables frecuentes. Aquí los requerimientos están claros desde el inicio (documento ERS) y no hay stakeholders externos exigiendo cambios. 
    - Kanban se enfoca en flujo continuo y límites de trabajo en progreso (WIP), ideal para mantenimiento o proyectos largos.
- **Microservicios**: Complejidad innecesaria para un MVP local.  
- **CI/CD**: No se requiere despliegue continuo en un prototipo académico.  

---

### **Resumen de Técnicas Clave**  
| Ámbito               | Técnicas Recomendadas                                                                 |  
|----------------------|-------------------------------------------------------------------------------------|  
| **Desarrollo**       | Iterativo, Arquitectura por capas, Componentes reutilizables.                       |  
| **Gestión**          | MoSCoW, User Stories, Casos de Uso.                                                 |  
| **Modelado**         | Diagrama ER, Mockups UI, API First.                                                 |  
| **Calidad**          | Pruebas unitarias, integración y manuales.                                          |  
| **Seguridad**        | Autenticación básica, Hash de contraseñas.                                          |  
| **Despliegue**       | Docker, Scripts de datos de prueba.                                                 |  
