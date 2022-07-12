import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import NewSolvingForm, {
  InputtedSolutionData,
} from "../../../components/Bugs/ContributeSolutions/NewSolvingForm";
import HttpStatuses from "../../../enums/httpStatuses";
import useHttp from "../../../hooks/useHttp";
import { addSolutionToBug } from "../../../services/api-solutions";

const AddSolution = () => {
  const { sendRequest, status } = useHttp(addSolutionToBug, true);
  const navigate = useNavigate();
  const { bugId } = useParams<string>();
  const bugIdFromParams: string = bugId ? bugId : "";

  const addSolutionHandler = (solutionData: InputtedSolutionData) => {
    sendRequest(solutionData);
  };

  useEffect(() => {
    if (status === HttpStatuses.COMPLETED) {
      navigate(`/bugs`);
    }
  }, [status, navigate, bugId]);

  return (
    <NewSolvingForm
      onAddSolution={addSolutionHandler}
      bugId={bugIdFromParams}
      isLoading={status === HttpStatuses.COMPLETED}
    />
  );
};

export default AddSolution;
