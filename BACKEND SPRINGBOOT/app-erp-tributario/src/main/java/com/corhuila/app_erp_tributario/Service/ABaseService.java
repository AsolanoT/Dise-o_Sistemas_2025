package com.corhuila.app_erp_tributario.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;

import com.corhuila.app_erp_tributario.Entity.ABaseEntity;
import com.corhuila.app_erp_tributario.IRepository.IBaseRepository;
import com.corhuila.app_erp_tributario.IService.IBaseService;

public abstract class ABaseService<T extends ABaseEntity> implements IBaseService<T> {
    // 1. `abstract class`: Indica que esta clase no puede ser instanciada
    // directamente,
    // sino que debe ser extendida por otras clases concretas.
    // 2. `<T extends ABaseEntity>`: Define un parámetro genérico `T` que debe ser
    // un tipo que
    // extienda (herede de) la clase `ABaseEntity`. Esto asegura que cualquier tipo
    // usado como `T`
    // tendrá las propiedades y métodos definidos en `ABaseEntity`.
    // 3. `implements IBaseService<T>`: Declara que esta clase implementa la
    // interfaz `IBaseService`
    // usando el tipo genérico `T`. Esto significa que cualquier clase que extienda
    // `ABaseService`
    // deberá proporcionar implementaciones para los métodos definidos en
    // `IBaseService`,
    // utilizando el tipo específico que se pase como `T`.
    protected abstract IBaseRepository<T, Long> getRepository();

    @Override
    public List<T> all() {
        return getRepository().findAll();
    }

    @Override
    public List<T> findByStateTrue() {
        return getRepository().findAll();
    }

    @Override
    public T findById(Long id) throws Exception {
        Optional<T> op = getRepository().findById(id);
        if (op.isEmpty()) {
            throw new Exception("No se encontró el registro con id: " + id);
        }
        return op.get();
    }

    @Override
    public T save(T entity) throws Exception {
        try {
            entity.setCreatedBy(1L);
            entity.setCreatedAt(LocalDateTime.now());
            return getRepository().save(entity);
        } catch (Exception e) {
            throw new Exception("Error al guardar el registro: " + e.getMessage());
        }
    }

    @Override
    public void update(Long id, T entity) throws Exception {
        Optional<T> op = getRepository().findById(id);

        if (op.isEmpty()) {
            throw new Exception("Registro no encontrado");
        } else if (op.get().getDeletedAt() != null) {
            throw new Exception("Registro inhabilitado");
        }

        T entityUpdate = op.get();

        String[] ignoreProperties = { "id", "createdAt", "deleteAt", "createdBy", "deletedBy" };
        BeanUtils.copyProperties(entity, entityUpdate, ignoreProperties);
        entityUpdate.setUpdatedBy(2L);
        entityUpdate.setUpdatedAt(LocalDateTime.now());
        getRepository().save(entityUpdate);
    }

    @Override
    public void delete(Long id) throws Exception {
        Optional<T> op = getRepository().findById(id);

        if (op.isEmpty()) {
            throw new Exception("Registro no encontrado");
        }

        T entityUpdate = op.get();
        entityUpdate.setDeletedBy(3L);
        entityUpdate.setDeletedAt(LocalDateTime.now());

        getRepository().save(entityUpdate);
    }
}
