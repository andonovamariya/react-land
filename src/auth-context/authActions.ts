import React from "react";
import AuthMethod from "../enums/authMethod";
import AuthActions from "../enums/authActions";
import { Action, AuthenticatePayload } from "../models/Auth";
import { getErrorMessage } from "../helpers";


export const authenticateUser: (
  dispatch: React.Dispatch<Action>,
  payload: AuthenticatePayload
) => Promise<any> = async (
  dispatch: React.Dispatch<Action>,
  payload: AuthenticatePayload
) => {
  const { enteredEmail, enteredPassword, authenticationMethod } = payload;

  const requestDetails = {
    method: "POST",
    body: JSON.stringify({
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: false,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch({ type: AuthActions.REQUEST_AUTH });

    const response = await fetch(
      authenticationMethod === AuthMethod.LOGIN
        ? AuthMethod.LOGIN
        : AuthMethod.REGISTER,
      requestDetails
    );

    if (response.ok) {
      const responseData = await response.json();

      dispatch({ type: AuthActions.AUTH_SUCCESS, payload: responseData });
      localStorage.setItem("currentUser", JSON.stringify(responseData));
      return responseData;
    } else {
      const responseData = await response.json();

      let errorMessage: string = "Authentication failed";
      if (responseData && responseData.error && responseData.error.message) {
        errorMessage = responseData.error.message;
      }

      dispatch({ type: AuthActions.AUTH_ERROR, error: errorMessage });
      return errorMessage;
    }
  } catch (error) {
    dispatch({ type: AuthActions.AUTH_ERROR, error: getErrorMessage(error) });
    return getErrorMessage(error);
  }
};

export const logoutUser = (dispatch: React.Dispatch<Action>): void => {
  dispatch({ type: AuthActions.LOGOUT });
  localStorage.removeItem("currentUser");
};
