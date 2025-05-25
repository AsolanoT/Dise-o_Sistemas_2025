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
    IonRefresherContent,
    IonAlert
  } from '@ionic/react';
  import { trash, create, person, arrowBack } from 'ionicons/icons';
  import { useEffect, useState } from 'react';
  import { useHistory } from 'react-router-dom';
  import './user.css';
import { deleteUser, fetchUsers } from '../../../../services/auth.service';
  
  export function ViewUsers() {
    const [users, setUsers] = useState<any[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);
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
        setUsers(usersData);
        setFilteredUsers(usersData);
      } catch (error: any) {
        present({
          message: error.message || 'Error al cargar usuarios',
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
  
    // Función para buscar usuarios
    const handleSearch = (event: CustomEvent) => {
      const query = event.detail.value?.toLowerCase() || '';
      setFilteredUsers(
        users.filter(
          (user) =>
            user.nombre.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.documentNumber.toLowerCase().includes(query)
        )
      );
    };
  
    // Función para confirmar eliminación
    const confirmDelete = (userId: string) => {
      setUserToDelete(userId);
      setShowAlert(true);
    };
  
    // Función para eliminar usuario
    const handleDelete = async () => {
      if (!userToDelete) return;
      
      try {
        setIsLoading(true);
        await deleteUser(userToDelete);
        present({
          message: 'Usuario eliminado correctamente',
          duration: 3000,
          position: 'top',
          color: 'success'
        });
        await loadUsers();
      } catch (error: any) {
        present({
          message: error.message || 'Error al eliminar usuario',
          duration: 3000,
          position: 'top',
          color: 'danger'
        });
      } finally {
        setIsLoading(false);
        setShowAlert(false);
        setUserToDelete(null);
      }
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
            <IonTitle>Lista de Usuarios</IonTitle>
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
            placeholder="Buscar usuarios..."
            debounce={500}
            onIonChange={handleSearch}
          />
  
          {isLoading ? (
            <IonLoading isOpen={true} message="Cargando usuarios..." />
          ) : filteredUsers.length === 0 ? (
            <div className="ion-text-center ion-padding">
              <IonText color="medium">No se encontraron usuarios</IonText>
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
                    <h2>{user.nombre}</h2>
                    <p>
                      <IonText color="medium">
                        {formatDocumentType(user.documentType)}: {user.documentNumber}
                      </IonText>
                    </p>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                  </IonLabel>
                  <IonBadge color="medium" slot="end">
                    {user.role}
                  </IonBadge>
                  <IonButtons slot="end">
                    <IonButton
                      color="primary"
                      onClick={() => history.push(`/users/edit/${user.id}`)}
                    >
                      <IonIcon icon={create} />
                    </IonButton>
                    <IonButton
                      color="danger"
                      onClick={() => confirmDelete(user.id)}
                    >
                      <IonIcon icon={trash} />
                    </IonButton>
                  </IonButtons>
                </IonItem>
              ))}
            </IonList>
          )}
        </IonContent>
  
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Confirmar eliminación"
          message="¿Estás seguro de que deseas eliminar este usuario?"
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel'
            },
            {
              text: 'Eliminar',
              handler: handleDelete
            }
          ]}
        />
      </IonPage>
    );
  }