import { LOGIN_API, REGISTER_API } from "../config/apis";
import {
  AUTH_ERROR,
  AUTH_SUCCESS,
  LOGOUT,
  REQUEST_AUTH,
} from "../enums/authActions";
import { getErrorMessage } from "../helpers";
import { Action, LoginPayload } from "../models/Auth";

export const loginUser: (
  dispatch: React.Dispatch<Action>,
  payload: LoginPayload
) => Promise<any> = async (
  dispatch: React.Dispatch<Action>,
  payload: LoginPayload
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

  let api_url: string =
    authenticationMethod === "LOGIN" ? LOGIN_API : REGISTER_API;

  try {
    dispatch({ type: REQUEST_AUTH });
    const response = await fetch(api_url, requestDetails);

    if (response.ok) {
      const responseData = await response.json();

      dispatch({ type: AUTH_SUCCESS, payload: responseData });
      console.log(responseData);
      localStorage.setItem("currentUser", JSON.stringify(responseData));

      return responseData;
    } else {
      const responseData = await response.json();

      let errorMessage = "Authentication failed";
      if (responseData && responseData.error && responseData.error.message) {
        errorMessage = responseData.error.message;
      }

      dispatch({ type: AUTH_ERROR, error: errorMessage });
      console.log(errorMessage);
      return errorMessage;
    }
  } catch (error) {
    dispatch({ type: AUTH_ERROR, error: getErrorMessage(error) });
    console.log(error);
  }
};

export const logoutUser = (dispatch: React.Dispatch<Action>): void => {
  dispatch({ type: LOGOUT });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
};
