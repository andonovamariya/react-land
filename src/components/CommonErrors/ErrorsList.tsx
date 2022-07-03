import Error from "../../models/commonError.model";
import ErrorItem from "./ErrorItem";
import styles from "./ErrorsList.module.css";

interface ErrorsListProps {
  errors: Error[];
}

const ErrorsList: React.FC<ErrorsListProps> = (props) => {
  return (
    <ul className={styles.commonErrors}>
      {props.errors.map((error) => (
        <ErrorItem
          key={error.id}
          id={error.id}
          title={error.title}
          status={error.isSolved}
        />
      ))}
    </ul>
  );
};

export default ErrorsList;
