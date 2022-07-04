import { useEffect } from "react";
import { useNavigate } from "react-router";

import NewPracticeForm, {
  InputtedData,
} from "../../components/GoodPractices/NewPracticeForm";
import useHttp from "../../hooks/useHttp";
import { addPractice } from "../../services/api-good-practices";

import { COMPLETED } from "../../enums/httpStatuses";

const AddNewPracticePage: React.FC = () => {
  const { sendRequest, status } = useHttp(addPractice, true);
  const navigate = useNavigate();

  const addPracticeHandler = (practiceData: InputtedData) => {
    sendRequest(practiceData);
  };

  useEffect(() => {
    if (status === COMPLETED) {
      navigate("/goodPractices");
    }
  }, [status, navigate]);

  return (
    <NewPracticeForm
      isLoading={status === COMPLETED}
      onAddPractice={addPracticeHandler}
    />
  );
};

export default AddNewPracticePage;
