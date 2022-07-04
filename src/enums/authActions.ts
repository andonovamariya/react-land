enum AuthActions {
  REQUEST_AUTH = "request",
  AUTH_SUCCESS = "success",
  LOGOUT = "logout",
  AUTH_ERROR = "authError",
}
export default AuthActions;

export const REQUEST_AUTH = AuthActions.REQUEST_AUTH;
export const AUTH_SUCCESS = AuthActions.AUTH_SUCCESS;
export const LOGOUT = AuthActions.LOGOUT;
export const AUTH_ERROR = AuthActions.AUTH_ERROR;