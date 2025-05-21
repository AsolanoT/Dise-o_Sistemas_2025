// src/components/RoleRedirector.tsx
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { authService } from "../services/role.service";

const RoleRedirector = () => {
  const history = useHistory(); // Reemplazado useNavigate por useHistory

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (!user) {
      history.push("/login"); // Cambiado navigate() por history.push()
      return;
    }

    switch (user.role?.nombre) {
      case "ROLE_ADMIN":
        history.push("/admin");
        break;
      case "ROLE_ENTIDAD_PUBLICA":
        history.push("/entidad");
        break;
      case "ROLE_CONTRIBUYENTE":
        history.push("/contribuyente");
        break;
      default:
        history.push("/login");
    }
  }, [history]); // Dependencia actualizada

  return null;
};

export default RoleRedirector;
