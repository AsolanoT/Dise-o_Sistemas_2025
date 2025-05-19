package com.corhuila.app_erp_tributario.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.corhuila.app_erp_tributario.DTO.LoginDto;
import com.corhuila.app_erp_tributario.DTO.UserDto;
import com.corhuila.app_erp_tributario.Entity.User;
import com.corhuila.app_erp_tributario.Entity.VerificationCode;
import com.corhuila.app_erp_tributario.IRepository.IBaseRepository;
import com.corhuila.app_erp_tributario.IRepository.IUserRepository;
import com.corhuila.app_erp_tributario.IService.IUserService;
import com.corhuila.app_erp_tributario.repository.UserRepository;
import com.corhuila.app_erp_tributario.repository.VerificationCodeRepository;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class AuthService extends ABaseService<User> implements IUserService {

    @Override
    protected IBaseRepository<User, Long> getRepository() {
        return repository;
    }

    @Autowired
    private IUserRepository repository;

    private final UserRepository userRepository;
    private final VerificationCodeRepository codeRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, VerificationCodeRepository codeRepository,
            EmailService emailService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.codeRepository = codeRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
    }

    public void registerUser(UserDto userDto) {
        User user = new User();
        user.setTipo_documento(userDto.getTipo_documento());
        user.setNumero_documento(userDto.getNumero_documento());
        user.setNombre(userDto.getNombre());
        user.setDireccion(userDto.getDireccion());
        user.setTelefono(userDto.getTelefono());
        user.setEmail(userDto.getEmail());
        user.setBirthDate(userDto.getBirthDate());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setRole(userDto.getRole());
        user.setTipocontribuyente(userDto.getTipocontribuyente());
        user.setTipo_actividad(userDto.getTipo_actividad());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        userRepository.save(user);

        String code = generateVerificationCode();
        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setCode(code);
        verificationCode.setEmail(userDto.getEmail());
        verificationCode.setExpirationTime(LocalDateTime.now().plusMinutes(15));
        codeRepository.save(verificationCode);

        emailService.sendVerificationEmail(userDto.getEmail(), code);
    }

    public boolean verifyEmail(String email, String code) {
        Optional<VerificationCode> verificationCode = codeRepository.findByEmailAndCode(email, code);
        if (verificationCode.isPresent() && LocalDateTime.now().isBefore(verificationCode.get().getExpirationTime())) {
            User user = userRepository.findByEmail(email).orElseThrow();
            user.setVerified(true);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    public User authenticate(LoginDto loginDto) {
        User user = userRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }
        if (!user.isVerified()) {
            throw new RuntimeException("Email no verificado");
        }
        return user;
    }

    private String generateVerificationCode() {
        return String.format("%04d", new Random().nextInt(10000));
    }
}
