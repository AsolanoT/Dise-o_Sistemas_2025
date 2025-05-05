package com.corhuila.app_erp_tributario.DTO;

import java.time.LocalDate;

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
    private String documentType;

    @NotBlank(message = "El número de documento es requerido")
    @Size(min = 5, message = "El documento debe tener al menos 5 caracteres")
    private String documentNumber;

    @NotBlank(message = "El nombre completo es requerido")
    private String fullName;

    @NotNull(message = "La fecha de nacimiento es requerida")
    @JsonFormat(pattern = "yyyy-MM-dd") // Añade esta anotación
    private LocalDate birthDate;

    @Email(message = "Debe ser un email válido")
    @NotBlank(message = "El email es requerido")
    private String email;

    @NotBlank(message = "El teléfono es requerido")
    private String phone;

    @NotBlank
    @Size(min = 8)
    private String password;

}
