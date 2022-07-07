import { useEffect } from "react";
import useHttp from "../../hooks/useHttp";
import HttpStatuses from "../../enums/httpStatuses";
import { getAllBugs } from "../../services/api-bugs";
import BugsList from "../../components/Bugs/BugsListing/BugsList";
import Card from "../../components/UI/Card";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { isDatabaseEmpty } from "../../helpers";
import styles from "./index.module.css";
import { Link } from "react-router-dom";

const Bugs: React.FC = () => {
  const {
    sendRequest,
    status,
    responseData: loadedBugs,
    errorMessage,
  } = useHttp(getAllBugs, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  return (
    <>
      {status === HttpStatuses.PENDING && (
        <Card>
          <LoadingSpinner />
        </Card>
      )}
      {errorMessage && <p className={styles.errorStyleBugs}>{errorMessage}</p>}
      {isDatabaseEmpty(loadedBugs, status) && (
        <p className={styles.warningStyleBugs}>
          Database records of bugs were NOT found.
        </p>
      )}

      <div className={styles.actionsListBugs}>
        <Link className={styles.linkStyleBugs} to="/addNewBug">
          Add new bug
        </Link>
      </div>
      <BugsList bugs={loadedBugs} />
    </>
  );
};

export default Bugs;
