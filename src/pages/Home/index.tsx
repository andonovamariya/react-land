import reactLogo from "../../assets/reactLogo.webp";
import styles from "./index.module.css";

const Home: React.FC = () => {
  return (
    <section className={styles.homeSection}>
      <h1>WELCOME</h1>
      <img src={require("../../assets/happyStitch.gif")} alt="happy stitch" />
      <div className={styles["main-image"]}>
        <img src={reactLogo} alt="React logo" />
      </div>
    </section>
  );
};

export default Home;
