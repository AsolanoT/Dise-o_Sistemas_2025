import { IonPage, IonContent } from "@ionic/react";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import "./Login.css";

const Login: React.FC = () => {
  const handleLogin = () => {
    // Add your login logic here
    console.log("Login button clicked");
  };

  return (
    <IonPage id="main-content">
      <CustomHeader pageName="Login" showMenuButton={false} />
      <IonContent className="login-content">
        <div className="login-container">
          <div className="neumorphic-card">
            <h1>Login</h1>
            <input
              type="text"
              className="neumorphic-input"
              placeholder="Username"
            />
            <input
              type="password"
              className="neumorphic-input"
              placeholder="Password"
            />
            <button className="neumorphic-button" onClick={handleLogin}>
              Sign In
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
