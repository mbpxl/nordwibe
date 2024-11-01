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
  onAnswer: (answer: string) => void;
  values?: {
    first: string;
    second: string;
    third: string;
  };
};

export default React.memo(function ThreeOptionQuestion(props: QuestionProps) {
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
          value={props.values ? props.values.first : "Да"}
          checked={checked}
          onChange={handleChange}
        ></RadioInput>

        <RadioInput
          id="1"
          name={props.question.id.toString()}
          value={props.values ? props.values.second : "Нет"}
          checked={checked}
          onChange={handleChange}
        ></RadioInput>

        <RadioInput
          id="2"
          name={props.question.id.toString()}
          value={props.values ? props.values.third : "Не уверен"}
          checked={checked}
          onChange={handleChange}
        ></RadioInput>
      </fieldset>

      <Button type="submit">Продолжить</Button>
    </Form>
  );
});
