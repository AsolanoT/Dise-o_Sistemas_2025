package com.corhuila.app_erp_tributario.Entity;

import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User extends ABaseEntity {

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

    @Column(nullable = false)
    private LocalDate birthDate;

    @Column(nullable = false)
    private String password;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_rol", referencedColumnName = "id")
    private Role role; // 'Administrador', 'Contribuyente', 'entiddad'

    @Column(name = "tipo_contribuyente", nullable = false, length = 50)
    private String tipocontribuyente; // 'Natural', 'Jurídico'

    @Column(name = "tipo_actividad", nullable = false, length = 100)
    private String tipo_actividad; // 'Comerciante', 'No comerciante', empleado, etc.

    @Column(nullable = false)
    private boolean verified = false;

    @Column(nullable = false)
    private boolean estado = true;

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

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getTipocontribuyente() {
        return tipocontribuyente;
    }

    public void setTipocontribuyente(String tipocontribuyente) {
        this.tipocontribuyente = tipocontribuyente;
    }

    public String getTipo_actividad() {
        return tipo_actividad;
    }

    public void setTipo_actividad(String tipo_actividad) {
        this.tipo_actividad = tipo_actividad;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }

}