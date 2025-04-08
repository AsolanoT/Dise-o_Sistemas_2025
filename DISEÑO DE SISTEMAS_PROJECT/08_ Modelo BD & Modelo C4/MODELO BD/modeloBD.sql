-- =============================================
-- MODELO DE BASE DE DATOS - ERP TRIBUTARIO NEIVA
-- Versión: 1.0
-- Autor: Equipo de Desarrollo
-- Fecha: [Fecha Actual]
-- =============================================

-- -----------------------------------------------------
-- Schema erp_tributario
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `erp_tributario` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `erp_tributario`;

-- -----------------------------------------------------
-- Table `erp_tributario`.`rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `erp_tributario`.`rol` (
  `id_rol` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(200) NULL,
  PRIMARY KEY (`id_rol`),
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC))
ENGINE = InnoDB
COMMENT = 'Roles del sistema: SuperAdmin, Contribuyente, EntidadPublica';

-- -----------------------------------------------------
-- Table `erp_tributario`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `erp_tributario`.`usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL COMMENT 'Almacenado con hash SHA-256',
  `email` VARCHAR(100) NOT NULL,
  `estado` TINYINT NOT NULL DEFAULT 1 COMMENT '1=Activo, 0=Inactivo',
  `fecha_creacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ultimo_login` DATETIME NULL,
  `id_rol` INT NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `fk_usuario_rol_idx` (`id_rol` ASC),
  CONSTRAINT `fk_usuario_rol`
    FOREIGN KEY (`id_rol`)
    REFERENCES `erp_tributario`.`rol` (`id_rol`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'Usuarios del sistema con sus credenciales';

-- -----------------------------------------------------
-- Table `erp_tributario`.`tipo_contribuyente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `erp_tributario`.`tipo_contribuyente` (
  `id_tipo_contribuyente` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL COMMENT 'Natural o Jurídica',
  `descripcion` VARCHAR(200) NULL,
  PRIMARY KEY (`id_tipo_contribuyente`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `erp_tributario`.`contribuyente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `erp_tributario`.`contribuyente` (
  `id_contribuyente` INT NOT NULL AUTO_INCREMENT,
  `id_tipo_contribuyente` INT NOT NULL,
  `id_usuario` INT NULL COMMENT 'Null para contribuyentes registrados por admin',
  `documento_identidad` VARCHAR(20) NOT NULL COMMENT 'Cédula o NIT',
  `nombre_completo` VARCHAR(100) NOT NULL,
  `direccion` VARCHAR(200) NOT NULL,
  `telefono` VARCHAR(20) NULL,
  `email` VARCHAR(100) NULL,
  `fecha_registro` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `activo` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_contribuyente`),
  UNIQUE INDEX `documento_identidad_UNIQUE` (`documento_identidad` ASC),
  INDEX `fk_contribuyente_tipo_idx` (`id_tipo_contribuyente` ASC),
  INDEX `fk_contribuyente_usuario_idx` (`id_usuario` ASC),
  CONSTRAINT `fk_contribuyente_tipo`
    FOREIGN KEY (`id_tipo_contribuyente`)
    REFERENCES `erp_tributario`.`tipo_contribuyente` (`id_tipo_contribuyente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_contribuyente_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `erp_tributario`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'Información base de los contribuyentes';

-- -----------------------------------------------------
-- Table `erp_tributario`.`tipo_tributo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `erp_tributario`.`tipo_tributo` (
  `id_tipo_tributo` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(10) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL COMMENT 'Predial, Industria y Comercio, etc.',
  `descripcion` VARCHAR(255) NULL,
  `periodicidad` ENUM('Mensual', 'Trimestral', 'Semestral', 'Anual') NOT NULL,
  `tarifa_base` DECIMAL(10,2) NOT NULL,
  `formula_calculo` VARCHAR(500) NULL COMMENT 'Fórmula para cálculo automático',
  `activo` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_tipo_tributo`),
  UNIQUE INDEX `codigo_UNIQUE` (`codigo` ASC))
ENGINE = InnoDB
COMMENT = 'Catálogo de tipos de tributos disponibles';

-- -----------------------------------------------------
-- Table `erp_tributario`.`obligacion_tributaria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `erp_tributario`.`obligacion_tributaria` (
  `id_obligacion` INT NOT NULL AUTO_INCREMENT,
  `id_contribuyente` INT NOT NULL,
  `id_tipo_tributo` INT NOT NULL,
  `fecha_asignacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_vencimiento` DATE NOT NULL,
  `estado` ENUM('Pendiente', 'Cancelada', 'Morosa') NOT NULL DEFAULT 'Pendiente',
  `observaciones` VARCHAR(500) NULL,
  PRIMARY KEY (`id_obligacion`),
  INDEX `fk_obligacion_contribuyente_idx` (`id_contribuyente` ASC),
  INDEX `fk_obligacion_tipo_tributo_idx` (`id_tipo_tributo` ASC),
  CONSTRAINT `fk_obligacion_contribuyente`
    FOREIGN KEY (`id_contribuyente`)
    REFERENCES `erp_tributario`.`contribuyente` (`id_contribuyente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_obligacion_tipo_tributo`
    FOREIGN KEY (`id_tipo_tributo`)
    REFERENCES `erp_tributario`.`tipo_tributo` (`id_tipo_tributo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'Relación de contribuyentes con sus obligaciones tributarias';

