package com.corhuila.app_erp_tributario.IRepository;

import org.springframework.stereotype.Repository;

import com.corhuila.app_erp_tributario.Entity.User;

@Repository
public interface IUserRepository extends IBaseRepository<User, Long> {

}
