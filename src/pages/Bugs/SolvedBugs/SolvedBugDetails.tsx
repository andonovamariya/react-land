import { useEffect } from "react";
import { useParams } from "react-router";
import HighLightedSolvedBug from "../../../components/Bugs/BugsListing/HighlightedSolvedBug";
import Card from "../../../components/UI/Card";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import HttpStatuses from "../../../enums/httpStatuses";
import useHttp from "../../../hooks/useHttp";
import { getOneBug } from "../../../services/api-bugs";

import styles from "./SolvedBugDetails.module.css";

const SolvedBugDetails = () => {
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
      {!loadedBug.description && status === HttpStatuses.COMPLETED ? (
        <p className={styles.warningTextPractices}>
          No description found for that particular practice!
        </p>
      ) : (
        <HighLightedSolvedBug
          bugId={loadedBug.id}
          title={loadedBug.title}
          description={loadedBug.description}
          fixerEmail={loadedBug.fixerEmail}
          authorEmail={loadedBug.authorEmail}
        />
      )}
    </>
  );
};

export default SolvedBugDetails;
