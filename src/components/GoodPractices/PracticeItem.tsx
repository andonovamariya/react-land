import { Link } from "react-router-dom";
import styles from "./PracticeItem.module.css";

interface PracticeItemProps {
  id: string;
  title: string;
}

const PracticeItem: React.FC<PracticeItemProps> = (props) => {
  return (
    <li className={styles.item}>
      <p>{props.title}</p>
      <Link className = "link" to={`/goodPractices/${props.id}`}>View more</Link>
    </li>
  );
};

export default PracticeItem;
