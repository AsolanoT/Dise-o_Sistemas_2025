import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonMenuButton,
  useIonToast,
} from "@ionic/react";
import { logOutOutline, cashOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./CustomHeader.css";
import { logout } from "../../services/role.service";

interface CustomHeaderProps {
  pageName: string;
  showMenuButton?: boolean;
  showLogoutButton?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  pageName,
  showMenuButton = true,
  showLogoutButton = true,
}) => {
  const history = useHistory();
  const [present] = useIonToast();

  const handleLogout = async () => {
    try {
      await logout();
      present({
        message: "Sesión cerrada correctamente",
        duration: 2000,
        position: "top",
        color: "success",
      });
      history.push("/login");
    } catch (error) {
      present({
        message: "Error al cerrar sesión",
        duration: 3000,
        position: "top",
        color: "danger",
      });
    }
  };

  return (
    <IonHeader className="custom-header">
      <IonToolbar>
        {showMenuButton && (
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        )}

        <div className="header-center">
          <IonIcon icon={cashOutline} className="header-icon" />
          <IonTitle>{pageName}</IonTitle>
        </div>

        {showLogoutButton && (
          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>
              <IonIcon icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        )}
      </IonToolbar>
    </IonHeader>
  );
};

export default CustomHeader;
