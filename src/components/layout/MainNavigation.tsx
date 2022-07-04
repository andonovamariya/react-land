import { logoutUser, useAuthDispatch, useAuthState } from "../../auth-context";
import { Link } from "react-router-dom";

import { NavLink } from "react-router-dom";

import styles from "./MainNavigation.module.css";
import Button from "../UI/Button";

const MainNavigation: React.FC = () => {
  const currentUserData = useAuthState();
  const dispatch = useAuthDispatch();

  const greeting: string = `Welcome, ${
    currentUserData.userEmail && currentUserData.userEmail.length > 0
      ? currentUserData.userEmail
      : "stranger"
  }`;

  const logoutHandler = () => {
    logoutUser(dispatch);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>React Land Blog</div>

      <nav className={styles.nav}>
        <ul>
          {currentUserData.userToken && (
            <li>
              <NavLink
                to="/home"
                className={(navData) => (navData.isActive ? styles.active : "")}
              >
                Home
              </NavLink>
            </li>
          )}

          {currentUserData.userToken && (
            <li>
              <NavLink
                to="/goodPractices"
                className={(navData) => (navData.isActive ? styles.active : "")}
              >
                Good practices
              </NavLink>
            </li>
          )}
          {currentUserData.userToken && (
            <li>
              <NavLink
                to="/commonErrors"
                className={(navData) => (navData.isActive ? styles.active : "")}
              >
                Common errors
              </NavLink>
            </li>
          )}
          <li className={styles.greeting}>{greeting}</li>
          {currentUserData.userToken ? (
            <li>
              <Button type="button" onClick={logoutHandler}>
                Logout
              </Button>
            </li>
          ) : (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
