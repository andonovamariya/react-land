export interface Action {
  type: "REQUEST_AUTH" | "AUTH_SUCCESS" | "LOGOUT" | "AUTH_ERROR";
  payload?: { email: string; idToken: string };
  error?: string;
}

interface LoginPayload {
  enteredEmail: string;
  enteredPassword: string;
  AUTHENTICATION_METHOD: string;
}

export const loginUser = async (
  dispatch: React.Dispatch<Action>,
  payload: LoginPayload
) => {
  const { enteredEmail, enteredPassword, AUTHENTICATION_METHOD } = payload;

  const REQUEST_DETAILS = {
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
  let api_url: string;
  if (AUTHENTICATION_METHOD === "LOGIN") {
    api_url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDm3qU1JtOeESp3PrzMQQ0L9Mv0lXvnuWc";
  } else {
    api_url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDm3qU1JtOeESp3PrzMQQ0L9Mv0lXvnuWc";
  }

  try {
    dispatch({ type: "REQUEST_AUTH" });
    const response = await fetch(api_url, REQUEST_DETAILS);

    if (response.ok) {
      const responseData = await response.json();

      dispatch({ type: "AUTH_SUCCESS", payload: responseData });
      console.log(responseData);
      localStorage.setItem("currentUser", JSON.stringify(responseData));

      return responseData;
    } else {
      const responseData = await response.json();

      let errorMessage = "Authentication failed";
      if (responseData && responseData.error && responseData.error.message) {
        errorMessage = responseData.error.message;
      }

      dispatch({ type: "AUTH_ERROR", error: errorMessage });
      console.log(errorMessage);
    }
  } catch (error) {
    dispatch({ type: "AUTH_ERROR", error: getErrorMessage(error) });
    console.log(error);
  }
};

const getErrorMessage = (error: unknown): string | undefined => {
  if (error instanceof Error) {
    return String(error);
  }
  return;
};

export const logoutUser = async (dispatch: React.Dispatch<Action>) => {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
};
