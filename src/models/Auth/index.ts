import AuthActions from "../../enums/authActions";
import AuthMethod from "../../enums/authMethod";

export interface AuthenticatePayload {
  enteredEmail: string;
  enteredPassword: string;
  authenticationMethod: AuthMethod;
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
