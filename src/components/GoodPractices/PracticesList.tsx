import GoodPractice from "../../models/goodPractice.model";
import Button from "../UI/Button";
import PracticeItem from "./PracticeItem";

import styles from "./PracticesList.module.css";

interface PracticeListProps {
  practices: GoodPractice[];
}

const scrollToTopHandler = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};

const PracticesList: React.FC<PracticeListProps> = (props) => (
  <ul className={styles.goodPracticesList}>
    {props.practices.map((practice) => (
      <PracticeItem key={practice.id} id={practice.id} title={practice.title} />
    ))}
    <Button type="button" onClick={scrollToTopHandler}>
      <img src={require("../../assets/arrow.png")} alt="arrow" />
    </Button>
  </ul>
);

export default PracticesList;
