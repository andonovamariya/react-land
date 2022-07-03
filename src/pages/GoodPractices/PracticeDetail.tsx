import { useEffect } from "react";
import { Params, useParams } from "react-router";
import HighlightedPractice from "../../components/GoodPractices/HighlightedPractice";
import Card from "../../components/UI/Card";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { COMPLETED, PENDING } from "../../constants/httpStatuses";
import useHttp from "../../hooks/use-http";
import { getOnePractice } from "../../lib/api-good-practices";

import styles from "./PracticeDetail.module.css";

const PracticeDetail: React.FC = () => {
  const params: Readonly<Params<string>> = useParams();

  const { practiceId } = params;

  const {
    sendRequest,
    status,
    responseData: loadedPractice,
    errorMessage,
  } = useHttp(getOnePractice, true);

  useEffect(() => {
    sendRequest(practiceId);
  }, [sendRequest, practiceId]);

  if (status === PENDING) {
    return (
      <Card>
        <LoadingSpinner />
      </Card>
    );
  }

  return (
    <>
      {errorMessage && <p className={styles.errorTextPractices}>{errorMessage}</p>}
      {!loadedPractice.description && status === COMPLETED && (
        <p className={styles.warningTextPractices}>
          No description found for that particular practice!
        </p>
      )}
      <HighlightedPractice
        title={loadedPractice.title}
        description={loadedPractice.description}
      />
    </>
  );
};

export default PracticeDetail;
