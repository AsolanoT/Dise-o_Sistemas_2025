package com.corhuila.app_erp_tributario.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.corhuila.app_erp_tributario.Entity.Contribuyente;
import com.corhuila.app_erp_tributario.IService.IContribuyenteService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/contribuyente")
public class ContribuyenteController extends ABaseController<Contribuyente, IContribuyenteService> {

    public ContribuyenteController(IContribuyenteService service) {
        super(service, "Contribuyente");
    }
}
