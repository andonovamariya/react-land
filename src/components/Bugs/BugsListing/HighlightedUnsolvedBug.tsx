import { useNavigate } from "react-router";
import Button from "../../UI/Button";
import Card from "../../UI/Card";

import styles from "./HighlightedBug.module.css";

interface HighLightedSolvedBugProps {
  bugId: string;
  title: string;
  description: string;
  authorEmail: string;
}

const HighlightedUnsolvedBug: React.FC<HighLightedSolvedBugProps> = (props) => {
  const navigate = useNavigate();
  return (
    <Card>
      <div className={styles.singleBug}>
        <h2>Bug: {props.title}</h2>
        <h2>Originally uploaded by: {props.authorEmail}</h2>
        <p>Description: {props.description}</p>
        <Button
          type="button"
          className={styles.goBackButton}
          onClick={() => navigate(-1)}
        >
          Go back
        </Button>
      </div>
    </Card>
  );
};

export default HighlightedUnsolvedBug;
