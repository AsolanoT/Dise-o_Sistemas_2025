package com.corhuila.app_erp_tributario.IService;

import java.util.List;

import com.corhuila.app_erp_tributario.Entity.ABaseEntity;

/**
 * Interface IBaseService defines the base operations for managing entities
 * that extend the ABaseEntity class. This interface provides generic methods
 * for CRUD operations and querying entities based on their state.
 *
 * <T> The type of entity that extends ABaseEntity.
 */
public interface IBaseService<T extends ABaseEntity> {

    /**
     * Obtiene una lista de todas las entidades.
     */
    List<T> all();

    /**
     * Obtiene una lista de entidades cuyo estado es verdadero.
     */
    List<T> findByStateTrue();

    /**
     * Busca una entidad por su ID.
     * id Identificador único de la entidad.
     * throws Exception Si no se encuentra la entidad.
     */
    T findById(Long id) throws Exception;

    /**
     * Guarda una nueva entidad.
     * entity La entidad a guardar.
     * throws Exception Si ocurre un error durante el guardado.
     */
    T save(T entity) throws Exception;

    /**
     * Actualiza una entidad existente.
     * entity La entidad con los nuevos datos.
     * throws Exception Si ocurre un error durante la actualización.
     */
    void update(Long id, T entity) throws Exception;

    /**
     * Elimina una entidad por su ID.
     * param id Identificador único de la entidad a eliminar.
     * throws Exception Si ocurre un error durante la eliminación.
     */
    void delete(Long id) throws Exception;
}
