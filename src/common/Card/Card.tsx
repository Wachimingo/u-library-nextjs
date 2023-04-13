import React from "react";
import { Div } from "../containers";
import styles from "./card.module.css";

export const Card = ({ children, onClick, className }) => {
  return (
    <Div className={`${styles["card"]} ${className}`} column onClick={onClick}>
      <Div className={styles["card-container"]}>{children}</Div>
    </Div>
  );
};

export default Card;
