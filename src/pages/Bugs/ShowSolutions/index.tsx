import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import SolutionsList from "../../../components/Bugs/Solutions/SolutionsList";
import Button from "../../../components/UI/Button";
import Card from "../../../components/UI/Card";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import HttpStatuses from "../../../enums/httpStatuses";
import { isDatabaseEmpty } from "../../../helpers";
import useHttp from "../../../hooks/useHttp";
import { getAllSolutionsForABug } from "../../../services/api-solutions";

import styles from "./index.module.css";

const ShowSolutions: React.FC = () => {
  const navigate = useNavigate();
  type SolvedBugDetailsParams = {
    bugId: string;
  };
  const { bugId } = useParams<SolvedBugDetailsParams>();
  const {
    sendRequest,
    status,
    responseData: loadedSolutions,
    errorMessage,
  } = useHttp(getAllSolutionsForABug, true);

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
        <p className={styles.errorTextSolutions}>{errorMessage}</p>
      )}
      {isDatabaseEmpty(loadedSolutions, status) ? (
        <p className={styles.warningTextSolutions}>
          Solutions were NOT found in my database.
        </p>
      ) : (
        <SolutionsList solutions={loadedSolutions} />
      )}
      <Button
        type="button"
        className={styles.goBackButton}
        onClick={() => navigate(-1)}
      >
        Go back
      </Button>
    </>
  );
};
export default ShowSolutions;
