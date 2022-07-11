import { logoutUser, useAuthDispatch, useAuthState } from "../../auth-context";

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
          <li>
            <NavLink
              to="/home"
              className={(navData) =>
                navData.isActive ? styles.active : styles.navLink
              }
            >
              Home
            </NavLink>
          </li>
          {currentUserData.userToken && (
            <>
              <li>
                <NavLink
                  to="/goodPractices"
                  className={(navData) =>
                    navData.isActive ? styles.active : styles.navLink
                  }
                >
                  Good practices
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/bugs"
                  className={(navData) =>
                    navData.isActive ? styles.active : styles.navLink
                  }
                >
                  Bugs
                </NavLink>
              </li>
            </>
          )}
          <li className={styles.greeting}>{greeting}</li>

          {currentUserData.userToken !== "" ? (
            <li>
              <Button
                type="button"
                onClick={logoutHandler}
                className={styles.authButton}
              >
                Logout
              </Button>
            </li>
          ) : (
            <li>
              <NavLink
                to="/login"
                className={(navData) =>
                  navData.isActive ? styles.active : styles.navLink
                }
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
