import {
  IonContent,
  IonInput,
  IonButton,
  IonText,
  IonLoading,
} from "@ionic/react";
import { useState } from "react";
import "./Login.css";
import AuthLayout from "../../components/layouts/AuthLayout";

// Mock de usuarios por roles
const mockUsers = [
  {
    username: "admin",
    password: "admin123",
    role: "SuperAdmin",
    name: "Administrador",
  },
  {
    username: "contribuyente1",
    password: "cont123",
    role: "Contribuyente",
    name: "Juan Pérez",
  },
  {
    username: "entidad1",
    password: "entidad123",
    role: "EntidadPublica",
    name: "Secretaría de Hacienda",
  },
];

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    general: "",
  });
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
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
    const newErrors = { username: "", password: "", general: "" };

    if (!formData.username.trim()) {
      newErrors.username = "Usuario es requerido";
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

    if (attempts >= 5) {
      setErrors((prev) => ({
        ...prev,
        general: "Demasiados intentos fallidos. Intente más tarde.",
      }));
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const userFound = mockUsers.find(
        (user) =>
          user.username === formData.username &&
          user.password === formData.password
      );

      if (userFound) {
        console.log("Login exitoso:", userFound);
        setAttempts(0);
        window.location.href = `${userFound.role.toLowerCase()}`;
      } else {
        setAttempts((prev) => prev + 1);
        setErrors((prev) => ({
          ...prev,
          general: `Credenciales incorrectas. Intentos restantes: ${5 - attempts - 1}`,
        }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: "Error al conectar con el servidor",
      }));
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
      <AuthLayout showHeader={false}>      <IonContent className="login-content">
        <div className="login-container">
          <div className="neumorphic-card">
            {errors.general && (
              <IonText color="danger" className="error-message">
                <p>{errors.general}</p>
              </IonText>
            )}

            <IonInput
              className={`neumorphic-input ${
                errors.username ? "input-error" : ""
              }`}
              placeholder="Usuario"
              value={formData.username}
              onIonChange={(e) =>
                handleInputChange("username", e.detail.value!)
              }
              onKeyPress={handleKeyPress}
            />
            {errors.username && (
              <IonText color="danger" className="error-message">
                <p>{errors.username}</p>
              </IonText>
            )}

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
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
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
              {loading ? "Verificando..." : "INICIAR SESIÓN"}
            </IonButton>

            <div className="login-links">
              <IonButton 
                fill="clear" 
                routerLink="/usuario"
                className="register-link"
              >
                ¿No tienes cuenta? Regístrate
              </IonButton>
            </div>
          </div>
        </div>

        <IonLoading isOpen={loading} message="Autenticando..." />
      </IonContent>
    </AuthLayout>
  );
};

export default Login;