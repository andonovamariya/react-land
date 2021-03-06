import { useRef, FormEvent } from "react";
import { useNavigate } from "react-router";
import { useAuthState } from "../../auth-context";
import Button from "../UI/Button";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";

import styles from "./AddNewPractice.module.css";

export interface InputDataPractices {
  title: string;
  description: string;
  author: string;
}

interface AddNewPracticeProps {
  onAddPractice: (practiceData: InputDataPractices) => void;
  isLoading: boolean;
}

const AddNewPractice: React.FC<AddNewPracticeProps> = (props) => {
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

      props.onAddPractice({
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
        <form className={styles.addPracticeForm} onSubmit={submitFormHandler}>
          <div className={styles.control}>
            <label htmlFor="title">Title</label>
            <input type="title" id="title" ref={titleInputRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows={10}
              ref={descriptionTextareaRef}
            ></textarea>
          </div>
          <div className="actions">
            <Button type="submit">Add a good practice</Button>
          </div>
          <div className="actions">
            <Button type="button" onClick={() => navigate(-1)}>
              Go back
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default AddNewPractice;
