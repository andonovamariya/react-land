import { useNavigate } from "react-router";
import Button from "../../UI/Button";
import styles from "./SolvedBug.module.css";

interface SolvedBugProps {
  title: string;
  description: string;
  author: string;
  fixer: string;
}

const SolvedBug: React.FC<SolvedBugProps> = (props) => {
  const navigate = useNavigate();
  return (
    <div className={styles.singleBug}>
      <h2>Bug: {props.title}</h2>
      <h2>Originally uploaded by: {props.author}</h2>
      <h2>Solved by: {props.fixer}</h2>
      <p>Description: {props.description}</p>
      <Button
        type="button"
        className={styles.goBackButton}
        onClick={() => navigate(-1)}
      >
        Go back
      </Button>
    </div>
  );
};

export default SolvedBug;
