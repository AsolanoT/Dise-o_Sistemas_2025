import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonList,
  IonRefresher,
  IonRefresherContent,
  useIonToast,
  IonButton,
  IonIcon,
  useIonAlert,
  IonLoading,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonText,
  IonBadge,
  IonItem,
} from "@ionic/react";
import {
  addOutline,
  calendarOutline,
  documentTextOutline,
  cashOutline,
} from "ionicons/icons";
import { RefresherEventDetail } from "@ionic/core";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./EditEstadoFacturas.css";
import CustomHeader from "../../../../components/CustomHeader/CustomHeader";
import {
  Factura,
  fetchFacturas,
  deleteFactura,
} from "../../../../services/factura.service";

export const FacturasPage: React.FC = () => {
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [filteredFacturas, setFilteredFacturas] = useState<Factura[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [present] = useIonToast();
  const [presentAlert] = useIonAlert();
  const history = useHistory();

  const loadFacturas = async () => {
    try {
      setLoading(true);
      const data = await fetchFacturas();
      setFacturas(data);
      applyFilters(data, searchTerm, statusFilter);
    } catch (error) {
      console.error("Error loading invoices:", error);
      present({
        message: "Error al cargar las facturas",
        duration: 2000,
        position: "top",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (data: Factura[], term: string, status: string) => {
    let filtered = data;

    // Filtrar por término de búsqueda
    if (term.trim() !== "") {
      filtered = filtered.filter(
        (factura) =>
          factura.id?.toString().includes(term) ||
          factura.concepto?.toLowerCase().includes(term.toLowerCase()) ||
          factura.periodo?.toLowerCase().includes(term.toLowerCase()) ||
          factura.user?.id.toString().includes(term) ||
          factura.estado?.toLowerCase().includes(term.toLowerCase())
      );
    }

    // Filtrar por estado
    if (status !== "all") {
      filtered = filtered.filter(
        (factura) => factura.estado.toLowerCase() === status.toLowerCase()
      );
    }

    setFilteredFacturas(filtered);
  };

  useEffect(() => {
    loadFacturas();
  }, []);

  useEffect(() => {
    applyFilters(facturas, searchTerm, statusFilter);
  }, [searchTerm, statusFilter, facturas]);

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    loadFacturas().then(() => {
      event.detail.complete();
      present({
        message: "Facturas actualizadas",
        duration: 1500,
        position: "top",
      });
    });
  };

  const handleEdit = (id: number) => {
    if (!id) {
      present({
        message: "ID de factura no válido",
        duration: 2000,
        position: "top",
        color: "danger",
      });
      return;
    }
    history.push(`/view-facturas/editar/${id}`);
  };

  const handleDelete = (id: number) => {
    presentAlert({
      header: "Confirmar eliminación",
      message: "¿Estás seguro de que deseas eliminar esta factura?",
      buttons: [
        { text: "Cancelar", role: "cancel" },
        {
          text: "Eliminar",
          handler: async () => {
            try {
              await deleteFactura(id);
              await loadFacturas();
              present({
                message: "Factura eliminada correctamente",
                duration: 2000,
                position: "top",
                color: "success",
              });
            } catch (error) {
              present({
                message: "Error al eliminar la factura",
                duration: 2000,
                position: "top",
                color: "danger",
              });
            }
          },
        },
      ],
    });
  };

  const getEstadoColor = (estado: string) => {
    switch (estado?.toLowerCase()) {
      case "pagado":
        return "success";
      case "pendiente":
        return "warning";
      case "vencido":
        return "danger";
      default:
        return "medium";
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  // Estados únicos para los filtros
  const estadosUnicos = Array.from(new Set(facturas.map((f) => f.estado)));

  return (
    <IonPage>
      <CustomHeader
        pageName="Todas las Facturas"
        showMenuButton={false}
        showLogoutButton={true}
      />
      <IonHeader>
        <IonToolbar>
          <IonSearchbar
            value={searchTerm}
            onIonChange={(e) => setSearchTerm(e.detail.value || "")}
            placeholder="Buscar por ID, concepto, período o usuario"
            debounce={300}
          />
        </IonToolbar>
        <IonToolbar>
          <IonSegment
            value={statusFilter}
            onIonChange={(e) => setStatusFilter(e.detail.value as string)}
            scrollable
          >
            <IonSegmentButton value="all">
              <IonLabel>Todas</IonLabel>
            </IonSegmentButton>
            {estadosUnicos.map((estado) => (
              <IonSegmentButton key={estado} value={estado}>
                <IonLabel>{estado}</IonLabel>
              </IonSegmentButton>
            ))}
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonLoading isOpen={loading} message="Cargando facturas..." />

        {!loading && filteredFacturas.length === 0 ? (
          <div className="empty-state">
            <p>
              {searchTerm || statusFilter !== "all"
                ? "No se encontraron facturas que coincidan con los filtros"
                : "No hay facturas registradas"}
            </p>
            <IonButton
              fill="solid"
              color="primary"
              onClick={() => history.push("/facturas/crear")}
            >
              Crear nueva factura
            </IonButton>
          </div>
        ) : (
          <IonList className="facturas-list">
            {filteredFacturas.map((factura) => (
              <IonItem
                key={factura.id}
                className="factura-item"
                detail
                onClick={() => handleEdit(factura.id!)}
              >
                <div className="factura-content">
                  <div className="factura-header">
                    <IonLabel>
                      <h2>
                        <IonIcon icon={documentTextOutline} color="primary" />
                        Factura #{factura.id}
                      </h2>
                      <p>
                        <IonIcon icon={cashOutline} />
                        Base: ${factura.baseCalculo.toFixed(2)}
                        {factura.valorEstimado &&
                          ` | Estimado: $${factura.valorEstimado.toFixed(2)}`}
                      </p>
                    </IonLabel>
                    <IonBadge color={getEstadoColor(factura.estado)}>
                      {factura.estado}
                    </IonBadge>
                  </div>

                  <div className="factura-details">
                    <div className="factura-detail">
                      <IonIcon icon={calendarOutline} />
                      <IonText>
                        <p>Emisión: {formatDate(factura.fechaEmision)}</p>
                        <p>
                          Vencimiento: {formatDate(factura.fechaVencimiento)}
                        </p>
                      </IonText>
                    </div>
                    <div className="factura-meta">
                      <p>
                        <strong>Usuario:</strong> #{factura.user.id}
                      </p>
                      <p>
                        <strong>Período:</strong> {factura.periodo}
                      </p>
                      <p>
                        <strong>Concepto:</strong> {factura.concepto}
                      </p>
                    </div>
                  </div>
                </div>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};
