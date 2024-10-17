import React from "react";
import styles from "./styles.module.scss";

type FormProps = {
  type?: "sign-in";
  action?: any;
  children: React.ReactNode;
};

export default function Form(props: FormProps) {
  return (
    <form
      className={`${styles.form} ${
        props.type === "sign-in" ? styles.signin : ""
      }`}
      action={props.action}
    >
      {props.children}
    </form>
  );
}
