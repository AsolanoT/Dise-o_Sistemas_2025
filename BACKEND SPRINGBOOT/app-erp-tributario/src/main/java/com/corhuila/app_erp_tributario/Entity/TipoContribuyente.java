package com.corhuila.app_erp_tributario.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tipos_contribuyente")
public class TipoContribuyente extends ABaseEntity {

    @Column(name = "descripcion", nullable = false, length = 50)
    private String descripcion; // 'Natural', 'Jurídico'

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

}
