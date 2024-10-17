"use client";

import Form from "@/components/Form";
import FormHeading from "@/components/Form/Heading";
import RadioInput from "@/components/Form/RadioInput";
import Button from "@/components/Button";
import React, { useState } from "react";
import { QuestionType } from "@/page/Questions/Provider";
import styles from "../styles.module.scss";

type QuestionProps = {
  question: QuestionType;
  anotherText?: {
    first: string,
    second: string
  }
  onAnswer: (answer: string) => void;
};

export default function TwoOptionQuestion(props: QuestionProps) {
  const [checked, setChecked] = useState<string>();
  const [answer, setAnswer] = useState<string>();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const id = e.target.id;
    setChecked(id);
    setAnswer(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (answer) props.onAnswer(answer);
  }

  return (
    <Form action={handleSubmit}>
      <FormHeading for={props.question.id.toString()}>
        {props.question.content}
      </FormHeading>

      <fieldset className={styles.options}>
        <RadioInput
          id="0"
          name={props.question.id.toString()}
          value={!props.anotherText ? "Да" : props.anotherText.first}
          checked={checked}
          onChange={handleChange}
        ></RadioInput>

        <RadioInput
          id="1"
          name={props.question.id.toString()}
          value={!props.anotherText ? "Нет" : props.anotherText.second}
          checked={checked}
          onChange={handleChange}
        ></RadioInput>
      </fieldset>

      <Button type="submit">Продолжить</Button>
    </Form>
  );
}
