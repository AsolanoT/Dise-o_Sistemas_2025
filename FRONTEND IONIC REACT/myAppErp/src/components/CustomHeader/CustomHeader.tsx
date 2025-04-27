import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonMenu,
  IonContent,
  IonList,
  IonItem,
  IonMenuButton,
} from "@ionic/react";
import {
  menuOutline,
  logOutOutline,
  cashOutline,
  personCircleOutline,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./CustomHeader.css";

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

  const handleLogout = () => {
    history.push("/welcome");
  };

  return (
    <>
      <IonMenu contentId="main-content" side="start">
        <IonContent>
          <IonList>
            <IonItem routerLink="/login" routerDirection="root">
              Login
            </IonItem>
            <IonItem routerLink="/create-person" routerDirection="root">
              Crear Persona
            </IonItem>
            <IonItem routerLink="/create-reservation" routerDirection="root">
              Crear Reserva
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>

      <IonHeader className="custom-header">
        <IonToolbar>
          {showMenuButton && (
            <IonButtons slot="start">
              <IonMenuButton autoHide={false}>
                <IonIcon icon={menuOutline} />
              </IonMenuButton>
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
              <IonButton>
                <IonIcon icon={personCircleOutline} />
              </IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default CustomHeader;
