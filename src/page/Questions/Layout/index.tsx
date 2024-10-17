"use client";

import React, { useContext } from "react";
import QuestionProvider, { QuestionsContext, QuestionType } from "../Provider";
import RegistrationView from "@/components/RegistrationPage";
import styles from "../styles.module.scss";
import ProgressBar from "../ProgressBar";

type QuestionProps = {
  children: React.ReactNode;
  questions: QuestionType[];
};

export default function QuestionsLayout({
  children,
  questions,
}: QuestionProps) {
  return (
    <QuestionProvider questions={questions}>
      <RegistrationView>
        <div className={styles.view}>
          <ProgressBar></ProgressBar>
          <div className={styles.main}>{children}</div>
        </div>
      </RegistrationView>
    </QuestionProvider>
  );
}
