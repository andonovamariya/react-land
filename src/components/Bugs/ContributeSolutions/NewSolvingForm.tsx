import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router";
import { useAuthState } from "../../../auth-context";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import LoadingSpinner from "../../UI/LoadingSpinner";

import styles from "./NewSolvingForm.module.css";

export interface InputtedSolutionData {
  title: string;
  description: string;
  fixerEmail: string;
  isApproved: boolean;
  bugId: string;
}

interface NewSolvingFormProps {
  onAddSolution: (solutionData: InputtedSolutionData) => void;
  bugId: string;
  isLoading: boolean;
}

const NewSolvingForm: React.FC<NewSolvingFormProps> = (props) => {
  const navigate = useNavigate();
  const { onAddSolution } = props;

  const currentUserData = useAuthState();
  const solutionTitleInputRef = useRef<HTMLInputElement>(null);
  const solutionDescriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const submitFormHandler = (event: FormEvent) => {
    event.preventDefault();
    if (
      solutionDescriptionInputRef.current &&
      solutionTitleInputRef.current &&
      currentUserData.userEmail
    ) {
      const enteredSolutionTitle: string = solutionTitleInputRef.current.value;
      const enteredSolutionDescription: string =
        solutionDescriptionInputRef.current.value;

      onAddSolution({
        bugId: props.bugId,
        title: enteredSolutionTitle,
        description: enteredSolutionDescription,
        fixerEmail: currentUserData.userEmail,
        isApproved: false,
      });
    }
  };

  return (
    <>
      {props.isLoading && <LoadingSpinner />}
      <Card>
        <form className={styles.addSolutionForm} onSubmit={submitFormHandler}>
          <div className={styles.control}>
            <label htmlFor="title">Title</label>
            <input
              type="title"
              id="title"
              ref={solutionTitleInputRef}
              required
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="description">Add description</label>
            <textarea
              required
              id="description"
              rows={10}
              ref={solutionDescriptionInputRef}
            />
          </div>
          <div className={styles.actions}>
            <Button type="submit">Add solution</Button>
          </div>
        </form>
      </Card>
    </>
  );
};
export default NewSolvingForm;
