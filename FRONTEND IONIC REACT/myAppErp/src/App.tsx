import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import AuthLayout from "./components/layouts/AuthLayout";
import MainLayout from "./components/layouts/MainLayout";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import Login from "./pages/Login/Login";
import ContribuyenteRegistration from "./pages/Registration/Contribuyente/ContribuyenteRegistration";
import InvoiceGenerator from "./pages/Invoicing/InvoiceGenerator";
import TipoTributoPage from "./pages/TributeType/TipoTributoPage";
import UserForm from "./pages/Registration/User/UserForm";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* Rutas públicas (sin menú) */}
        <Route exact path="/login">
          <AuthLayout pageName="Iniciar Sesión">
            <Login />
          </AuthLayout>
        </Route>

        <Redirect exact from="/" to="/login" />

        {/* Rutas privadas (con menú) */}
        <Route exact path="/contribuyente">
          <MainLayout pageName="Registro de Contribuyente">
            <ContribuyenteRegistration />
          </MainLayout>
        </Route>

        <Route exact path="/factura">
          <MainLayout pageName="Generador de Factura">
            <InvoiceGenerator />
          </MainLayout>
        </Route>

        <Route exact path="/tipo-tributo">
          <MainLayout pageName="Tipo de Tributo">
            <TipoTributoPage />
          </MainLayout>
        </Route>

        <Route exact path="/usuario">
          <MainLayout pageName="Registro de Usuario">
            <UserForm />
          </MainLayout>
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
