import { useCallback, useEffect, useState } from "react";
import { Params, useParams } from "react-router";

import LoadingSpinner from "../UI/LoadingSpinner";
import NewPracticeForm from "./NewPracticeForm";
import PracticesList from "./PeacticesList";
import { getAllPractices } from "../../lib/api";
import useHttp from "../../hooks/use-http";

import styles from "./Practices.module.css";
import Button from "../UI/Button";


const Practices: React.FC = () => {
  const [isAddingPractice, setIsAddingPractice] = useState<boolean>(false);

  const params: Readonly<Params<string>> = useParams();
  const { goodPracticeId } = params;

  const {
    sendRequest,
    status,
    data: loadedPractices,
  } = useHttp(getAllPractices);

  useEffect(() => {
    sendRequest(goodPracticeId);
  }, [goodPracticeId, sendRequest]);

  const addGoodPracticeHandler = () => {
    setIsAddingPractice(true);
  };

  const addedPracticeHandler = useCallback(() => {
    sendRequest(goodPracticeId);
  }, [sendRequest, goodPracticeId]);

  let practices: JSX.Element = <div></div>;

  if (status === "pending") {
    practices = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (
    status === "completed" &&
    loadedPractices &&
    loadedPractices.length > 0
  ) {
    practices = <PracticesList practices={loadedPractices} />;
  }

  if (
    status === "completed" &&
    (!loadedPractices || loadedPractices.length === 0)
  ) {
    practices = <p className="centered">No good practices were added yet!</p>;
  }

  return (
    <section className={styles.comments}>
      <h2>User good practices</h2>
      {!isAddingPractice && (
        <Button type = "button" onClick={addGoodPracticeHandler}>
          Add a good practice
        </Button>
      )}
      {isAddingPractice && (
        <NewPracticeForm
          practiceId={goodPracticeId!}
          onAddPractice={addedPracticeHandler}
        />
      )}
      {practices}
    </section>
  );
};

export default Practices;
