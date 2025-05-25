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
  cashOutline,
  receiptOutline,
  walletOutline,
  personCircleOutline,
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

const ContribuyenteHomeScreen: React.FC = () => {
  const history = useHistory();

  // Datos ficticios para ejemplo
  const facturasPendientes = 3;
  const facturasPagadas = 5;

  const cards: CardData[] = [
    {
      id: "1",
      title: "Mis Facturas",
      description: "Consulta tus facturas pendientes",
      icon: documentTextOutline,
      color: "primary",
      route: "/contribuyente/facturas",
      badgeCount: facturasPendientes,
    },
    {
      id: "2",
      title: "Pagar Facturas",
      description: "Realiza pagos de tus obligaciones",
      icon: cashOutline,
      color: "success",
      route: "/contribuyente/pagos",
    },
    
  ];

  const navigateTo = (route: string) => {
    history.push(route);
  };

  return (
    <IonPage>
      <CustomHeader
        pageName="Área del Contribuyente"
        showMenuButton={false}
        showLogoutButton={true}
      />

      <IonContent fullscreen className="ion-padding">
        {/* Mensaje de bienvenida personalizado */}
        <IonCard
          className="welcome-card"
          style={{ backgroundColor: "#2e7d32", color: "#fff" }}
        >
          <IonCardHeader>
            <IonCardTitle className="welcome-title">
              Bienvenido Contribuyente
            </IonCardTitle>
            <IonCardSubtitle className="welcome-subtitle">
              Gestión de tus obligaciones tributarias
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
                      <IonBadge color="danger" className="card-badge">
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
      </IonContent>
    </IonPage>
  );
};

export default ContribuyenteHomeScreen;
