import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import NewSolvingForm, {
  InputtedSolutionData,
} from "../../../components/Bugs/ContributeSolutions/NewSolvingForm";
import HttpStatuses from "../../../enums/httpStatuses";
import useHttp from "../../../hooks/useHttp";
import { addSolutionToPractice } from "../../../services/api-solutions";

import styles from "./index.module.css";

const AddSolution = () => {
  const { sendRequest, status } = useHttp(addSolutionToPractice, true);
  const navigate = useNavigate();
  const { bugId } = useParams<string>();
  const bugIdFromParams: string = bugId ? bugId : "";

  const addSolutionHandler = (solutionData: InputtedSolutionData) => {
    sendRequest(solutionData);
  };

  useEffect(() => {
    if (status === HttpStatuses.COMPLETED) {
      navigate(`/unSolvedBugs/${bugId}`);
    }
  }, [status, navigate, bugId]);

  return (
    <div className={styles.solutions}>
      <h2>Add solution:</h2>
      <NewSolvingForm
        onAddSolution={addSolutionHandler}
        bugId={bugIdFromParams}
      />
    </div>
  );
};

export default AddSolution;
