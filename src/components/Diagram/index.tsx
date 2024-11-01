import styles from "@/components/Diagram/styles.module.scss";
import { profileCircleProgress } from "@/config";
import React from "react";

const Diagram = () => {
  return (
    <div className={styles.diagram}>
      <h1>{profileCircleProgress}%</h1>
      <svg
        width="250"
        height="250"
        viewBox="0 0 250 250"
        className={styles.circularProgress}
      >
        <circle className={styles.bg}></circle>
        <circle className={styles.fg}></circle>
      </svg>
    </div>
  );
};

export default React.memo(Diagram);
