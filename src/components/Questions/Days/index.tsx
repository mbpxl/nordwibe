"use client";

import Form from "../../Form";
import FormHeading from "../../Form/Heading";
import Button from "@/components/Button";
import styles from "./styles.module.scss";
import { QuestionType } from "@/page/Questions/Provider";
import { useState } from "react";
import React from "react";

interface QuestionProps {
  question: QuestionType;
  onAnswer: (answer: string) => void;
  answer?: any;
}
export default React.memo(function Days(props: QuestionProps) {
  const [minMonth, setMinMonth] = useState("1");
  const [maxMonth, setMaxMonth] = useState("1");
  const [minLessMonth, setMinLessMonth] = useState(true);
  const [maxLessMonth, setMaxLessMonth] = useState(true);
  const [action, setAction] = useState(false);
  const handleMinMonth = (value: string) => {
    setMinMonth(value);
    setMinLessMonth(false);
  };

  const handleMaxMonth = (value: string) => {
    setMaxMonth(value);
    setMaxLessMonth(false);
  };
  const handleSubmit = () => {
    if (action) {
      if (maxLessMonth && minLessMonth) {
        props.onAnswer(`[${29},${29}]`);
      } else if (minLessMonth && !maxLessMonth) {
        props.onAnswer(`[${29},${Math.floor(+maxMonth * 30)}]`);
      } else if (!minLessMonth && maxLessMonth) {
        props.onAnswer(`[${Math.floor(+minMonth * 30)},${29}]`);
      } else if (!maxLessMonth && !minLessMonth) {
        props.onAnswer(
          `[${Math.floor(+minMonth * 30)},${Math.floor(+maxMonth * 30)}]`
        );
      }
    }
  };
  return (
    <Form action={handleSubmit}>
      <FormHeading>{props.question.content}</FormHeading>

      <div className={styles.days_content}>
        <span>От</span>
        <div className={styles.choose_days}>
          <button
            className={`${styles.less_than_a_month_bttn} ${
              minLessMonth ? styles.active_month_bttn : ""
            }`}
            onClick={() => setMinLessMonth(!minLessMonth)}
          >
            Меньше месяца
          </button>
          <div className={styles.wrapper}>
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={minMonth}
              onChange={(value) => handleMinMonth(value.currentTarget.value)}
            />
            <div className={styles.count}>{minMonth}</div>
          </div>
        </div>
        <span>До</span>
        <div className={styles.choose_days}>
          <button
            className={`${styles.less_than_a_month_bttn} ${
              maxLessMonth ? styles.active_month_bttn : ""
            }`}
            onClick={() => setMaxLessMonth(!maxLessMonth)}
          >
            Меньше месяца
          </button>
          <div className={styles.wrapper}>
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={maxMonth}
              onChange={(value) => handleMaxMonth(value.currentTarget.value)}
            />
            <div className={styles.count}>{maxMonth}</div>
          </div>
        </div>
      </div>

      <Button onClick={() => setAction(true)}>Продолжить</Button>
    </Form>
  );
});
