import Solution from "../../../models/solution.model";
import SolutionItem from "./SolutionItem";

import styles from "./SolutionsList.module.css";

interface SolutionsListProps {
  solutions: Solution[];
}

const SolutionsList: React.FC<SolutionsListProps> = (props) => (
  <ul className={styles.solutions}>
    {props.solutions.map((solution) => (
      <SolutionItem
        key={solution.id}
        bugId={solution.bugId}
        title={solution.title}
        description={solution.description}
        fixerEmail={solution.fixerEmail}
      />
    ))}
  </ul>
);

export default SolutionsList;
