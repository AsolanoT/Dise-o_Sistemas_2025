package com.corhuila.app_erp_tributario.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.corhuila.app_erp_tributario.Entity.Role;
import com.corhuila.app_erp_tributario.IService.IRoleService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/roles")
public class RoleController extends ABaseController<Role, IRoleService> {

    public RoleController(IRoleService service) {
        super(service, "Role");
    }
}
