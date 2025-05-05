package com.corhuila.app_erp_tributario.Controller;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import com.corhuila.app_erp_tributario.DTO.LoginDto;
import com.corhuila.app_erp_tributario.DTO.UserDto;
import com.corhuila.app_erp_tributario.Service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@Valid @RequestBody UserDto userDto, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errors = result.getFieldErrors().stream()
                    .collect(Collectors.toMap(
                            FieldError::getField,
                            FieldError::getDefaultMessage));
            return ResponseEntity.badRequest().body(errors);
        }

        try {
            authService.registerUser(userDto);
            return ResponseEntity.ok().body(Map.of(
                    "success", true,
                    "message", "Usuario registrado con éxito"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", true,
                    "message", e.getMessage()));
        }
    }

    @PostMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(@RequestParam String email, @RequestParam String code) {
        boolean isVerified = authService.verifyEmail(email, code);
        return isVerified
                ? ResponseEntity.ok("Email verificado correctamente")
                : ResponseEntity.badRequest().body("Código inválido o expirado");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto, HttpSession session) {
        authService.authenticate(loginDto);
        session.setAttribute("user", loginDto.getEmail()); // Guarda el email en sesión
        return ResponseEntity.ok("Login exitoso");
    }

    @GetMapping("/protected-route")
    public ResponseEntity<String> protectedRoute(HttpSession session) {
        if (session.getAttribute("user") == null) {
            return ResponseEntity.status(401).body("No autorizado");
        }
        return ResponseEntity.ok("Ruta protegida accesible");
    }
}
