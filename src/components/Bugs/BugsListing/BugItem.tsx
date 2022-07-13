import { Link } from "react-router-dom";
import styles from "./BugItem.module.css";

interface BugItemProps {
  id: string;
  title: string;
  isSolved: boolean;
}

const getBugItemStyle = (bugStatus: boolean): string => {
  const bugStyling: string = bugStatus
    ? styles.bugItemSolved
    : styles.bugItemNotSolved;

  return bugStyling;
};

const BugItem: React.FC<BugItemProps> = (props) => (
  <li className={getBugItemStyle(props.isSolved)}>
    <h3>{props.title}</h3>
    {props.isSolved ? (
      <>
        <Link className={styles.link} to={`/solvedBugs/${props.id}`}>
          View more
        </Link>
        <Link
          className={styles.link}
          to={`/solvedBugs/${props.id}/solving`}
        >
          View solving
        </Link>
      </>
    ) : (
      <>
        <Link className={styles.link} to={`/unSolvedBugs/${props.id}`}>
          View more
        </Link>
        <Link
          className={styles.link}
          to={`/unsolvedBugs/${props.id}/solving`}
        >
          Suggested solutions
        </Link>
      </>
    )}
  </li>
);

export default BugItem;
