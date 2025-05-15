package com.corhuila.app_erp_tributario.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.corhuila.app_erp_tributario.Entity.TipoContribuyente;
import com.corhuila.app_erp_tributario.IRepository.IBaseRepository;
import com.corhuila.app_erp_tributario.IRepository.ITipoContribuyenteRepository;
import com.corhuila.app_erp_tributario.IService.ITipoContribuyenteService;

@Service
public class TipoContribuyenteService extends ABaseService<TipoContribuyente> implements ITipoContribuyenteService {

    @Override
    protected IBaseRepository<TipoContribuyente, Long> getRepository() {
        return repository;
    }

    @Autowired
    private ITipoContribuyenteRepository repository;
}
