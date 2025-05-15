package com.corhuila.app_erp_tributario.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Role extends ABaseEntity {

    @Column(name = "nombre", nullable = false, length = 50)
    private String nombre;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

}
