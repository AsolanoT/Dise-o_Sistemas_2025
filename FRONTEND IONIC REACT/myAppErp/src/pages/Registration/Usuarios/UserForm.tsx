import React, { useState } from "react";
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
  IonItem,
  IonDatetime,
  IonText,
  IonIcon,
  useIonToast,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { eye, eyeOff } from "ionicons/icons";
import "./UserForm.css";
import userService from "../../../services/userService";
import CustomHeader from "../../../components/CustomHeader/CustomHeader";

interface User {
  status: boolean;
  tipo_documento: string;
  numero_documento: string;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  birthDate: string;
  password: string;
  tipocontribuyente: string;
  tipo_actividad: string;
  role: {
    id: string;
  };
}

const UserForm: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [present] = useIonToast();

  const [form, setForm] = useState<User>({
    status: true,
    tipo_documento: "",
    numero_documento: "",
    nombre: "",
    direccion: "",
    telefono: "",
    email: "",
    birthDate: "",
    password: "",
    tipocontribuyente: "NATURAL",
    tipo_actividad: "EMPLEADO",
    role: {
      id: "", // Por defecto contribuyente
    },
  });

  const documentTypes = [
    { value: "CEDULA", label: "Cédula de Ciudadanía" },
    { value: "TARJETA_IDENTIDAD", label: "Tarjeta de Identidad" },
    { value: "CEDULA_EXTRANJERIA", label: "Cédula de Extranjería" },
    { value: "PASAPORTE", label: "Pasaporte" },
    { value: "NIT", label: "NIT" },
  ];

  const contributorTypes = [
    { value: "NATURAL", label: "Persona Natural" },
    { value: "JURIDICA", label: "Persona Jurídica" },
  ];

  const activityTypes = [
    { value: "EMPLEADO", label: "Empleado" },
    { value: "INDEPENDIENTE", label: "Independiente" },
    { value: "EMPRESA", label: "Empresa" },
  ];

  const roles = [
    { id: "1", label: "Super Admin" },
    { id: "2", label: "Entidad Pública" },
    { id: "3", label: "Contribuyente" },
  ];

  const handleInputChange = (field: keyof User, value: any) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRoleChange = (roleId: string) => {
    setForm((prev) => ({
      ...prev,
      role: {
        id: roleId,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validaciones básicas
      if (!form.nombre.trim()) {
        throw new Error("Debe ingresar el nombre completo");
      }

      if (!form.numero_documento.trim()) {
        throw new Error("Debe ingresar el número de documento");
      }

      if (!form.email.trim() || !form.email.includes("@")) {
        throw new Error("Debe ingresar un correo electrónico válido");
      }

      if (!form.telefono.trim()) {
        throw new Error("Debe ingresar un número de teléfono");
      }

      if (!form.password || form.password.length < 6) {
        throw new Error("La contraseña debe tener al menos 6 caracteres");
      }

      // Enviar datos al backend
      const response = await userService.createUser(form);
      console.log("Usuario creado:", response);

      present({
        message: "Usuario registrado exitosamente",
        duration: 3000,
        position: "top",
        color: "success",
      });

      setSuccess(true);
    } catch (err: any) {
      console.error("Error al registrar usuario:", err);
      setError(err.message || "Error al registrar el usuario");
      present({
        message: err.message || "Error al registrar el usuario",
        duration: 5000,
        position: "top",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
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
      <CustomHeader
        pageName="Registro de Usuario"
        showMenuButton={true}
        showLogoutButton={true}
      />

      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit} className="user-form">
          <h2 className="form-title">Registro de Usuarios</h2>

          {error && <div className="error-message">{error}</div>}

          {/* Tipo de Documento */}
          <div className="form-field-group">
            <IonLabel className="field-label">Tipo de Documento*</IonLabel>
            <div className="input-icon-container">
              <IonSelect
                value={form.tipo_documento}
                onIonChange={(e) =>
                  handleInputChange("tipo_documento", e.detail.value)
                }
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
          </div>

          {/* Número de Documento */}
          <div className="form-field-group">
            <IonLabel className="field-label">Número de Documento*</IonLabel>
            <div className="input-icon-container">
              <IonInput
                value={form.numero_documento}
                onIonChange={(e) =>
                  handleInputChange("numero_documento", e.detail.value!)
                }
                className="custom-input"
                placeholder="Ingrese el número de documento"
              />
            </div>
          </div>

          {/* Nombre Completo */}
          <div className="form-field-group">
            <IonLabel className="field-label">Nombre Completo*</IonLabel>
            <div className="input-icon-container">
              <IonInput
                value={form.nombre}
                onIonChange={(e) =>
                  handleInputChange("nombre", e.detail.value!)
                }
                className="custom-input"
                placeholder="Ingrese el nombre completo"
              />
            </div>
          </div>

          {/* Dirección */}
          <div className="form-field-group">
            <IonLabel className="field-label">Dirección*</IonLabel>
            <div className="input-icon-container">
              <IonInput
                value={form.direccion}
                onIonChange={(e) =>
                  handleInputChange("direccion", e.detail.value!)
                }
                className="custom-input"
                placeholder="Ingrese la dirección"
              />
            </div>
          </div>

          {/* Teléfono */}
          <div className="form-field-group">
            <IonLabel className="field-label">Teléfono*</IonLabel>
            <div className="input-icon-container">
              <IonInput
                type="tel"
                value={form.telefono}
                onIonChange={(e) =>
                  handleInputChange("telefono", e.detail.value!)
                }
                className="custom-input"
                placeholder="Ingrese el número de teléfono"
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-field-group">
            <IonLabel className="field-label">Correo Electrónico*</IonLabel>
            <div className="input-icon-container">
              <IonInput
                type="email"
                value={form.email}
                onIonChange={(e) => handleInputChange("email", e.detail.value!)}
                className="custom-input"
                placeholder="Ingrese el correo electrónico"
              />
            </div>
          </div>

          {/* Fecha de Nacimiento */}
          <div className="form-field-group">
            <IonLabel className="field-label">Fecha de Nacimiento*</IonLabel>
            <div className="input-icon-container">
              <IonItem
                button
                onClick={() => setShowDatePicker(true)}
                className="custom-input"
                lines="none"
              >
                <IonLabel>{formatDate(form.birthDate)}</IonLabel>
              </IonItem>
            </div>
            {showDatePicker && (
              <div className="datetime-modal-backdrop">
                <div className="datetime-modal-content">
                  <IonDatetime
                    presentation="date"
                    onIonChange={(e) => {
                      handleInputChange("birthDate", e.detail.value as string);
                      setShowDatePicker(false);
                    }}
                    max={new Date().toISOString()}
                    locale="es-ES"
                  />
                  <div className="datetime-actions">
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

          {/* Tipo de Contribuyente */}
          <div className="form-field-group">
            <IonLabel className="field-label">Tipo de Contribuyente*</IonLabel>
            <div className="input-icon-container">
              <IonSelect
                value={form.tipocontribuyente}
                onIonChange={(e) =>
                  handleInputChange("tipocontribuyente", e.detail.value)
                }
                className="custom-select"
                interface="popover"
              >
                {contributorTypes.map((type) => (
                  <IonSelectOption key={type.value} value={type.value}>
                    {type.label}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </div>
          </div>

          {/* Tipo de Actividad */}
          <div className="form-field-group">
            <IonLabel className="field-label">Tipo de Actividad*</IonLabel>
            <div className="input-icon-container">
              <IonSelect
                value={form.tipo_actividad}
                onIonChange={(e) =>
                  handleInputChange("tipo_actividad", e.detail.value)
                }
                className="custom-select"
                interface="popover"
              >
                {activityTypes.map((type) => (
                  <IonSelectOption key={type.value} value={type.value}>
                    {type.label}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </div>
          </div>

          {/* Contraseña */}
          <div className="form-field-group">
            <IonLabel className="field-label">Contraseña*</IonLabel>
            <div className="input-icon-container">
              <IonInput
                type={showPassword ? "text" : "password"}
                value={form.password}
                onIonChange={(e) =>
                  handleInputChange("password", e.detail.value!)
                }
                className="custom-input"
                placeholder="Ingrese la contraseña"
              />
              <IonIcon
                icon={showPassword ? eyeOff : eye}
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>

          {/* Rol */}
          <div className="form-field-group">
            <IonLabel className="field-label">Rol*</IonLabel>
            <IonSelect
              value={form.role.id}
              onIonChange={(e) => handleRoleChange(e.detail.value)}
              className="custom-select"
              interface="popover"
            >
              {roles.map((role) => (
                <IonSelectOption key={role.id} value={role.id}>
                  {role.label}
                </IonSelectOption>
              ))}
            </IonSelect>
          </div>

          <div className="form-actions">
            <IonButton
              fill="outline"
              onClick={() => history.goBack()}
              className="cancel-button"
            >
              Cancelar
            </IonButton>

            <IonButton
              type="submit"
              disabled={loading}
              className="submit-button"
            >
              {loading ? "Registrando..." : "Registrarse"}
            </IonButton>
          </div>
        </form>
      </IonContent>

      <IonAlert
        isOpen={success}
        onDidDismiss={() => {
          setSuccess(false);
          history.push("/login");
        }}
        header="Registro Exitoso"
        message="Su cuenta ha sido creada correctamente. Ahora puede iniciar sesión."
        buttons={["OK"]}
      />

      <IonLoading isOpen={loading} message="Procesando..." spinner="circles" />
    </IonPage>
  );
};

export default UserForm;
