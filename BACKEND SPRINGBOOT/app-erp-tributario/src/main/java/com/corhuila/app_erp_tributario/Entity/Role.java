package com.corhuila.app_erp_tributario.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Role extends ABaseEntity {
    @ManyToOne
    private Role role; // Relación con Role

    @Column(nullable = false, unique = true)
    private String nombre; // Valores: "ROLE_ADMIN", "ROLE_ENTIDAD_PUBLICA", "ROLE_CONTRIBUYENTE"

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

}
