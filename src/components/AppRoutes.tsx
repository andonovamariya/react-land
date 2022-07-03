// used to define protected routes(routes that can only be accessed by authenticated users)
import { Routes, Route, Navigate } from "react-router-dom";
import routes from "../config/routes";
import { useAuthState } from "../auth-context";
import Layout from "./layout/Layout";

const AppRoutes = () => {
  const currentUserData = useAuthState();
  const isUserLogged: boolean = currentUserData.token ? true : false;

  return (
    <Layout>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            
            element={
              route.isPrivate && !Boolean(isUserLogged) ? (
                <Navigate to={{ pathname: "/auth" }} />
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
