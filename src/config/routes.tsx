//  contains config for the different routes in our application
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Bugs from "../pages/Bugs";
import AddNewBug from "../pages/Bugs/AddNewBug";
import BugDetail from "../pages/Bugs/BugDetail";
import GoodPractices from "../pages/GoodPractices";
import AddNewPractice from "../pages/GoodPractices/AddNewPractice";
import PracticeDetail from "../pages/GoodPractices/PracticeDetail";
import Home from "../pages/Home";
import NotFound from "../pages/PageNotFound";

interface Route {
  path: string;
  element: React.FC;
  isPrivate: boolean;
}

const routes: Route[] = [
  { path: "/", element: Home, isPrivate: false },
  { path: "/home", element: Home, isPrivate: false },
  { path: "/login", element: Login, isPrivate: false },
  { path: "/register", element: Register, isPrivate: false },
  { path: "/goodPractices", element: GoodPractices, isPrivate: true },
  {
    path: "/goodPractices/:practiceId",
    element: PracticeDetail,
    isPrivate: true,
  },
  { path: "/addNewGoodPractice", element: AddNewPractice, isPrivate: true },
  { path: "/bugs", element: Bugs, isPrivate: true },
  { path: "/addNewBug", element: AddNewBug, isPrivate: true },
  { path: "/bugs/:bugId", element: BugDetail, isPrivate: true },
  { path: "/*", element: NotFound, isPrivate: false },
];

export default routes;
