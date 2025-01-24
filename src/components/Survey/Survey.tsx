"use client"

import React, { useState } from 'react'
import classes from "./Survey.module.scss";
import { data } from '@/utils/surveyQuestions';
import { useDispatch } from 'react-redux';
import { changeSurveyCompleted } from '@/store/slices/user';
import { redirect, useRouter } from 'next/navigation';

const Survey = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  let [index, setIndex] = useState<number>(0);
  let [question, setQuestion] = useState(data[index]);
  let [selectedOption, setSelectedOption] = useState<string | null>(null);
  let [error, setError] = useState<boolean>(false);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setError(false);
  }

  const handleSkipSurvey = () => {
    dispatch(changeSurveyCompleted());
    router.push("/");
  }

  const next = () => {
    if (!selectedOption) {
      setError(true);
      return;
    }
    setIndex(prevIndex => prevIndex + 1);
    setQuestion(data[index + 1]);
    setSelectedOption(null);
    setError(false);
  }

  return (
    <div className={classes.container}>
      <div className={classes.top}>
        <h1 className={classes.heading}>Опрос</h1>
        <button className={classes.skip} onClick={handleSkipSurvey}>x</button>
      </div>
      <h2 className={classes.qustionName}>{index + 1}. {question.question}</h2>
      <ul className={classes.questionList}>
        {Object.values(question).slice(1).map((option, i) => (
          <li
            key={i}
            className={`${classes.questionOptions} ${selectedOption === option ? classes.selected : ''}`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
      {error && <p className={classes.error}>Пожалуйста, выберите один из вариантов</p>}
      <button className={classes.btn} onClick={next}>Next</button>
      <div className={classes.progress}>{index + 1} of {data.length} вопросов</div>
    </div>
  )
}

export default Survey;
