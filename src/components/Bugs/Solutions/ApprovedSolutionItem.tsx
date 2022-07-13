import styles from "./SolutionItem.module.css";

interface ApprovedSolutionItemProps {
  title: string;
  description: string;
  bugId: string;
  fixerEmail: string;
}

const ApprovedSolutionItem: React.FC<ApprovedSolutionItemProps> = (props) => (
  <ul className={styles.solutionItem}>
    <h3>Title: {props.title}</h3>
    <p>Description: {props.description}</p>
    <p>Fixer: {props.fixerEmail}</p>
  </ul>
);

export default ApprovedSolutionItem;
