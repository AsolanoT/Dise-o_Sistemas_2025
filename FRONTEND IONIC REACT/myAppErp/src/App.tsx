import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import AuthLayout from "./components/layouts/AuthLayout";
import MainLayout from "./components/layouts/MainLayout";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/structure.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import Login from "./pages/auth/Login/Login";
import InvoiceGenerator from "./pages/Invoicing/InvoiceGenerator";
import UserForm from "./pages/Registration/Usuarios/UserForm";
import HomeScreen from "./pages/inicio/HomeScreen";
import VerifyEmail from "./pages/auth/VerifyEmail/VerifyEmail";
import { TipoTributoPage } from "./pages/Registration/TipoTributo/TipoTributoPage";
import RoleRedirector from "./components/RoleRedirector";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EntidadDashboard from "./pages/entidad/EntidadDashboard";
import ContribuyenteDashboard from "./pages/contribuyente/ContribuyenteDashboard";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* Ruta de redirección por rol */}
        <Route exact path="/">
          <RoleRedirector />
        </Route>

        {/* Rutas públicas (sin menú) */}
        <Route exact path="/login">
          <AuthLayout pageName="Iniciar Sesión">
            <Login />
          </AuthLayout>
        </Route>

        <Route exact path="/verify-email">
          <AuthLayout pageName="Verificación de Email">
            <VerifyEmail />
          </AuthLayout>
        </Route>

        {/* Dashboards por rol */}
        <Route exact path="/admin">
          <MainLayout pageName="Administrador">
            <AdminDashboard />
          </MainLayout>
        </Route>

        <Route exact path="/entidad">
          <MainLayout pageName="Entidad Pública">
            <EntidadDashboard />
          </MainLayout>
        </Route>

        <Route exact path="/contribuyente">
          <MainLayout pageName="Contribuyente">
            <ContribuyenteDashboard />
          </MainLayout>
        </Route>

        {/* Rutas existentes */}
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

        <Route exact path="/registro-usuario">
          <MainLayout pageName="Registro de Usuario">
            <UserForm />
          </MainLayout>
        </Route>

        <Route exact path="/home">
          <MainLayout pageName="Página Principal">
            <HomeScreen />
          </MainLayout>
        </Route>

        {/* Redirección por defecto */}
        <Redirect to="/" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
