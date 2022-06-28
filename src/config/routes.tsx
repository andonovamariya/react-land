//  contains config for the different routes in our application
import Authenticate from "../pages/Auth";
import Home from "../pages/Home";
import NotFound from "../pages/PageNotFound";

const routes = [
  { path: "/home", element: Home, isPrivate: true },
  { path: "/login", element: Authenticate, isPrivate: false },
  { path: "/*", element: NotFound, isPrivate: false },
];

export default routes;
