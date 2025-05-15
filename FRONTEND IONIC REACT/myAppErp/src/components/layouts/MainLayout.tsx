import { IonContent, IonPage } from "@ionic/react";
import CustomHeader from "../CustomHeader/CustomHeader";
import "./Layouts.css";

interface MainLayoutProps {
  children: React.ReactNode;
  pageName: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, pageName }) => {
  return (
    <IonPage>
      <CustomHeader pageName={pageName} showMenuButton={true} showLogoutButton={true} />
      <IonContent className="main-content">
        <div className="main-container">
          {children}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MainLayout;