import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonText,
  IonLoading,
} from "@ionic/react";
import { useState } from "react";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import "./Login.css";

// Mock de usuarios por roles (esto luego se reemplazará por la API real)
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
    // Limpiar errores al escribir
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

    // Simulación de llamada a API con timeout
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const userFound = mockUsers.find(
        (user) =>
          user.username === formData.username &&
          user.password === formData.password
      );

      if (userFound) {
        // Aquí normalmente guardarías el token o sesión
        console.log("Login exitoso:", userFound);
        setAttempts(0);
        // Redirección basada en rol
        window.location.href = `${userFound.role.toLowerCase()}`;
      } else {
        setAttempts((prev) => prev + 1);
        setErrors((prev) => ({
          ...prev,
          general:
            "Credenciales incorrectas. Intentos restantes: " +
            (5 - attempts - 1),
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
    <IonPage id="main-content">
      <CustomHeader
        pageName="Login"
        showMenuButton={false}
        showLogoutButton={false}
      />

      <IonContent className="login-content">
        <div className="login-container">
          <div className="neumorphic-card">
            <h1>Acceso al Sistema Tributario</h1>

            {/* Mensaje de error general */}
            {errors.general && (
              <IonText color="danger" className="error-message">
                <p>{errors.general}</p>
              </IonText>
            )}

            {/* Campo Usuario */}
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

            {/* Campo Contraseña */}
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

            {/* Botón de Login */}
            <IonButton
              className="neumorphic-button"
              expand="block"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Verificando..." : "Iniciar Sesión"}
            </IonButton>

            {/* Enlace de recuperación */}
            <div className="login-links">
              <a href="#recuperar" className="link-text">
                ¿Olvidó su contraseña?
              </a>
            </div>
          </div>
        </div>

        <IonLoading isOpen={loading} message="Autenticando..." />
      </IonContent>
    </IonPage>
  );
};

export default Login;
