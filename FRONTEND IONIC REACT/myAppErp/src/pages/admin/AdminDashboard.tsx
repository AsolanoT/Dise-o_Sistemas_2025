// src/pages/admin/AdminDashboard.tsx
import { IonContent, IonPage } from '@ionic/react';
import CustomHeader from '../../components/CustomHeader/CustomHeader';

const AdminDashboard = () => {
  return (
    <IonPage>
      <CustomHeader pageName="Panel de Administrador" />
      <IonContent>
        <h1>Bienvenido SuperAdmin</h1>
        {/* Contenido específico para admin */}
      </IonContent>
    </IonPage>
  );
};

export default AdminDashboard;