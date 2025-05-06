package com.corhuila.app_erp_tributario.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.corhuila.app_erp_tributario.Entity.ActividadEconomica;
import com.corhuila.app_erp_tributario.IRepository.IActividadEconomicaRepository;
import com.corhuila.app_erp_tributario.IRepository.IBaseRepository;
import com.corhuila.app_erp_tributario.IService.IActividadEconomicaService;

/**
 * La clase ContactService es un servicio de Spring que extiende de ABaseService
 * y está diseñada para manejar la lógica de negocio relacionada con la entidad
 * Contact.
 * 
 * Esta clase implementa la interfaz IContactService, lo que asegura que cumpla
 * con
 * un contrato específico para las operaciones relacionadas con Contact.
 * 
 * Principales características:
 * 
 * - Utiliza la anotación @Service para que Spring la detecte como un componente
 * de servicio
 * y pueda ser inyectada en otras partes de la aplicación.
 * 
 * - Sobrescribe el método getRepository() de la clase base ABaseService para
 * devolver
 * el repositorio específico de Contact, que es gestionado por la interfaz
 * IContactRepository.
 * 
 * - Utiliza la anotación @Autowired para inyectar automáticamente la
 * dependencia del
 * repositorio IContactRepository, lo que permite interactuar con la base de
 * datos
 * para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre la
 * entidad Contact.
 * 
 * Este diseño sigue el patrón de arquitectura de capas, separando la lógica de
 * negocio
 * (en el servicio) de la lógica de acceso a datos (en el repositorio).
 */
@Service
public class ActividadEconomicaService extends ABaseService<ActividadEconomica> implements IActividadEconomicaService {

    @Override
    protected IBaseRepository<ActividadEconomica, Long> getRepository() {
        return repository;
    }

    @Autowired
    private IActividadEconomicaRepository repository;

}
