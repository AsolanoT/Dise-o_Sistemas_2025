package com.corhuila.app_erp_tributario.Entity;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "factura")
public class Factura extends ABaseEntity {

    @ManyToOne(optional = false)
    @JoinColumn(name = "Usuario_id", referencedColumnName = "id")
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "tipo_tributo_id", referencedColumnName = "id")
    private TipoTributo tipoTributo;

    @Column(name = "periodo", nullable = false, length = 7)
    private String periodo;

    @Column(name = "base_calculo", nullable = false)
    private Double baseCalculo;

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public TipoTributo getTipoTributo() {
        return tipoTributo;
    }

    public void setTipoTributo(TipoTributo tipoTributo) {
        this.tipoTributo = tipoTributo;
    }

    public String getPeriodo() {
        return periodo;
    }

    public void setPeriodo(String periodo) {
        this.periodo = periodo;
    }

    public Double getValorEstimado() {
        return valorEstimado;
    }

    public void setValorEstimado(Double valorEstimado) {
        this.valorEstimado = valorEstimado;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getConcepto() {
        return concepto;
    }

    public void setConcepto(String concepto) {
        this.concepto = concepto;
    }

    public LocalDate getFechaEmision() {
        return fechaEmision;
    }

    public void setFechaEmision(LocalDate fechaEmision) {
        this.fechaEmision = fechaEmision;
    }

    public LocalDate getFechaVencimiento() {
        return fechaVencimiento;
    }

    public void setFechaVencimiento(LocalDate fechaVencimiento) {
        this.fechaVencimiento = fechaVencimiento;
    }

    public Double getBaseCalculo() {
        return baseCalculo;
    }

    public void setBaseCalculo(Double baseCalculo) {
        this.baseCalculo = baseCalculo;
    }

}
