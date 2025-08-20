import styles from "./Warn.module.css";

function Warn({ className, title, description }) {
  return (
    <div className={`${styles.warn} ${className}`}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
export default Warn;