-- -----------------------------------------------------
-- Table `erp_tributario`.`factura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `erp_tributario`.`factura` (
  `id_factura` INT NOT NULL AUTO_INCREMENT,
  `id_obligacion` INT NOT NULL,
  `numero_factura` VARCHAR(20) NOT NULL COMMENT 'Formato: F-YYYYMMDD-XXXX',
  `fecha_emision` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `periodo_facturado` VARCHAR(20) NOT NULL COMMENT 'Ej: 2023-09 para septiembre',
  `valor_base` DECIMAL(12,2) NOT NULL,
  `valor_impuesto` DECIMAL(12,2) NOT NULL,
  `valor_total` DECIMAL(12,2) NOT NULL,
  `estado` ENUM('Generada', 'Pagada', 'Anulada') NOT NULL DEFAULT 'Generada',
  `fecha_pago` DATETIME NULL,
  `metodo_pago` VARCHAR(45) NULL,
  `comprobante_pago` VARCHAR(100) NULL COMMENT 'Referencia o número de comprobante',
  PRIMARY KEY (`id_factura`),
  UNIQUE INDEX `numero_factura_UNIQUE` (`numero_factura` ASC),
  INDEX `fk_factura_obligacion_idx` (`id_obligacion` ASC),
  CONSTRAINT `fk_factura_obligacion`
    FOREIGN KEY (`id_obligacion`)
    REFERENCES `erp_tributario`.`obligacion_tributaria` (`id_obligacion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'Facturas generadas para cada obligación tributaria';

