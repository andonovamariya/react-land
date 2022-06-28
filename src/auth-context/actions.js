const API_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDm3qU1JtOeESp3PrzMQQ0L9Mv0lXvnuWc";

export async function loginUser(dispatch, loginPayload) {
  const REQUEST_DETAILS = {
    method: "POST",
    body: JSON.stringify(loginPayload),
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
    dispatch({ type: "LOGIN_ERROR", error: error });
    console.log(error);
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
}
