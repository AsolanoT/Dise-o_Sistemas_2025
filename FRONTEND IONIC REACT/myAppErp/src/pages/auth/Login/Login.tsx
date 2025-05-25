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
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { eye, eyeOff, mailOutline, lockClosedOutline } from "ionicons/icons";
import "./Login.css";
import { loginUser } from "../../../services/role.service";
import { initialValues, validationSchema } from "./Login.form";

export function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [present] = useIonToast();
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (values) => {
      setIsSubmitting(true);

      try {
        const response = await loginUser({
          email: values.email.trim().toLowerCase(),
          password: values.password,
        });

        console.log("Login exitoso:", response);

        // Mostramos mensaje de éxito
        present({
          message: `Bienvenido ${response.user.email}`,
          duration: 2000,
          position: "top",
          color: "success",
        });

        // Redirigimos según el rol del usuario
        if (response.user.role.nombre === "Administrador") {
          history.push("/admin/home");
        } else if (response.user.role.nombre === "Contribuyente") {
          history.push("/contribuyente/home");
        } else if (response.user.role.nombre === "Entidad Pública") {
          history.push("/entidad_publica/home");
        } else {
          history.push("/home");
        }
      } catch (error: any) {
        console.error("Error en login:", error);
        present({
          message: error.message || "Credenciales incorrectas",
          duration: 3000,
          position: "top",
          color: "danger",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Verificar si el usuario ya está autenticado
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const user = JSON.parse(userData);

      // Redirigir según el rol
      if (user.role.nombre === "Administrador") {
        history.push("/admin/home");
      } else if (user.role.nombre === "Contribuyente") {
        history.push("/contribuyente/home");
      } else if (user.role.nombre === "Entidad Pública") {
        history.push("/entidad_publica/home");
      } else {
        history.push("/home");
      }
    }
  }, [history]);

  return (
    <IonPage id="main-content">
      <IonContent className="login-content">
        <div className="login-container">
          <form onSubmit={formik.handleSubmit} className="neumorphic-card">
            <h1>Acceso al Sistema Tributario</h1>

            <div className="input-group">
              <IonIcon icon={mailOutline} className="input-icon" />
              <IonInput
                placeholder="Correo electrónico"
                type="email"
                value={formik.values.email}
                onIonChange={(e) =>
                  formik.setFieldValue("email", e.detail.value!)
                }
                className={`neumorphic-input ${
                  formik.errors.email ? "input-error" : ""
                }`}
              />
            </div>
            {formik.errors.email && (
              <IonText color="danger" className="error-message">
                <small>{formik.errors.email}</small>
              </IonText>
            )}

            <div className="input-group">
              <IonIcon icon={lockClosedOutline} className="input-icon" />
              <div className="password-container">
                <IonInput
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  value={formik.values.password}
                  onIonChange={(e) =>
                    formik.setFieldValue("password", e.detail.value!)
                  }
                  className={`neumorphic-input ${
                    formik.errors.password ? "input-error" : ""
                  }`}
                />
                <IonIcon
                  icon={showPassword ? eyeOff : eye}
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>
            {formik.errors.password && (
              <IonText color="danger" className="error-message">
                <small>{formik.errors.password}</small>
              </IonText>
            )}

            <IonButton
              className="neumorphic-button"
              expand="block"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Verificando..." : "Iniciar sesión"}
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
          </form>
        </div>

        <IonLoading isOpen={isSubmitting} message="Iniciando sesión..." />
      </IonContent>
    </IonPage>
  );
}
