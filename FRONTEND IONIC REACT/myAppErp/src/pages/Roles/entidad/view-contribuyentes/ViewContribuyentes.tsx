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
    IonAvatar,
    IonText,
    IonBadge,
    useIonToast,
    IonLoading,
    IonSearchbar,
    IonRefresher,
    IonRefresherContent
  } from '@ionic/react';
  import { person, arrowBack } from 'ionicons/icons';
  import { useEffect, useState } from 'react';
  import { useHistory } from 'react-router-dom';
  import './ViewContribuyentes.css';
  import { fetchUsers } from '../../../../services/auth.service';
  
  export function ViewContribuyentes() {
    const [users, setUsers] = useState<any[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [present] = useIonToast();
    const history = useHistory();
  
    // Cargar usuarios al montar el componente
    useEffect(() => {
      loadUsers();
    }, []);
  
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        const usersData = await fetchUsers();
        
        // Filtrar solo contribuyentes (asumiendo que el rol "Contribuyente" tiene id 2)
        const contribuyentes = usersData.filter(user => 
          user.roleId === '2' || user.role?.id === '2' || user.role === 'Contribuyente'
        );
        
        setUsers(contribuyentes);
        setFilteredUsers(contribuyentes);
      } catch (error: any) {
        present({
          message: error.message || 'Error al cargar contribuyentes',
          duration: 3000,
          position: 'top',
          color: 'danger'
        });
      } finally {
        setIsLoading(false);
      }
    };
  
    // Función para manejar el refresco
    const handleRefresh = async (event: CustomEvent) => {
      await loadUsers();
      event.detail.complete();
    };
  
    // Función para buscar contribuyentes
    const handleSearch = (event: CustomEvent) => {
      const query = event.detail.value?.toLowerCase() || '';
      setFilteredUsers(
        users.filter(
          (user) =>
            user.nombre.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            (user.documentNumber && user.documentNumber.toLowerCase().includes(query))
        )
      );
    };
  
    // Función para formatear tipo de documento
    const formatDocumentType = (type: string) => {
      const types: Record<string, string> = {
        'cc': 'C.C.',
        'ti': 'T.I.',
        'ce': 'C.E.',
        'passport': 'Pasaporte',
        'nit': 'NIT'
      };
      return types[type] || type;
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
            <IonTitle>Contribuyentes</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={loadUsers}>
                <IonIcon icon="refresh" />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
  
        <IonContent>
          <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
  
          <IonSearchbar
            placeholder="Buscar contribuyentes..."
            debounce={500}
            onIonChange={handleSearch}
          />
  
          {isLoading ? (
            <IonLoading isOpen={true} message="Cargando contribuyentes..." />
          ) : filteredUsers.length === 0 ? (
            <div className="ion-text-center ion-padding">
              <IonText color="medium">No se encontraron contribuyentes</IonText>
            </div>
          ) : (
            <IonList>
              {filteredUsers.map((user) => (
                <IonItem key={user.id} lines="full">
                  <IonAvatar slot="start">
                    <IonIcon
                      icon={person}
                      size="large"
                      color="medium"
                    />
                  </IonAvatar>
                  <IonLabel>
                    <h2>{user.nombre || user.fullName}</h2>
                    <p>
                      <IonText color="medium">
                        {user.documentType && formatDocumentType(user.documentType)}: {user.documentNumber}
                      </IonText>
                    </p>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                  </IonLabel>
                  <IonBadge color="success" slot="end">
                    Contribuyente
                  </IonBadge>
                </IonItem>
              ))}
            </IonList>
          )}
        </IonContent>
      </IonPage>
    );
  }