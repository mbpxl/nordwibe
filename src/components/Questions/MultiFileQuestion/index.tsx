"use client";

import Form from "@/components/Form";
import FormHeading from "@/components/Form/Heading";
import Button from "@/components/Button";
import React, { useContext, useState } from "react";
import { QuestionsContext, QuestionType } from "@/page/Questions/Provider";
import FileInput from "@/components/Form/FileInput";
import SubHeading from "@/components/Form/Subheading";
import FileUploader from "@/components/Form/FileUploader";

type QuestionProps = {
  question: QuestionType;
  onAnswer: (answer: string[] | null) => void;
};

export default function MultiFileQuestion(props: QuestionProps) {
  const [answers, setAnswers] = useState<string[]>([]);
  const { addFile } = useContext(QuestionsContext);

  function handleFileChange(files: FileList) {
    if (files) {
      const fileArray = Array.from(files);
      fileArray.forEach(f=>{
        addFile(f)}
      );
      const fileNames = fileArray.map((file) => file.name);
      setAnswers(fileNames);
    }
  }

  function handleSubmit() {
    props.onAnswer(answers || null);
  }

  return (
    <Form action={handleSubmit}>
      <FormHeading for={props.question.id.toString()}>
        {props.question.content}
      </FormHeading>

      {props.question.subheading && (
        <SubHeading>{props.question.subheading}</SubHeading>
      )}

      <FileUploader
        onChange={(files) => handleFileChange(files)}
        accept=".jpg, .jpeg, .png"
      />

      <ul>
        {answers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>

      <Button>Продолжить</Button>
    </Form>
  );
}
