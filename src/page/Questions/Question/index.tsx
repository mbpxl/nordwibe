"use client";

import React, { useContext, useEffect, useState } from "react";
import { QuestionsContext } from "../Provider";
import TextQuestion from "@/components/Questions/Text";
import { usePathname, useRouter } from "next/navigation";
import ThreeOptionQuestion from "@/components/Questions/ThreeOption";
import TwoOptionQuestion from "@/components/Questions/TwoOption";
import SliderQuestion from "@/components/Questions/Slider";
import FileQuestion from "@/components/Questions/File";
import MultiFileQuestion from "@/components/Questions/MultiFileQuestion";
import TwoNumberInput from "@/components/Questions/TwoNumberInput";
import MultiOption from "@/components/Questions/MultiOption";
import ToggleList from "@/components/Questions/ToggleList";
import CheckList from "@/components/Questions/CheckList";
import TextAndMap from "@/components/Questions/TextAndMap";
import Description from "@/components/Questions/Description";
import NumberInput from "@/components/Questions/NumberInput";
import Days from "@/components/Questions/Days";

type QuestionProps = {
  id: string;
};

export default function Question({ id }: QuestionProps) {
  const router = useRouter();
  const pathName = usePathname();
  const questionId = Number.parseFloat(id);
  const { questions, addAnswer, setCurrentId, addFile } = useContext(QuestionsContext);
  const question = questions.find((question) => question.id === questionId);
  const answers = useState([
    { adress: "" },
    { i_am_owner: true },
    {
      count_days_from: 0,
      count_days_to: 0,
    },
    { cost: 0 },
  ]);

  useEffect(() => {
    setCurrentId(Number.parseInt(id) - 1);
  }, [id, setCurrentId]);
  function handleFileAnswer(answer: string[] | string | null | any, file: File|null){
    addAnswer({ id: questionId, content: answer });
    if(file)
      addFile(file)
    const nextQuestionId = questionId + 1;

    const currentUrl = pathName.substring(0, pathName.lastIndexOf("/"));
    if (nextQuestionId > questions.length) {
      router.push(`${currentUrl}/results`);
    } else {
      router.push(`${currentUrl}/${questionId + 1}`);
    }
  }
  function handleAnswer(answer: string[] | string | null | any) {
    addAnswer({ id: questionId, content: answer });
    const nextQuestionId = questionId + 1;

    const currentUrl = pathName.substring(0, pathName.lastIndexOf("/"));
    if (nextQuestionId > questions.length) {
      router.push(`${currentUrl}/results`);
    } else {
      router.push(`${currentUrl}/${questionId + 1}`);
    }
  }

  return (
    <>
      {question?.type === "textAndMap" && (
        <TextAndMap
          onAnswer={handleAnswer}
          question={question}
          answerVal={question.answer}
        ></TextAndMap>
      )}
      {question?.type === "text" && (
        <TextQuestion
          type={question.type}
          onAnswer={handleAnswer}
          question={question}
          answerVal={question.answer}
        ></TextQuestion>
      )}
      {question?.type === "yesNoUnsure" && (
        <ThreeOptionQuestion
          onAnswer={handleAnswer}
          question={question}
          values={
            question.Radiovalues
              ? question.Radiovalues
              : { first: "Да", second: "Нет", third: "Не уверен" }
          }
        ></ThreeOptionQuestion>
      )}
      {question?.type === "yesNo" && (
        <TwoOptionQuestion
          onAnswer={handleAnswer}
          question={question}
        ></TwoOptionQuestion>
      )}
      {question?.type === "switch" && (
        <TwoOptionQuestion
          onAnswer={handleAnswer}
          question={question}
          anotherText={question.anotherText}
        ></TwoOptionQuestion>
      )}
      {question?.type === "miltiOption" && (
        <MultiOption
          onAnswer={handleAnswer}
          question={question}
          values={question.Optionsvalues}
        ></MultiOption>
      )}
      {question?.type === "slider" && (
        <SliderQuestion
          onAnswer={handleAnswer}
          question={question}
        ></SliderQuestion>
      )}
      {question?.type === "toggles" && (
        <ToggleList
          onAnswer={handleAnswer}
          question={question}
          labels={question?.labels}
          answers={question.answer}
        ></ToggleList>
      )}
      {question?.type === "twoNumber" && (
        <TwoNumberInput
          onAnswer={handleAnswer}
          question={question}
          placeholder={
            question.placeholder || { all: "Ваш ответ", floor: "Ваш ответ" }
          }
          answer={question.answer}
        ></TwoNumberInput>
      )}
      {question?.type === "number" && (
        <NumberInput
          onAnswer={handleAnswer}
          question={question}
          answer={question.answer}
        ></NumberInput>
      )}
      {question?.type === "checklist" && (
        <CheckList
          onAnswer={handleAnswer}
          question={question}
          labels={question?.Optionsvalues}
          answers={question.answer}
        ></CheckList>
      )}
      {question?.type === "file" && (
        <FileQuestion
          onAnswer={handleFileAnswer}
          question={question}
        ></FileQuestion>
      )}
      {question?.type === "multiFile" && (
        <MultiFileQuestion
          onAnswer={handleAnswer}
          question={question}
        ></MultiFileQuestion>
      )}
      {question?.type === "description" && (
        <Description
          onAnswer={handleAnswer}
          question={question}
          answerVal={question.answer}
        ></Description>
      )}
      {question?.type === "days" && (
        <Days
          onAnswer={handleAnswer}
          question={question}
          answer={question.answer}
        ></Days>
      )}
    </>
  );
}
