// simply exports the contents of the three other files

import { loginUser, logoutUser } from "./actions";
import { AuthProvider, useAuthDispatch, useAuthState } from "./context";

export { AuthProvider, useAuthState, useAuthDispatch, loginUser, logoutUser };
