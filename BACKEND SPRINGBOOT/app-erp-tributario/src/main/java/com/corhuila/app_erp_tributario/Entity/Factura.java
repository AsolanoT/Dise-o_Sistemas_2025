package com.corhuila.app_erp_tributario.Entity;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "factura")
public class Factura extends ABaseEntity {

    @ManyToOne(optional = false)
    @JoinColumn(name = "contribuyente_id", referencedColumnName = "id")
    private Contribuyente contribuyente;

    @ManyToOne(optional = false)
    @JoinColumn(name = "tipo_tributo_id", referencedColumnName = "id")
    private TipoTributo tipoTributo;

    @Column(name = "periodo", nullable = false, length = 7)
    private String periodo;

    @Column(name = "valor_estimado", nullable = false)
    private Double valorEstimado;

    @Column(name = "estado", nullable = false, length = 20)
    private String estado;

    @Column(name = "concepto", nullable = false, length = 255)
    private String concepto;

    @Column(name = "fecha_emision", nullable = false)
    private LocalDate fechaEmision;

    @Column(name = "fecha_vencimiento", nullable = false)
    private LocalDate fechaVencimiento;
}
