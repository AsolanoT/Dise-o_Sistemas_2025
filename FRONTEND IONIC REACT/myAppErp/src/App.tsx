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

import HomeScreen from "./pages/Roles/admin/HomeAdmin/HomeScreen";
import { UserForm } from "./pages/auth/RegistroUsuarios/UserForm";
import { TipoTributoForm } from "./pages/Roles/admin/Create-TipoTributo/TipoTributoForm";
import RoleRedirector from "./components/RoleRedirector";
import VerifyEmail from "./pages/auth/VerifyEmail/VerifyEmail";
import FacturaForm from "./pages/Roles/admin/Create-factura/FacturaForm";
import { Login } from "./pages/auth/Login/Login";
import ContribuyenteHomeScreen from "./pages/Roles/contribuyente/HomeContribuyente/ContribuyenteHomeScreen";
import EntidadPublicaHomeScreen from "./pages/Roles/entidad/HomeEntidad/EntidadPublicaHomeScreen";
import { ViewUsers } from "./pages/Roles/admin/view-users/users";
import { ViewFacturas } from "./pages/Roles/entidad/view-factura/ViewFacturas";
import { ViewContribuyentes } from "./pages/Roles/entidad/view-contribuyentes/ViewContribuyentes";
import { ViewFacturasContribuyente } from "./pages/Roles/contribuyente/view-facturaContribuyente/ViewFacturasContribuyente";
import { ViewFacturasAdmin } from "./pages/Roles/admin/View-Facturas/ViewFacturas";
import { ViewTiposTributo } from "./pages/Roles/admin/View-Tributos/ViewTiposTributo";
import { FacturasPage } from "./pages/Roles/entidad/Edit-EstadoFactura/EditEstadoFacturas";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* Ruta de redirección por rol */}
        <Route exact path="/">
          <RoleRedirector />
        </Route>

        {/*        Rutas públicas con menú        */}

        {/* Manejo de rol por Administrador */}

        <Route exact path="/admin/home">
          <MainLayout pageName="Página Principal">
            <HomeScreen />
          </MainLayout>
        </Route>

        <Route exact path="/factura">
          <MainLayout pageName="Registro de Factura">
            <FacturaForm />
          </MainLayout>
        </Route>

        <Route exact path="/view-facturas-admin">
          <MainLayout pageName="visualizar Facturas">
            <ViewFacturasAdmin />
          </MainLayout>
        </Route>

        <Route exact path="/tipo-tributo">
          <MainLayout pageName="Tipo de Tributo">
            <TipoTributoForm />
          </MainLayout>
        </Route>
        <Route exact path="/view-tributos-admin">
          <MainLayout pageName="Visualizar Tributo">
            <ViewTiposTributo />
          </MainLayout>
        </Route>

        <Route exact path="/view-users">
          <MainLayout pageName="vista de usuarios">
            <ViewUsers />
          </MainLayout>
        </Route>

        <Route exact path="/users/edit/:id">
          <MainLayout pageName="vista de usuarios">
            <UserForm />
          </MainLayout>
        </Route>

        {/* Manejo de rol por entidad publica */}

        <Route exact path="/entidad_publica/home">
          <MainLayout pageName="Página Principal">
            <EntidadPublicaHomeScreen />
          </MainLayout>
        </Route>

        <Route exact path="/view-facturas">
          <MainLayout pageName="visualizar Facturas">
            <ViewFacturas />
          </MainLayout>
        </Route>

        <Route exact path="/view-contribuyentes">
          <MainLayout pageName="visualizar contribuyentes">
            <ViewContribuyentes />
          </MainLayout>
        </Route>

        <Route exact path="/view-facturas">
          <MainLayout pageName="Consulta Factura">
            <FacturasPage />
          </MainLayout>
        </Route>

        <Route exact path="/view-facturas/editar/:id">
          <MainLayout pageName="editar factura">
            <FacturaForm />
          </MainLayout>
        </Route>

        {/* Manejo de rol por Contributente */}

        <Route exact path="/contribuyente/home">
          <MainLayout pageName="Página Principal">
            <ContribuyenteHomeScreen />
          </MainLayout>
        </Route>

        <Route exact path="/factura-contribuyentes">
          <MainLayout pageName="Mis Facturas">
            <ViewFacturasContribuyente />
          </MainLayout>
        </Route>

        {/*        Rutas públicas (sin menú)        */}

        <Route exact path="/registro-usuario">
          <AuthLayout pageName="Registro de Usuario">
            <UserForm />
          </AuthLayout>
        </Route>

        <Route exact path="/verify-email">
          <AuthLayout pageName="Verificación de Email">
            <VerifyEmail />
          </AuthLayout>
        </Route>

        <Route exact path="/login">
          <AuthLayout pageName="Iniciar Sesión">
            <Login />
          </AuthLayout>
        </Route>

        {/* Redirección por defecto */}
        <Redirect to="/login" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
