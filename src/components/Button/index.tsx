import React from "react";
import styles from "./styles.module.scss";

type LabelProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onSubmit?: any;
  onClick?: any;
};

export default React.memo(function Button(props: LabelProps) {
  return (
    <button
      onClick={props.onClick}
      onSubmit={props.onSubmit}
      className={styles.button}
      type={props.type}
    >
      {props.children}
    </button>
  );
});
