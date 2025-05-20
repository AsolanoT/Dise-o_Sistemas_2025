import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonButton,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  documentTextOutline,
  peopleOutline,
  cashOutline,
  shieldCheckmarkOutline,
} from "ionicons/icons";
import "./HomeScreen.css";
import CustomHeader from "../../components/CustomHeader/CustomHeader";

interface CardData {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  route: string;
}

const HomeScreen: React.FC = () => {
  const history = useHistory();

  const cards: CardData[] = [
    {
      id: "1",
      title: "Facturas",
      description: "Gestión de facturas y pagos",
      icon: documentTextOutline,
      color: "primary",
      route: "/factura",
    },
    {
      id: "2",
      title: "Contribuyentes",
      description: "Administración de perfiles",
      icon: peopleOutline,
      color: "secondary",
      route: "/contribuyente",
    },
    {
      id: "3",
      title: "Tributos",
      description: "Tipos de tributos y tasas",
      icon: cashOutline,
      color: "tertiary",
      route: "/tipo-tributo",
    },
    {
      id: "4",
      title: "Usuarios",
      description: "Gestión de permisos",
      icon: shieldCheckmarkOutline,
      color: "success",
      route: "/usuario",
    },
  ];

  const navigateTo = (route: string) => {
    history.push(route);
  };

  return (
    <IonPage>
      <CustomHeader
        pageName="ERP Tributario"
        showMenuButton={true}
        showLogoutButton={true}
      />

      <IonContent fullscreen className="ion-padding">
        <div className="welcome-section">
          <h1>Bienvenido al Sistema</h1>
          <p>Gestión integral de procesos tributarios</p>
        </div>

        <IonGrid>
          <IonRow>
            {cards.map((card) => (
              <IonCol size="12" sizeMd="6" key={card.id}>
                <IonCard
                  button
                  onClick={() => navigateTo(card.route)}
                  color={card.color}
                  className="feature-card"
                >
                  <div className="card-icon-container">
                    <IonIcon icon={card.icon} size="large" />
                  </div>
                  <IonCardHeader>
                    <IonCardTitle>{card.title}</IonCardTitle>
                    <IonCardSubtitle>{card.description}</IonCardSubtitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <div className="quick-actions">
          <IonButton
            expand="block"
            fill="outline"
            onClick={() => navigateTo("/factura")}
          >
            Nueva Factura
          </IonButton>
          <IonButton
            expand="block"
            fill="outline"
            onClick={() => navigateTo("/contribuyente")}
          >
            Registrar Contribuyente
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomeScreen;
