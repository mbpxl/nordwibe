import Diagram from "@/components/Diagram";
import styles from "@/page/Profile/Occupation/styles.module.scss";
import { RootState } from "@/store";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const Occupation = () => {
  let isSurveyCompleted = useSelector((state: RootState) => state.userSlice.isSurveyCompleted);

  return (
    <div className={styles.occupation}>
      <div className={styles.imageContainer}>
        <div className={styles.image}>
          <Image
            unoptimized
            src={`/linkCards/worker.png`}
            alt={"worker"}
            width={300}
            height={300}
          />
        </div>
      </div>
      <div className={styles.diagram}>
        <h4>{"Род занятий".toUpperCase()}</h4>
        <Diagram isSurveyCompleted={true} />
        {isSurveyCompleted ? (<p>На 20% пользователей с вами совместимы</p>)
        : (<p>Для отображения процента совместимости пройдите анкету!</p>)}
      </div>
      <p>
        Описание On the other hand, we denounce with righteous indignation and
        dislike men who are so beguiled and demoralized by the charms of
        pleasure of the moment, so blinded by desire, that they cannot foresee
        the pain and trouble that are bound to ensue; and equal blame belongs to
        those who fail in their duty
      </p>
    </div>
  );
};

export default React.memo(Occupation);
