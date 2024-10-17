"use client";

import Form from "@/components/Form";
import FormHeading from "@/components/Form/Heading";
import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import { QuestionType } from "@/page/Questions/Provider";
import Checkbox from "@/components/Form/Checkbox";
import styles from "../ToggleList/styles.module.scss"

interface Check {
  key: boolean
}

type QuestionProps = {
  question: QuestionType;
  labels: string[] | undefined;
  onAnswer: (answer: string) => void;
  answers: Check[]
};

export default function CheckList(props: QuestionProps) {
  const [answer, setAnswer] = useState<Check[]>(props.answers);
  const [changed, setChanged] = useState({ id: 0, val: false })

  function handleSubmit() {
    props.onAnswer(JSON.stringify(answer));
  }

  useEffect(() => {
    answer.map((el, ind) => {
      if (changed.id == ind) {

        el.key = changed.val
      }
    })
    setAnswer(answer);

  }, [changed])

  return (
    // <Form action={handleSubmit}>
    <div className={styles.form}>
      <FormHeading for={props.question.id.toString()}>
        {props.question.content}
      </FormHeading>

      {props.labels && props.labels.map((label, i) => {
        return <Checkbox
          label={label}
          id={props.question.id.toString() + i.toString()}
          answer={props.answers}
          name={i.toString()}
          index={i}
          onChange={setChanged}
        />
      })}

      <Button onClick={handleSubmit}>Продолжить</Button>
    </div>
    // {/* </Form>
    //    */}
  );
}
