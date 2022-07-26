import { useEffect } from "react";
import { useNavigate } from "react-router";
import AddNewBug, { InputDataBugs } from "../../components/Bugs/ContributeBugs/AddNewBug";
import HttpStatuses from "../../enums/httpStatuses";
import useHttp from "../../hooks/useHttp";
import { addBug } from "../../services/api-bugs";

const AddBug: React.FC = () => {
  const { sendRequest, status } = useHttp(addBug, true);
  const navigate = useNavigate();

  const addBugHandler = (bugData: InputDataBugs) => {
    sendRequest(bugData);
  };

  useEffect(() => {
    if (status === HttpStatuses.COMPLETED) {
      navigate("/bugs");
    }
  }, [status, navigate]);

  return (
    <AddNewBug
      onAddBug={addBugHandler}
      isLoading={status === HttpStatuses.COMPLETED}
    />
  );
};
export default AddBug;
