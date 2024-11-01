"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

type FormInputProps = {
  name?: string;
  id: string;
  onChange?: (value: string) => void;
};

export default React.memo(function SliderInput(props: FormInputProps) {
  const [value, setValue] = useState<number>(0);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    setValue(Number.parseInt(inputValue));

    props.onChange && props.onChange(inputValue);
  }

  return (
    <>
      <label className={styles.label} htmlFor={props.id}>
        {value + "%"}
      </label>
      <input
        className={styles.input}
        name={props.name}
        type="range"
        min={"0"}
        max={"100"}
        id={props.id}
        value={value}
        onChange={(e) => handleChange(e)}
      />
    </>
  );
});
