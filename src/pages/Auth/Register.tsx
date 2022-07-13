import { Link } from "react-router-dom";
import RegisterUser from "../../components/Auth/RegisterUser";

import styles from "./auth.module.css";

const Register = () => (
  <div className={styles.authContainer}>
    <h1 className={styles.authHeader}>Register</h1>
    <RegisterUser />
    <Link className={styles.authLink} to="/login">
      Sign in
    </Link>
  </div>
);
export default Register;
