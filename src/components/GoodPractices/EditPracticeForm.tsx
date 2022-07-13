import { useRef, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuthState } from "../../auth-context";
import GoodPractice from "../../models/goodPractice.model";
import Button from "../UI/Button";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";

import styles from "./EditPracticeForm.module.css";

interface NewPracticeFormProps {
  onEditPractice: (practiceData: GoodPractice) => void;
  isLoading: boolean;
}

interface LocationStateFromHighlightedPractice {
  goodPracticeData: GoodPractice;
}

const NewPracticeForm: React.FC<NewPracticeFormProps> = (props) => {
  const location = useLocation();
  const state = location.state as LocationStateFromHighlightedPractice;
  const { goodPracticeData } = state;

  const navigate = useNavigate();
  const currentUserData = useAuthState();

  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null);

  const submitFormHandler = (event: FormEvent) => {
    event.preventDefault();

    if (
      titleInputRef.current &&
      descriptionTextareaRef.current &&
      currentUserData.userEmail
    ) {
      const enteredTitle: string = titleInputRef.current.value;
      const enteredDescription: string = descriptionTextareaRef.current.value;

      props.onEditPractice({
        id: goodPracticeData.id,
        title: enteredTitle,
        description: enteredDescription,
        author: currentUserData.userEmail,
      });
    }
  };

  return (
    <>
      {props.isLoading && <LoadingSpinner />}
      <Card>
        <form className={styles.editPracticeForm} onSubmit={submitFormHandler}>
          <div className={styles.control}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              defaultValue={goodPracticeData.title}
              type="title"
              ref={titleInputRef}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              defaultValue={goodPracticeData.description}
              rows={10}
              ref={descriptionTextareaRef}
            ></textarea>
          </div>
          <div className={styles.actions}>
            <Button type="submit">Edit practice</Button>
          </div>
          <div className={styles.actions}>
            <Button type="button" onClick={() => navigate(-1)}>
              Go back
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default NewPracticeForm;
