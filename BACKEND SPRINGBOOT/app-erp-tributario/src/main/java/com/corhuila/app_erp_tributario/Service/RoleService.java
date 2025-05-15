package com.corhuila.app_erp_tributario.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.corhuila.app_erp_tributario.Entity.Role;
import com.corhuila.app_erp_tributario.IRepository.IBaseRepository;
import com.corhuila.app_erp_tributario.IRepository.IRoleRepository;
import com.corhuila.app_erp_tributario.IService.IRoleService;

@Service
public class RoleService extends ABaseService<Role> implements IRoleService {

    @Override
    protected IBaseRepository<Role, Long> getRepository() {
        return repository;
    }

    @Autowired
    private IRoleRepository repository;
}
