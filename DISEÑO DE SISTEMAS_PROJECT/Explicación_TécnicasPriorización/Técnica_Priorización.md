### **1. Técnica MoSCoW**  
**Criterios**:  
- **Must (M)**: Esenciales para el MVP (sin ellos, el sistema no funciona).  
- **Should (S)**: Importantes pero no críticos (mejoran significativamente el producto).  
- **Could (C)**: Deseables pero prescindibles (pueden posponerse).  
- **Won't (W)**: Excluidos del MVP (complejidad innecesaria para el prototipo).  


#### **Requerimientos Funcionales (RF)**  
| Requerimiento | Prioridad MoSCoW | Justificación |
|--------------|------------------|---------------|
| **RF01**: Registro de Contribuyentes | **M** | Base del sistema. Sin contribuyentes, no hay facturas. |
| **RF02**: Gestión de Obligaciones Tributarias | **M** | Necesario para calcular facturas. |
| **RF03**: Generación de Facturas | **M** | Core del proyecto (automatización). |
| **RF04**: Consulta de Estado de Pagos | **S** | Importante para transparencia, pero puede ser básico en MVP. |
| **RF05**: Autogestión para Contribuyentes | **C** | Valor agregado, pero puede simularse manualmente en MVP. |
| **RF06**: Módulo de Reportes Básicos | **S** | Útil para la Alcaldía, pero con reportes muy simples. |


#### **Requerimientos No Funcionales (RNF)**  
| Requerimiento | Prioridad MoSCoW | Justificación |
|--------------|------------------|---------------|
| **RNF01**: Gestión de Roles | **M** | Básico para diferenciar permisos (SuperAdmin, Contribuyente, Entidad). |
| **RNF02**: Interfaz Sencilla | **S** | Importante para usabilidad, pero puede ser un prototipo funcional. |
| **RNF03**: Base de Datos (MySQL) | **M** | Esencial para persistencia de datos. |
| **RNF04**: Funcionalidad Offline/Online | **C** | Ideal para un ERP real, pero en MVP puede ser solo local. |
| **RNF05**: Rendimiento Aceptable | **S** | Prioritario si hay demos en clase, pero no crítico. |
| **RNF06**: Seguridad con JWT | **C** | En MVP puede usarse autenticación básica (usuarios pre-cargados). |

---

### **2. Matriz de Impacto vs. Esfuerzo**  
**Criterios**:  
- **Impacto**: Valor entregado al usuario/entidad.  
- **Esfuerzo**: Complejidad técnica o tiempo de desarrollo.  

| Requerimiento | Impacto (Alto/Medio/Bajo) | Esfuerzo (Alto/Medio/Bajo) | Prioridad Final |
|--------------|--------------------------|--------------------------|----------------|
| **RF01** | Alto | Medio | **Alta** (M) |
| **RF02** | Alto | Medio | **Alta** (M) |
| **RF03** | Alto | Bajo (Generar PDF básico) | **Altísima** (M) |
| **RF04** | Medio | Bajo (Consultas SQL simples) | **Media** (S) |
| **RF05** | Medio | Alto (Requiere UI y lógica de actualización) | **Baja** (C) |
| **RF06** | Medio | Bajo (Consultas agrupadas) | **Media** (S) |
| **RNF01** | Alto | Bajo (Roles fijos) | **Alta** (M) |
| **RNF02** | Medio | Medio (Diseño responsive) | **Media** (S) |
| **RNF03** | Alto | Medio (Configuración inicial) | **Alta** (M) |
| **RNF04** | Bajo | Alto (Sincronización offline/online) | **Baja** (C) |
| **RNF05** | Medio | Bajo (Optimización básica) | **Media** (S) |
| **RNF06** | Medio | Medio (Implementar JWT) | **Baja** (C) |


---


### **3. Priorización Final (Orden de Implementación)**  
1. **RF01 + RF02 + RF03** (Core del MVP: registrar contribuyentes, obligaciones y facturas).  
2. **RNF01 + RNF03** (Roles y base de datos).  
3. **RF04 + RF06** (Consulta de pagos y reportes básicos).  
4. **RNF02 + RNF05** (Interfaz sencilla y rendimiento).  
5. **RF05 + RNF04 + RNF06** (Autogestión, offline y JWT) → Solo si hay tiempo.  
