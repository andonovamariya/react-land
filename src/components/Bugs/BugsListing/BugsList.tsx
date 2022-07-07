import Bug from "../../../models/bug.model";
import BugItem from "./BugItem";
import styles from "./BugsList.module.css";

interface BugsListProps {
  bugs: Bug[];
}

const BugsList: React.FC<BugsListProps> = (props) => (
  <ul className={styles.bugs}>
    {props.bugs.map((bug) => (
      <BugItem
        key={bug.id}
        id={bug.id}
        title={bug.title}
        isSolved={bug.isSolved}
      />
    ))}
  </ul>
);

export default BugsList;
