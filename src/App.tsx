import AppRoutes from "./components/AppRoutes";
import { AuthProvider } from "./auth-context";

const App = () => (
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>
);

export default App;
