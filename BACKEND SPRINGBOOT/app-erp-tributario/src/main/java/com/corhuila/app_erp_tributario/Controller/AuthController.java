package com.corhuila.app_erp_tributario.Controller;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import com.corhuila.app_erp_tributario.DTO.LoginDto;
import com.corhuila.app_erp_tributario.DTO.UserDto;
import com.corhuila.app_erp_tributario.Entity.User;
import com.corhuila.app_erp_tributario.IService.IUserService;
import com.corhuila.app_erp_tributario.Service.AuthService;

import org.springframework.security.core.Authentication;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController extends ABaseController<User, IUserService> {
    private final AuthService authService;

    public AuthController(AuthService authService, IUserService service) {
        super(service, "User");
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
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginDto loginDto, HttpSession session) {
        try {
            User user = authService.authenticate(loginDto);

            // Crear respuesta con datos del usuario
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Login exitoso");
            response.put("user", Map.of(
                    "id", user.getId(),
                    "email", user.getEmail(),
                    "role", Map.of(
                            "id", user.getRole().getId(),
                            "nombre", user.getRole().getNombre())));

            session.setAttribute("user", user);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "error", true,
                    "message", e.getMessage()));
        }
    }

    @GetMapping("/current-user")
    public ResponseEntity<User> getCurrentUser(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(user);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Sesión cerrada");
    }

    @GetMapping("/protected-route")
    public ResponseEntity<String> protectedRoute(HttpSession session) {
        if (session.getAttribute("user") == null) {
            return ResponseEntity.status(401).body("No autorizado");
        }
        return ResponseEntity.ok("Ruta protegida accesible");
    }
}
