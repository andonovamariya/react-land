import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAuthState,
  useAuthDispatch,
  authenticateUser,
} from "../../auth-context";
import AuthMethod from "../../enums/authMethod";
import Button from "../UI/Button";

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
    let isLoginSuccessful: boolean = false;

    if (inputRefEmail.current && inputRefPassword.current) {
      const enteredEmail: string = inputRefEmail.current.value;
      const enteredPassword: string = inputRefPassword.current.value;

      isLoginSuccessful = await authenticateUser(dispatch, {
        enteredEmail,
        enteredPassword,
        authenticationMethod: AuthMethod.LOGIN,
      });
    }
    if (isLoginSuccessful) {
      navigate("/home", { replace: true });
    }
  };

  const authError: string | undefined =
    currentUserData?.errorObject?.authErrorMessage;
  const serverError: string | undefined =
    currentUserData?.errorObject?.serverErrorMessage;

  const errorContent = (
    <p className="errorText">{authError || serverError}</p>
  );

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
      <div className="actions">
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
          <p className="warningText">
            Sending a login request to the server...
          </p>
        )}
        {!isEntering && currentUserData.errorObject ? errorContent : null}
      </div>
    </form>
  );
};

export default LoginUser;
