import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { menuOutline, logOutOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./CustomHeader.css";

interface CustomHeaderProps {
  showMenuButton: boolean;
  showLogoutButton: boolean;
  hideTitle?: boolean; // Nueva prop para ocultar el título
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  showMenuButton,
  showLogoutButton,
  hideTitle = false, // Valor por defecto
}) => {
  const history = useHistory();

  const handleLogout = () => {
    history.push("/login");
  };

  return (
    <IonHeader className="custom-header">
      <IonToolbar className="custom-toolbar">
        {showMenuButton && (
          <IonButtons slot="start">
            <IonButton className="menu-button">
              <IonIcon icon={menuOutline} className="menu-icon" />
            </IonButton>
          </IonButtons>
        )}

        {/* Eliminamos IonTitle si hideTitle es true */}
        {!hideTitle && (
          <div className="header-title-space"></div> // Espacio reservado
        )}

        {showLogoutButton && (
          <IonButtons slot="end">
            <IonButton className="logout-button" onClick={handleLogout}>
              <IonIcon icon={logOutOutline} className="logout-icon" />
            </IonButton>
          </IonButtons>
        )}
      </IonToolbar>
    </IonHeader>
  );
};

export default CustomHeader;