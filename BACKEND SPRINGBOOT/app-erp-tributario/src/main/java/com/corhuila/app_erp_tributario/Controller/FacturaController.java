package com.corhuila.app_erp_tributario.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.corhuila.app_erp_tributario.Entity.Factura;
import com.corhuila.app_erp_tributario.IService.IFacturaService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/factura")
public class FacturaController extends ABaseController<Factura, IFacturaService> {

    public FacturaController(IFacturaService service) {
        super(service, "Factura");
    }

    @GetMapping("/usuario/{userId}")
    public List<Factura> findByUserId(@PathVariable Long userId) {
        return service.findByUserId(userId);
    }
}
