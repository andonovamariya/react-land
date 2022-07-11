import React from "react";
import AuthMethod from "../enums/authMethod";
import AuthActions from "../enums/authActions";
import { Action, AuthenticatePayload } from "../models/Auth";
import { getErrorMessage } from "../helpers";

// export const clearError: (
//   dispatch: React.Dispatch<Action>
// ) => Promise<any> = async (dispatch) => {
//   dispatch({ type: AuthActions.CLEAR_ERROR });
// };

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
      console.log(responseData, "responseData");
      if (responseData && responseData.error.message) {
        errorMessage = responseData.error.message;
      }
      console.log(errorMessage, "errorObject from authActions");

      dispatch({
        type: AuthActions.AUTH_ERROR,
        payload: {
          errorObject: {
            authErrorMessage: errorMessage,
            serverErrorMessage: "",
          },
        },
      });
    }
  } catch (error) {
    const availableServerError: string | undefined = getErrorMessage(error);
    if (availableServerError) {
      dispatch({
        type: AuthActions.AUTH_ERROR,
        payload: {
          errorObject: {
            authErrorMessage: "",
            serverErrorMessage: availableServerError,
          },
        },
      });
    } else {
      const defaultServerError: string =
        "Something went wrong with fetching the data from the server.";
      dispatch({
        type: AuthActions.AUTH_ERROR,
        payload: {
          errorObject: {
            authErrorMessage: "",
            serverErrorMessage: defaultServerError,
          },
        },
      });
    }
  }
};

export const logoutUser = (dispatch: React.Dispatch<Action>): void => {
  dispatch({ type: AuthActions.LOGOUT });
  localStorage.removeItem("currentUser");
};
