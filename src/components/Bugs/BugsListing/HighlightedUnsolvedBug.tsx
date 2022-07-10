import { Link } from "react-router-dom";
import Card from "../../UI/Card";

import styles from "./HighlightedBug.module.css";

interface HighLightedSolvedBugProps {
  bugId: string;
  title: string;
  description: string;
  authorEmail: string;
}

const HighlightedUnsolvedBug: React.FC<HighLightedSolvedBugProps> = (props) => {
  return (
    <Card>
      <div className={styles.singleBug}>
        <h2>Bug: {props.title}</h2>
        <h2>Originally uploaded by: {props.authorEmail}</h2>
        <p>Description: {props.description}</p>
      </div>
      <Link to={`/unSolvedBugs/${props.bugId}/allSolutions`}>Solutions</Link>
    </Card>
  );
};

export default HighlightedUnsolvedBug;
