package com.corhuila.app_erp_tributario.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "contribuyente")
public class Contribuyente extends ABaseEntity {

    @Column(name = "tipo_documento", nullable = false, length = 50)
    private String tipo_documento;

    @Column(name = "numero_documento", nullable = false, length = 15, unique = true)
    private String numero_documento;

    @Column(name = "nombre", nullable = false, length = 100, unique = true)
    private String nombre;

    @Column(name = "direccion", nullable = false, length = 80)
    private String direccion;

    @Column(name = "telefono", nullable = false, length = 15)
    private String telefono;

    @Column(name = "email", nullable = false, length = 100, unique = true)
    private String email;

    @Column(name = "tipo_contribuyente", nullable = false, length = 100)
    private String tipo_contribuyente;

    @Column(name = "tipo_actividad", nullable = false, length = 100)
    private String tipo_actividad;

    @Column(name = "porcentaje_iva", nullable = false)
    private double porcentaje_iva;

    public String getTipo_documento() {
        return tipo_documento;
    }

    public void setTipo_documento(String tipo_documento) {
        this.tipo_documento = tipo_documento;
    }

    public String getNumero_documento() {
        return numero_documento;
    }

    public void setNumero_documento(String numero_documento) {
        this.numero_documento = numero_documento;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTipo_contribuyente() {
        return tipo_contribuyente;
    }

    public void setTipo_contribuyente(String tipo_contribuyente) {
        this.tipo_contribuyente = tipo_contribuyente;
    }

    public String getTipo_actividad() {
        return tipo_actividad;
    }

    public void setTipo_actividad(String tipo_actividad) {
        this.tipo_actividad = tipo_actividad;
    }

    public double getPorcentaje_iva() {
        return porcentaje_iva;
    }

    public void setPorcentaje_iva(double porcentaje_iva) {
        this.porcentaje_iva = porcentaje_iva;
    }

}
