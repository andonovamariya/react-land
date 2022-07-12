import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthState } from "../../../auth-context";
import HttpStatuses from "../../../enums/httpStatuses";
import useHttp from "../../../hooks/useHttp";
import { approveSolution } from "../../../services/api-solutions";
import Button from "../../UI/Button";
import styles from "./SolutionItem.module.css";

interface SolutionItemProps {
  title: string;
  description: string;
  fixerEmail: string;
  bugId: string;
}

const SolutionItem: React.FC<SolutionItemProps> = (props) => {
  const currentUserData = useAuthState();
  const { sendRequest, status } = useHttp(approveSolution, true);
  const navigate = useNavigate();

  const { bugId } = props;
  const { fixerEmail } = props;

  const approveSolutionHandler = () => {
    sendRequest({ bugId, fixerEmail });
  };

  useEffect(() => {
    if (status === HttpStatuses.COMPLETED) {
      navigate(`/bugs`);
    }
  }, [status, navigate, bugId]);

  return (
    <ul className={styles.solutionItem}>
      <h3>Title: {props.title}</h3>
      <p>Description: {props.description}</p>
      <p>Fixer: {props.fixerEmail}</p>
      {currentUserData.userEmail === "admin@admin.com" && (
        <li className={styles.approveSolutionAction}>
          <Button
            type="submit"
            className={styles.approveSolutionButton}
            onClick={approveSolutionHandler}
          >
            Approve solution
          </Button>
        </li>
      )}
    </ul>
  );
};

export default SolutionItem;
