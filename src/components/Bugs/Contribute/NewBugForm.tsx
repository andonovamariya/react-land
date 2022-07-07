import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router";
import { useAuthState } from "../../../auth-context";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import LoadingSpinner from "../../UI/LoadingSpinner";

import styles from "./NewBugForm.module.css";

export interface InputtedDataBugs {
  title?: string;
  description?: string;
  author?: string;
  isSolved?: boolean;
}

interface NewBugFormProps {
  onAddBug: (bugData: InputtedDataBugs) => void;
  isLoading: boolean;
}

const NewBugForm: React.FC<NewBugFormProps> = (props) => {
  const navigate = useNavigate();
  const currentUserData = useAuthState();

  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null);

  const submitFormHandler = (event: FormEvent) => {
    event.preventDefault();
    const enteredTitle: string | undefined = titleInputRef.current?.value;
    const enteredDescription: string | undefined =
      descriptionTextareaRef.current?.value;

    props.onAddBug({
      title: enteredTitle,
      description: enteredDescription,
      author: currentUserData.userEmail,
      isSolved: false,
    });
  };

  return (
    <>
      {props.isLoading && <LoadingSpinner />}
      <Card>
        <form className={styles.addBugForm} onSubmit={submitFormHandler}>
          <div className={styles.control}>
            <label htmlFor="title">Title</label>
            <input type="title" id="title" ref={titleInputRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor="description">Description</label>
            <textarea id="description" rows={10} ref={descriptionTextareaRef} />
          </div>
          <div className={styles.actions}>
            <Button type="submit">Add bug</Button>
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

export default NewBugForm;
