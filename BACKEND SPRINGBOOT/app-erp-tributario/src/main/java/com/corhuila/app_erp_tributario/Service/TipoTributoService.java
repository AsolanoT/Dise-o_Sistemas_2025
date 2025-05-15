package com.corhuila.app_erp_tributario.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.corhuila.app_erp_tributario.Entity.TipoTributo;
import com.corhuila.app_erp_tributario.IRepository.IBaseRepository;
import com.corhuila.app_erp_tributario.IRepository.ITipoTributoRepository;
import com.corhuila.app_erp_tributario.IService.ITipoTributoService;

@Service
public class TipoTributoService extends ABaseService<TipoTributo> implements ITipoTributoService {

    @Override
    protected IBaseRepository<TipoTributo, Long> getRepository() {
        return repository;
    }

    @Autowired
    private ITipoTributoRepository repository;
}
