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

    const enteredEmail: string = inputRefEmail.current!.value;
    const enteredPassword: string = inputRefPassword.current!.value;

    await authenticateUser(dispatch, {
      enteredEmail,
      enteredPassword,
      authenticationMethod: AuthMethod.LOGIN,
    });

    if (!currentUserData.errorMessage) {
      navigate("/home");
    }
  };

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
        {currentUserData.errorMessage && !isEntering && (
          <p className={styles.errorText}>{currentUserData.errorMessage}</p>
        )}
      </div>
    </form>
  );
};

export default LoginUser;
