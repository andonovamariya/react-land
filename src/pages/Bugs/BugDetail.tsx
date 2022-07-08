import { useEffect } from "react";
import { useParams } from "react-router";
import SolvedBug from "../../components/Bugs/BugsListing/SolvedBug";
import UnsolvedBug, {
  InputtedSolutionData,
} from "../../components/Bugs/Contribute/UnsolvedBug";
import Card from "../../components/UI/Card";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import HttpStatuses from "../../enums/httpStatuses";
import useHttp from "../../hooks/useHttp";
import { getOneBug } from "../../services/api-bugs";

import styles from "./BugDetail.module.css";

const BugDetail: React.FC = () => {
  type BugDetailParams = {
    bugId: string;
  };
  const { bugId } = useParams<BugDetailParams>();

  const {
    sendRequest,
    status,
    responseData: loadedBug,
    errorMessage,
  } = useHttp(getOneBug, true);

  useEffect(() => {
    sendRequest(bugId);
  }, [sendRequest, bugId]);

  if (status === HttpStatuses.PENDING) {
    return (
      <Card>
        <LoadingSpinner />
      </Card>
    );
  }

  //solution to bug

  const addSolutionHandler = (solutionData: InputtedSolutionData) => {
    sendRequest(solutionData);
  };
  
  return (
    <>
      {errorMessage && <p className={styles.errorTextBugs}>{errorMessage}</p>}
      {!loadedBug.description && status === HttpStatuses.COMPLETED && (
        <p className={styles.warningTextPractices}>
          No description found for that particular bug!
        </p>
      )}
      {loadedBug.isSolved ? (
        <SolvedBug
          title={loadedBug.title}
          description={loadedBug.description}
          author={loadedBug.author}
          fixer={loadedBug.fixer}
        />
      ) : (
        <UnsolvedBug onAddSolution={addSolutionHandler} bugId = {bugId}/>
      )}
    </>
  );
};
export default BugDetail;
