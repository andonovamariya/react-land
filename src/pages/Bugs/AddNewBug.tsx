import { useEffect } from "react";
import { useNavigate } from "react-router";
import NewBugForm, {
  InputtedDataBugs,
} from "../../components/Bugs/Contribute/NewBugForm";
import HttpStatuses from "../../enums/httpStatuses";
import useHttp from "../../hooks/useHttp";
import { addBug } from "../../services/api-bugs";

const AddNewBug: React.FC = () => {
  const { sendRequest, status } = useHttp(addBug, true);
  const navigate = useNavigate();

  const addBugHandler = (bugData: InputtedDataBugs) => {
    sendRequest(bugData);
  };

  useEffect(() => {
    if (status === HttpStatuses.COMPLETED) {
      navigate("/bugs");
    }
  }, [status, navigate]);

  return (
    <NewBugForm
      onAddBug={addBugHandler}
      isLoading={status === HttpStatuses.COMPLETED}
    />
  );
};
export default AddNewBug;
