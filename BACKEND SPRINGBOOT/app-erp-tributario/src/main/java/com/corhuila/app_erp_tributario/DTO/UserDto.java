package com.corhuila.app_erp_tributario.DTO;

import java.time.LocalDate;

import com.corhuila.app_erp_tributario.Entity.Role;
import com.fasterxml.jackson.annotation.JsonFormat;

// UserDto.java

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserDto {
    @NotBlank(message = "El tipo de documento es requerido")
    private String tipo_documento;

    @NotNull(message = "El estado es requerido")
    private Boolean status;

    @NotBlank(message = "El número de documento es requerido")
    @Size(min = 5, max = 15, message = "El documento debe tener entre 5 y 15 caracteres")
    private String numero_documento;

    @NotBlank(message = "El nombre es requerido")
    @Size(max = 100, message = "El nombre debe tener máximo 100 caracteres")
    private String nombre;

    @NotBlank(message = "La dirección es requerida")
    @Size(max = 80, message = "La dirección debe tener máximo 80 caracteres")
    private String direccion;

    @NotBlank(message = "El teléfono es requerido")
    @Size(max = 15, message = "El teléfono debe tener máximo 15 caracteres")
    private String telefono;

    @Email(message = "Debe ser un email válido")
    @NotBlank(message = "El email es requerido")
    @Size(max = 100, message = "El email debe tener máximo 100 caracteres")
    private String email;

    @NotNull(message = "La fecha de nacimiento es requerida")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;

    @NotBlank(message = "La contraseña es requerida")
    @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres")
    private String password;

    @NotBlank(message = "El tipo de contribuyente es requerido")
    @Size(max = 50, message = "El tipo de contribuyente debe tener máximo 50 caracteres")
    private String tipocontribuyente;

    @NotBlank(message = "El tipo de actividad es requerido")
    @Size(max = 100, message = "El tipo de actividad debe tener máximo 100 caracteres")
    private String tipo_actividad;

    @NotNull(message = "El rol es requerido")
    private Role role;

}
