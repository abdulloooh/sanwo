import React from "react";
import styles from "./../../styles/Container.module.scss";

const Container = (props) => {
  return (
    <div className={styles.Container}>
      <div className={styles.formConatainer}>{props.children}</div>
      <div className={styles.imageConatiner}></div>
    </div>
  );
};

export default Container;
