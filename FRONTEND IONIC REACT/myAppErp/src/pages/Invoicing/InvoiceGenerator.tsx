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
  IonItem,
  IonDatetime,
  IonTextarea,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./InvoiceGenerator.css";

interface Factura {
  id_contribuyente: number;
  id_tipo_tributo: number;
  periodo: string;
  valor_estimado: number;
  estado: string;
  concepto: string;
}

interface Contribuyente {
  id_contribuyente: number;
  nombre_completo: string;
}

interface TipoTributo {
  id_tipo_tributo: number;
  descripcion: string;
}

const InvoiceGenerator: React.FC = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [contribuyentes, setContribuyentes] = useState<Contribuyente[]>([]);
  const [tiposTributo, setTiposTributo] = useState<TipoTributo[]>([]);

  const [form, setForm] = useState<Factura>({
    id_contribuyente: 0,
    id_tipo_tributo: 0,
    periodo: "",
    valor_estimado: 0,
    estado: "Pendiente",
    concepto: "",
  });

  // Simulación de datos - reemplazar con llamadas API reales
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Simular carga de contribuyentes
        const mockContribuyentes: Contribuyente[] = [
          { id_contribuyente: 1, nombre_completo: "Juan Pérez" },
          { id_contribuyente: 2, nombre_completo: "Empresa XYZ S.A.S." },
        ];
        setContribuyentes(mockContribuyentes);

        // Simular carga de tipos de tributo
        const mockTiposTributo: TipoTributo[] = [
          { id_tipo_tributo: 1, descripcion: "Predial" },
          { id_tipo_tributo: 2, descripcion: "ICA" },
          { id_tipo_tributo: 3, descripcion: "Industria y Comercio" },
        ];
        setTiposTributo(mockTiposTributo);
      } catch (err) {
        setError("Error al cargar datos iniciales");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (field: keyof Factura, value: any) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePeriodoChange = (e: CustomEvent) => {
    const date = new Date(e.detail.value);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    handleInputChange(
      "periodo",
      `${year}-${month.toString().padStart(2, "0")}`
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      // Validaciones
      if (!form.id_contribuyente || !form.id_tipo_tributo) {
        setError("Debe seleccionar un contribuyente y tipo de tributo");
        return;
      }

      if (!form.periodo) {
        setError("Debe especificar un período válido");
        return;
      }

      if (form.valor_estimado <= 0) {
        setError("El valor estimado debe ser mayor a cero");
        return;
      }

      if (!form.concepto) {
        setError("Debe ingresar un concepto");
        return;
      }

      // Aquí iría la llamada a la API para guardar la factura
      console.log("Datos a enviar:", form);

      // Simular tiempo de espera
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccess(true);
    } catch (err) {
      setError("Error al generar la factura");
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
          <IonTitle>Generar Factura Tributaria</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="invoice-form">
          <IonList>
            {/* Selección de Contribuyente */}
            <div className="form-field-group">
              <IonLabel className="field-label">Contribuyente*</IonLabel>
              <IonSelect
                value={form.id_contribuyente}
                onIonChange={(e) =>
                  handleInputChange("id_contribuyente", e.detail.value)
                }
                disabled={loading}
                className="custom-select"
                interface="popover"
              >
                <IonSelectOption value={0} disabled>
                  Seleccione un contribuyente
                </IonSelectOption>
                {contribuyentes.map((contrib) => (
                  <IonSelectOption
                    key={contrib.id_contribuyente}
                    value={contrib.id_contribuyente}
                  >
                    {contrib.nombre_completo}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </div>

            {/* Selección de Tipo de Tributo */}
            <div className="form-field-group">
              <IonLabel className="field-label">Tipo de Tributo*</IonLabel>
              <IonSelect
                value={form.id_tipo_tributo}
                onIonChange={(e) =>
                  handleInputChange("id_tipo_tributo", e.detail.value)
                }
                disabled={loading}
                className="custom-select"
                interface="popover"
              >
                <IonSelectOption value={0} disabled>
                  Seleccione un tributo
                </IonSelectOption>
                {tiposTributo.map((tributo) => (
                  <IonSelectOption
                    key={tributo.id_tipo_tributo}
                    value={tributo.id_tipo_tributo}
                  >
                    {tributo.descripcion}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </div>

            {/* Período */}
            <div className="form-field-group">
              <IonLabel className="field-label">Período*</IonLabel>
              <IonDatetime
                presentation="month-year"
                onIonChange={handlePeriodoChange}
                disabled={loading}
                className="custom-datetime"
              />
              {form.periodo && (
                <div className="periodo-selected">
                  Período seleccionado: {form.periodo}
                </div>
              )}
            </div>

            {/* Valor Estimado */}
            <div className="form-field-group">
              <IonLabel className="field-label">Valor Estimado*</IonLabel>
              <IonInput
                type="number"
                value={form.valor_estimado}
                onIonChange={(e) =>
                  handleInputChange(
                    "valor_estimado",
                    parseFloat(e.detail.value!) || 0
                  )
                }
                required
                disabled={loading}
                className="custom-input"
                placeholder="Ingrese el valor estimado"
                min="0"
                step="0.01"
              />
            </div>

            {/* Estado (automático) */}
            <div className="form-field-group">
              <IonLabel className="field-label">Estado</IonLabel>
              <IonSelect
                value={form.estado}
                onIonChange={(e) => handleInputChange("estado", e.detail.value)}
                disabled={loading}
                className="custom-select"
              >
                <IonSelectOption value="Pendiente">Pendiente</IonSelectOption>
                <IonSelectOption value="Pagado">Pagado</IonSelectOption>
                <IonSelectOption value="Vencido">Vencido</IonSelectOption>
              </IonSelect>
            </div>

            {/* Concepto */}
            <div className="form-field-group">
              <IonLabel className="field-label">Concepto*</IonLabel>
              <IonTextarea
                value={form.concepto}
                onIonChange={(e) =>
                  handleInputChange("concepto", e.detail.value!)
                }
                required
                disabled={loading}
                className="custom-textarea"
                placeholder="Descripción del concepto"
                rows={3}
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
              {loading ? "Generando..." : "Generar Factura"}
            </IonButton>
          </div>
        </form>
      </IonContent>

      <IonAlert
        isOpen={success}
        onDidDismiss={() => {
          setSuccess(false);
          history.goBack();
        }}
        header="Factura Generada"
        message="La factura tributaria ha sido creada exitosamente"
        buttons={["OK"]}
      />

      <IonLoading isOpen={loading} message="Procesando..." spinner="circles" />
    </IonPage>
  );
};

export default InvoiceGenerator;
