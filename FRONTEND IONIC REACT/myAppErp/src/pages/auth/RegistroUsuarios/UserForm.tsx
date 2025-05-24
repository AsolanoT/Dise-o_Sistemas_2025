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
  IonDatetime,
  IonModal,
  IonButtons,
  useIonToast,
  IonText,
  IonLoading,
} from "@ionic/react";

import { useFormik } from "formik";
import { useHistory, useParams } from "react-router-dom";
import {
  cardOutline,
  personOutline,
  homeOutline,
  callOutline,
  mailOutline,
  calendarOutline,
  businessOutline,
  settingsOutline,
  saveOutline,
  arrowBackOutline,
  lockClosedOutline,
  eyeOffOutline,
  eyeOutline,
} from "ionicons/icons";
import { useState, useEffect } from "react";
import "./UserForm.css";
import { initialValues, validationSchema } from "./user.form";
import {
  getUserById,
  registerUser,
  updateUser,
} from "../../../services/auth.service";

export function UserForm() {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [present] = useIonToast();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(!!id);
  const [showPassword, setShowPassword] = useState(false);

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
          await updateUser(id, values);
          present({
            message: "Usuario actualizado correctamente",
            duration: 3000,
            position: "top",
            color: "success",
          });
        } else {
          // Modo creación
          await registerUser(values);
          present({
            message: "Usuario creado correctamente",
            duration: 3000,
            position: "top",
            color: "success",
          });
        }

        history.push("/users");
      } catch (error: any) {
        const message = error.message || "Error al guardar el usuario";
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
      const loadUserData = async () => {
        try {
          const userData = await getUserById(id);
          formik.setValues({
            ...userData,
            password: "",
            confirmPassword: "",
          });
        } catch (error: any) {
          present({
            message: error.message || "Error al cargar los datos del usuario",
            duration: 5000,
            position: "top",
            color: "danger",
          });
          history.push("/users");
        } finally {
          setIsLoading(false);
        }
      };

      loadUserData();
    }
  }, [id]);

  const handleDateConfirm = (date: string) => {
    formik.setFieldValue("birthDate", date);
    setShowDatePicker(false);
  };

  if (isLoading) {
    return <IonLoading isOpen={true} message="Cargando datos..." />;
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <form className="user-form">
          <h2
            className="form-title"
            style={{ color: "blue", textAlign: "center" }}
          >
            {id ? "Editar Usuario" : "Nuevo Usuario"}
          </h2>

          {/* Tipo de Documento */}
          <IonItem className="custom-item" lines="full">
            <IonIcon icon={cardOutline} slot="start" className="custom-icon" />
            <IonLabel position="stacked">Tipo de Documento</IonLabel>
            <IonSelect
              value={formik.values.documentType}
              onIonChange={(e) =>
                formik.setFieldValue("documentType", e.detail.value)
              }
              placeholder="Seleccione tipo"
            >
              <IonSelectOption value="cc">Cédula de Ciudadanía</IonSelectOption>
              <IonSelectOption value="ti">Tarjeta de Identidad</IonSelectOption>
              <IonSelectOption value="ce">
                Cédula de Extranjería
              </IonSelectOption>
              <IonSelectOption value="passport">Pasaporte</IonSelectOption>
              <IonSelectOption value="nit">NIT</IonSelectOption>
            </IonSelect>
          </IonItem>
          {formik.errors.documentType && (
            <IonText color="danger" className="ion-padding-start">
              <small>{formik.errors.documentType}</small>
            </IonText>
          )}

          {/* Número de Documento */}
          <IonItem className="custom-item">
            <IonIcon icon={cardOutline} slot="start" className="custom-icon" />
            <IonLabel position="stacked">Número de Documento</IonLabel>
            <IonInput
              value={formik.values.documentNumber}
              onIonChange={(e) =>
                formik.setFieldValue("documentNumber", e.detail.value)
              }
              placeholder="Ingrese el número"
            />
          </IonItem>
          {formik.errors.documentNumber && (
            <IonText color="danger" className="ion-padding-start">
              <small>{formik.errors.documentNumber}</small>
            </IonText>
          )}

          {/* Nombre Completo */}
          <IonItem className="custom-item">
            <IonIcon
              icon={personOutline}
              slot="start"
              className="custom-icon"
            />
            <IonLabel position="stacked">Nombre Completo</IonLabel>
            <IonInput
              value={formik.values.fullName}
              onIonChange={(e) =>
                formik.setFieldValue("fullName", e.detail.value)
              }
              placeholder="Ingrese el nombre"
            />
          </IonItem>
          {formik.errors.fullName && (
            <IonText color="danger" className="ion-padding-start">
              <small>{formik.errors.fullName}</small>
            </IonText>
          )}

          {/* Dirección */}
          <IonItem className="custom-item">
            <IonIcon icon={homeOutline} slot="start" className="custom-icon" />
            <IonLabel position="stacked">Dirección</IonLabel>
            <IonInput
              value={formik.values.address}
              onIonChange={(e) =>
                formik.setFieldValue("address", e.detail.value)
              }
              placeholder="Ingrese la dirección"
            />
          </IonItem>
          {formik.errors.address && (
            <IonText color="danger" className="ion-padding-start">
              <small>{formik.errors.address}</small>
            </IonText>
          )}

          {/* Teléfono */}
          <IonItem className="custom-item">
            <IonIcon icon={callOutline} slot="start" className="custom-icon" />
            <IonLabel position="stacked">Teléfono</IonLabel>
            <IonInput
              type="tel"
              value={formik.values.phone}
              onIonChange={(e) => formik.setFieldValue("phone", e.detail.value)}
              placeholder="Ingrese el teléfono"
            />
          </IonItem>
          {formik.errors.phone && (
            <IonText color="danger" className="ion-padding-start">
              <small>{formik.errors.phone}</small>
            </IonText>
          )}

          {/* Email */}
          <IonItem className="custom-item">
            <IonIcon icon={mailOutline} slot="start" className="custom-icon" />
            <IonLabel position="stacked">Correo Electrónico</IonLabel>
            <IonInput
              type="email"
              value={formik.values.email}
              onIonChange={(e) => formik.setFieldValue("email", e.detail.value)}
              placeholder="Ingrese el email"
            />
          </IonItem>
          {formik.errors.email && (
            <IonText color="danger" className="ion-padding-start">
              <small>{formik.errors.email}</small>
            </IonText>
          )}

          {/* Fecha de Nacimiento */}
          <IonItem
            className="custom-item"
            button
            onClick={() => setShowDatePicker(true)}
          >
            <IonIcon
              icon={calendarOutline}
              slot="start"
              className="custom-icon"
            />
            <IonLabel>Fecha de Nacimiento</IonLabel>
            <IonLabel
              slot="end"
              color={formik.values.birthDate ? undefined : "medium"}
            >
              {formik.values.birthDate
                ? new Date(formik.values.birthDate).toLocaleDateString("es-ES")
                : "Seleccione fecha"}
            </IonLabel>
          </IonItem>
          {formik.errors.birthDate && (
            <IonText color="danger" className="ion-padding-start">
              <small>{formik.errors.birthDate}</small>
            </IonText>
          )}

          {/* Tipo de Contribuyente */}
          <IonItem className="custom-item">
            <IonIcon
              icon={businessOutline}
              slot="start"
              className="custom-icon"
            />
            <IonLabel position="stacked">Tipo de Contribuyente</IonLabel>
            <IonSelect
              value={formik.values.taxpayerType}
              onIonChange={(e) =>
                formik.setFieldValue("taxpayerType", e.detail.value)
              }
              placeholder="Seleccione tipo"
            >
              <IonSelectOption value="NATURAL">Natural</IonSelectOption>
              <IonSelectOption value="JURIDICA">Juridica</IonSelectOption>
            </IonSelect>
          </IonItem>
          {formik.errors.taxpayerType && (
            <IonText color="danger" className="ion-padding-start">
              <small>{formik.errors.taxpayerType}</small>
            </IonText>
          )}

          {/* Tipo de Actividad */}
          <IonItem className="custom-item">
            <IonIcon
              icon={settingsOutline}
              slot="start"
              className="custom-icon"
            />
            <IonLabel position="stacked">Tipo de Actividad</IonLabel>
            <IonInput
              value={formik.values.activityType}
              onIonChange={(e) =>
                formik.setFieldValue("activityType", e.detail.value)
              }
              placeholder="Ingrese la actividad"
            />
          </IonItem>
          {formik.errors.activityType && (
            <IonText color="danger" className="ion-padding-start">
              <small>{formik.errors.activityType}</small>
            </IonText>
          )}

          {/* Solo mostrar campo de contraseña en creación */}
          {!id && (
            <>
              <IonItem className="custom-item">
                <IonIcon
                  icon={lockClosedOutline}
                  slot="start"
                  className="custom-icon"
                />
                <IonLabel position="stacked">Contraseña</IonLabel>
                <IonInput
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  onIonChange={(e) =>
                    formik.setFieldValue("password", e.detail.value)
                  }
                  placeholder="Ingrese la contraseña"
                />
                <IonIcon
                  slot="end"
                  icon={showPassword ? eyeOffOutline : eyeOutline}
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{ cursor: "pointer", marginLeft: "8px" }}
                />
              </IonItem>
              {formik.errors.password && (
                <IonText color="danger" className="ion-padding-start">
                  <small>{formik.errors.password}</small>
                </IonText>
              )}
            </>
          )}

          {/* Rol (asumiendo que tienes roles en tu sistema) */}
          <IonItem className="custom-item">
            <IonIcon
              icon={personOutline}
              slot="start"
              className="custom-icon"
            />
            <IonLabel position="stacked">Rol</IonLabel>
            <IonSelect
              value={formik.values.roleId}
              onIonChange={(e) =>
                formik.setFieldValue("roleId", e.detail.value)
              }
              placeholder="Seleccione rol"
            >
              <IonSelectOption value="1">Super Admin</IonSelectOption>
              <IonSelectOption value="2">Entidad Pública</IonSelectOption>
              <IonSelectOption value="3">Contribuyente</IonSelectOption>
            </IonSelect>
          </IonItem>
          {formik.errors.roleId && (
            <IonText color="danger" className="ion-padding-start">
              <small>{formik.errors.roleId}</small>
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
              onClick={async () => {
                await formik.handleSubmit();
                // Si no hay errores y no está enviando, redirige
                if (Object.keys(formik.errors).length === 0 && !isSubmitting) {
                  history.push("/verify-email", { email: formik.values.email });
                }
              }}
              disabled={isSubmitting}
            >
              <IonIcon icon={saveOutline} slot="start" />
              {isSubmitting ? "Guardando..." : "Guardar"}
            </IonButton>
          </div>
        </form>

        {/* Modal para fecha de nacimiento */}
        <IonModal
          isOpen={showDatePicker}
          onDidDismiss={() => setShowDatePicker(false)}
        >
          <IonContent>
            <IonDatetime
              presentation="date"
              locale="es-ES"
              min="1900-01-01"
              max={new Date().toISOString()}
              value={formik.values.birthDate || undefined}
              onIonChange={(e) => handleDateConfirm(e.detail.value as string)}
            />
            <IonButtons className="ion-padding">
              <IonButton onClick={() => setShowDatePicker(false)}>
                Cerrar
              </IonButton>
              <IonButton onClick={() => setShowDatePicker(false)}>
                Aceptar
              </IonButton>
            </IonButtons>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
}
