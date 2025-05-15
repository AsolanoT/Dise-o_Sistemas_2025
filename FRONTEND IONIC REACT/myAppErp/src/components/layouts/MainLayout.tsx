import {
  IonMenu,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonMenuToggle,
  IonAvatar,
  IonIcon,
  IonPage,
} from "@ionic/react";
import {
  homeOutline,
  documentTextOutline,
  peopleOutline,
  locationOutline,
  receiptOutline,
  personOutline,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "../CustomHeader/CustomHeader.css";
import CustomHeader from "../CustomHeader/CustomHeader";

interface MainLayoutProps {
  children: React.ReactNode;
  pageName: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, pageName }) => {
  const history = useHistory();

  const handleNavigation = (path: string) => {
    history.push(path);
    const menu = document.querySelector("ion-menu");
    menu?.close();
  };

  return (
    <>
      {/* Menú Lateral */}
      <IonMenu
        contentId="main-content"
        menuId="main-menu"
        side="start"
        className="custom-menu"
      >
        <IonContent className="menu-content">
          {/* Sección de perfil */}
          <div className="profile-section">
            <IonAvatar className="profile-avatar">
              <IonIcon icon={personOutline} className="profile-icon" />
            </IonAvatar>
            <IonLabel className="profile-name">Usuario</IonLabel>
            <IonLabel className="profile-email">
              usuario@erptributario.com
            </IonLabel>
          </div>

          {/* Items del menú */}
          <IonList className="menu-list">
            <IonMenuToggle autoHide={false}>
              <IonItem
                button
                className="menu-item"
                onClick={() => handleNavigation("/dashboard")}
              >
                <IonIcon
                  slot="start"
                  icon={homeOutline}
                  className="menu-icon"
                />
                <IonLabel>Inicio</IonLabel>
              </IonItem>
            </IonMenuToggle>

            <IonMenuToggle autoHide={false}>
              <IonItem
                button
                className="menu-item"
                onClick={() => handleNavigation("/tipo-tributo")}
              >
                <IonIcon
                  slot="start"
                  icon={documentTextOutline}
                  className="menu-icon"
                />
                <IonLabel>Crear tipos de tributo</IonLabel>
              </IonItem>
            </IonMenuToggle>

            <IonMenuToggle autoHide={false}>
              <IonItem
                button
                className="menu-item"
                onClick={() => handleNavigation("/tipo-contribuyente")}
              >
                <IonIcon
                  slot="start"
                  icon={peopleOutline}
                  className="menu-icon"
                />
                <IonLabel>Crear Tipo de Contribuyentes</IonLabel>
              </IonItem>
            </IonMenuToggle>

            <IonMenuToggle autoHide={false}>
              <IonItem
                button
                className="menu-item"
                onClick={() => handleNavigation("/contribuyente")}
              >
                <IonIcon
                  slot="start"
                  icon={locationOutline}
                  className="menu-icon"
                />
                <IonLabel>Crear Contribuyente</IonLabel>
              </IonItem>
            </IonMenuToggle>

            <IonMenuToggle autoHide={false}>
              <IonItem
                button
                className="menu-item"
                onClick={() => handleNavigation("/factura")}
              >
                <IonIcon
                  slot="start"
                  icon={receiptOutline}
                  className="menu-icon"
                />
                <IonLabel>Generar Factura</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>

      {/* Página principal */}
      <IonPage id="main-content">
        <CustomHeader
          pageName={pageName}
          showMenuButton={true}
          showLogoutButton={true}
        />
        {children}
      </IonPage>
    </>
  );
};

export default MainLayout;
