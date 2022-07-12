import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAuthState } from "../../auth-context";
import { deletePractice } from "../../services/api-good-practices";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import styles from "./HighlightedPractice.module.css";

interface HighlightedPracticeProps {
  practiceId: string;
  title: string;
  description: string;
  author: string;
}

const HighlightedPractice: React.FC<HighlightedPracticeProps> = (props) => {
  const currentUserData = useAuthState();
  const navigate = useNavigate();
  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  const deletePracticeHandler = () => {
    deletePractice(props.practiceId);
    navigate(-1);
  };

  return (
    <div className={styles.singlePractice}>
      <h3>{props.title}</h3>
      <h2>Created by: {props.author}</h2>
      <p>{props.description}</p>
      <Button
        type="button"
        className={styles.goBackButton}
        onClick={() => navigate(-1)}
      >
        Go back
      </Button>
      {currentUserData.userEmail === props.author && (
        <>
          <Link className={styles.linkEdit} to="/editGoodPractice">
            Edit practice
          </Link>

          <Button
            type="button"
            className={styles.deleteButton}
            onClick={() => setIsModalShown(true)}
          >
            Delete practice
          </Button>

          <Modal
            show={isModalShown}
            onClose={() => setIsModalShown(false)}
            onConfirm={deletePracticeHandler}
            title="Delete practice"
          />
        </>
      )}
    </div>
  );
};

export default HighlightedPractice;
