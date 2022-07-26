import { useEffect } from "react";
import { Link } from "react-router-dom";
import PracticesList from "../../components/GoodPractices/PracticesList";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import HttpStatuses from "../../enums/httpStatuses";
import { isDatabaseEmpty, scrollToTopHandler } from "../../helpers";
import useHttp from "../../hooks/useHttp";
import { getAllPractices } from "../../services/api-good-practices";

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
      {errorMessage && <p className="errorText">{errorMessage}</p>}
      {isDatabaseEmpty(loadedPractices, status) ? (
        <p className="warningText">
          Good practices were NOT found in my database.
        </p>
      ) : (
        <PracticesList practices={loadedPractices} />
      )}
      <div className="actions">
        <Link className="link" to="/addNewGoodPractice">
          Add new good practice
        </Link>
        <Button
          type="button"
          onClick={scrollToTopHandler}
          className="scrollButton"
        />
      </div>
    </>
  );
};

export default GoodPractices;
