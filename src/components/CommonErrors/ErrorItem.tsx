import { Link } from "react-router-dom";
import styles from "./ErrorItem.module.css";

interface ErrorItemProps {
  id: string;
  title: string;
  status: boolean;
}

const getErrorItemStyle = (errorStatus: boolean): string => {
  const ERROR_STYLING: string = errorStatus
    ? styles.errorItemSolved
    : styles.errorItemNotSolved;

  return ERROR_STYLING;
};

const ErrorItem: React.FC<ErrorItemProps> = (props) => {
  return (
    <li className={getErrorItemStyle(props.status)}>
      <h3>{props.title}</h3>
      {props.status && (
        <Link className={styles.link} to={`commonErrors/${props.id}`}>
          View solving
        </Link>
      )}
      {!props.status && (
        <Link className={styles.link} to={`commonErrors/${props.id}`}>
          Solve
        </Link>
      )}
    </li>
  );
};

export default ErrorItem;
