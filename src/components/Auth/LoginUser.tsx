import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAuthState,
  useAuthDispatch,
  authenticateUser,
} from "../../auth-context";
import AuthMethod from "../../enums/authMethod";
import Button from "../UI/Button";
import AuthActions from "../../enums/authActions";

import styles from "./auth.module.css";

const LoginUser: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const currentUserData = useAuthState();

  const [isEntering, setIsEntering] = useState<boolean>(false);

  const beginEnteringHandler = () => {
    setIsEntering(true);
  };
  const finishEnteringHandler = () => {
    setIsEntering(false);
  };

  const inputRefEmail = useRef<HTMLInputElement>(null);
  const inputRefPassword = useRef<HTMLInputElement>(null);

  const submitLoginHandler = async (event: FormEvent) => {
    event.preventDefault();

    if (inputRefEmail.current && inputRefPassword.current) {
      const enteredEmail: string = inputRefEmail.current.value;
      const enteredPassword: string = inputRefPassword.current.value;

      await authenticateUser(dispatch, {
        enteredEmail,
        enteredPassword,
        authenticationMethod: AuthMethod.LOGIN,
      });
    }
    if (
      errorMessage?.authErrorMessage === "" &&
      errorMessage?.serverErrorMessage === ""
    ) {
      navigate("/home", { replace: true });
    }
  };

  const { errorMessage } = currentUserData;

  // cleaning up errors
  useEffect(() => {
    return () => {
      dispatch({ type: AuthActions.AUTH_ERROR, error: undefined });
    };
  }, [dispatch]);

  return (
    <form onSubmit={submitLoginHandler} onFocus={beginEnteringHandler}>
      <div className={styles.control}>
        <label htmlFor="email">Enter your email</label>
        <input required type="email" id="email" ref={inputRefEmail} />
      </div>
      <div className={styles.control}>
        <label htmlFor="password">Enter your password</label>
        <input
          autoComplete="on"
          required
          type="password"
          id="password"
          ref={inputRefPassword}
        />
      </div>
      <div className={styles.actions}>
        {!currentUserData.isLoading && (
          <Button
            type="submit"
            className={styles.authButton}
            onClick={finishEnteringHandler}
          >
            Login
          </Button>
        )}
        {currentUserData.isLoading && (
          <p>Sending a login request to the server...</p>
        )}
        {errorMessage &&
          errorMessage.authErrorMessage !== "" &&
          !isEntering && (
            <p className={styles.errorText}>{errorMessage.authErrorMessage}</p>
          )}
        {errorMessage &&
          errorMessage.serverErrorMessage !== "" &&
          !isEntering && (
            <p className={styles.errorText}>
              {errorMessage.serverErrorMessage}
            </p>
          )}
      </div>
    </form>
  );
};

export default LoginUser;
