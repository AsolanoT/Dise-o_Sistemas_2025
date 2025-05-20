import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
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
  IonTextarea,
  useIonToast,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import {
  documentTextOutline,
  eye,
  eyeOff,
  informationCircleOutline,
  personOutline,
  homeOutline,
  callOutline,
  mailOutline,
  calendarOutline,
  lockClosedOutline,
  businessOutline,
  briefcaseOutline,
} from "ionicons/icons";
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
  const [errors, setErrors] = useState<Record<string, string>>({});

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
      id: "3", // Por defecto contribuyente
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.tipo_documento.trim()) {
      newErrors.tipo_documento = "El tipo de documento es requerido";
    }

    if (!form.numero_documento.trim()) {
      newErrors.numero_documento = "El número de documento es requerido";
    } else if (!/^\d+$/.test(form.numero_documento)) {
      newErrors.numero_documento = "Solo se permiten números";
    }

    if (!form.nombre.trim()) {
      newErrors.nombre = "El nombre completo es requerido";
    } else if (form.nombre.length > 100) {
      newErrors.nombre = "Máximo 100 caracteres";
    }

    if (!form.direccion.trim()) {
      newErrors.direccion = "La dirección es requerida";
    } else if (form.direccion.length > 200) {
      newErrors.direccion = "Máximo 200 caracteres";
    }

    if (!form.telefono.trim()) {
      newErrors.telefono = "El teléfono es requerido";
    } else if (!/^\d+$/.test(form.telefono)) {
      newErrors.telefono = "Solo se permiten números";
    }

    if (!form.email.trim()) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Ingrese un correo electrónico válido";
    }

    if (!form.birthDate) {
      newErrors.birthDate = "La fecha de nacimiento es requerida";
    }

    if (!form.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (form.password.length < 6) {
      newErrors.password = "Mínimo 6 caracteres";
    }

    if (!form.role.id) {
      newErrors.role = "El rol es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof User, value: any) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Limpiar error cuando el campo cambia
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleRoleChange = (roleId: string) => {
    setForm((prev) => ({
      ...prev,
      role: {
        id: roleId,
      },
    }));

    if (errors.role) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.role;
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
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
          <IonItem className="custom-item">
            <IonIcon
              icon={documentTextOutline}
              slot="start"
              className="custom-icon"
            />
            <IonLabel>Tipo de Documento*</IonLabel>
          </IonItem>
          <IonSelect
            value={form.tipo_documento}
            placeholder="Seleccione el tipo de documento"
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
          {errors.tipo_documento && (
            <IonText className="error">{errors.tipo_documento}</IonText>
          )}

          {/* Número de Documento */}
          <IonItem className="custom-item">
            <IonIcon
              icon={documentTextOutline}
              slot="start"
              className="custom-icon"
            />
            <IonLabel>Número de Documento*</IonLabel>
          </IonItem>
          <IonInput
            value={form.numero_documento}
            onIonChange={(e) =>
              handleInputChange("numero_documento", e.detail.value!)
            }
            className="custom-input"
            placeholder="Ingrese el número de documento"
          />
          {errors.numero_documento && (
            <IonText className="error">{errors.numero_documento}</IonText>
          )}

          {/* Nombre Completo */}
          <IonItem className="custom-item">
            <IonIcon
              icon={personOutline}
              slot="start"
              className="custom-icon"
            />
            <IonLabel>Nombre Completo*</IonLabel>
          </IonItem>
          <IonInput
            value={form.nombre}
            onIonChange={(e) => handleInputChange("nombre", e.detail.value!)}
            className="custom-input"
            placeholder="Ingrese el nombre completo"
          />
          {errors.nombre && (
            <IonText className="error">{errors.nombre}</IonText>
          )}

          {/* Dirección */}
          <IonItem className="custom-item">
            <IonIcon icon={homeOutline} slot="start" className="custom-icon" />
            <IonLabel>Dirección*</IonLabel>
          </IonItem>
          <IonInput
            value={form.direccion}
            onIonChange={(e) => handleInputChange("direccion", e.detail.value!)}
            className="custom-input"
            placeholder="Ingrese la dirección"
          />
          {errors.direccion && (
            <IonText className="error">{errors.direccion}</IonText>
          )}

          {/* Teléfono */}
          <IonItem className="custom-item">
            <IonIcon icon={callOutline} slot="start" className="custom-icon" />
            <IonLabel>Teléfono*</IonLabel>
          </IonItem>
          <IonInput
            type="tel"
            value={form.telefono}
            onIonChange={(e) => handleInputChange("telefono", e.detail.value!)}
            className="custom-input"
            placeholder="Ingrese el número de teléfono"
          />
          {errors.telefono && (
            <IonText className="error">{errors.telefono}</IonText>
          )}

          {/* Email */}
          <IonItem className="custom-item">
            <IonIcon icon={mailOutline} slot="start" className="custom-icon" />
            <IonLabel>Correo Electrónico*</IonLabel>
          </IonItem>
          <IonInput
            type="email"
            value={form.email}
            onIonChange={(e) => handleInputChange("email", e.detail.value!)}
            className="custom-input"
            placeholder="Ingrese el correo electrónico"
          />
          {errors.email && <IonText className="error">{errors.email}</IonText>}

          {/* Fecha de Nacimiento */}
          <IonItem className="custom-item">
            <IonIcon
              icon={calendarOutline}
              slot="start"
              className="custom-icon"
            />
            <IonLabel>Fecha de Nacimiento*</IonLabel>
          </IonItem>
          <IonItem
            button
            onClick={() => setShowDatePicker(true)}
            className="custom-input"
            lines="none"
          >
            <IonLabel>{formatDate(form.birthDate)}</IonLabel>
          </IonItem>
          {errors.birthDate && (
            <IonText className="error">{errors.birthDate}</IonText>
          )}
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

          {/* Tipo de Contribuyente */}
          <IonItem className="custom-item">
            <IonIcon
              icon={businessOutline}
              slot="start"
              className="custom-icon"
            />
            <IonLabel>Tipo de Contribuyente*</IonLabel>
          </IonItem>
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

          {/* Tipo de Actividad */}
          <IonItem className="custom-item">
            <IonIcon
              icon={briefcaseOutline}
              slot="start"
              className="custom-icon"
            />
            <IonLabel>Tipo de Actividad*</IonLabel>
          </IonItem>
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

          {/* Contraseña */}
          <IonItem className="custom-item">
            <IonIcon
              icon={lockClosedOutline}
              slot="start"
              className="custom-icon"
            />
            <IonLabel>Contraseña*</IonLabel>
          </IonItem>
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
          {errors.password && (
            <IonText className="error">{errors.password}</IonText>
          )}

          {/* Rol */}
          <IonItem className="custom-item">
            <IonIcon
              icon={informationCircleOutline}
              slot="start"
              className="custom-icon"
            />
            <IonLabel>Rol*</IonLabel>
          </IonItem>
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
          {errors.role && <IonText className="error">{errors.role}</IonText>}

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
