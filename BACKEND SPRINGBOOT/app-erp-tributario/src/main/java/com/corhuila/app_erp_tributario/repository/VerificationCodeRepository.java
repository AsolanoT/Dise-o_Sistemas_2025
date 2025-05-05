package com.corhuila.app_erp_tributario.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.corhuila.app_erp_tributario.Entity.VerificationCode;

import java.util.Optional;

public interface VerificationCodeRepository extends JpaRepository<VerificationCode, Long> {
    Optional<VerificationCode> findByEmailAndCode(String email, String code);
}
