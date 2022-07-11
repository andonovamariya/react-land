import AuthActions from "../enums/authActions";
import { Action } from "../models/Auth";

const currentUserEmail: string = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")!).email
  : "";
const currentUserToken: string = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")!).idToken
  : "";

export const initialState: State = {
  userEmail: currentUserEmail,
  userToken: currentUserToken,
  isLoading: false,
};

export interface State {
  userEmail?: string;
  userToken?: string;
  isLoading: boolean;
  errorObject?: {
    authErrorMessage: string;
    serverErrorMessage: string;
  };
}

export const AuthReducer = (initialState: State, action: Action): State => {
  switch (action.type) {
    case AuthActions.REQUEST_AUTH:
      return {
        ...initialState,
        isLoading: true,
      };
    case AuthActions.AUTH_SUCCESS:
      return {
        ...initialState,
        userEmail: action.payload?.email,
        userToken: action.payload?.idToken,
        isLoading: false,
      };
    case AuthActions.LOGOUT:
      return {
        ...initialState,
        userEmail: "",
        userToken: "",
      };

    case AuthActions.AUTH_ERROR:
      return {
        ...initialState,
        isLoading: false,
        errorObject: action.payload?.errorObject,
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...initialState,
        isLoading: false,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
