import { useRef, FormEvent } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";

import styles from "./NewPracticeForm.module.css";

export interface InputtedData {
  title?: string;
  description?: string;
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

    const enteredTitle: string | undefined = titleInputRef.current?.value;
    const enteredDescription: string | undefined =
      descriptionTextareaRef.current?.value;

    props.onAddPractice({
      title: enteredTitle,
      description: enteredDescription,
    });
  }
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
          <div className={styles.actions}>
            <Button className="button" type="submit">
              Add good practice
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default NewPracticeForm;
