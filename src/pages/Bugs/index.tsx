import { useEffect } from "react";
import useHttp from "../../hooks/useHttp";
import HttpStatuses from "../../enums/httpStatuses";
import { getAllBugs } from "../../services/api-bugs";
import BugsList from "../../components/Bugs/BugsListing/BugsList";
import Card from "../../components/UI/Card";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { isDatabaseEmpty, scrollToTopHandler } from "../../helpers";
import { Link } from "react-router-dom";
import Button from "../../components/UI/Button";
import styles from "./index.module.css";

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
      {errorMessage && <p className="errorText">{errorMessage}</p>}
      {isDatabaseEmpty(loadedBugs, status) && (
        <p className="warningText">Database records of bugs were NOT found.</p>
      )}
      <div className="actions">
        <Card>
          <img
            className={styles.bugImage}
            src={require("../../assets/greenBug.png")}
            alt="small bug"
          />
        </Card>
        <Link className="link" to="/addNewBug">
          Add a new bug
        </Link>
      </div>
      <BugsList bugs={loadedBugs} />
      <div className="actions">
        <Button
          type="button"
          onClick={scrollToTopHandler}
          className="scrollButton"
        />
      </div>
    </>
  );
};

export default Bugs;
