import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonText,
  IonLoading,
  useIonToast,
  IonIcon,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import { mailOutline } from "ionicons/icons";
import "./VerifyEmail.css";
import verifyEmail from "../../../services/userService";

import { useState } from "react";

type LocationState = {
  email: string;
};

const VerifyEmail: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [present] = useIonToast();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const email = (location.state as LocationState)?.email || "";

  const handleVerify = async () => {
    if (!code) {
      present({
        message: "Por favor ingrese el código de verificación",
        duration: 3000,
        position: "top",
        color: "warning",
      });
      return;
    }

    if (!email) {
      present({
        message: "No se encontró el correo electrónico para verificar",
        duration: 3000,
        position: "top",
        color: "danger",
      });
      history.push("/register");
      return;
    }

    setLoading(true);
    try {
      await verifyEmail.verifyEmail(email, code);
      present({
        message: "¡Correo verificado exitosamente!",
        duration: 3000,
        position: "top",
        color: "success",
      });
      history.push("/login");
    } catch (error: any) {
      present({
        message: error.message || "Error al verificar el correo",
        duration: 3000,
        position: "top",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResendLoading(true);
    try {
      // Aquí implementarías la función para reenviar el código
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulación
      present({
        message: "Código reenviado exitosamente",
        duration: 3000,
        position: "top",
        color: "success",
      });
    } catch (error) {
      present({
        message: "Error al reenviar el código",
        duration: 3000,
        position: "top",
        color: "danger",
      });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent className="verify-email-content">
        <div className="verify-container">
          <div className="neumorphic-card">
            <h1>Verificación de Correo</h1>

            {email ? (
              <IonText color="medium" className="instructions">
                <p>
                  Hemos enviado un código de verificación a{" "}
                  <strong>{email}</strong>. Por favor ingréselo a continuación.
                </p>
              </IonText>
            ) : (
              <IonText color="danger" className="instructions">
                <p>
                  No se encontró información de correo electrónico. Por favor
                  complete el registro nuevamente.
                </p>
              </IonText>
            )}

            <div className="input-group">
              <IonIcon icon={mailOutline} className="input-icon" />
              <IonInput
                className="neumorphic-input"
                placeholder="Código de verificación"
                value={code}
                onIonChange={(e) => setCode(e.detail.value!)}
                disabled={!email}
              />
            </div>

            <IonButton
              className="neumorphic-button"
              expand="block"
              onClick={handleVerify}
              disabled={loading || !code || !email}
            >
              {loading ? "Verificando..." : "Verificar"}
            </IonButton>

            <IonButton
              className="neumorphic-button"
              expand="block"
              fill="outline"
              onClick={handleResendCode}
              disabled={resendLoading || !email}
            >
              {resendLoading ? "Enviando..." : "Reenviar código"}
            </IonButton>

            <IonButton
              className="neumorphic-button"
              expand="block"
              fill="clear"
              onClick={() => history.push("/register")}
            >
              Volver al registro
            </IonButton>
          </div>
        </div>

        <IonLoading isOpen={loading || resendLoading} message="Procesando..." />
      </IonContent>
    </IonPage>
  );
};

export default VerifyEmail;
