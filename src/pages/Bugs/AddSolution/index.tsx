import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import AddNewSolution, {
  InputSolutionData,
} from "../../../components/Bugs/ContributeSolutions/AddNewSolution";
import HttpStatuses from "../../../enums/httpStatuses";
import useHttp from "../../../hooks/useHttp";
import { addSolutionToBug } from "../../../services/api-solutions";

const AddSolution = () => {
  const { sendRequest, status } = useHttp(addSolutionToBug, true);
  const navigate = useNavigate();
  const { bugId } = useParams<string>();
  const bugIdFromParams: string = bugId ?? "";

  const addSolutionHandler = (solutionData: InputSolutionData) => {
    sendRequest(solutionData);
  };

  useEffect(() => {
    if (status === HttpStatuses.COMPLETED) {
      navigate(`/bugs`);
    }
  }, [status, navigate]);

  return (
    <AddNewSolution
      onAddSolution={addSolutionHandler}
      bugId={bugIdFromParams}
      isLoading={status === HttpStatuses.COMPLETED}
    />
  );
};

export default AddSolution;
