import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import HighlightedUnsolvedBug from "../../../components/Bugs/BugsListing/HighlightedUnsolvedBug";
import Card from "../../../components/UI/Card";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import HttpStatuses from "../../../enums/httpStatuses";
import useHttp from "../../../hooks/useHttp";
import { getOneBug } from "../../../services/api-bugs";
import styles from "./UnsolvedBugDetails.module.css";

const UnsolvedBugDetails = () => {
  type SolvedBugDetailsParams = {
    bugId: string;
  };
  const { bugId } = useParams<SolvedBugDetailsParams>();

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

  return (
    <>
      {errorMessage && (
        <p className={styles.errorTextPractices}>{errorMessage}</p>
      )}
      {!loadedBug.solution && status === HttpStatuses.COMPLETED ? (
        <p className={styles.warningTextPractices}>
          No solution was found for that particular bug!
        </p>
      ) : (
        <HighlightedUnsolvedBug
          bugId={loadedBug.id}
          title={loadedBug.title}
          description={loadedBug.description}
          authorEmail={loadedBug.authorEmail}
        />
      )}
      <div className={styles.actions}>
        <Link className={styles.link} to={`/unsolvedBugs/${bugId}/contribute`}>
          Add a solution
        </Link>
      </div>
    </>
  );
};

export default UnsolvedBugDetails;
