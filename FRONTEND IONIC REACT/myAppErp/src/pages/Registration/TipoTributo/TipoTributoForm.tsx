import {
  IonInput,
  IonButton,
  IonPage,
  IonContent,
  IonItem,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonLabel,
  useIonToast,
  IonText,
  IonLoading,
} from "@ionic/react";
import "./TipoTributoForm.css";
import { useFormik } from "formik";
import { useHistory, useParams } from "react-router-dom";
import {
  documentTextOutline,
  cashOutline,
  calendarOutline,
  saveOutline,
  arrowBackOutline,
} from "ionicons/icons";
import { useState, useEffect } from "react";
import { initialValues, validationSchema } from "./tipoTributo.form";
import {
  createTipoTributo,
  updateTipoTributo,
  getTipoTributoById,
} from "../../../services/tipoTributo.service";
import CustomHeader from "../../../components/CustomHeader/CustomHeader";

export function TipoTributoForm() {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [present] = useIonToast();
  const [isLoading, setIsLoading] = useState(!!id);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setErrorMessage(null);

      try {
        if (id) {
          // Modo edición
          await updateTipoTributo(parseInt(id), values);
          present({
            message: "Tipo de tributo actualizado correctamente",
            duration: 3000,
            position: "top",
            color: "success",
          });
        } else {
          // Modo creación
          await createTipoTributo({ ...values, status: true });
          present({
            message: "Tipo de tributo creado correctamente",
            duration: 3000,
            position: "top",
            color: "success",
          });
        }

        history.push("/tipos-tributo");
      } catch (error: any) {
        const message = error.message || "Error al guardar el tipo de tributo";
        setErrorMessage(message);
        present({
          message,
          duration: 5000,
          position: "top",
          color: "danger",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (id) {
      const loadTipoTributoData = async () => {
        try {
          const tipoTributoData = await getTipoTributoById(parseInt(id));
          formik.setValues({
            nombre: tipoTributoData.nombre,
            descripcion: tipoTributoData.descripcion || "",
            tarifa: tipoTributoData.tarifa,
            periodicidad: tipoTributoData.periodicidad,
          });
        } catch (error: any) {
          present({
            message:
              error.message || "Error al cargar los datos del tipo de tributo",
            duration: 5000,
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

  if (isLoading) {
    return <IonLoading isOpen={true} message="Cargando datos..." />;
  }

  return (
    <IonPage>
      <CustomHeader
        pageName={id ? "Editar Tipo de Tributo" : "Nuevo Tipo de Tributo"}
        showMenuButton={false}
        showLogoutButton={false}
      />

      <IonContent className="ion-padding">
        <form className="tipo-tributo-form">
          <h2 style={{ color: "blue", textAlign: "center" }}>
            {id ? "Editar Tipo de Tributo" : "Nuevo Tipo de Tributo"}
          </h2>

          {/* Nombre */}
          <IonItem className="custom-item">
            <IonIcon
              icon={documentTextOutline}
              slot="start"
              className="custom-icon"
            />
            <IonLabel position="stacked">Nombre</IonLabel>
            <IonInput
              value={formik.values.nombre}
              onIonChange={(e) =>
                formik.setFieldValue("nombre", e.detail.value)
              }
              placeholder="Ingrese el nombre"
            />
          </IonItem>
          {formik.errors.nombre && (
            <IonText color="danger" className="ion-padding-start">
              <small>{formik.errors.nombre}</small>
            </IonText>
          )}

          {/* Descripción */}
          <IonItem className="custom-item">
            <IonIcon
              icon={documentTextOutline}
              slot="start"
              className="custom-icon"
            />
            <IonLabel position="stacked">Descripción (Opcional)</IonLabel>
            <IonInput
              value={formik.values.descripcion}
              onIonChange={(e) =>
                formik.setFieldValue("descripcion", e.detail.value)
              }
              placeholder="Ingrese una descripción"
            />
          </IonItem>
          {formik.errors.descripcion && (
            <IonText color="danger" className="ion-padding-start">
              <small>{formik.errors.descripcion}</small>
            </IonText>
          )}

          {/* Tarifa */}
          <IonItem className="custom-item">
            <IonIcon icon={cashOutline} slot="start" className="custom-icon" />
            <IonLabel position="stacked">Tarifa</IonLabel>
            <IonInput
              type="number"
              value={formik.values.tarifa}
              onIonChange={(e) =>
                formik.setFieldValue(
                  "tarifa",
                  parseFloat(e.detail.value || "0")
                )
              }
              placeholder="Ingrese la tarifa"
            />
          </IonItem>
          {formik.errors.tarifa && (
            <IonText color="danger" className="ion-padding-start">
              <small>{formik.errors.tarifa}</small>
            </IonText>
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
              value={formik.values.periodicidad}
              onIonChange={(e) =>
                formik.setFieldValue("periodicidad", e.detail.value)
              }
              placeholder="Seleccione periodicidad"
            >
              <IonSelectOption value="MENSUAL">Mensual</IonSelectOption>
              <IonSelectOption value="TRIMESTRAL">Trimestral</IonSelectOption>
              <IonSelectOption value="SEMESTRAL">Semestral</IonSelectOption>
              <IonSelectOption value="ANUAL">Anual</IonSelectOption>
            </IonSelect>
          </IonItem>
          {formik.errors.periodicidad && (
            <IonText color="danger" className="ion-padding-start">
              <small>{formik.errors.periodicidad}</small>
            </IonText>
          )}

          {/* Mensaje de error general */}
          {errorMessage && (
            <IonText color="danger" className="ion-padding">
              <p>{errorMessage}</p>
            </IonText>
          )}

          {/* Botones de acción */}
          <div className="button-row">
            <IonButton
              expand="block"
              fill="outline"
              onClick={() => history.goBack()}
              disabled={isSubmitting}
            >
              <IonIcon icon={arrowBackOutline} slot="start" />
              Cancelar
            </IonButton>

            <IonButton
              expand="block"
              onClick={() => formik.handleSubmit()}
              disabled={isSubmitting}
            >
              <IonIcon icon={saveOutline} slot="start" />
              {isSubmitting ? "Guardando..." : "Guardar"}
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
}
