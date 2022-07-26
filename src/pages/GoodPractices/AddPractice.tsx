import { useEffect } from "react";
import { useNavigate } from "react-router";

import HttpStatuses from "../../enums/httpStatuses";
import NewPracticeForm, {
  InputDataPractices,
} from "../../components/GoodPractices/AddNewPractice";
import useHttp from "../../hooks/useHttp";
import { addPractice } from "../../services/api-good-practices";

const AddPractice: React.FC = () => {
  const { sendRequest, status } = useHttp(addPractice, true);
  const navigate = useNavigate();

  const addPracticeHandler = (practiceData: InputDataPractices) => {
    sendRequest(practiceData);
  };

  useEffect(() => {
    if (status === HttpStatuses.COMPLETED) {
      navigate("/goodPractices");
    }
  }, [status, navigate]);

  return (
    <NewPracticeForm
      isLoading={status === HttpStatuses.COMPLETED}
      onAddPractice={addPracticeHandler}
    />
  );
};

export default AddPractice;
