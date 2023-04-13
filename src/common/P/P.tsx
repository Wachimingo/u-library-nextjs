import styles from "./p.module.css";

export const P = ({ children }: any) => {
  return <p className={styles["p"]}>{children}</p>;
};

export default P;
