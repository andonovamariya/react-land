import { Link } from "react-router-dom";
import styles from "./PracticeItem.module.css";

interface PracticeItemProps {
  id: string;
  title: string;
}

const PracticeItem: React.FC<PracticeItemProps> = (props) => (
  <li className={styles.practiceItem}>
    <h3>{props.title}</h3>
    <Link className="link" to={`/goodPractices/${props.id}`}>
      View more
    </Link>
  </li>
);

export default PracticeItem;
