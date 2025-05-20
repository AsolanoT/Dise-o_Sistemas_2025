// src/pages/TipoTributo/TipoTributo.tsx
import {
  IonInput,
  IonButton,
  IonPage,
  IonContent,
  IonItem,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonText,
  IonModal,
  useIonToast,
  IonLabel,
  IonLoading,
} from "@ionic/react";
import { useHistory, useParams } from "react-router-dom";
import "./TipoTributoPage.css";
import { useState, useEffect } from "react";
import {
  cashOutline,
  checkmarkOutline,
  calendarOutline,
  documentTextOutline,
  informationCircleOutline,
} from "ionicons/icons";
import {
  createTipoTributo,
  updateTipoTributo,
  fetchTipoTributoById,
} from "../../../services/tipoTributoService";
import CustomHeader from "../../../components/CustomHeader/CustomHeader";

const periodicidades = [
  { value: "MENSUAL", label: "Mensual" },
  { value: "TRIMESTRAL", label: "Trimestral" },
  { value: "SEMESTRAL", label: "Semestral" },
  { value: "ANUAL", label: "Anual" },
  { value: "OCASIONAL", label: "Ocasional" },
];

export function TipoTributoPage() {
  const history = useHistory();
  const { id } = useParams<{ id?: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(!!id);
  const [present] = useIonToast();
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form state
  const [formData, setFormData] = useState({
    status: true,
    nombre: "",
    descripcion: "",
    tarifa: 0,
    periodicidad: "MENSUAL",
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    } else if (formData.nombre.length > 100) {
      newErrors.nombre = "Máximo 100 caracteres";
    }

    if (formData.descripcion.length > 255) {
      newErrors.descripcion = "Máximo 255 caracteres";
    }

    if (formData.tarifa === null || formData.tarifa === undefined) {
      newErrors.tarifa = "La tarifa es requerida";
    } else if (formData.tarifa < 0) {
      newErrors.tarifa = "La tarifa no puede ser negativa";
    } else if (formData.tarifa > 100) {
      newErrors.tarifa = "La tarifa no puede ser mayor a 100%";
    }

    if (!formData.periodicidad) {
      newErrors.periodicidad = "La periodicidad es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      present({
        message: "Por favor corrija los errores en el formulario",
        duration: 3000,
        position: "top",
        color: "danger",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (id) {
        await updateTipoTributo(parseInt(id), formData);
        present({
          message: "Tipo de tributo actualizado correctamente",
          duration: 3000,
          position: "top",
          color: "success",
        });
      } else {
        await createTipoTributo(formData);
        present({
          message: "Tipo de tributo creado correctamente",
          duration: 3000,
          position: "top",
          color: "success",
        });
      }

      setShowSuccessModal(true);
    } catch (error: any) {
      present({
        message: error.message || "Error al procesar la solicitud",
        duration: 5000,
        position: "top",
        color: "danger",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when field changes
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  useEffect(() => {
    if (id) {
      const loadTipoTributoData = async () => {
        try {
          const tipoTributoData = await fetchTipoTributoById(parseInt(id));
          setFormData({
            status: tipoTributoData.status ?? true,
            nombre: tipoTributoData.nombre,
            descripcion: tipoTributoData.descripcion,
            tarifa: tipoTributoData.tarifa,
            periodicidad: tipoTributoData.periodicidad,
          });
        } catch (error) {
          present({
            message: "Error al cargar los datos del tipo de tributo",
            duration: 3000,
            position: "top",
            color: "danger",
          });
          history.push("/tipos-tributo");
        } finally {
          setIsLoading(false);
        }
      };

      loadTipoTributoData();
    }
  }, [id]);

  return (
    <IonPage>
      <CustomHeader
        pageName={id ? "Editar Tipo de Tributo" : "Nuevo Tipo de Tributo"}
        showMenuButton={true}
        showLogoutButton={true}
      />

      <IonContent class="tipo-tributo-registration ion-padding">
        <form onSubmit={handleSubmit} className="user-form">
          <h2 className="form-title">
            {id ? "Editar Tipo de Tributo" : "Registro de Tipo de Tributo"}
          </h2>

          <IonLoading isOpen={isLoading} message="Cargando datos..." />

          {/* Nombre */}
          <IonItem className="custom-item">
            <IonIcon
              icon={documentTextOutline}
              slot="start"
              className="custom-icon"
            />
            <IonLabel>Nombre</IonLabel>
          </IonItem>
          <IonInput
            value={formData.nombre}
            placeholder="Ingrese el nombre del tributo"
            onIonChange={(e) => handleInputChange("nombre", e.detail.value)}
          />
          {errors.nombre && (
            <IonText className="error">{errors.nombre}</IonText>
          )}

          {/* Descripción */}
          <IonItem className="custom-item">
            <IonIcon
              icon={informationCircleOutline}
              slot="start"
              className="custom-icon"
            />
            <IonLabel>Descripción</IonLabel>
          </IonItem>
          <IonTextarea
            value={formData.descripcion}
            placeholder="Ingrese una descripción del tributo"
            rows={3}
            onIonChange={(e) =>
              handleInputChange("descripcion", e.detail.value)
            }
          />
          {errors.descripcion && (
            <IonText className="error">{errors.descripcion}</IonText>
          )}

          {/* Tarifa */}
          <IonItem className="custom-item">
            <IonIcon icon={cashOutline} slot="start" className="custom-icon" />
            <IonLabel>Tarifa (%)</IonLabel>
          </IonItem>
          <IonInput
            type="number"
            value={formData.tarifa}
            placeholder="Ingrese la tarifa porcentual"
            onIonChange={(e) =>
              handleInputChange(
                "tarifa",
                e.detail.value ? parseFloat(e.detail.value) : 0
              )
            }
          />
          {errors.tarifa && (
            <IonText className="error">{errors.tarifa}</IonText>
          )}

          {/* Periodicidad */}
          <IonItem className="custom-item">
            <IonIcon
              icon={calendarOutline}
              slot="start"
              className="custom-icon"
            />
            <IonLabel position="stacked">Periodicidad</IonLabel>
            <IonSelect
              interface="alert"
              placeholder="Seleccione la periodicidad"
              value={formData.periodicidad}
              onIonChange={(e) =>
                handleInputChange("periodicidad", e.detail.value)
              }
            >
              {periodicidades.map((period) => (
                <IonSelectOption key={period.value} value={period.value}>
                  {period.label}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          {errors.periodicidad && (
            <IonText className="error">{errors.periodicidad}</IonText>
          )}

          {/* Botones de acción */}
          <div className="button-row">
            <IonButton
              expand="block"
              fill="outline"
              onClick={() => history.goBack()}
              disabled={isSubmitting}
            >
              Cancelar
            </IonButton>

            <IonButton
              expand="block"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Procesando..."
                : id
                ? "Actualizar Tributo"
                : "Registrar Tributo"}
            </IonButton>
          </div>
        </form>
      </IonContent>

      {/* Modal de éxito */}
      <IonModal isOpen={showSuccessModal} className="success-modal">
        <div className="modal-content">
          <IonIcon
            icon={checkmarkOutline}
            color="success"
            style={{ fontSize: "3rem", marginBottom: "16px" }}
          />
          <h2 className="modal-title">
            {id ? "¡Actualización exitosa!" : "¡Registro exitoso!"}
          </h2>
          <p className="modal-message">
            {id
              ? "El tipo de tributo ha sido actualizado correctamente."
              : "El tipo de tributo ha sido registrado correctamente."}
          </p>
          <div className="modal-buttons">
            <IonButton
              expand="block"
              onClick={() => {
                setShowSuccessModal(false);
                history.push("/tipos-tributo");
              }}
            >
              Aceptar
            </IonButton>
          </div>
        </div>
      </IonModal>
    </IonPage>
  );
}
