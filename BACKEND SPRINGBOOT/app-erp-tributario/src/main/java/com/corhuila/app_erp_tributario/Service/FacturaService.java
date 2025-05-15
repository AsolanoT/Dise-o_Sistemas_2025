package com.corhuila.app_erp_tributario.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.corhuila.app_erp_tributario.Entity.Factura;
import com.corhuila.app_erp_tributario.IRepository.IBaseRepository;
import com.corhuila.app_erp_tributario.IRepository.IFacturaRepository;
import com.corhuila.app_erp_tributario.IService.IFacturaService;

@Service
public class FacturaService extends ABaseService<Factura> implements IFacturaService {

    @Override
    protected IBaseRepository<Factura, Long> getRepository() {
        return repository;
    }

    @Autowired
    private IFacturaRepository repository;
}
