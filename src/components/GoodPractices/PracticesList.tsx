import GoodPractice from "../../models/goodPractice.model";
import PracticeItem from "./PracticeItem";

import styles from "./PracticesList.module.css";

interface PracticeListProps {
  practices: GoodPractice[];
}

const PracticesList: React.FC<PracticeListProps> = (props) => (
  <ul className={styles.goodPracticesList}>
    {props.practices.map((practice) => (
      <PracticeItem key={practice.id} id={practice.id} title={practice.title} />
    ))}
  </ul>
);

export default PracticesList;
