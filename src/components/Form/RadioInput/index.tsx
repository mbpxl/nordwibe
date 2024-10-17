import React from "react";
import styles from "./styles.module.scss";

type Props = {
  id: string;
  name: string;
  value: string;
  checked?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function RadioInput(props: Props) {
  return (
    <div
      className={`${styles.button} ${
        props.checked
          ? props.checked === props.id
            ? ""
            : styles.notActive
          : ""
      }`}
    >
      <label
        style={{ pointerEvents: "none" }}
        className={styles.label}
        htmlFor={props.id}
      >
        {props.value}
      </label>
      <input
        className={styles.radio}
        id={props.id}
        value={props.value}
        name={props.name}
        type="radio"
        checked={props.checked === props.id}
        onChange={(e) => props.onChange(e)}
      />
    </div>
  );
}
