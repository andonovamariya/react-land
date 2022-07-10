import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import {
  authenticateUser,
  useAuthDispatch,
  useAuthState,
} from "../../auth-context";
import AuthActions from "../../enums/authActions";
import AuthMethod from "../../enums/authMethod";
import { isErrorObjectEmpty } from "../../helpers";
import Button from "../UI/Button";

import styles from "./auth.module.css";

const Register: React.FC = () => {
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

  const submitRegisterHandler = async (event: FormEvent) => {
    event.preventDefault();

    if (inputRefEmail.current && inputRefPassword.current) {
      const enteredEmail: string = inputRefEmail.current.value;
      const enteredPassword: string = inputRefPassword.current.value;

      await authenticateUser(dispatch, {
        enteredEmail,
        enteredPassword,
        authenticationMethod: AuthMethod.REGISTER,
      });
    }

    // if (isErrorObjectEmpty(errorObject)) {
    //   navigate("/home", { replace: true });
    // }
  };

  useEffect(() => {
    return () => {
      dispatch({ type: AuthActions.AUTH_ERROR });
    };
  }, [dispatch]);

  return (
    <form onSubmit={submitRegisterHandler} onFocus={beginEnteringHandler}>
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
            Register
          </Button>
        )}
        {currentUserData.isLoading && (
          <p>Sending a register request to the server...</p>
        )}
        {/* {errorObject && errorObject.authErrorMessage && !isEntering && (
          <p className={styles.errorText}>{errorObject.authErrorMessage}</p>
        )}
        {errorObject && errorObject.serverErrorMessage && !isEntering && (
          <p className={styles.errorText}>{errorObject.serverErrorMessage}</p>
        )} */}
      </div>
    </form>
  );
};

export default Register;