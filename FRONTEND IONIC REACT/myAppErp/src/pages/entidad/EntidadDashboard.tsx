// src/pages/entidad/EntidadDashboard.tsx
import { IonContent, IonPage } from '@ionic/react';
import CustomHeader from '../../components/CustomHeader/CustomHeader';

const EntidadDashboard = () => {
  return (
    <IonPage>
      <CustomHeader pageName="Entidad Pública" />
      <IonContent>
        <h1>Bienvenido Entidad</h1>
        {/* Contenido para generar facturas */}
      </IonContent>
    </IonPage>
  );
};

export default EntidadDashboard;