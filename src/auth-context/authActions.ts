import React from "react";
import AuthMethod from "../enums/authMethod";
import AuthActions from "../enums/authActions";
import { Action, AuthenticatePayload } from "../models/Auth";
import { getErrorMessage } from "../helpers";

export const authenticateUser: (
  dispatch: React.Dispatch<Action>,
  payload: AuthenticatePayload
) => Promise<any> = async (dispatch, payload) => {
  const { enteredEmail, enteredPassword, authenticationMethod } = payload;

  console.log(payload);
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
      let errorObject = { authErrorMessage: "", serverErrorMessage: "" };
      if (responseData && responseData.error.length !== 0) {
        errorObject.authErrorMessage = responseData.error.message;
      } else {
        errorObject.authErrorMessage = errorMessage;
      }

      dispatch({ type: AuthActions.AUTH_ERROR, error: errorObject });
      return errorObject;
    }
  } catch (error) {
    const availableServerError: string | undefined = getErrorMessage(error);
    if (availableServerError) {
      let errorObject = {
        authErrorMessage: "",
        serverErrorMessage: availableServerError,
      };

      dispatch({ type: AuthActions.AUTH_ERROR, error: errorObject });
      return errorObject;
    } else {
      const defaultServerError: string =
        "Something went wrong with fetching the data from the server.";
      let errorObject = {
        authErrorMessage: "",
        serverErrorMessage: defaultServerError,
      };
      dispatch({
        type: AuthActions.AUTH_ERROR,
        error: errorObject
      });
      return errorObject;
    }
  }
};

export const logoutUser = (dispatch: React.Dispatch<Action>): void => {
  dispatch({ type: AuthActions.LOGOUT });
  localStorage.removeItem("currentUser");
};