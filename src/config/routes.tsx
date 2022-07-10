//  contains config for the different routes in our application
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Bugs from "../pages/Bugs";
import AddNewBug from "../pages/Bugs/AddNewBug";
import AddSolution from "../pages/Bugs/AddSolution";
import SolvedBugDetails from "../pages/Bugs/SolvedBugs/SolvedBugDetails";
import UnsolvedBugDetails from "../pages/Bugs/UnsolvedBugs/UnsolvedBugDetails";
import GoodPractices from "../pages/GoodPractices";
import AddNewPractice from "../pages/GoodPractices/AddNewPractice";
import EditPractice from "../pages/GoodPractices/EditPractice";
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
  { path: "/editGoodPractice", element: EditPractice, isPrivate: true },
  { path: "/bugs", element: Bugs, isPrivate: true },
  { path: "/addNewBug", element: AddNewBug, isPrivate: true },
  { path: "/solvedBugs/:bugId", element: SolvedBugDetails, isPrivate: true },
  { path: "/unSolvedBugs/:bugId", element: UnsolvedBugDetails, isPrivate: true },
  { path: "/unSolvedBugs/:bugId/contribute", element: AddSolution, isPrivate: true },
  { path: "/*", element: NotFound, isPrivate: false },
];

export default routes;
