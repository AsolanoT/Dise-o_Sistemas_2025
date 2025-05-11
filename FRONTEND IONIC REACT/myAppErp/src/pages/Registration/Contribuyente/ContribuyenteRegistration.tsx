import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonLabel,
  IonAlert,
  IonLoading,
  IonList,
} from "@ionic/react";
import { useHistory, useParams } from "react-router-dom";
import "./ContribuyenteRegistration.css";

interface Contribuyente {
  tipo_documento: string;
  numero_documento: string;
  nombre_completo: string;
  direccion: string;
  telefono: string;
  correo: string;
  id_tipo_contribuyente: number;
  tipo_actividad : string;
  porcentaje_iva : number;
}

interface TipoContribuyente {
  id_tipo_contribuyente: number;
  descripcion: string;
}

const ContribuyenteRegistration: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [tiposContribuyente, setTiposContribuyente] = useState<
    TipoContribuyente[]
  >([]);

  const [form, setForm] = useState<Contribuyente>({
    tipo_documento: "CC",
    numero_documento: "",
    nombre_completo: "",
    direccion: "",
    telefono: "",
    correo: "",
    id_tipo_contribuyente: 1,
    tipo_actividad : "",
    porcentaje_iva : 1,
  });

  useEffect(() => {
    const fetchTiposContribuyente = async () => {
      try {
        setLoading(true);
        // Simulación de datos - reemplazar con llamada API real
        const mockData: TipoContribuyente[] = [
          { id_tipo_contribuyente: 1, descripcion: "Natural" },
          { id_tipo_contribuyente: 2, descripcion: "Jurídico" },
        ];
        setTiposContribuyente(mockData);

        if (id) {
          // Simulación de datos para edición - reemplazar con llamada API real
          const mockContribuyente: Contribuyente = {
            tipo_documento: "CC",
            numero_documento: "123456789",
            nombre_completo: "Juan Pérez",
            direccion: "Calle 123 #45-67",
            telefono: "3001234567",
            correo: "juan@example.com",
            id_tipo_contribuyente: 1,
            tipo_actividad : "",
            porcentaje_iva : 1,
          };
          setForm(mockContribuyente);
        }
      } catch (err) {
        setError("Error al cargar datos iniciales");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTiposContribuyente();
  }, [id]);

  const handleInputChange = (
    field: keyof Contribuyente,
    value: string | number
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      // Validaciones básicas
      if (!form.numero_documento || !form.nombre_completo || !form.correo) {
        setError("Por favor complete todos los campos requeridos");
        return;
      }

      // Validación de email
      if (!/^\S+@\S+\.\S+$/.test(form.correo)) {
        setError("Por favor ingrese un correo electrónico válido");
        return;
      }

      // Aquí iría la llamada a tu API para guardar/actualizar
      console.log("Datos a enviar:", form);

      // Simular tiempo de espera de API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setShowAlert(true);
    } catch (err) {
      setError("Error al guardar el contribuyente");
      console.error(err);
    } finally {
      setLoading(false);
    }

    // Tipo de actividad
    if (!form.tipo_actividad || !form.tipo_actividad|| !form.tipo_actividad) {
      setError("Por favor complete todos los campos requeridos");
      return;
    }

    // Porcentaje IVA
    if (!form.porcentaje_iva || !form.porcentaje_iva|| !form.porcentaje_iva) {
      setError("Por favor complete todos los campos requeridos");
      return;
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {id ? "Editar Contribuyente" : "Nuevo Contribuyente"}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="contribuyente-form">
          <IonList>
            {/* Tipo de Documento */}
            <div className="form-field-group">
              <IonLabel className="field-label">Tipo de Documento</IonLabel>
              <IonSelect
                value={form.tipo_documento}
                onIonChange={(e) =>
                  handleInputChange("tipo_documento", e.detail.value)
                }
                disabled={loading}
                className="custom-select"
                interface="popover"
              >
                <IonSelectOption value="CC">
                  Cédula de Ciudadanía
                </IonSelectOption>
                <IonSelectOption value="NIT">NIT</IonSelectOption>
                <IonSelectOption value="CE">
                  Cédula de Extranjería
                </IonSelectOption>
              </IonSelect>
            </div>

            {/* Número de Documento */}
            <div className="form-field-group">
              <IonLabel className="field-label">Número de Documento*</IonLabel>
              <IonInput
                type="text"
                value={form.numero_documento}
                onIonChange={(e) =>
                  handleInputChange("numero_documento", e.detail.value!)
                }
                required
                disabled={loading}
                className="custom-input"
                placeholder="Ingrese el número de documento"
              />
            </div>

            {/* Nombre Completo */}
            <div className="form-field-group">
              <IonLabel className="field-label">Nombre Completo*</IonLabel>
              <IonInput
                type="text"
                value={form.nombre_completo}
                onIonChange={(e) =>
                  handleInputChange("nombre_completo", e.detail.value!)
                }
                required
                disabled={loading}
                className="custom-input"
                placeholder="Ingrese el nombre completo"
              />
            </div>

            {/* Dirección */}
            <div className="form-field-group">
              <IonLabel className="field-label">Dirección</IonLabel>
              <IonInput
                type="text"
                value={form.direccion}
                onIonChange={(e) =>
                  handleInputChange("direccion", e.detail.value!)
                }
                disabled={loading}
                className="custom-input"
                placeholder="Ingrese la dirección"
              />
            </div>

            {/* Teléfono */}
            <div className="form-field-group">
              <IonLabel className="field-label">Teléfono</IonLabel>
              <IonInput
                type="tel"
                value={form.telefono}
                onIonChange={(e) =>
                  handleInputChange("telefono", e.detail.value!)
                }
                disabled={loading}
                className="custom-input"
                placeholder="Ingrese el teléfono"
              />
            </div>

            {/* Correo Electrónico */}
            <div className="form-field-group">
              <IonLabel className="field-label">Correo Electrónico*</IonLabel>
              <IonInput
                type="email"
                value={form.correo}
                onIonChange={(e) =>
                  handleInputChange("correo", e.detail.value!)
                }
                required
                disabled={loading}
                className="custom-input"
                placeholder="Ingrese el correo electrónico"
              />
            </div>

            {/* Tipo de Contribuyente */}
            <div className="form-field-group">
              <IonLabel className="field-label">Tipo de Contribuyente</IonLabel>
              <IonSelect
                value={form.id_tipo_contribuyente}
                onIonChange={(e) =>
                  handleInputChange("id_tipo_contribuyente", e.detail.value)
                }
                disabled={loading}
                className="custom-select"
                interface="popover"
              >
                {tiposContribuyente.map((tipo) => (
                  <IonSelectOption
                    key={tipo.id_tipo_contribuyente}
                    value={tipo.id_tipo_contribuyente}
                  >
                    {tipo.descripcion}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </div>


            {/* Tipo de actividad */}
            <div className="form-field-group">
              <IonLabel className="field-label">Tipo de actividad*</IonLabel>
              <IonInput
                type="text"
                value={form.tipo_actividad}
                onIonChange={(e) =>
                  handleInputChange("tipo_actividad", e.detail.value!)
                }
                required
                disabled={loading}
                className="custom-input"
                placeholder="Ingrese el Tipo de Actividad"
              />
            </div>



            {/* Iva */}
            <div className="form-field-group">
              <IonLabel className="field-label">IVA*</IonLabel>
              <IonInput
                type="text"
                value={form.porcentaje_iva}
                onIonChange={(e) =>
                  handleInputChange("porcentaje_iva", e.detail.value!)
                }
                required
                disabled={loading}
                className="custom-input"
                placeholder="Ingrese el porcentaje del IVA"
              />
            </div>
          </IonList>

          <div className="form-actions">
            <IonButton
              fill="outline"
              onClick={handleCancel}
              disabled={loading}
              className="cancel-button"
            >
              Cancelar
            </IonButton>

            <IonButton
              type="submit"
              disabled={loading}
              className="submit-button"
            >
              {loading ? "Guardando..." : "Guardar"}
            </IonButton>
          </div>
        </form>
      </IonContent>

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => {
          setShowAlert(false);
          history.goBack();
        }}
        header="Éxito"
        message={`Contribuyente ${id ? "actualizado" : "creado"} correctamente`}
        buttons={["OK"]}
      />

      <IonLoading
        isOpen={loading}
        message="Por favor espere..."
        spinner="circles"
      />
    </IonPage>
  );
};

export default ContribuyenteRegistration;
