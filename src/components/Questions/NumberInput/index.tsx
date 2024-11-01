"use client";

import Form from "@/components/Form";
import FormHeading from "@/components/Form/Heading";
import Button from "@/components/Button";
import React, { useRef, useState } from "react";
import { QuestionType } from "@/page/Questions/Provider";
import styles from "../styles.module.scss";

type QuestionProps = {
  question: QuestionType;
  onAnswer: (answer: string) => void;
  placeholder?: {
    floor: string;
    all: string;
  };
  answer: number;
};

export default React.memo(function NumberInput(props: QuestionProps) {
  const input = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (input.current?.value)
      props.onAnswer(JSON.stringify(+input.current?.value));
  }

  const handleInputChange = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      const newValue = inputRef.current.value;
      // Фильтруем только числовые значения
      if (!/^\d*$/.test(newValue)) {
        inputRef.current.value = newValue.replace(/[^\d]/g, "");
      }
    }
  };

  return (
    <Form action={handleSubmit}>
      <FormHeading for={props.question.id.toString()}>
        {props.question.content}
      </FormHeading>

      <fieldset className={styles.options}>
        <input
          className={styles.input}
          id={props.question.id.toString()}
          type="text"
          placeholder={props.placeholder?.floor || "Ваш ответ"}
          ref={input}
          onChange={(value) => handleInputChange(input)}
        />
      </fieldset>

      <Button type="submit">Продолжить</Button>
    </Form>
  );
});
