package com.corhuila.app_erp_tributario.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.corhuila.app_erp_tributario.Entity.TipoTributo;
import com.corhuila.app_erp_tributario.IService.ITipoTributoService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/tipotributo")
public class TipoTributoController extends ABaseController<TipoTributo, ITipoTributoService> {

    public TipoTributoController(ITipoTributoService service) {
        super(service, "TipoTributo");
    }
}
