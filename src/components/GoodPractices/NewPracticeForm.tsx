import { useRef, useEffect, FormEvent } from "react";
import useHttp from "../../hooks/use-http";
import { addPractice } from "../../lib/api";
import Button from "../UI/Button";
import LoadingSpinner from "../UI/LoadingSpinner";

import styles from "./NewPracticeForm.module.css";

interface NewPracticeFormProps {
  onAddPractice: () => void;
  practiceId: string;
}

const NewPracticeForm: React.FC<NewPracticeFormProps> = (props) => {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionTextAreaRef = useRef<HTMLTextAreaElement>(null);

  const { sendRequest, status, error } = useHttp(addPractice);

  const { onAddPractice } = props;
  const { practiceId } = props;

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddPractice();
    }
  }, [status, error, onAddPractice]);

  const submitFormHandler = (event: FormEvent) => {
    event.preventDefault();

    const enteredTitle: string = titleInputRef.current!.value;
    const enteredDescription: string = descriptionTextAreaRef.current!.value;

    sendRequest({
      practiceInputData: {
        title: enteredTitle,
        description: enteredDescription,
      },
      practiceId: practiceId,
    });
  };

  return (
    <form className={styles.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className={styles.contol}>
          <LoadingSpinner />
        </div>
      )}
      <div className={styles.control}>
        <label htmlFor="practiceTitle">Title:</label>
        <input
          required
          type="text"
          id="practiceTitle"
          name="practiceTitle"
          ref={titleInputRef}
        />
      </div>
      <div className={styles.control}>
        <label htmlFor="practiceDescription">Description:</label>
        <textarea
          required
          id="practiceDescription"
          name="practiceDescription"
          rows={5}
          ref={descriptionTextAreaRef}
        />
      </div>
      <div className={styles.actions}>
        <Button className="btn" type="submit">
          Add a good practice
        </Button>
      </div>
    </form>
  );
};

export default NewPracticeForm;
