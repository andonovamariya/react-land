import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router";
import { useAuthState } from "../../../auth-context";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import LoadingSpinner from "../../UI/LoadingSpinner";

import styles from "./AddNewBug.module.css";

export interface InputDataBugs {
  title: string;
  description: string;
  authorEmail: string;
  isSolved: boolean;
}

interface AddNewBugProps {
  onAddBug: (bugData: InputDataBugs) => void;
  isLoading: boolean;
}

const AddNewBug: React.FC<AddNewBugProps> = (props) => {
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

      props.onAddBug({
        title: enteredTitle,
        description: enteredDescription,
        authorEmail: currentUserData.userEmail,
        isSolved: false,
      });
    }
  };

  return (
    <>
      {props.isLoading && <LoadingSpinner />}
      <Card>
        <form className={styles.addBugForm} onSubmit={submitFormHandler}>
          <div className={styles.control}>
            <label htmlFor="title">Title</label>
            <input type="title" id="title" ref={titleInputRef} required />
          </div>
          <div className={styles.control}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows={10}
              ref={descriptionTextareaRef}
              required
            />
          </div>
          <div className="actions">
            <Button type="submit">Add bug</Button>
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

export default AddNewBug;
