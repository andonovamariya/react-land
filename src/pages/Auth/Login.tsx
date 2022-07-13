import { Link } from "react-router-dom";
import LoginUser from "../../components/Auth/LoginUser";

import styles from "./auth.module.css";

const Login: React.FC = () => (
  <div className={styles.authContainer}>
    <h1 className={styles.authHeader}>Login</h1>
    <LoginUser />
    <Link className={styles.authLink} to="/register">
      Sign up
    </Link>
  </div>
);

export default Login;
