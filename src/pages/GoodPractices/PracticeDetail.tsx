import { useEffect } from "react";
import { useParams } from "react-router";
import PracticeItem from "../../components/GoodPractices/PracticeItem";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import useHttp from "../../hooks/use-http";
import { getOnePractice } from "../../lib/api";

const PracticeDetail: React.FC = () => {
  const params = useParams();

  const { practiceId } = params;

  const {
    sendRequest,
    status,
    data: loadedPractice,
    error,
  } = useHttp(getOnePractice, true);

  useEffect(() => {
    sendRequest(practiceId);
  }, [sendRequest, practiceId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedPractice.description) {
    return <p>No description found!</p>;
  }

  return (
    <>
      <PracticeItem
        id={loadedPractice.practiceId}
        title={loadedPractice.title}
      />
    </>
  );
};

export default PracticeDetail;
