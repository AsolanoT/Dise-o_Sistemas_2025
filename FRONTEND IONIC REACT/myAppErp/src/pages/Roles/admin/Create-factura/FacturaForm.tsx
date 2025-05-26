import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  IonText,
  IonModal,
  IonDatetime,
  IonButtons,
  useIonToast,
} from "@ionic/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./FacturaForm.css";
import {
  personOutline,
  documentTextOutline,
  calendarOutline,
  cashOutline,
  arrowBackOutline,
  saveOutline,
} from "ionicons/icons";
import { useHistory, useParams } from "react-router-dom";
import { fetchUsers } from "../../../../services/auth.service";
import {
  fetchTiposTributo,
  TipoTributo,
} from "../../../../services/tipoTributo.service";
import CustomHeader from "../../../../components/CustomHeader/CustomHeader";
import {
  createFactura,
  updateFactura,
  getFacturaById,
  Factura as IFactura,
} from "../../../../services/factura.service";

interface User {
  id: string;
  nombre: string;
  email: string;
  role: string;
}

interface FacturaFormValues {
  status: boolean;
  user: {
    id: string;
  };
  tipoTributo: {
    id: number;
  };
  periodo: string;
  baseCalculo: number;
  estado: string;
  concepto: string;
  fechaEmision: string;
  fechaVencimiento: string;
}

const FacturaForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const history = useHistory();
  const [present] = useIonToast();
  const [users, setUsers] = useState<User[]>([]);
  const [tiposTributo, setTiposTributo] = useState<TipoTributo[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDatePickerEmision, setShowDatePickerEmision] = useState(false);
  const [showDatePickerVencimiento, setShowDatePickerVencimiento] =
    useState(false);

  // Validación del formulario
  const validationSchema = Yup.object().shape({
    user: Yup.object().shape({
      id: Yup.string().required("Seleccione un usuario"),
    }),
    tipoTributo: Yup.object().shape({
      id: Yup.number().required("Seleccione un tipo de tributo"),
    }),
    periodo: Yup.string()
      .matches(/^\d{4}-\d{2}$/, "Formato de periodo inválido (YYYY-MM)")
      .required("El periodo es requerido"),
    baseCalculo: Yup.number()
      .min(0, "La base de cálculo no puede ser negativa")
      .required("La base de cálculo es requerida"),
    estado: Yup.string().required("Seleccione un estado"),
    concepto: Yup.string().required("El concepto es requerido"),
    fechaEmision: Yup.string().required("La fecha de emisión es requerida"),
    fechaVencimiento: Yup.string().required(
      "La fecha de vencimiento es requerida"
    ),
  });

  // Valores iniciales del formulario
  const initialValues: FacturaFormValues = {
    status: true,
    user: {
      id: "",
    },
    tipoTributo: {
      id: 0,
    },
    periodo: "",
    baseCalculo: 0,
    estado: "",
    concepto: "",
    fechaEmision: "",
    fechaVencimiento: "",
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (values: FacturaFormValues) => {
    try {
      setErrorMessage("");

      // Preparar los datos para enviar al backend
      const facturaData: Omit<IFactura, "id"> = {
        status: true,
        user: {
          id: parseInt(values.user.id), // Convertir a número si es necesario
        },
        tipoTributo: {
          id: values.tipoTributo.id,
        },
        periodo: values.periodo,
        baseCalculo: values.baseCalculo,
        estado: values.estado,
        concepto: values.concepto,
        fechaEmision: values.fechaEmision,
        fechaVencimiento: values.fechaVencimiento,
      };

      if (id) {
        // Modo edición
        await updateFactura(parseInt(id), facturaData);
        present({
          message: "Factura actualizada con éxito",
          duration: 2000,
          color: "success",
        });
      } else {
        // Modo creación
        await createFactura(facturaData);
        present({
          message: "Factura creada con éxito",
          duration: 2000,
          color: "success",
        });
      }

      // Redirigir después de guardar
      history.push("/facturas");
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Error al guardar la factura";
      setErrorMessage(errorMsg);
      console.error("Error al guardar la factura:", error);

      present({
        message: errorMsg,
        duration: 3000,
        color: "danger",
      });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  // Cargar datos iniciales
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);

        // Cargar usuarios
        const usuarios = await fetchUsers();
        setUsers(usuarios);

        // Cargar tipos de tributo
        const tributos = await fetchTiposTributo();
        setTiposTributo(tributos);

        // Si estamos editando, cargar los datos de la factura
        if (id) {
          const factura = await getFacturaById(parseInt(id));

          formik.setValues({
            status: factura.status,
            user: { id: factura.user.id.toString() },
            tipoTributo: { id: factura.tipoTributo.id },
            periodo: factura.periodo,
            baseCalculo: factura.baseCalculo,
            estado: factura.estado,
            concepto: factura.concepto,
            fechaEmision: factura.fechaEmision.split("T")[0], // Formatear fecha si es necesario
            fechaVencimiento: factura.fechaVencimiento.split("T")[0],
          });
        }
      } catch (error: any) {
        const errorMsg =
          error.response?.data?.message ||
          "Error al cargar los datos iniciales";
        setErrorMessage(errorMsg);
        console.error("Error al cargar datos iniciales:", error);

        present({
          message: errorMsg,
          duration: 3000,
          color: "danger",
        });
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [id]);

  // Función para manejar la selección de fechas
  const handleDateConfirm = (field: string, value: string) => {
    formik.setFieldValue(field, value.split("T")[0]);
    if (field === "fechaEmision") {
      setShowDatePickerEmision(false);
    } else {
      setShowDatePickerVencimiento(false);
    }
  };

  return (
    <IonPage>
      <CustomHeader
        pageName={id ? "Editar Factura" : "Nueva Factura"}
        showMenuButton={false}
        showLogoutButton={false}
      />

      <IonContent className="ion-padding">
        {loading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <IonLabel>Cargando datos...</IonLabel>
          </div>
        ) : (
          <form className="factura-form" onSubmit={formik.handleSubmit}>
            <h2
              style={{ color: "var(--ion-color-primary)", textAlign: "center" }}
            >
              {id ? "Editar Factura" : "Nueva Factura"}
            </h2>

            {/* Usuario */}
            <IonItem className="custom-item">
              <IonIcon
                icon={personOutline}
                slot="start"
                className="custom-icon"
              />
              <IonLabel position="stacked">Usuario</IonLabel>
              <IonSelect
                value={formik.values.user.id}
                onIonChange={(e) =>
                  formik.setFieldValue("user", { id: e.detail.value })
                }
                placeholder="Seleccione usuario"
                disabled={loading}
              >
                {users
                  .filter((user) => user.role === "Contribuyente") // Filtra solo contribuyentes
                  .map((user) => (
                    <IonSelectOption key={user.id} value={user.id.toString()}>
                      {user.nombre} ({user.email}) - Rol: {user.role}
                    </IonSelectOption>
                  ))}
              </IonSelect>
            </IonItem>
            {formik.errors.user?.id && (
              <IonText color="danger" className="ion-padding-start">
                <small>{formik.errors.user.id}</small>
              </IonText>
            )}

            {/* Tipo de Tributo */}
            <IonItem className="custom-item">
              <IonIcon
                icon={documentTextOutline}
                slot="start"
                className="custom-icon"
              />
              <IonLabel position="stacked">Tipo de Tributo</IonLabel>
              <IonSelect
                value={formik.values.tipoTributo.id}
                onIonChange={(e) =>
                  formik.setFieldValue("tipoTributo", { id: e.detail.value })
                }
                placeholder="Seleccione tipo de tributo"
                disabled={loading}
              >
                {tiposTributo.map((tributo) => (
                  <IonSelectOption key={tributo.id} value={tributo.id}>
                    {tributo.nombre} ({tributo.tarifa}%)
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            {formik.errors.tipoTributo?.id && (
              <IonText color="danger" className="ion-padding-start">
                <small>{formik.errors.tipoTributo.id}</small>
              </IonText>
            )}

            {/* Periodo */}
            <IonItem className="custom-item">
              <IonIcon
                icon={calendarOutline}
                slot="start"
                className="custom-icon"
              />
              <IonLabel position="stacked">Periodo (YYYY-MM)</IonLabel>
              <IonInput
                value={formik.values.periodo}
                onIonChange={(e) =>
                  formik.setFieldValue("periodo", e.detail.value)
                }
                placeholder="Ej: 2023-01"
                disabled={loading}
              />
            </IonItem>
            {formik.errors.periodo && (
              <IonText color="danger" className="ion-padding-start">
                <small>{formik.errors.periodo}</small>
              </IonText>
            )}

            {/* Base de Cálculo */}
            <IonItem className="custom-item">
              <IonIcon
                icon={cashOutline}
                slot="start"
                className="custom-icon"
              />
              <IonLabel position="stacked">Base de Cálculo</IonLabel>
              <IonInput
                type="number"
                value={formik.values.baseCalculo}
                onIonChange={(e) =>
                  formik.setFieldValue(
                    "baseCalculo",
                    parseFloat(e.detail.value || "0")
                  )
                }
                placeholder="Ingrese la base de cálculo"
                disabled={loading}
              />
            </IonItem>
            {formik.errors.baseCalculo && (
              <IonText color="danger" className="ion-padding-start">
                <small>{formik.errors.baseCalculo}</small>
              </IonText>
            )}

            {/* Valor Estimado 
            <IonItem className="custom-item">
              <IonIcon
                icon={cashOutline}
                slot="start"
                className="custom-icon"
              />
              <IonLabel position="stacked">Valor Estimado</IonLabel>
              <IonInput
                type="number"
                value={formik.values.valorEstimado}
                onIonChange={(e) =>
                  formik.setFieldValue(
                    "valorEstimado",
                    parseFloat(e.detail.value || "0")
                  )
                }
                placeholder="Ingrese el valor estimado"
                disabled={loading}
              />
            </IonItem>
            {formik.errors.valorEstimado && (
              <IonText color="danger" className="ion-padding-start">
                <small>{formik.errors.valorEstimado}</small>
              </IonText>
            )}
              */}

            {/* Estado */}
            <IonItem className="custom-item">
              <IonIcon
                icon={documentTextOutline}
                slot="start"
                className="custom-icon"
              />
              <IonLabel position="stacked">Estado</IonLabel>
              <IonSelect
                value={formik.values.estado}
                onIonChange={(e) =>
                  formik.setFieldValue("estado", e.detail.value)
                }
                placeholder="Seleccione estado"
                disabled={loading}
              >
                <IonSelectOption value="PENDIENTE">Pendiente</IonSelectOption>
                <IonSelectOption value="PAGADA">Pagada</IonSelectOption>
                <IonSelectOption value="VENCIDA">Vencida</IonSelectOption>
              </IonSelect>
            </IonItem>
            {formik.errors.estado && (
              <IonText color="danger" className="ion-padding-start">
                <small>{formik.errors.estado}</small>
              </IonText>
            )}

            {/* Concepto */}
            <IonItem className="custom-item">
              <IonIcon
                icon={documentTextOutline}
                slot="start"
                className="custom-icon"
              />
              <IonLabel position="stacked">Concepto</IonLabel>
              <IonInput
                value={formik.values.concepto}
                onIonChange={(e) =>
                  formik.setFieldValue("concepto", e.detail.value)
                }
                placeholder="Ingrese el concepto"
                disabled={loading}
              />
            </IonItem>
            {formik.errors.concepto && (
              <IonText color="danger" className="ion-padding-start">
                <small>{formik.errors.concepto}</small>
              </IonText>
            )}

            {/* Fecha Emisión */}
            <IonItem
              className="custom-item"
              button
              onClick={() => !loading && setShowDatePickerEmision(true)}
              disabled={loading}
            >
              <IonIcon
                icon={calendarOutline}
                slot="start"
                className="custom-icon"
              />
              <IonLabel>Fecha de Emisión</IonLabel>
              <IonLabel
                slot="end"
                color={formik.values.fechaEmision ? undefined : "medium"}
              >
                {formik.values.fechaEmision || "Seleccione fecha"}
              </IonLabel>
            </IonItem>
            {formik.errors.fechaEmision && (
              <IonText color="danger" className="ion-padding-start">
                <small>{formik.errors.fechaEmision}</small>
              </IonText>
            )}

            {/* Fecha Vencimiento */}
            <IonItem
              className="custom-item"
              button
              onClick={() => !loading && setShowDatePickerVencimiento(true)}
              disabled={loading}
            >
              <IonIcon
                icon={calendarOutline}
                slot="start"
                className="custom-icon"
              />
              <IonLabel>Fecha de Vencimiento</IonLabel>
              <IonLabel
                slot="end"
                color={formik.values.fechaVencimiento ? undefined : "medium"}
              >
                {formik.values.fechaVencimiento || "Seleccione fecha"}
              </IonLabel>
            </IonItem>
            {formik.errors.fechaVencimiento && (
              <IonText color="danger" className="ion-padding-start">
                <small>{formik.errors.fechaVencimiento}</small>
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
                disabled={formik.isSubmitting || loading}
              >
                <IonIcon icon={arrowBackOutline} slot="start" />
                Cancelar
              </IonButton>

              <IonButton
                expand="block"
                type="submit"
                disabled={formik.isSubmitting || loading}
              >
                <IonIcon icon={saveOutline} slot="start" />
                {formik.isSubmitting ? "Guardando..." : "Guardar"}
              </IonButton>
            </div>
          </form>
        )}

        {/* Modal para fecha emisión */}
        <IonModal
          isOpen={showDatePickerEmision}
          onDidDismiss={() => setShowDatePickerEmision(false)}
        >
          <IonContent>
            <IonDatetime
              presentation="date"
              locale="es-ES"
              value={formik.values.fechaEmision || undefined}
              onIonChange={(e) =>
                handleDateConfirm("fechaEmision", e.detail.value as string)
              }
            />
            <IonButtons className="ion-padding">
              <IonButton onClick={() => setShowDatePickerEmision(false)}>
                Cerrar
              </IonButton>
              <IonButton onClick={() => setShowDatePickerEmision(false)}>
                Aceptar
              </IonButton>
            </IonButtons>
          </IonContent>
        </IonModal>

        {/* Modal para fecha vencimiento */}
        <IonModal
          isOpen={showDatePickerVencimiento}
          onDidDismiss={() => setShowDatePickerVencimiento(false)}
        >
          <IonContent>
            <IonDatetime
              presentation="date"
              locale="es-ES"
              value={formik.values.fechaVencimiento || undefined}
              onIonChange={(e) =>
                handleDateConfirm("fechaVencimiento", e.detail.value as string)
              }
            />
            <IonButtons className="ion-padding">
              <IonButton onClick={() => setShowDatePickerVencimiento(false)}>
                Cerrar
              </IonButton>
              <IonButton onClick={() => setShowDatePickerVencimiento(false)}>
                Aceptar
              </IonButton>
            </IonButtons>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default FacturaForm;
