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
  useIonAlert,
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
  IonActionSheet,
} from "@ionic/react";
import {
  documentText,
  calendar,
  cash,
  arrowBack,
  refresh,
  create,
  trash,
  close,
  person,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./ViewFacturas.css";
import {
  Factura,
  fetchFacturas,
  deleteFactura,
  fetchFacturasByUser,
} from "../../../../services/factura.service";
import { fetchUsers } from "../../../../services/auth.service";

export function ViewFacturasAdmin() {
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [filteredFacturas, setFilteredFacturas] = useState<Factura[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [selectedFactura, setSelectedFactura] = useState<Factura | null>(null);
  const [present] = useIonToast();
  const [presentAlert] = useIonAlert();
  const history = useHistory();

  // Cargar facturas y usuarios al montar el componente
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [facturasData, usersData] = await Promise.all([
        fetchFacturas(),
        fetchUsers(),
      ]);

      setFacturas(facturasData);
      setFilteredFacturas(facturasData);
      setUsers(usersData);
    } catch (error: any) {
      present({
        message: error.message || "Error al cargar datos",
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
    await loadData();
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
          factura.estado.toLowerCase().includes(query) ||
          getUserName(factura.user.id).toLowerCase().includes(query)
      )
    );
  };

  // Obtener nombre del usuario
  const getUserName = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.nombre : "Usuario desconocido";
  };

  // Obtener detalles del contribuyente
  const getUserDetails = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return null;

    return {
      nombre: user.nombre,
      documento: `${user.documentType} ${user.documentNumber}`,
      email: user.email,
      telefono: user.phone,
      role: user.role,
    };
  };

  // Formatear el estado con colores
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

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  // Formatear moneda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Mostrar ActionSheet para acciones
  const showActions = (factura: Factura) => {
    setSelectedFactura(factura);
    setShowActionSheet(true);
  };

  // Editar factura
  const handleEdit = (factura: Factura) => {
    history.push(`/facturas/editar/${factura.id}`);
  };

  // Eliminar factura
  const handleDelete = async (factura: Factura) => {
    try {
      await presentAlert({
        header: "Confirmar eliminación",
        message: `¿Estás seguro de eliminar la factura "${factura.concepto}"?`,
        buttons: [
          {
            text: "Cancelar",
            role: "cancel",
          },
          {
            text: "Eliminar",
            handler: async () => {
              await deleteFactura(factura.id!);
              present({
                message: "Factura eliminada con éxito",
                duration: 2000,
                color: "success",
              });
              loadData();
            },
          },
        ],
      });
    } catch (error: any) {
      present({
        message: error.message || "Error al eliminar la factura",
        duration: 3000,
        color: "danger",
      });
    }
  };

  // Ver facturas por usuario
  const viewUserInvoices = (userId: number) => {
    history.push(`/facturas/usuario/${userId}`);
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
          <IonTitle>Facturas</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={loadData}>
              <IonIcon icon={refresh} />
            </IonButton>
            <IonButton onClick={() => history.push("/facturas/nueva")}>
              <IonIcon icon={create} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonSearchbar
          placeholder="Buscar por concepto, período, estado o contribuyente..."
          debounce={500}
          onIonChange={handleSearch}
        />

        {isLoading ? (
          <IonLoading isOpen={true} message="Cargando facturas..." />
        ) : filteredFacturas.length === 0 ? (
          <div className="ion-text-center ion-padding">
            <IonText color="medium">No se encontraron facturas</IonText>
          </div>
        ) : (
          <IonList className="ion-margin">
            {filteredFacturas.map((factura) => {
              const userDetails = getUserDetails(factura.user.id);

              return (
                <IonCard
                  key={factura.id}
                  className="factura-card"
                  onClick={() => showActions(factura)}
                >
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
                      {/* Información del contribuyente */}
                      {userDetails && (
                        <IonRow>
                          <IonCol>
                            <IonChip
                              color="light"
                              onClick={(e) => {
                                e.stopPropagation();
                                viewUserInvoices(factura.user.id);
                              }}
                            >
                              <IonIcon icon={person} color="primary" />
                              <IonLabel>
                                {userDetails.nombre} ({userDetails.documento})
                              </IonLabel>
                            </IonChip>
                          </IonCol>
                        </IonRow>
                      )}

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
                              Vencimiento:{" "}
                              {formatDate(factura.fechaVencimiento)}
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
                              Total:{" "}
                              {formatCurrency(factura.valorEstimado || 0)}
                            </IonLabel>
                          </IonChip>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              );
            })}
          </IonList>
        )}
      </IonContent>

      {/* Action Sheet para acciones */}
      <IonActionSheet
        isOpen={showActionSheet}
        onDidDismiss={() => setShowActionSheet(false)}
        header={`Opciones para factura ${selectedFactura?.concepto}`}
        buttons={[
          {
            text: "Editar",
            icon: create,
            handler: () => {
              if (selectedFactura) handleEdit(selectedFactura);
            },
          },
          {
            text: "Eliminar",
            icon: trash,
            role: "destructive",
            handler: () => {
              if (selectedFactura) handleDelete(selectedFactura);
            },
          },
          {
            text: "Ver facturas del contribuyente",
            icon: person,
            handler: () => {
              if (selectedFactura) viewUserInvoices(selectedFactura.user.id);
            },
          },
          {
            text: "Cancelar",
            icon: close,
            role: "cancel",
          },
        ]}
      />
    </IonPage>
  );
}
