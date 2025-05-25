package com.corhuila.app_erp_tributario.IService;

import java.util.List;

import com.corhuila.app_erp_tributario.Entity.Factura;

public interface IFacturaService extends IBaseService<Factura> {

    // String generarNumeroFactura();
    List<Factura> findByUserId(Long userId);
}
