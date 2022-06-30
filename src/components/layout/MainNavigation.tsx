import { useAuthDispatch, logoutUser, useAuthState } from "../../auth-context";
import { useNavigate } from "react-router-dom";

import { NavLink } from "react-router-dom";
import Button from "../UI/Button";

import styles from "./MainNavigation.module.css";
import { useEffect, useState } from "react";

const MainNavigation: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const currentUserData = useAuthState();

  const logoutHandler = () => {
    logoutUser(dispatch);
    setIsLoggedIn(false);
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    if (currentUserData.user.length > 0) {
      setIsLoggedIn((prevState) => !prevState);
    }
  }, [currentUserData.user]);

  const greeting: string =
    currentUserData.user.length > 0
      ? `Welcome ${currentUserData.user}`
      : "Welcome stranger";

  return (
    <header className={styles.header}>
      <div className={styles.logo}>React Land Blog</div>
      <nav className={styles.nav}>
        <ul>
          <li>{greeting}</li>
          <li>
            <NavLink
              to="/home"
              className={(navData) => (navData.isActive ? styles.active : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/goodPractices"
              className={(navData) => (navData.isActive ? styles.active : "")}
            >
              Good practices
            </NavLink>
          </li>
          <li>
            {isLoggedIn && (
              <Button type="button" onClick={logoutHandler}>
                Logout
              </Button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
