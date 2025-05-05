package com.corhuila.app_erp_tributario.Service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendVerificationEmail(String toEmail, String verificationCode) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("exploraneiva@gmail.com"); // Puedes personalizar el remitente
        message.setTo(toEmail);
        message.setSubject("Verifica tu correo electrónico");
        message.setText(
                "¡Gracias por registrarte!\n\n" +
                        "Tu código de verificación es: " + verificationCode + "\n\n" +
                        "Este código expirará en 15 minutos.");
        mailSender.send(message);
    }
}
