import { useEffect } from "react";
import { useNavigate } from "react-router";
import EditPracticeForm from "../../components/GoodPractices/EditPracticeForm";
import { InputtedDataPractices } from "../../components/GoodPractices/NewPracticeForm";
import HttpStatuses from "../../enums/httpStatuses";
import useHttp from "../../hooks/useHttp";
import { editPractice } from "../../services/api-good-practices";

const EditPractice: React.FC = () => {
  const { sendRequest, status } = useHttp(editPractice, true);
  const navigate = useNavigate();

  const editPracticeHandler = (practiceData: InputtedDataPractices) => {
    sendRequest(practiceData);
  };

  useEffect(() => {
    if (status === HttpStatuses.COMPLETED) {
      navigate("/goodPractices");
    }
  }, [status, navigate]);

  return (
    <EditPracticeForm
      isLoading={status === HttpStatuses.COMPLETED}
      onEditPractice={editPracticeHandler}
    />
  );
};

export default EditPractice;
