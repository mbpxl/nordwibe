import React from "react";
import styles from "./styles.module.scss";

type LabelProps = {
  children: React.ReactNode;
  for?: string;
};

export default React.memo(function FormHeading(props: LabelProps) {
  return (
    <label className={styles.heading} htmlFor={props.for}>
      {props.children}
    </label>
  );
});
