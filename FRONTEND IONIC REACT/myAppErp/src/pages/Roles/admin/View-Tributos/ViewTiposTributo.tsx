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
  cash,
  calendar,
  arrowBack,
  refresh,
  create,
  trash,
  close,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./ViewTiposTributo.css";
import {
  TipoTributo,
  fetchTiposTributo,
  deleteTipoTributo,
} from "../../../../services/tipoTributo.service";

export function ViewTiposTributo() {
  const [tiposTributo, setTiposTributo] = useState<TipoTributo[]>([]);
  const [filteredTiposTributo, setFilteredTiposTributo] = useState<
    TipoTributo[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [selectedTipoTributo, setSelectedTipoTributo] =
    useState<TipoTributo | null>(null);
  const [present] = useIonToast();
  const [presentAlert] = useIonAlert();
  const history = useHistory();

  // Cargar tipos de tributo al montar el componente
  useEffect(() => {
    loadTiposTributo();
  }, []);

  const loadTiposTributo = async () => {
    try {
      setIsLoading(true);
      const tiposTributoData = await fetchTiposTributo();
      setTiposTributo(tiposTributoData);
      setFilteredTiposTributo(tiposTributoData);
    } catch (error: any) {
      present({
        message: error.message || "Error al cargar tipos de tributo",
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
    await loadTiposTributo();
    event.detail.complete();
  };

  // Función para buscar tipos de tributo
  const handleSearch = (event: CustomEvent) => {
    const query = event.detail.value?.toLowerCase() || "";
    setFilteredTiposTributo(
      tiposTributo.filter(
        (tipo) =>
          tipo.nombre.toLowerCase().includes(query) ||
          tipo.descripcion?.toLowerCase().includes(query) ||
          tipo.periodicidad.toLowerCase().includes(query)
      )
    );
  };

  // Formatear periodicidad con colores
  const formatPeriodicidad = (periodicidad: string) => {
    const periodicidades: Record<string, { color: string; text: string }> = {
      mensual: { color: "primary", text: "Mensual" },
      trimestral: { color: "secondary", text: "Trimestral" },
      semestral: { color: "tertiary", text: "Semestral" },
      anual: { color: "success", text: "Anual" },
    };

    const periodicidadInfo = periodicidades[periodicidad.toLowerCase()] || {
      color: "medium",
      text: periodicidad,
    };
    return (
      <IonBadge color={periodicidadInfo.color}>
        {periodicidadInfo.text}
      </IonBadge>
    );
  };

  // Formatear tarifa
  const formatTarifa = (value: number) => {
    return `${value}%`;
  };

  // Mostrar ActionSheet para acciones
  const showActions = (tipoTributo: TipoTributo) => {
    setSelectedTipoTributo(tipoTributo);
    setShowActionSheet(true);
  };

  // Editar tipo de tributo
  const handleEdit = (tipoTributo: TipoTributo) => {
    history.push(`/tipos-tributo/editar/${tipoTributo.id}`);
  };

  // Eliminar tipo de tributo
  const handleDelete = async (tipoTributo: TipoTributo) => {
    try {
      await presentAlert({
        header: "Confirmar eliminación",
        message: `¿Estás seguro de eliminar el tipo de tributo "${tipoTributo.nombre}"?`,
        buttons: [
          {
            text: "Cancelar",
            role: "cancel",
          },
          {
            text: "Eliminar",
            handler: async () => {
              await deleteTipoTributo(tipoTributo.id!);
              present({
                message: "Tipo de tributo eliminado con éxito",
                duration: 2000,
                color: "success",
              });
              loadTiposTributo();
            },
          },
        ],
      });
    } catch (error: any) {
      present({
        message: error.message || "Error al eliminar el tipo de tributo",
        duration: 3000,
        color: "danger",
      });
    }
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
          <IonTitle>Tipos de Tributo</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={loadTiposTributo}>
              <IonIcon icon={refresh} />
            </IonButton>
            <IonButton onClick={() => history.push("/tipos-tributo/nuevo")}>
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
          placeholder="Buscar por nombre, descripción o periodicidad..."
          debounce={500}
          onIonChange={handleSearch}
        />

        {isLoading ? (
          <IonLoading isOpen={true} message="Cargando tipos de tributo..." />
        ) : filteredTiposTributo.length === 0 ? (
          <div className="ion-text-center ion-padding">
            <IonText color="medium">No se encontraron tipos de tributo</IonText>
          </div>
        ) : (
          <IonList className="ion-margin">
            {filteredTiposTributo.map((tipoTributo) => (
              <IonCard
                key={tipoTributo.id}
                className="tipo-tributo-card"
                onClick={() => showActions(tipoTributo)}
              >
                <IonCardHeader>
                  <IonGrid>
                    <IonRow className="ion-align-items-center">
                      <IonCol size="auto">
                        <IonAvatar className="tipo-tributo-avatar">
                          <IonIcon
                            icon={documentText}
                            size="large"
                            color="primary"
                          />
                        </IonAvatar>
                      </IonCol>
                      <IonCol>
                        <IonCardTitle>{tipoTributo.nombre}</IonCardTitle>
                        <IonCardSubtitle>
                          <IonText color="medium">
                            {formatPeriodicidad(tipoTributo.periodicidad)}
                          </IonText>
                        </IonCardSubtitle>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardHeader>

                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <IonChip color="light">
                          <IonIcon icon={cash} color="primary" />
                          <IonLabel>
                            Tarifa: {formatTarifa(tipoTributo.tarifa)}
                          </IonLabel>
                        </IonChip>
                      </IonCol>
                    </IonRow>

                    {tipoTributo.descripcion && (
                      <IonRow>
                        <IonCol>
                          <IonText>
                            <p>{tipoTributo.descripcion}</p>
                          </IonText>
                        </IonCol>
                      </IonRow>
                    )}
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
        )}
      </IonContent>

      {/* Action Sheet para acciones */}
      <IonActionSheet
        isOpen={showActionSheet}
        onDidDismiss={() => setShowActionSheet(false)}
        header={`Opciones para ${selectedTipoTributo?.nombre}`}
        buttons={[
          {
            text: "Editar",
            icon: create,
            handler: () => {
              if (selectedTipoTributo) handleEdit(selectedTipoTributo);
            },
          },
          {
            text: "Eliminar",
            icon: trash,
            role: "destructive",
            handler: () => {
              if (selectedTipoTributo) handleDelete(selectedTipoTributo);
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
