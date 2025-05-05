package com.corhuila.app_erp_tributario.DTO;

public class ApiResponseDto<T> {
    // Una API Response (respuesta de API) es una estructura estándar utilizada para
    // enviar datos desde una API al cliente.
    // Esta clase genérica permite encapsular tres elementos principales:
    // 1. 'status': Indica si la operación fue exitosa (true) o fallida (false).
    // 2. 'data': Contiene los datos específicos que se devuelven al cliente (puede
    // ser de cualquier tipo gracias al uso de <T>).
    // 3. 'message': Proporciona un mensaje adicional, como información sobre el
    // resultado de la operación.

    private Boolean status;
    private T data;
    private String message;

    public ApiResponseDto() {
    }

    public ApiResponseDto(String message, T data, Boolean status) {
        this.message = message;
        this.data = data;
        this.status = status;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
