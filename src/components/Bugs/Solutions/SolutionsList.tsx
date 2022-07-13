import Solution from "../../../models/solution.model";
import NotApprovedSolutionItem from "./NotApprovedSolutionItem";

import styles from "./SolutionsList.module.css";
import ApprovedSolutionItem from "./ApprovedSolutionItem";

interface SolutionsListProps {
  solutions: Solution[];
}
const SolutionsList: React.FC<SolutionsListProps> = (props) => {
  const loadedSolutions = props.solutions;
  return (
    <ul className={styles.solutions}>
      {loadedSolutions.map((solution) =>
        solution.isApproved ? (
          <ApprovedSolutionItem
            key={solution.id}
            bugId={solution.bugId}
            title={solution.title}
            description={solution.description}
            fixerEmail={solution.fixerEmail}
          />
        ) : (
          <NotApprovedSolutionItem
            key={solution.id}
            id={solution.id}
            bugId={solution.bugId}
            title={solution.title}
            description={solution.description}
            fixerEmail={solution.fixerEmail}
          />
        )
      )}
    </ul>
  );
};

export default SolutionsList;
