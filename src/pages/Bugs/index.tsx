import { useEffect } from "react";
import useHttp from "../../hooks/useHttp";
import HttpStatuses from "../../enums/httpStatuses";
import { getAllBugs } from "../../services/api-bugs";
import BugsList from "../../components/Bugs/BugsListing/BugsList";
import Card from "../../components/UI/Card";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { isDatabaseEmpty, scrollToTopHandler } from "../../helpers";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import Button from "../../components/UI/Button";

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
        <div className={styles.bugImage}>
          <img src={require("../../assets/greenBug.png")} alt="small bug" />
        </div>
        <Link className={styles.linkStyleBugs} to="/addNewBug">
          Add a new bug
        </Link>
      </div>
      <BugsList bugs={loadedBugs} />
      <div className={styles.actionsListBugs}>
        <Button
          type="button"
          onClick={scrollToTopHandler}
          className={styles.scrollButton}
        />
      </div>
    </>
  );
};

export default Bugs;
