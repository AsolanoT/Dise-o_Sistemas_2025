import { IonPage } from "@ionic/react/dist/types/components/IonPage";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import { IonContent, IonLabel, IonList, IonSearchbar } from "@ionic/react/dist/types/components/proxies";
import { IonButton, IonItem } from "@ionic/react/dist/types/components/routing-proxies";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, useState } from "react";

const PaymentStatus: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
  
    const handleSearch = () => {
      // Lógica para buscar pagos
    };
  
    return (
      <IonPage>
        <CustomHeader pageName="Consulta de Pagos" />
        <IonContent>
          <IonSearchbar
            value={searchTerm}
            onIonChange={(e) => setSearchTerm(e.detail.value!)}
            placeholder="Buscar por documento/NIT"
          />
          <IonButton onClick={handleSearch}>Buscar</IonButton>
          
          {/* Resultados */}
          <IonList>
            {results.map((item: { id: Key | null | undefined; contribuyente: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; periodo: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; estado: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; valor: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
              <IonItem key={item.id}>
                <IonLabel>
                  <h2>{item.contribuyente}</h2>
                  <p>{item.periodo} - {item.estado}</p>
                  <p>${item.valor}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonPage>
    );
  };
