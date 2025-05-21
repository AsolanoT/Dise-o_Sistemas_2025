// src/pages/contribuyente/ContribuyenteDashboard.tsx
import { IonContent, IonPage } from "@ionic/react";
import CustomHeader from "../../../components/CustomHeader/CustomHeader";

const ContribuyenteDashboard = () => {
  return (
    <IonPage>
      <CustomHeader pageName="Contribuyente" />
      <IonContent>
        <h1>Bienvenido Contribuyente</h1>
        {/* Contenido para ver facturas */}
      </IonContent>
    </IonPage>
  );
};

export default ContribuyenteDashboard;
