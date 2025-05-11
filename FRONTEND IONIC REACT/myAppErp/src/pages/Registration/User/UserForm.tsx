import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonLabel,
  IonAlert,
  IonLoading,
  IonList,
  IonItem,
  IonToggle,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./UserForm.css";

interface Usuario {
  id_usuario?: number;
  nombre: string;
  correo: string;
  contrasena: string;
  estado: boolean;
  id_rol: number;
}

interface Rol {
  id_rol: number;
  nombre: string;
}

const UserForm: React.FC = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [roles, setRoles] = useState<Rol[]>([]);

  const [form, setForm] = useState<Usuario>({
    nombre: "",
    correo: "",
    contrasena: "",
    estado: true,
    id_rol: 0,
  });

  // Simulación de datos - reemplazar con llamadas API reales
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Simular carga de roles
        const mockRoles: Rol[] = [
          { id_rol: 1, nombre: "Super Admin" },
          { id_rol: 2, nombre: "Contribuyente " },
          { id_rol: 3, nombre: "Entidad Publica" },
        ];
        setRoles(mockRoles);

      } catch (err) {
        setError("Error al cargar datos iniciales");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (field: keyof Usuario, value: any) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      // Validaciones
      if (!form.nombre.trim()) {
        setError("Debe ingresar un nombre");
        return;
      }

      if (!form.correo.trim() || !form.correo.includes("@")) {
        setError("Debe ingresar un correo electrónico válido");
        return;
      }

      if (!form.contrasena || form.contrasena.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres");
        return;
      }

      if (!form.id_rol) {
        setError("Debe seleccionar un rol");
        return;
      }

      // Aquí iría la llamada a la API para guardar el usuario
      console.log("Datos a enviar:", form);

      // Simular tiempo de espera
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccess(true);
    } catch (err) {
      setError("Error al guardar el usuario");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{form.id_usuario ? "Editar Usuario" : "Nuevo Usuario"}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="invoice-form">
          <IonList>
            {/* Nombre */}
            <div className="form-field-group">
              <IonLabel className="field-label">Nombre*</IonLabel>
              <IonInput
                value={form.nombre}
                onIonChange={(e) => handleInputChange("nombre", e.detail.value!)}
                required
                disabled={loading}
                className="custom-input"
                placeholder="Ingrese el nombre completo"
              />
            </div>

            {/* Correo */}
            <div className="form-field-group">
              <IonLabel className="field-label">Correo Electrónico*</IonLabel>
              <IonInput
                type="email"
                value={form.correo}
                onIonChange={(e) => handleInputChange("correo", e.detail.value!)}
                required
                disabled={loading}
                className="custom-input"
                placeholder="Ingrese el correo electrónico"
              />
            </div>

            {/* Contraseña */}
            <div className="form-field-group">
              <IonLabel className="field-label">Contraseña*</IonLabel>
              <IonInput
                type="password"
                value={form.contrasena}
                onIonChange={(e) => handleInputChange("contrasena", e.detail.value!)}
                required
                disabled={loading}
                className="custom-input"
                placeholder="Ingrese la contraseña"
              />
            </div>

            {/* Estado */}
            <div className="form-field-group">
              <IonLabel className="field-label">Estado</IonLabel>
              <IonItem lines="none">
                <IonToggle
                  checked={form.estado}
                  onIonChange={(e) => handleInputChange("estado", e.detail.checked)}
                  disabled={loading}
                />
                <IonLabel>{form.estado ? "Activo" : "Inactivo"}</IonLabel>
              </IonItem>
            </div>

            {/* Rol */}
            <div className="form-field-group">
              <IonLabel className="field-label">Rol*</IonLabel>
              <IonSelect
                value={form.id_rol}
                onIonChange={(e) => handleInputChange("id_rol", e.detail.value)}
                disabled={loading}
                className="custom-select"
                interface="popover"
              >
                <IonSelectOption value={0} disabled>
                  Seleccione un rol
                </IonSelectOption>
                {roles.map((rol) => (
                  <IonSelectOption
                    key={rol.id_rol}
                    value={rol.id_rol}
                  >
                    {rol.nombre}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </div>
          </IonList>

          <div className="form-actions">
            <IonButton
              fill="outline"
              onClick={handleCancel}
              disabled={loading}
              className="cancel-button"
            >
              Cancelar
            </IonButton>

            <IonButton
              type="submit"
              disabled={loading}
              className="submit-button"
            >
              {loading ? "Guardando..." : "Guardar Usuario"}
            </IonButton>
          </div>
        </form>
      </IonContent>

      <IonAlert
        isOpen={success}
        onDidDismiss={() => {
          setSuccess(false);
          history.goBack();
        }}
        header="Usuario Guardado"
        message="El usuario ha sido guardado exitosamente"
        buttons={["OK"]}
      />

      <IonLoading isOpen={loading} message="Procesando..." spinner="circles" />
    </IonPage>
  );
};

export default UserForm;