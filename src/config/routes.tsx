//  contains config for the different routes in our application
import Authenticate from "../pages/Auth";
import GoodPractices from "../pages/GoodPractices";
import PracticeDetail from "../pages/GoodPractices/PracticeDetail";
import Home from "../pages/Home";
import NotFound from "../pages/PageNotFound";

const routes = [
  { path: "/", element: Home, isPrivate: true },
  { path: "/login", element: Authenticate, isPrivate: false },
  { path: "/home", element: Home, isPrivate: true },
  { path: "/goodPractices", element: GoodPractices, isPrivate: true },
  {
    path: "/goodPractices/:practiceId",
    element: PracticeDetail,
    isPrivate: true,
  },
  { path: "/*", element: NotFound, isPrivate: false },
];

export default routes;
