import styles from "./HighlightedPractice.module.css";

interface HighlightedPracticeProps {
  title: string;
  description: string;
}

const HighlightedPractice: React.FC<HighlightedPracticeProps> = (props) => (
  <div className={styles.singlePractice}>
    <h3>{props.title}</h3>
    <p>{props.description}</p>
  </div>
);

export default HighlightedPractice;
