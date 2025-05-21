import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonText,
  IonLoading,
  IonIcon,
  useIonToast,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { eye, eyeOff, mailOutline, lockClosedOutline } from "ionicons/icons";
import "./Login.css";
import { authService } from "../../../services/role.service";

const Login: React.FC = () => {
  const history = useHistory();
  const [present] = useIonToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: "",
      general: "",
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "", general: "" };

    if (!formData.email.trim()) {
      newErrors.email = "Correo electrónico es requerido";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Correo electrónico inválido";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Contraseña es requerida";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Mínimo 6 caracteres";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Usamos el servicio de autenticación
      const user = await authService.login(
        formData.email.toLowerCase().trim(),
        formData.password
      );

      // Mostramos mensaje de éxito
      present({
        message: `Bienvenido ${user.email}`,
        duration: 2000,
        position: "top",
        color: "success",
      });

      // Redirigimos según el rol del usuario
      if (user.role.nombre === "Administrador") {
        history.push("/admin/dashboard");
      } else if (user.role.nombre === "Contribuyente") {
        history.push("/contribuyente/dashboard");
      } else {
        history.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Error en login:", error);
      setErrors((prev) => ({
        ...prev,
        general: error.message || "Credenciales incorrectas",
      }));
      present({
        message: error.message || "Error al iniciar sesión",
        duration: 3000,
        position: "top",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <IonPage id="main-content">
      <IonContent className="login-content">
        <div className="login-container">
          <div className="neumorphic-card">
            <h1>Acceso al Sistema Tributario</h1>

            {errors.general && (
              <IonText color="danger" className="error-message">
                <p>{errors.general}</p>
              </IonText>
            )}

            <div className="input-group">
              <IonIcon icon={mailOutline} className="input-icon" />
              <IonInput
                className={`neumorphic-input ${
                  errors.email ? "input-error" : ""
                }`}
                placeholder="Correo electrónico"
                type="email"
                value={formData.email}
                onIonChange={(e) => handleInputChange("email", e.detail.value!)}
                onKeyPress={handleKeyPress}
              />
            </div>
            {errors.email && (
              <IonText color="danger" className="error-message">
                <p>{errors.email}</p>
              </IonText>
            )}

            <div className="input-group">
              <IonIcon icon={lockClosedOutline} className="input-icon" />
              <div className="password-container">
                <IonInput
                  className={`neumorphic-input ${
                    errors.password ? "input-error" : ""
                  }`}
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  value={formData.password}
                  onIonChange={(e) =>
                    handleInputChange("password", e.detail.value!)
                  }
                  onKeyPress={handleKeyPress}
                />
                <IonIcon
                  icon={showPassword ? eyeOff : eye}
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>
            {errors.password && (
              <IonText color="danger" className="error-message">
                <p>{errors.password}</p>
              </IonText>
            )}

            <IonButton
              className="neumorphic-button"
              expand="block"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Verificando..." : "Iniciar Sesión"}
            </IonButton>

            <div className="login-links">
              <IonButton
                fill="clear"
                onClick={() => history.push("/registro-usuario")}
                className="link-text"
              >
                Registrarse
              </IonButton>
            </div>
          </div>
        </div>

        <IonLoading isOpen={loading} message="Autenticando..." />
      </IonContent>
    </IonPage>
  );
};

export default Login;
