"use client";

import Form from "@/components/Form";
import FormHeading from "@/components/Form/Heading";
import Button from "@/components/Button";
import TextInput from "@/components/Form/TextInput";
import React, { useEffect, useState } from "react";
import { QuestionType } from "@/page/Questions/Provider";
import SliderInput from "@/components/Form/SliderInput";

type QuestionProps = {
  question: QuestionType;
  onAnswer: (answer: string) => void;
};

export default function SliderQuestion(props: QuestionProps) {
  const [answer, setAnswer] = useState<string>("0");

  function handleSubmit() {
    props.onAnswer(answer);
  }

  return (
    <Form action={handleSubmit}>
      <FormHeading for={props.question.id.toString()}>
        {props.question.content}
      </FormHeading>

      <SliderInput
        id={props.question.id.toString()}
        onChange={(value) => setAnswer(value)}
      ></SliderInput>

      <Button>Продолжить</Button>
    </Form>
  );
}
