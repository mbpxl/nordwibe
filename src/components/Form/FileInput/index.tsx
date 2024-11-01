"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

type FormInputProps = {
  name?: string;
  id: string;
  onChange?: (value: string) => void;
  // setFile:(file: File)=>void;
};

export default React.memo(function FileInput(props: FormInputProps) {
  const [file, setFile] = useState<File | null>(null);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    const target = e.target;
    const formFile = target.files?.[0];
    if (formFile) {
      setFile(formFile);
    }
    props.onChange && props.onChange(inputValue);
  }

  return (
    <>
      <label className={styles.label} htmlFor={props.id}>
        Загрузить
      </label>
      aaa {file}
      <input
        className={styles.input}
        name={props.name}
        type="file"
        id={props.id}
        onChange={(e) => handleChange(e)}
      />
    </>
  );
});
