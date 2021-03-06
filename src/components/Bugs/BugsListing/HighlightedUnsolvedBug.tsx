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
        <h3>Originally uploaded by: {props.authorEmail}</h3>
        <p>Description: {props.description}</p>
      </div>
    </Card>
  );
};

export default HighlightedUnsolvedBug;
