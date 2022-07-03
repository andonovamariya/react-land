import { useRef, FormEvent } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";

import styles from "./NewPracticeForm.module.css";

export interface InputtedData {
  title: string;
  description: string;
}

interface NewPracticeFormProps {
  onAddPractice: (practiceData: InputtedData) => void;
  isLoading: boolean;
}

const NewPracticeForm: React.FC<NewPracticeFormProps> = (props) => {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null);

  function submitFormHandler(event: FormEvent) {
    event.preventDefault();

    const enteredTitle: string = titleInputRef.current!.value;
    const enteredDescription: string = descriptionTextareaRef.current!.value;

    const inputtedData: InputtedData = {
      title: enteredTitle,
      description: enteredDescription,
    };

    props.onAddPractice(inputtedData);
  }
  return (
    <Card>
      <form
        className={styles.addPracticeForm}
        onSubmit={submitFormHandler}
      >
        {props.isLoading && <LoadingSpinner />}
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
        <div className={styles.actions}>
          <Button className="button" type="submit">
            Add good practice
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default NewPracticeForm;
