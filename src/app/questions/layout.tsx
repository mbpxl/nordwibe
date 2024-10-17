import QuestionsLayout from "@/page/Questions/Layout";
import { QuestionType } from "@/page/Questions/Provider";
import React from "react";

export default ({ children }: { children: React.ReactNode }) => {
  const question: QuestionType[] = [
    {
      id: 1,
      content: "Первый вопрос?",
      type: "text",
      answer:""
    },
    {
      id: 2,
      content: "Второй вопрос?",
      type: "yesNoUnsure",
      answer:""
    },
    {
      id: 3,
      content: "Третий вопрос?",
      type: "yesNo",
      answer:""
    },
    {
      id: 4,
      content: "Четвертый вопрос?",
      type: "slider",
      answer:""
    },
  ];
  return <QuestionsLayout questions={question}>{children}</QuestionsLayout>;
};
