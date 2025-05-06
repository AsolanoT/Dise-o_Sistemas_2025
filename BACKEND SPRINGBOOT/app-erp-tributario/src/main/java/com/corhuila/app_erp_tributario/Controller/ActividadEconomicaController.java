package com.corhuila.app_erp_tributario.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.corhuila.app_erp_tributario.Entity.ActividadEconomica;
import com.corhuila.app_erp_tributario.IService.IActividadEconomicaService;

// Esta clase define un controlador REST para manejar solicitudes relacionadas con "contact".
// La anotación @CrossOrigin permite solicitudes desde cualquier origen.
// La anotación @RestController indica que esta clase manejará solicitudes REST.
// La anotación @RequestMapping establece la ruta base "/api/contact" para este controlador.
/**
 * Controlador REST para manejar las operaciones relacionadas con la entidad
 * Contact.
 * 
 * Extiende de ABaseController, lo que permite heredar funcionalidades comunes
 * para los controladores, como operaciones CRUD genéricas.
 * 
 * La clase utiliza dos parámetros genéricos:
 * - Contact: Representa la entidad que este controlador manejará.
 * - IContactService: Es una interfaz que define los métodos específicos del
 * servicio
 * para la entidad Contact. Esta interfaz generalmente contiene la lógica de
 * negocio
 * y las operaciones personalizadas relacionadas con Contact.
 * 
 * Anotaciones:
 * - @CrossOrigin(origins = "*"): Permite solicitudes CORS desde cualquier
 * origen.
 * - @RestController: Marca esta clase como un controlador REST, lo que
 * significa que
 * manejará solicitudes HTTP y devolverá respuestas en formato JSON.
 * - @RequestMapping("/api/contact"): Define la ruta base para las solicitudes
 * HTTP
 * que serán manejadas por este controlador.
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/actividad-economica")
public class ActividadEconomicaController extends ABaseController<ActividadEconomica, IActividadEconomicaService> {

    public ActividadEconomicaController(IActividadEconomicaService service) {
        super(service, "ActividadEconomica");
    }
}
