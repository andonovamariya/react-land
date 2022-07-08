import { FormEvent, useRef } from "react";
import { useAuthState } from "../../../auth-context";
import Button from "../../UI/Button";
import Card from "../../UI/Card";

import styles from "./UnsolvedBug.module.css";

export interface InputtedSolutionData {
  comment?: string;
  fixer?: string;
  bugId?: string;
}

interface UnsolvedBugProps {
  onAddSolution: (bugSolutionData: InputtedSolutionData) => void;
  bugId?: string;
}

const UnsolvedBug: React.FC<UnsolvedBugProps> = (props) => {
  const currentUserData = useAuthState();
  const solutionInputRef = useRef<HTMLTextAreaElement>(null);

  const submitFormHandler = (event: FormEvent) => {
    event.preventDefault();
    const enteredSolution: string | undefined = solutionInputRef.current?.value;

    props.onAddSolution({
      comment: enteredSolution,
      fixer: currentUserData.userEmail,
      bugId: props.bugId,
    });
  };

  return (
    <Card>
      <form className={styles.addSolutionForm} onSubmit={submitFormHandler}>
        <div className={styles.control}>
          <label htmlFor="comment">Add solution</label>
          <textarea required id="comment" rows={10} ref={solutionInputRef} />
        </div>
        <div className={styles.actions}>
          <Button type="submit">Add solution</Button>
        </div>
      </form>
    </Card>
  );
};
export default UnsolvedBug;
