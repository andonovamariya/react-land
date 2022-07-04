import AuthActions from "../../enums/authActions";

export interface LoginPayload {
  enteredEmail: string;
  enteredPassword: string;
  authenticationMethod: string;
}

export interface Action {
  type: AuthActions;
  payload?: Payload;
  error?: string;
}

interface Payload {
  email: string;
  idToken: string;
}
