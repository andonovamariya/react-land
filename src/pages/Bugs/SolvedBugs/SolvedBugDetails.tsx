import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import HighLightedSolvedBug from "../../../components/Bugs/BugsListing/HighlightedSolvedBug";
import Button from "../../../components/UI/Button";
import Card from "../../../components/UI/Card";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import HttpStatuses from "../../../enums/httpStatuses";
import useHttp from "../../../hooks/useHttp";
import { getOneBug } from "../../../services/api-bugs";

const SolvedBugDetails = () => {
  const navigate = useNavigate();
  type SolvedBugDetailsParams = {
    bugId: string;
  };
  const { bugId } = useParams<SolvedBugDetailsParams>();

  const {
    sendRequest,
    status,
    responseData: loadedBug,
    errorMessage,
  } = useHttp(getOneBug, true);

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
        <p className="errorText">{errorMessage}</p>
      )}
      {!loadedBug.description && status === HttpStatuses.COMPLETED ? (
        <p className="warningText">
          No description found for that particular practice!
        </p>
      ) : (
        <HighLightedSolvedBug
          bugId={loadedBug.id}
          title={loadedBug.title}
          description={loadedBug.description}
          isSolved={loadedBug.isSolved}
          authorEmail={loadedBug.authorEmail}
        />
      )}
      <div className="actions">
        <Button type="button" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </div>
    </>
  );
};

export default SolvedBugDetails;
