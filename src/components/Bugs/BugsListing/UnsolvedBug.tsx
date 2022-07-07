import { FormEvent, useRef } from "react";
import { useAuthState } from "../../../auth-context";
import Button from "../../UI/Button";
import Card from "../../UI/Card";

import styles from "./UnsolvedBug.module.css";

export interface InputtedSolutionData {
  //maybe I need to add all the previous state of that exact bug and not only add the comment and fixer data
  comment?: string;
  fixer?: string;
}

interface UnsolvedBugProps {
  onAddSolution: (bugSolutionData: InputtedSolutionData) => void;
}

const UnsolvedBug: React.FC<UnsolvedBugProps> = (props) => {
  const currentUserData = useAuthState();
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  const submitFormHandler = (event: FormEvent) => {
    event.preventDefault();
    const enteredComment: string | undefined = commentInputRef.current?.value;

    props.onAddSolution({
      comment: enteredComment,
      fixer: currentUserData.userEmail,
    });
  };

  return (
    <Card>
      <form className={styles.addSolutionForm} onSubmit={submitFormHandler}>
        <div className={styles.control}>
          <label htmlFor="comment">Add solution</label>
          <textarea required id="comment" rows={10} ref={commentInputRef} />
        </div>
        <div className={styles.actions}>
          <Button type="submit">Add solution</Button>
        </div>
      </form>
    </Card>
  );
};
export default UnsolvedBug;
