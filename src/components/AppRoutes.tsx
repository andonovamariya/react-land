// used to define protected routes(routes that can only be accessed by authenticated users)
import { Routes, Route, Navigate } from "react-router-dom";
import routes from "../config/routes";
import { useAuthState } from "../auth-context";
import Layout from "./Layout/Layout";

const AppRoutes = () => {
  const currentUserData = useAuthState();
  const isUserLogged: boolean = currentUserData && currentUserData.userToken !== "";

  return (
    <Layout>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.isPrivate && !isUserLogged ? (
                <Navigate to={{ pathname: "/home" }} />
              ) : (
                <route.element />
              )
            }
          />
        ))}
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
