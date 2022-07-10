import styles from "./SolutionItem.module.css";

interface SolutionItemProps {
  title: string;
  description: string;
  fixerEmail: string;
}

const SolutionItem: React.FC<SolutionItemProps> = (props) => (
  <li className={styles.solutionItem}>
    <h3>Title: {props.title}</h3>
    <p>Description: {props.description}</p>
    <p>Fixer: {props.fixerEmail}</p>
  </li>
);

export default SolutionItem;
