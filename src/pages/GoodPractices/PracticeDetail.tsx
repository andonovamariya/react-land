import { useEffect } from "react";
import { useParams } from "react-router";

import HighlightedPractice from "../../components/GoodPractices/HighlightedPractice";
import { getOnePractice } from "../../services/api-good-practices";
import useHttp from "../../hooks/useHttp";

import HttpStatuses from "../../enums/httpStatuses";
import Card from "../../components/UI/Card";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import styles from "./PracticeDetail.module.css";

const PracticeDetail: React.FC = () => {
  type PracticeDetailParams = {
    practiceId: string;
  };
  const { practiceId } = useParams<PracticeDetailParams>();

  const {
    sendRequest,
    status,
    responseData: loadedPractice,
    errorMessage,
  } = useHttp(getOnePractice, true);

  useEffect(() => {
    sendRequest(practiceId);
  }, [sendRequest, practiceId]);

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
      {!loadedPractice.description && status === HttpStatuses.COMPLETED ? (
        <p className={styles.warningTextPractices}>
          No description found for that particular practice!
        </p>
      ) : (
        <HighlightedPractice
          practiceId={loadedPractice.id}
          title={loadedPractice.title}
          description={loadedPractice.description}
          author={loadedPractice.author}
        />
      )}
    </>
  );
};

export default PracticeDetail;
