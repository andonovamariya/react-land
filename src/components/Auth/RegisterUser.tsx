import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router";
import {
  authenticateUser,
  useAuthDispatch,
  useAuthState,
} from "../../auth-context";
import AuthMethod from "../../enums/authMethod";
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
    let isRegisterSuccessful: boolean = false;

    if (inputRefEmail.current && inputRefPassword.current) {
      const enteredEmail: string = inputRefEmail.current.value;
      const enteredPassword: string = inputRefPassword.current.value;

      isRegisterSuccessful = await authenticateUser(dispatch, {
        enteredEmail,
        enteredPassword,
        authenticationMethod: AuthMethod.REGISTER,
      });
    }
    if (isRegisterSuccessful) {
      navigate("/home", { replace: true });
    }
  };

  const authError: string | undefined =
    currentUserData?.errorObject?.authErrorMessage;
  const serverError: string | undefined =
    currentUserData?.errorObject?.serverErrorMessage;

  const errorContent = (
    <p className={styles.errorAuth}>{authError || serverError}</p>
  );

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
          <p className={styles.warningAuth}>
            Sending a register request to the server...
          </p>
        )}
        {!isEntering && currentUserData.errorObject ? errorContent : null}
      </div>
    </form>
  );
};

export default Register;
