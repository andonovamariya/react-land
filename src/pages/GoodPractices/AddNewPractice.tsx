import { useEffect } from "react";
import { useNavigate } from "react-router";

import NewPracticeForm, {
  InputtedData,
} from "../../components/GoodPractices/NewPracticeForm";
import useHttp from "../../hooks/use-http";
import { addPractice } from "../../lib/api-good-practices";

import { COMPLETED, PENDING } from "../../constants/httpStatuses";

const AddNewPracticePage: React.FC = () => {
  const { sendRequest, status } = useHttp(addPractice);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === COMPLETED) {
      navigate("/goodPractices");
    }
  }, [status, navigate]);

  const addPracticeHandler = (practiceData: InputtedData) => {
    sendRequest(practiceData);
  };

  return (
    <NewPracticeForm
      isLoading={status === PENDING}
      onAddPractice={addPracticeHandler}
    />
  );
};

export default AddNewPracticePage;
