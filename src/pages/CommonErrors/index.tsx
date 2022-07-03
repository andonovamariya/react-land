import { useEffect } from "react";
import ErrorsList from "../../components/CommonErrors/ErrorsList";
import Card from "../../components/UI/Card";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { COMPLETED, PENDING } from "../../constants/httpStatuses";
import useHttp from "../../hooks/use-http";
import { getAllCommonErrors } from "../../lib/api-common-errors";

import styles from "./index.module.css";

const CommonErrors: React.FC = () => {
  const {
    sendRequest,
    status,
    responseData: loadedErrors,
    errorMessage,
  } = useHttp(getAllCommonErrors, true);

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
  if (status === COMPLETED && (!loadedErrors || loadedErrors.length === 0)) {
    isDatabaseEmpty = true;
  }
  return (
    <>
      {errorMessage && (
        <p className={styles.errorCommonErrors}>{errorMessage}</p>
      )}
      {isDatabaseEmpty && (
        <p className={styles.warningCommonErrors}>
          Database records of common errors were NOT found.
        </p>
      )}
      <ErrorsList errors={loadedErrors} />
    </>
  );
};

export default CommonErrors;
