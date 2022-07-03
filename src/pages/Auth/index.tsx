import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, useAuthDispatch } from "../../auth-context";
import { useAuthState } from "../../auth-context";

import Button from "../../components/UI/Button";
import styles from "./auth.module.css";

const Authenticate: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const currentUserData = useAuthState();

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const AUTHENTICATION_METHOD: string = isLogin ? "LOGIN" : "SIGNUP";

  const switchAuthenticationModeHandler = () => {
    setIsLogin((previousState) => !previousState);
  };

  const inputRefEmail = useRef<HTMLInputElement>(null);
  const inputRefPassword = useRef<HTMLInputElement>(null);

  const submitLoginHandler = async (event: FormEvent) => {
    event.preventDefault();

    const enteredEmail: string = inputRefEmail.current!.value;
    const enteredPassword: string = inputRefPassword.current!.value;

    const authenticationPayload = {
      enteredEmail,
      enteredPassword,
      AUTHENTICATION_METHOD,
    };

    try {
      const response = await loginUser(dispatch, authenticationPayload);
      if (!response) {
        return;
      }
      navigate("/home", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.authContainer}>
      <h1>{isLogin ? "Login" : "Sign up"}</h1>
      <form onSubmit={submitLoginHandler}>
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
          {!currentUserData.loading && (
            <Button type="submit">
              {isLogin ? "Login" : "Create an account"}
            </Button>
          )}
          {currentUserData.loading && <p>Sending a request to the server...</p>}
          <Button
            type="button"
            className={styles.toggle}
            onClick={switchAuthenticationModeHandler}
          >
            {isLogin ? "Create an account" : "Login with existing account"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Authenticate;
