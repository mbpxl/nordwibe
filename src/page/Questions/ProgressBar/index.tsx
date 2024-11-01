"use client";
import React, { useContext } from "react";
import styles from "../styles.module.scss";
import { QuestionsContext } from "../Provider";
import { usePathname } from "next/navigation";

export default React.memo(function ProgressBar() {
  const pathName = usePathname();
  const { questions, currentId } = useContext(QuestionsContext);

  const progress =
    pathName.substring(pathName.lastIndexOf("/") + 1) === "results"
      ? 100
      : ((currentId || 0) / questions.length) * 100;

  return (
    <div className={styles.progressBar}>
      <div className={styles.pin} style={{ left: `${progress}%` }}></div>
    </div>
  );
});
