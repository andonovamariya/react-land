import { Action } from "./actions";

let currentUser: string = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")!).email
  : "";
let currentToken: string = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")!).idToken
  : "";

export const initialState: State = {
  user: "" || currentUser,
  token: "" || currentToken,
  loading: false,
  errorMessage: "",
};

export interface State {
  user: string;
  token: string;
  loading: boolean;
  errorMessage?: string;
}

export const AuthReducer = (initialState: State, action: Action): State => {
  switch (action.type) {
    case "REQUEST_AUTH":
      return {
        ...initialState,
        loading: true,
      };
    case "AUTH_SUCCESS":
      return {
        ...initialState,
        user: action.payload!.email,
        token: action.payload!.idToken,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: "",
        token: "",
      };

    case "AUTH_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
