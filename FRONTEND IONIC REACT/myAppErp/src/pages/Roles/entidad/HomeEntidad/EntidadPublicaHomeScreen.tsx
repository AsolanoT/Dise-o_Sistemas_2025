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
  IonBadge,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import {
  documentTextOutline,
  peopleOutline,
  analyticsOutline,
  pricetagOutline,
  businessOutline,
} from "ionicons/icons";
import "./HomeScreen.css";
import CustomHeader from "../../../../components/CustomHeader/CustomHeader";

interface CardData {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  route: string;
  badgeCount?: number;
}

const EntidadPublicaHomeScreen: React.FC = () => {
  const history = useHistory();

  // Datos ficticios para ejemplo
  const facturasPendientesTotal = 42;
  const contribuyentesRegistrados = 156;

  const cards: CardData[] = [
    {
      id: "1",
      title: "Facturas",
      description: "Consulta todas las facturas",
      icon: documentTextOutline,
      color: "primary",
      route: "/entidad/facturas",
      badgeCount: facturasPendientesTotal,
    },
    {
      id: "2",
      title: "Contribuyentes",
      description: "Gestión de contribuyentes",
      icon: peopleOutline,
      color: "secondary",
      route: "/entidad/contribuyentes",
      badgeCount: contribuyentesRegistrados,
    },
  ];

  const navigateTo = (route: string) => {
    history.push(route);
  };

  return (
    <IonPage>
      <CustomHeader
        pageName="Área de la Entidad Pública"
        showMenuButton={false}
        showLogoutButton={true}
      />

      <IonContent fullscreen className="ion-padding">
        {/* Mensaje de bienvenida personalizado */}
        <IonCard
          className="welcome-card"
          style={{ backgroundColor: "#1565c0", color: "#fff" }}
        >
          <IonCardHeader>
            <IonCardTitle className="welcome-title">
              Bienvenido Entidad Pública
            </IonCardTitle>
            <IonCardSubtitle className="welcome-subtitle">
              Gestión integral del sistema tributario
            </IonCardSubtitle>
          </IonCardHeader>
        </IonCard>

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
                    {card.badgeCount && (
                      <IonBadge color="light" className="card-badge">
                        {card.badgeCount}
                      </IonBadge>
                    )}
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
            color="primary"
            onClick={() => navigateTo("/entidad/facturas")}
          >
            Ver Todas las Facturas
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EntidadPublicaHomeScreen;
