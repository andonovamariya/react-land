const API_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDm3qU1JtOeESp3PrzMQQ0L9Mv0lXvnuWc";

interface LoginPayload {
  enteredEmail: string;
  enteredPassword: string;
}

export interface Action {
  type: "REQUEST_LOGIN" | "LOGIN_SUCCESS" | "LOGOUT" | "LOGIN_ERROR";
  payload?: { email: string; idToken: string };
  error?: string;
}

export const loginUser = async (
  dispatch: React.Dispatch<Action>,
  payload: LoginPayload
) => {
  const { enteredEmail, enteredPassword } = payload;

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

  try {
    dispatch({ type: "REQUEST_LOGIN" });
    const response = await fetch(API_URL, REQUEST_DETAILS);

    if (response.ok) {
      const responseData = await response.json();

      dispatch({ type: "LOGIN_SUCCESS", payload: responseData });
      console.log(responseData);
      localStorage.setItem("currentUser", JSON.stringify(responseData));

      return responseData;
    } else {
      const responseData = await response.json();

      let errorMessage = "Authentication failed";
      if (responseData && responseData.error && responseData.error.message) {
        errorMessage = responseData.error.message;
      }

      dispatch({ type: "LOGIN_ERROR", error: errorMessage });
      console.log(errorMessage);
    }
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: getErrorMessage(error) });
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
