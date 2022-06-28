import { PropsWithChildren } from "react";

import styles from "./Button.module.css";

interface ButtonProps {
  onClick?: () => void;
  type: "button" | "submit" | "reset";
  className?: string;
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = (props) => {
  return (
    <button
      type={props.type}
      className={
        props.className
          ? `${styles.button} ${props.className} `
          : `${styles.button}`
      }
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
export default Button;
