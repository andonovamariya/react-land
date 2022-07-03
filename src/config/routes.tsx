//  contains config for the different routes in our application
import Authenticate from "../pages/Auth";
import CommonErrors from "../pages/CommonErrors";
import GoodPractices from "../pages/GoodPractices";
import AddNewPractice from "../pages/GoodPractices/AddNewPractice";
import PracticeDetail from "../pages/GoodPractices/PracticeDetail";
import Home from "../pages/Home";
import NotFound from "../pages/PageNotFound";

interface Route {
  path: string;
  element: React.FC<{}>;
  isPrivate: boolean;
}

const routes: Route[] = [
  { path: "/", element: Home, isPrivate: true },
  { path: "/home", element: Home, isPrivate: true },
  { path: "/auth", element: Authenticate, isPrivate: false },
  { path: "/goodPractices", element: GoodPractices, isPrivate: true },
  {
    path: "/goodPractices/:practiceId",
    element: PracticeDetail,
    isPrivate: true,
  },
  { path: "/addNewGoodPractice", element: AddNewPractice, isPrivate: true },
  { path: "/commonErrors", element: CommonErrors, isPrivate: true },
  { path: "/*", element: NotFound, isPrivate: false },
];

export default routes;
