import reactLogo from "../../assets/reactLogo.webp";
import styles from "./index.module.css";

import /* webpackPreload: true */ "../../assets/fonts/Poppins-Italic.ttf";

const Home: React.FC = () => (
  <div className={styles.homePage}>
    <h1>welcome to react land</h1>
    <img src={require("../../assets/happyStitch.gif")} alt="happy stitch" />
    <div className={styles.mainImage}>
      <img src={reactLogo} alt="React logo" />
    </div>
  </div>
);

export default Home;
