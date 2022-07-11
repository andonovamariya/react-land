import Button from "../../UI/Button";
import styles from "./SolutionItem.module.css";

interface SolutionItemProps {
  title: string;
  description: string;
  fixerEmail: string;
}

const SolutionItem: React.FC<SolutionItemProps> = (props) => (
  <ul className={styles.solutionItem}>
    <h3>Title: {props.title}</h3>
    <p>Description: {props.description}</p>
    <p>Fixer: {props.fixerEmail}</p>
    <li className={styles.approveSolutionAction}>
      <Button type="submit">Approve solution</Button>
    </li>
  </ul>
);

export default SolutionItem;
