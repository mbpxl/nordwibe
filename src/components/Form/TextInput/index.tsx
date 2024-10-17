"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

type FormInputProps = {
  name?: string;
  type: "tel" | "text" | "password" | "number" | "checkbox";
  placeholder: string;
  id: string;
  value?:string;
  onChange?: (value: string) => void;
};

export default function TextInput(props: FormInputProps) {
  const [value, setValue] = useState<string>(props.value||"");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    setValue(inputValue);

    props.onChange && props.onChange(inputValue);
  }

  return (

    <input
    className={styles.input}
      name={props.name}
      type={props.type}
      id={props.id}
      placeholder={props.placeholder}
      value={value}
      onChange={(e) => handleChange(e)}
      required
    />
  );
}
