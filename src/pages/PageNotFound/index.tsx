import sadStitch from "../../assets/sadStitch.jpg";
import styles from "./notFound.module.css";

const NotFound: React.FC = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h1>Page not found</h1>
      <p>
        If you came upon this page by mistake, try checking the URL in your web
        browser.
      </p>
      <div className={styles["main-image"]}>
        <img src={sadStitch} alt="Sad Stitch" />
      </div>
    </div>
  );
};

export default NotFound;
