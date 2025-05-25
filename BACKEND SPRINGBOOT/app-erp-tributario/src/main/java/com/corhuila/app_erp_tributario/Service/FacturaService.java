package com.corhuila.app_erp_tributario.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.corhuila.app_erp_tributario.Entity.Factura;
import com.corhuila.app_erp_tributario.Entity.TipoTributo;
import com.corhuila.app_erp_tributario.IRepository.IBaseRepository;
import com.corhuila.app_erp_tributario.IRepository.IFacturaRepository;
import com.corhuila.app_erp_tributario.IService.IFacturaService;
import com.corhuila.app_erp_tributario.IService.ITipoTributoService;

@Service
public class FacturaService extends ABaseService<Factura> implements IFacturaService {

    @Override
    protected IBaseRepository<Factura, Long> getRepository() {
        return repository;
    }

    @Autowired
    private IFacturaRepository repository;

    @Autowired
    private ITipoTributoService tipoTributoService;

    @Override
    public Factura save(Factura entity) throws Exception {
        if (entity.getTipoTributo() == null || entity.getTipoTributo().getId() == null) {
            throw new Exception("El tipo de tributo no puede ser nulo.");
        }

        // ✅ Obtén la reservación completa usando el servicio
        TipoTributo tipoTributo = tipoTributoService.findById(entity.getTipoTributo().getId());

        // Calcula el monto total
        double valorEstimado = tipoTributo.getTarifa() * entity.getBaseCalculo();
        entity.setValorEstimado(valorEstimado);

        return repository.save(entity);
    }
}
