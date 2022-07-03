import { useEffect } from "react";
import { Link } from "react-router-dom";
import PracticesList from "../../components/GoodPractices/PracticesList";
import Card from "../../components/UI/Card";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { COMPLETED, PENDING } from "../../constants/httpStatuses";
import useHttp from "../../hooks/use-http";
import { getAllPractices } from "../../lib/api-good-practices";

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

  if (status === PENDING) {
    return (
      <Card>
        <LoadingSpinner />
      </Card>
    );
  }

  let isDatabaseEmpty: boolean = false;
  if (
    status === COMPLETED &&
    (!loadedPractices || loadedPractices.length === 0)
  ) {
    isDatabaseEmpty = true;
  }

  return (
    <>
      {errorMessage && (
        <p className={styles.errorTextPractices}>{errorMessage}</p>
      )}
      {isDatabaseEmpty && (
        <p className={styles.warningTextPractices}>
          Good practices were NOT found in my database.
        </p>
      )}
      <PracticesList practices={loadedPractices} />
      <Link className={styles.linkPractices} to="/addNewGoodPractice">
        Add new good practice
      </Link>
    </>
  );
};

export default GoodPractices;
