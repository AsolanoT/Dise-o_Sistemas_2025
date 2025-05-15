import { IonContent, IonPage } from "@ionic/react";
import "./Layouts.css";

interface AuthLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean; // Nueva prop para controlar visibilidad
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  showHeader = false // Por defecto no mostrar header
}) => {
  return (
    <IonPage>
      {/* Eliminamos completamente el CustomHeader para el login */}
      <IonContent className={`auth-content ${!showHeader ? 'no-header' : ''}`}>
        <div className="auth-container">
          {children}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AuthLayout;