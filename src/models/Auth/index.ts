import AuthActions from "../../enums/authActions";
import AuthMethod from "../../enums/authMethod";

export interface AuthenticatePayload {
  enteredEmail: string;
  enteredPassword: string;
  authenticationMethod: AuthMethod;
}

export interface AuthenticationError {
  authErrorMessage?: string;
  serverErrorMessage?: string;
}

export interface Action {
  type: AuthActions;
  payload?: Payload;
  error?: AuthenticationError;
}

interface Payload {
  email: string;
  idToken: string;
}
