package com.corhuila.app_erp_tributario.IRepository;

import org.springframework.stereotype.Repository;

import com.corhuila.app_erp_tributario.Entity.Factura;

@Repository
public interface IFacturaRepository extends IBaseRepository<Factura, Long> {

}
