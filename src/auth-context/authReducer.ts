import {
  AUTH_ERROR,
  AUTH_SUCCESS,
  LOGOUT,
  REQUEST_AUTH,
} from "../enums/authActions";
import { Action } from "../models/Auth";

let currentUser: string = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")!).email
  : "";
let currentToken: string = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")!).idToken
  : "";

export const initialState: State = {
  userEmail: currentUser,
  userToken: currentToken,
  isLoading: false,
  errorMessage: "",
};

export interface State {
  userEmail?: string;
  userToken?: string;
  isLoading: boolean;
  errorMessage?: string;
}

export const AuthReducer = (initialState: State, action: Action): State => {
  switch (action.type) {
    case REQUEST_AUTH:
      return {
        ...initialState,
        isLoading: true,
      };
    case AUTH_SUCCESS:
      return {
        ...initialState,
        userEmail: action.payload?.email,
        userToken: action.payload?.idToken,
        isLoading: false,
      };
    case LOGOUT:
      return {
        ...initialState,
        userEmail: "",
        userToken: "",
      };

    case AUTH_ERROR:
      return {
        ...initialState,
        isLoading: false,
        errorMessage: action.error,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
