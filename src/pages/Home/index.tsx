import { useAuthDispatch, useAuthState, logout } from "../../auth-context";
import { useNavigate } from "react-router-dom";

import Button from "../../components/UI/Button";
import reactLogo from "../../assets/react-logo.webp";
import styles from "./home.module.css";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const currentUserData = useAuthState();

  const logoutHandler = () => {
    logout(dispatch);
    navigate("/login", { replace: true });
  };

  return (
    <section className={styles.homeSection}>
      <h1>HOME PAGE</h1>
      <Button type="button" onClick={logoutHandler}>
        Logout
      </Button>
      <p>Welcome {currentUserData.user.enteredEmail}</p>
      <div className={styles["main-image"]}>
        <img src={reactLogo} alt="React logo" />
      </div>
    </section>
  );
};

export default Home;
