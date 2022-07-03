import styles from "./HighlightedPractice.module.css";

interface HighlightedPracticeProps {
  title: string;
  description: string;
}

const HighlightedPractice: React.FC<HighlightedPracticeProps> = (props) => {
  return (
    <figure className={styles.singlePractice}>
      <figcaption>{props.title}</figcaption>
      <p>{props.description}</p>
    </figure>
  );
};
export default HighlightedPractice;
