package com.corhuila.app_erp_tributario.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.corhuila.app_erp_tributario.Entity.TipoContribuyente;
import com.corhuila.app_erp_tributario.IService.ITipoContribuyenteService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/TipoContribuyente")
public class TipoContribuyenteController extends ABaseController<TipoContribuyente, ITipoContribuyenteService> {

    public TipoContribuyenteController(ITipoContribuyenteService service) {
        super(service, "TipoContribuyente");
    }
}
