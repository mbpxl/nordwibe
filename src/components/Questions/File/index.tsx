"use client";

import Form from "@/components/Form";
import FormHeading from "@/components/Form/Heading";
import Button from "@/components/Button";
import React, { useState } from "react";
import { QuestionType } from "@/page/Questions/Provider";
import FileInput from "@/components/Form/FileInput";
import SubHeading from "@/components/Form/Subheading";

type QuestionProps = {
  question: QuestionType;
  onAnswer: (answer: string | null, file: File|null) => void;
};

export default function FileQuestion(props: QuestionProps) {
  const [answer, setAnswer] = useState<string>();
  const [file, setFile] = useState<File>();
  function handleSubmit() {
    props.onAnswer(answer || null, file||null);
  }
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>){
    const target = event.target;
    const formFile = target.files?.[0];
    if(formFile){
      setFile(formFile)
    }
  }
  return (
    <Form action={handleSubmit}>
      <FormHeading for={props.question.id.toString()}>
        {props.question.content}
      </FormHeading>

      {props.question.subheading && (
        <SubHeading>{props.question.subheading}</SubHeading>
      )}

      <FileInput
        id={props.question.id.toString()}
        onChange={(value) => {setAnswer(value)}}
        // setFile={setFile}
      ></FileInput>

      <Button>Продолжить</Button>
    </Form>
  );
}
