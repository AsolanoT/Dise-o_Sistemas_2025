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
  IonDatetime,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./UserForm.css";

interface Usuario {
  id_usuario?: number;
  documentType: string;
  documentNumber: string;
  fullName: string;
  birthDate: string;
  email: string;
  phone: string;
  password: string;
  rol: string;
  estado: boolean;
}

const UserForm: React.FC = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [form, setForm] = useState<Usuario>({
    documentType: "cc",
    documentNumber: "",
    fullName: "",
    birthDate: "",
    email: "",
    phone: "",
    password: "",
    rol: "",
    estado: true,
  });

  const documentTypes = [
    { value: "cc", label: "Cédula de Ciudadanía" },
    { value: "ti", label: "Tarjeta de Identidad" },
    { value: "ce", label: "Cédula de Extranjería" },
    { value: "passport", label: "Pasaporte" },
    { value: "nit", label: "NIT" },
  ];

  const roles = [
    { value: "admin", label: "Administrador" },
    { value: "user", label: "Usuario Regular" },
    { value: "public_entity", label: "Entidad Pública" },
    { value: "contributor", label: "Contribuyente" },
  ];

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
      if (!form.fullName.trim()) {
        setError("Debe ingresar el nombre completo");
        return;
      }

      if (!form.documentNumber.trim()) {
        setError("Debe ingresar el número de documento");
        return;
      }

      if (!form.birthDate) {
        setError("Debe seleccionar la fecha de nacimiento");
        return;
      }

      if (!form.email.trim() || !form.email.includes("@")) {
        setError("Debe ingresar un correo electrónico válido");
        return;
      }

      if (!form.phone.trim()) {
        setError("Debe ingresar un número de teléfono");
        return;
      }

      if (!form.password || form.password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres");
        return;
      }

      if (!form.rol) {
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

  const formatDate = (dateString: string) => {
    if (!dateString) return "Seleccione fecha de nacimiento";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {form.id_usuario ? "Editar Usuario" : "Nuevo Usuario"}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="user-form">
          <IonList>
            {/* Tipo de Documento */}
            <div className="form-field-group">
              <IonLabel className="field-label">Tipo de Documento*</IonLabel>
              <IonSelect
                value={form.documentType}
                onIonChange={(e) =>
                  handleInputChange("documentType", e.detail.value)
                }
                disabled={loading}
                className="custom-select"
                interface="popover"
              >
                {documentTypes.map((type) => (
                  <IonSelectOption key={type.value} value={type.value}>
                    {type.label}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </div>

            {/* Número de Documento */}
            <div className="form-field-group">
              <IonLabel className="field-label">Número de Documento*</IonLabel>
              <IonInput
                value={form.documentNumber}
                onIonChange={(e) =>
                  handleInputChange("documentNumber", e.detail.value!)
                }
                required
                disabled={loading}
                className="custom-input"
                placeholder="Ingrese el número de documento"
              />
            </div>

            {/* Nombre Completo */}
            <div className="form-field-group">
              <IonLabel className="field-label">Nombre Completo*</IonLabel>
              <IonInput
                value={form.fullName}
                onIonChange={(e) =>
                  handleInputChange("fullName", e.detail.value!)
                }
                required
                disabled={loading}
                className="custom-input"
                placeholder="Ingrese el nombre completo"
              />
            </div>

            {/* Fecha de Nacimiento */}
            <div className="form-field-group">
              <IonLabel className="field-label">Fecha de Nacimiento*</IonLabel>
              <IonItem
                button
                onClick={() => setShowDatePicker(true)}
                className="custom-input"
                lines="none"
              >
                <IonLabel>{formatDate(form.birthDate)}</IonLabel>
              </IonItem>
              {showDatePicker && (
                <div className="datetime-modal-backdrop">
                  <div className="datetime-modal-content">
                    <IonDatetime
                      presentation="date"
                      onIonChange={(e) => {
                        handleInputChange(
                          "birthDate",
                          e.detail.value as string
                        );
                        setShowDatePicker(false);
                      }}
                      max={new Date().toISOString()}
                      locale="es-ES"
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: 8,
                      }}
                    >
                      <IonButton
                        size="small"
                        onClick={() => setShowDatePicker(false)}
                      >
                        Cancelar
                      </IonButton>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Email */}
            <div className="form-field-group">
              <IonLabel className="field-label">Correo Electrónico*</IonLabel>
              <IonInput
                type="email"
                value={form.email}
                onIonChange={(e) => handleInputChange("email", e.detail.value!)}
                required
                disabled={loading}
                className="custom-input"
                placeholder="Ingrese el correo electrónico"
              />
            </div>

            {/* Teléfono */}
            <div className="form-field-group">
              <IonLabel className="field-label">Teléfono*</IonLabel>
              <IonInput
                type="tel"
                value={form.phone}
                onIonChange={(e) => handleInputChange("phone", e.detail.value!)}
                required
                disabled={loading}
                className="custom-input"
                placeholder="Ingrese el número de teléfono"
              />
            </div>

            {/* Contraseña */}
            <div className="form-field-group">
              <IonLabel className="field-label">Contraseña*</IonLabel>
              <IonInput
                type="password"
                value={form.password}
                onIonChange={(e) =>
                  handleInputChange("password", e.detail.value!)
                }
                required
                disabled={loading}
                className="custom-input"
                placeholder="Ingrese la contraseña"
              />
            </div>

            {/* Rol */}
            <div className="form-field-group">
              <IonLabel className="field-label">Rol*</IonLabel>
              <IonSelect
                value={form.rol}
                onIonChange={(e) => handleInputChange("rol", e.detail.value)}
                disabled={loading}
                className="custom-select"
                interface="popover"
              >
                <IonSelectOption value="" disabled>
                  Seleccione un rol
                </IonSelectOption>
                {roles.map((role) => (
                  <IonSelectOption key={role.value} value={role.value}>
                    {role.label}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </div>

            {/* Estado */}
            <div className="form-field-group">
              <IonLabel className="field-label">Estado</IonLabel>
              <IonItem lines="none">
                <IonToggle
                  checked={form.estado}
                  onIonChange={(e) =>
                    handleInputChange("estado", e.detail.checked)
                  }
                  disabled={loading}
                />
                <IonLabel>{form.estado ? "Activo" : "Inactivo"}</IonLabel>
              </IonItem>
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
