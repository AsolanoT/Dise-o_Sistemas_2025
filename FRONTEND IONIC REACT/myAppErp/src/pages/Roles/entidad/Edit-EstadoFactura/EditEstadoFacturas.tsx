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
  IonSelect,
  IonSelectOption,
  IonAlert
} from "@ionic/react";
import {
  documentText,
  calendar,
  cash,
  arrowBack,
  refresh,
  save
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./EditEstadoFacturas.css";
import { Factura, fetchFacturas, updateFactura } from "../../../../services/factura.service";

export function EditEstadoFacturas() {
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [filteredFacturas, setFilteredFacturas] = useState<Factura[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [present] = useIonToast();
  const [showAlert, setShowAlert] = useState(false);
  const [facturaToUpdate, setFacturaToUpdate] = useState<Factura | null>(null);
  const [selectedEstado, setSelectedEstado] = useState("");
  const history = useHistory();

  // Estados posibles para las facturas
  const estadosPermitidos = [
    { value: "pendiente", label: "Pendiente" },
    { value: "pagada", label: "Pagada" },
    { value: "vencida", label: "Vencida" },
  ];

  // Cargar facturas al montar el componente
  useEffect(() => {
    loadFacturas();
  }, []);

  const loadFacturas = async () => {
    try {
      setIsLoading(true);
      const facturasData = await fetchFacturas();
      
      // Validación exhaustiva de facturas
      const validFacturas = facturasData
        .filter(factura => factura !== null && factura !== undefined)
        .filter(factura => factura.id !== null && factura.id !== undefined)
        .filter(factura => factura.status !== false);

      setFacturas(validFacturas);
      setFilteredFacturas(validFacturas);
    } catch (error: any) {
      present({
        message: error.message || "Error al cargar facturas",
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

  // Función para buscar facturas con validación
  const handleSearch = (event: CustomEvent) => {
    const query = event.detail.value?.toLowerCase() || "";
    setFilteredFacturas(
      facturas.filter(factura => {
        if (!factura) return false;
        return (
          (factura.concepto?.toLowerCase() || '').includes(query) ||
          (factura.periodo?.toLowerCase() || '').includes(query) ||
          (factura.estado?.toLowerCase() || '').includes(query)
        );
      })
    );
  };

  // Función para formatear el estado con colores
  const formatEstado = (estado?: string) => {
    if (!estado) return <IonBadge color="medium">Sin estado</IonBadge>;
    
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

  // Función para formatear fecha con validación
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Fecha no disponible";
    try {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      return new Date(dateString).toLocaleDateString("es-ES", options);
    } catch {
      return dateString;
    }
  };

  // Función para formatear moneda con validación
  const formatCurrency = (value?: number) => {
    if (value === undefined || value === null) return "$0";
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Función para preparar la actualización con validación
  const handleUpdateEstado = (factura: Factura | null) => {
    if (!factura || factura.id === null || factura.id === undefined) {
      present({
        message: "Factura no válida para actualizar",
        duration: 3000,
        position: "top",
        color: "danger",
      });
      return;
    }
    setFacturaToUpdate(factura);
    setSelectedEstado(factura.estado || "pendiente");
    setShowAlert(true);
  };

  // Función para confirmar y guardar el cambio de estado
  const confirmUpdateEstado = async () => {
    if (!facturaToUpdate || facturaToUpdate.id === undefined || facturaToUpdate.id === null || !selectedEstado) {
      present({
        message: "Datos incompletos para actualizar",
        duration: 3000,
        position: "top",
        color: "danger",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // Asegurar que el ID es un número válido
      const facturaId = Number(facturaToUpdate.id);
      if (isNaN(facturaId)) {
        throw new Error("ID de factura inválido");
      }

      // Crear objeto de actualización con tipos explícitos
      const updateData: Partial<Factura> = {
        ...facturaToUpdate,
        estado: selectedEstado
      };

      const updatedFactura = await updateFactura(facturaId, updateData);

      // Actualización segura del estado
      setFacturas(prev => prev.map(f => 
        f && f.id === updatedFactura.id ? updatedFactura : f
      ));
      setFilteredFacturas(prev => prev.map(f => 
        f && f.id === updatedFactura.id ? updatedFactura : f
      ));

      present({
        message: "Estado actualizado correctamente",
        duration: 3000,
        position: "top",
        color: "success",
      });
    } catch (error: any) {
      present({
        message: error.message || "Error al actualizar",
        duration: 3000,
        position: "top",
        color: "danger",
      });
    } finally {
      setIsLoading(false);
      setShowAlert(false);
      setFacturaToUpdate(null);
      setSelectedEstado("");
    }
  };

  // Función para renderizar las facturas de manera segura
  const renderFacturas = () => {
    if (!filteredFacturas || filteredFacturas.length === 0) {
      return (
        <div className="ion-text-center ion-padding">
          <IonText color="medium">No se encontraron facturas</IonText>
        </div>
      );
    }

    return (
      <IonList className="ion-margin">
        {filteredFacturas
          .filter(factura => factura && factura.id !== null && factura.id !== undefined)
          .map((factura) => (
            <IonCard key={`factura-${factura.id}`} className="factura-card">
              <IonCardHeader>
                <IonGrid>
                  <IonRow className="ion-align-items-center">
                    <IonCol size="auto">
                      <IonAvatar className="factura-avatar">
                        <IonIcon icon={documentText} size="large" color="primary" />
                      </IonAvatar>
                    </IonCol>
                    <IonCol>
                      <IonCardTitle>{factura.concepto || "Sin concepto"}</IonCardTitle>
                      <IonCardSubtitle>
                        <IonText color="medium">
                          Periodo: {factura.periodo || "Sin periodo"} •{" "}
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
                          Total: {formatCurrency(factura.valorEstimado)}
                        </IonLabel>
                      </IonChip>
                    </IonCol>
                  </IonRow>

                  <IonRow>
                    <IonCol>
                      <IonButton
                        expand="block"
                        color="primary"
                        onClick={() => handleUpdateEstado(factura)}
                      >
                        <IonIcon icon={save} slot="start" />
                        Cambiar Estado
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          ))}
      </IonList>
    );
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
          <IonTitle>Editar Estados de Facturas</IonTitle>
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
          placeholder="Buscar facturas..."
          debounce={500}
          onIonChange={handleSearch}
        />

        {isLoading ? (
          <IonLoading isOpen={true} message="Cargando facturas..." />
        ) : (
          renderFacturas()
        )}
      </IonContent>

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={`Cambiar estado de factura`}
        subHeader={`Factura: ${facturaToUpdate?.concepto || 'Sin concepto'}`}
        message="Seleccione el nuevo estado para esta factura:"
        inputs={estadosPermitidos.map(estado => ({
          type: 'radio',
          label: estado.label,
          value: estado.value,
          checked: selectedEstado === estado.value
        }))}
        buttons={[
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              setShowAlert(false);
              setFacturaToUpdate(null);
            }
          },
          {
            text: 'Guardar',
            handler: (value) => {
              setSelectedEstado(value);
              confirmUpdateEstado();
            }
          }
        ]}
      />
    </IonPage>
  );
}