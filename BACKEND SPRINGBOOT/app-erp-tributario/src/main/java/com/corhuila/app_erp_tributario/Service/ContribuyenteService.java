package com.corhuila.app_erp_tributario.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.corhuila.app_erp_tributario.Entity.Contribuyente;
import com.corhuila.app_erp_tributario.IRepository.IBaseRepository;
import com.corhuila.app_erp_tributario.IRepository.IContribuyenteRepository;
import com.corhuila.app_erp_tributario.IService.IContribuyenteService;

@Service
public class ContribuyenteService extends ABaseService<Contribuyente> implements IContribuyenteService {

    @Override
    protected IBaseRepository<Contribuyente, Long> getRepository() {
        return repository;
    }

    @Autowired
    private IContribuyenteRepository repository;
}
