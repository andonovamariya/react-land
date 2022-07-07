import { useNavigate } from "react-router";
import { deletePractice } from "../../services/api-good-practices";
import Button from "../UI/Button";
import styles from "./HighlightedPractice.module.css";

interface HighlightedPracticeProps {
  practiceId: string;
  title: string;
  description: string;
}

const HighlightedPractice: React.FC<HighlightedPracticeProps> = (props) => {
  const navigate = useNavigate();

  const deletePracticeHandler = () => {
    deletePractice(props.practiceId);
    navigate(-1);
  };

  return (
    <div className={styles.singlePractice}>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      <Button
        type="button"
        className={styles.goBackButton}
        onClick={() => navigate(-1)}
      >
        Go back
      </Button>
      <Button
        type="button"
        className={styles.deleteButton}
        onClick={deletePracticeHandler}
      >
        Delete practice
      </Button>
    </div>
  );
};

export default HighlightedPractice;
