import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonText,
  useIonToast,
  IonLoading,
  IonSearchbar,
  IonRefresher,
  IonRefresherContent,
  IonChip,
  IonAvatar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle,
} from "@ionic/react";
import {
  documentText,
  calendar,
  cash,
  arrowBack,
  refresh,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Factura, fetchFacturas } from "../../../../services/factura.service";
import "./ViewFacturasContribuyente.css";
import { getCurrentUser } from "../../../../services/role.service";

export function ViewFacturasContribuyente() {
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [filteredFacturas, setFilteredFacturas] = useState<Factura[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [present] = useIonToast();
  const history = useHistory();
  const currentUser = getCurrentUser();

  // Cargar facturas al montar el componente
  useEffect(() => {
    if (currentUser) {
      loadFacturas();
    } else {
      present({
        message: "Debe iniciar sesión para ver sus facturas",
        duration: 3000,
        position: "top",
        color: "danger",
      });
      history.push("/login");
    }
  }, []);

  const loadFacturas = async () => {
    try {
      setIsLoading(true);
      const facturasData = await fetchFacturas();

      // Filtrar facturas solo del usuario actual
      const facturasUsuario = facturasData.filter(
        (factura) => factura.user?.id === currentUser?.id
      );

      setFacturas(facturasUsuario);
      setFilteredFacturas(facturasUsuario);
    } catch (error: any) {
      present({
        message: error.message || "Error al cargar sus facturas",
        duration: 3000,
        position: "top",
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Función para manejar el refresco
  const handleRefresh = async (event: CustomEvent) => {
    await loadFacturas();
    event.detail.complete();
  };

  // Función para buscar facturas
  const handleSearch = (event: CustomEvent) => {
    const query = event.detail.value?.toLowerCase() || "";
    setFilteredFacturas(
      facturas.filter(
        (factura) =>
          factura.concepto.toLowerCase().includes(query) ||
          factura.periodo.toLowerCase().includes(query) ||
          factura.estado.toLowerCase().includes(query)
      )
    );
  };

  // Función para formatear el estado con colores
  const formatEstado = (estado: string) => {
    const estados: Record<string, { color: string; text: string }> = {
      pendiente: { color: "warning", text: "Pendiente" },
      pagada: { color: "success", text: "Pagada" },
      vencida: { color: "danger", text: "Vencida" },
      anulada: { color: "medium", text: "Anulada" },
    };

    const estadoInfo = estados[estado.toLowerCase()] || {
      color: "primary",
      text: estado,
    };
    return <IonBadge color={estadoInfo.color}>{estadoInfo.text}</IonBadge>;
  };

  // Función para formatear fecha
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  // Función para formatear moneda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>Mis Facturas</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={loadFacturas}>
              <IonIcon icon={refresh} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonSearchbar
          placeholder="Buscar mis facturas..."
          debounce={500}
          onIonChange={handleSearch}
        />

        {isLoading ? (
          <IonLoading isOpen={true} message="Cargando sus facturas..." />
        ) : filteredFacturas.length === 0 ? (
          <div className="ion-text-center ion-padding">
            <IonText color="medium">
              No se encontraron facturas a su nombre
            </IonText>
          </div>
        ) : (
          <IonList className="ion-margin">
            {filteredFacturas.map((factura) => (
              <IonCard key={factura.id} className="factura-card">
                <IonCardHeader>
                  <IonGrid>
                    <IonRow className="ion-align-items-center">
                      <IonCol size="auto">
                        <IonAvatar className="factura-avatar">
                          <IonIcon
                            icon={documentText}
                            size="large"
                            color="primary"
                          />
                        </IonAvatar>
                      </IonCol>
                      <IonCol>
                        <IonCardTitle>{factura.concepto}</IonCardTitle>
                        <IonCardSubtitle>
                          <IonText color="medium">
                            Periodo: {factura.periodo} •{" "}
                            {formatEstado(factura.estado)}
                          </IonText>
                        </IonCardSubtitle>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardHeader>

                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol size="6">
                        <IonChip color="light">
                          <IonIcon icon={calendar} color="primary" />
                          <IonLabel>
                            Emisión: {formatDate(factura.fechaEmision)}
                          </IonLabel>
                        </IonChip>
                      </IonCol>
                      <IonCol size="6">
                        <IonChip color="light">
                          <IonIcon icon={calendar} color="primary" />
                          <IonLabel>
                            Vencimiento: {formatDate(factura.fechaVencimiento)}
                          </IonLabel>
                        </IonChip>
                      </IonCol>
                    </IonRow>

                    <IonRow>
                      <IonCol size="6">
                        <IonChip color="light">
                          <IonIcon icon={cash} color="primary" />
                          <IonLabel>
                            Base: {formatCurrency(factura.baseCalculo)}
                          </IonLabel>
                        </IonChip>
                      </IonCol>
                      <IonCol size="6">
                        <IonChip color="light">
                          <IonIcon icon={cash} color="primary" />
                          <IonLabel>
                            Total: {formatCurrency(factura.valorEstimado || 0)}
                          </IonLabel>
                        </IonChip>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
}
