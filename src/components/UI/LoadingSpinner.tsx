import styles from "./LoadingSpinner.module.css";

const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles.spinner}>
      <h3>Loading...</h3>
      <div className={styles.loading}></div>
    </div>
  );
};

export default LoadingSpinner;