-- -----------------------------------------------------
-- Table `erp_tributario`.`actividad_economica`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `erp_tributario`.`actividad_economica` (
  `id_actividad` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(10) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` VARCHAR(255) NULL,
  `tarifa_especial` DECIMAL(5,2) NULL COMMENT 'Tarifa específica si aplica',
  PRIMARY KEY (`id_actividad`),
  UNIQUE INDEX `codigo_UNIQUE` (`codigo` ASC))
ENGINE = InnoDB
COMMENT = 'Catálogo de actividades económicas para cálculo de tributos';

-- -----------------------------------------------------
-- Table `erp_tributario`.`contribuyente_actividad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `erp_tributario`.`contribuyente_actividad` (
  `id_contribuyente_actividad` INT NOT NULL AUTO_INCREMENT,
  `id_contribuyente` INT NOT NULL,
  `id_actividad` INT NOT NULL,
  `fecha_asignacion` DATE NOT NULL,
  `principal` TINYINT NOT NULL DEFAULT 0 COMMENT '1=Actividad principal',
  PRIMARY KEY (`id_contribuyente_actividad`),
  INDEX `fk_contrib_act_contribuyente_idx` (`id_contribuyente` ASC),
  INDEX `fk_contrib_act_actividad_idx` (`id_actividad` ASC),
  CONSTRAINT `fk_contrib_act_contribuyente`
    FOREIGN KEY (`id_contribuyente`)
    REFERENCES `erp_tributario`.`contribuyente` (`id_contribuyente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_contrib_act_actividad`
    FOREIGN KEY (`id_actividad`)
    REFERENCES `erp_tributario`.`actividad_economica` (`id_actividad`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'Relación de contribuyentes con sus actividades económicas';

-- -----------------------------------------------------
-- Table `erp_tributario`.`auditoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `erp_tributario`.`auditoria` (
  `id_auditoria` INT NOT NULL AUTO_INCREMENT,
  `tabla_afectada` VARCHAR(45) NOT NULL,
  `id_registro` INT NOT NULL,
  `accion` ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
  `valores_anteriores` JSON NULL,
  `valores_nuevos` JSON NULL,
  `id_usuario` INT NULL COMMENT 'Usuario que realizó la acción',
  `fecha_accion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip_origen` VARCHAR(45) NULL,
  PRIMARY KEY (`id_auditoria`),
  INDEX `fk_auditoria_usuario_idx` (`id_usuario` ASC),
  CONSTRAINT `fk_auditoria_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `erp_tributario`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'Registro de auditoría para cambios importantes en el sistema';

-- =============================================
-- DATOS INICIALES
-- =============================================

-- Roles del sistema
INSERT INTO `rol` (`nombre`, `descripcion`) VALUES 
('SuperAdmin', 'Administrador total del sistema'),
('Contribuyente', 'Usuario contribuyente que paga impuestos'),
('EntidadPublica', 'Funcionario de la alcaldía con permisos de consulta');

-- Tipos de contribuyente
INSERT INTO `tipo_contribuyente` (`nombre`, `descripcion`) VALUES 
('Natural', 'Persona natural con obligaciones tributarias'),
('Jurídica', 'Persona jurídica o empresa');

-- Tipos de tributo
INSERT INTO `tipo_tributo` (`codigo`, `nombre`, `descripcion`, `periodicidad`, `tarifa_base`, `formula_calculo`) VALUES 
('PRED', 'Impuesto Predial', 'Impuesto sobre propiedades urbanas y rurales', 'Anual', 0.7, 'valor_catastral * tarifa_base'),
('INDYCOM', 'Industria y Comercio', 'Impuesto por actividades comerciales', 'Trimestral', 0.5, 'ingresos_brutos * tarifa_base'),
('MULT-TRAN', 'Multas de Tránsito', 'Sanciones por infracciones de tránsito', 'Mensual', 1.0, 'valor_base * gravedad_infraccion'),
('MULT-MOV', 'Multas de Movilidad', 'Sanciones por restricciones de movilidad', 'Mensual', 1.0, 'valor_base * dias_infraccion');

-- Actividades económicas
INSERT INTO `actividad_economica` (`codigo`, `nombre`, `descripcion`, `tarifa_especial`) VALUES 
('COM-001', 'Comercio Minorista', 'Venta al detal de productos', NULL),
('SERV-001', 'Servicios Profesionales', 'Servicios legales, contables, etc.', 0.3),
('IND-001', 'Manufactura', 'Producción industrial', 0.4),
('HOT-001', 'Hotelería', 'Servicios de alojamiento', 0.6);

-- =============================================
-- VISTAS ÚTILES
-- =============================================

CREATE VIEW vw_contribuyentes_con_obligaciones AS
SELECT 
    c.id_contribuyente,
    c.documento_identidad,
    c.nombre_completo,
    tc.nombre AS tipo_contribuyente,
    COUNT(o.id_obligacion) AS total_obligaciones,
    SUM(CASE WHEN o.estado = 'Pendiente' THEN 1 ELSE 0 END) AS obligaciones_pendientes
FROM 
    contribuyente c
JOIN 
    tipo_contribuyente tc ON c.id_tipo_contribuyente = tc.id_tipo_contribuyente
LEFT JOIN 
    obligacion_tributaria o ON c.id_contribuyente = o.id_contribuyente
GROUP BY 
    c.id_contribuyente;

-- =============================================
-- PROCEDIMIENTOS ALMACENADOS
-- =============================================

DELIMITER //
CREATE PROCEDURE sp_generar_factura(IN p_id_obligacion INT)
BEGIN
    DECLARE v_numero_factura VARCHAR(20);
    DECLARE v_valor_base DECIMAL(12,2);
    DECLARE v_valor_impuesto DECIMAL(12,2);
    DECLARE v_periodo VARCHAR(20);
    
    -- Obtener datos de la obligación
    SELECT 
        CONCAT('F-', DATE_FORMAT(NOW(), '%Y%m%d'), '-', LPAD(FLOOR(RAND() * 10000), 4, '0')),
        valor_base,
        valor_base * tt.tarifa_base,
        CONCAT(YEAR(CURRENT_DATE), '-', MONTH(CURRENT_DATE))
    INTO 
        v_numero_factura, v_valor_base, v_valor_impuesto, v_periodo
    FROM 
        obligacion_tributaria o
    JOIN 
        tipo_tributo tt ON o.id_tipo_tributo = tt.id_tipo_tributo
    WHERE 
        o.id_obligacion = p_id_obligacion;
    
    -- Insertar la factura
    INSERT INTO factura (
        id_obligacion,
        numero_factura,
        periodo_facturado,
        valor_base,
        valor_impuesto,
        valor_total
    ) VALUES (
        p_id_obligacion,
        v_numero_factura,
        v_periodo,
        v_valor_base,
        v_valor_impuesto,
        v_valor_base + v_valor_impuesto
    );
    
    -- Actualizar estado de la obligación
    UPDATE obligacion_tributaria SET estado = 'Generada' WHERE id_obligacion = p_id_obligacion;
END //
DELIMITER ;

-- =============================================
-- ÍNDICES ADICIONALES PARA OPTIMIZACIÓN
-- =============================================

CREATE INDEX idx_contribuyente_documento ON contribuyente(documento_identidad);
CREATE INDEX idx_factura_estado ON factura(estado);
CREATE INDEX idx_obligacion_estado ON obligacion_tributaria(estado);
CREATE INDEX idx_obligacion_vencimiento ON obligacion_tributaria(fecha_vencimiento);