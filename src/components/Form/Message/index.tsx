import React from "react";
import styles from "./styles.module.scss";

type LabelProps = {
  children: React.ReactNode;
};

export default React.memo(function FormMessage(props: LabelProps) {
  return <div className={styles.message}>{props.children}</div>;
});
