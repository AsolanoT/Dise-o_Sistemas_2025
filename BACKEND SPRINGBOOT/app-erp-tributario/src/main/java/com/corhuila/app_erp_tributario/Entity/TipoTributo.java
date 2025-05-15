package com.corhuila.app_erp_tributario.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tipo_tributo")
public class TipoTributo extends ABaseEntity {

    @Column(name = "nombre", nullable = false, length = 100, unique = true)
    private String nombre;

    @Column(name = "descripcion", length = 255)
    private String descripcion;

    // @Column(name = "base_calculo")
    // private Double baseCalculo;

    @Column(name = "tarifa")
    private Double tarifa;

    @Column(name = "periodicidad", length = 20)
    private String periodicidad;// 'Mensual', 'Trimestral', 'Semestral', 'Anual'

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Double getTarifa() {
        return tarifa;
    }

    public void setTarifa(Double tarifa) {
        this.tarifa = tarifa;
    }

    public String getPeriodicidad() {
        return periodicidad;
    }

    public void setPeriodicidad(String periodicidad) {
        this.periodicidad = periodicidad;
    }

}
