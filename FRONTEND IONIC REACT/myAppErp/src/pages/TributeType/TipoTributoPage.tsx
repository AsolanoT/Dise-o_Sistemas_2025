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
  IonTextarea,
  IonBackButton,
  IonButtons,
} from "@ionic/react";
import { useHistory, useParams } from "react-router-dom";
import "./TipoTributoPage.css";

interface TipoTributo {
  id_tipo_tributo?: number;
  nombre: string;
  descripcion: string;
  base_calculo: number;
  tarifa: number;
  periodicidad: string;
}

const TipoTributoPage: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState<TipoTributo>({
    nombre: "",
    descripcion: "",
    base_calculo: 0,
    tarifa: 0,
    periodicidad: "Anual",
  });

  useEffect(() => {
    if (id) {
      const fetchTipoTributo = async () => {
        try {
          setLoading(true);

          // Simulación de datos - reemplazar con API real
          const mockData: TipoTributo = {
            id_tipo_tributo: parseInt(id),
            nombre: "Predial",
            descripcion: "Impuesto predial sobre bienes inmuebles",
            base_calculo: 1000000,
            tarifa: 0.01,
            periodicidad: "Anual",
          };

          setForm(mockData);
        } catch (err) {
          setError("Error al cargar el tipo de tributo");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchTipoTributo();
    }
  }, [id]);

  const handleInputChange = (
    field: keyof TipoTributo,
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

      if (!form.nombre) {
        setError("El nombre es requerido");
        return;
      }

      if (form.base_calculo < 0) {
        setError("La base de cálculo no puede ser negativa");
        return;
      }

      if (form.tarifa < 0 || form.tarifa > 1) {
        setError("La tarifa debe estar entre 0 y 1 (0% a 100%)");
        return;
      }

      // Simular llamada a API
      console.log("Datos a enviar:", form);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess(true);
    } catch (err) {
      setError("Error al guardar el tipo de tributo");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tributos" />
          </IonButtons>
          <IonTitle>
            {id ? "Editar Tipo de Tributo" : "Nuevo Tipo de Tributo"}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="tributo-form">
          <IonList>
            {/* Nombre */}
            <div className="form-field-group">
              <IonLabel className="field-label">Nombre*</IonLabel>
              <IonInput
                type="text"
                value={form.nombre}
                onIonChange={(e) =>
                  handleInputChange("nombre", e.detail.value!)
                }
                required
                disabled={loading}
                className="custom-input"
                placeholder="Ej: Predial, ICA, Multa"
              />
            </div>

            {/* Descripción */}
            <div className="form-field-group">
              <IonLabel className="field-label">Descripción</IonLabel>
              <IonTextarea
                value={form.descripcion}
                onIonChange={(e) =>
                  handleInputChange("descripcion", e.detail.value!)
                }
                disabled={loading}
                className="custom-textarea"
                placeholder="Descripción detallada del tributo"
                rows={3}
              />
            </div>

            {/* Base de Cálculo */}
            <div className="form-field-group">
              <IonLabel className="field-label">Base de Cálculo</IonLabel>
              <IonInput
                type="number"
                value={form.base_calculo}
                onIonChange={(e) =>
                  handleInputChange(
                    "base_calculo",
                    parseFloat(e.detail.value!) || 0
                  )
                }
                disabled={loading}
                className="custom-input"
                placeholder="Valor base para cálculo"
                min="0"
                step="0.01"
              />
            </div>

            {/* Tarifa */}
            <div className="form-field-group">
              <IonLabel className="field-label">Tarifa (0-1)*</IonLabel>
              <IonInput
                type="number"
                value={form.tarifa}
                onIonChange={(e) =>
                  handleInputChange("tarifa", parseFloat(e.detail.value!) || 0)
                }
                required
                disabled={loading}
                className="custom-input"
                placeholder="Ej: 0.01 para 1%"
                min="0"
                max="1"
                step="0.001"
              />
            </div>

            {/* Periodicidad */}
            <div className="form-field-group">
              <IonLabel className="field-label">Periodicidad*</IonLabel>
              <IonSelect
                value={form.periodicidad}
                onIonChange={(e) =>
                  handleInputChange("periodicidad", e.detail.value)
                }
                disabled={loading}
                className="custom-select"
                interface="popover"
              >
                <IonSelectOption value="Mensual">Mensual</IonSelectOption>
                <IonSelectOption value="Trimestral">Trimestral</IonSelectOption>
                <IonSelectOption value="Semestral">Semestral</IonSelectOption>
                <IonSelectOption value="Anual">Anual</IonSelectOption>
              </IonSelect>
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
        isOpen={success}
        onDidDismiss={() => {
          setSuccess(false);
          history.push("/tributos");
        }}
        header="Éxito"
        message={`Tipo de tributo ${
          id ? "actualizado" : "creado"
        } correctamente`}
        buttons={["OK"]}
      />

      <IonLoading isOpen={loading} message="Procesando..." spinner="circles" />
    </IonPage>
  );
};

export default TipoTributoPage;
