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
}

interface Payload {
  email?: string;
  idToken?: string;
  errorObject?: {
    authErrorMessage: string;
    serverErrorMessage: string;
  };
}
