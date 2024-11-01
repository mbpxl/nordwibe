"use client";

import React, { useState } from "react";
import styles from "./styles.module.scss";

interface Check {
  key: boolean;
}

type FormInputProps = {
  name?: string;
  id: string;
  onChange?: React.Dispatch<
    React.SetStateAction<{
      id: number;
      val: boolean;
    }>
  >;
  label: string;
  answer: Check[];
  index: number;
};

export default React.memo(function Toggle(props: FormInputProps) {
  const [value, setValue] = useState<boolean>(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    props.onChange && props.onChange({ id: props.index, val: !value });
    setValue(!value);
  }

  return (
    <div className={styles.toggle_parent}>
      <label htmlFor={props.id} className={styles.toggle_rect}>
        <input
          className={styles.checkbox}
          name={props.name}
          type="checkbox"
          id={props.id}
          onChange={(e) => handleChange(e)}
          required
        />
        <label className={styles.label_for_before}>{props.label}</label>
        <label htmlFor={props.id}>{props.label}</label>
      </label>
    </div>
  );
});
