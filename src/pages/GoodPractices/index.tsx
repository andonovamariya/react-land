import { useEffect } from "react";
import { Link } from "react-router-dom";
import PracticesList from "../../components/GoodPractices/PracticesList";
import Card from "../../components/UI/Card";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import HttpStatuses from "../../enums/httpStatuses";
import { isDatabaseEmpty } from "../../helpers";
import useHttp from "../../hooks/useHttp";
import { getAllPractices } from "../../services/api-good-practices";

import styles from "./index.module.css";

const GoodPractices: React.FC = () => {
  const {
    sendRequest,
    status,
    responseData: loadedPractices,
    errorMessage,
  } = useHttp(getAllPractices, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

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
      {isDatabaseEmpty(loadedPractices, status) ? (
        <p className={styles.warningTextPractices}>
          Good practices were NOT found in my database.
        </p>
      ) : (
        <PracticesList practices={loadedPractices} />
      )}
      <Link className={styles.linkPractices} to="/addNewGoodPractice">
        Add new good practice
      </Link>
    </>
  );
};

export default GoodPractices;
