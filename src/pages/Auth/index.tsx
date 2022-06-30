import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser, useAuthDispatch } from "../../auth-context";
import Button from "../../components/UI/Button";
import styles from "./auth.module.css";

const Authenticate: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();

  const inputRefEmail = useRef<HTMLInputElement>(null);
  const inputRefPassword = useRef<HTMLInputElement>(null);

  const submitLoginHandler = async (event: FormEvent) => {
    event.preventDefault();

    const enteredEmail: string = inputRefEmail.current!.value;
    const enteredPassword: string = inputRefPassword.current!.value;

    const payload = { enteredEmail, enteredPassword };

    try {
      const response = await loginUser(dispatch, payload);
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
      <h1>Login</h1>
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
          <Button type="submit">Login</Button>
        </div>
      </form>
    </section>
  );
};

export default Authenticate;
