import { useEffect } from "react";
import { useNavigate } from "react-router";
import AddBugForm, { InputtedDataBugs } from "../../components/Bugs/ContributeBugs/NewBugForm";
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
    <AddBugForm
      onAddBug={addBugHandler}
      isLoading={status === HttpStatuses.COMPLETED}
    />
  );
};
export default AddNewBug;
