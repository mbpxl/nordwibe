"use client";

import styles from "@/components/Neighbor/styles.module.scss";
import Image from "next/image";
import { FC } from "react";
import Link from "next/link";
import { IUser } from "@/interfaces/user.interface";
import React from "react";
import { abbreviations } from "@/utils/transform";

interface INeighbor {
  user: IUser;
  hide: (id: number) => void;
}

const Neighbor: FC<any> = ({
  comp_user: {
    home_town,
    id,
    first_name,
    count_visits,
    purpose,
    occupation,
    smoking,
    pets,
    first_aid,
    social_interaction,
    compatibility,
  },
  hide,
}) => {
  return (
    <div className={styles.neighbor}>
      <Link href={`/profile/${id}`}>
        <div className={styles.containerUser}>
          <div className={styles.userCard}>
            <div className={styles.avatar}>
              <Image
                src={"/icons/userProfile.svg"}
                alt="avatar"
                width={100}
                height={100}
              />
            </div>
            <div className={styles.userInformation}>
              <h1>{first_name}</h1>
              <h4>из г. {home_town}</h4>
            </div>
          </div>
          <div className="">
            <p className={styles.hotConsume}>
              {compatibility > 0.7 ? "Лучшее предложение" : ""}
            </p>
            <h1 className={styles.percents}>
              {compatibility ? compatibility * 100 : ""}
              {compatibility ? "%" : ""}
            </h1>
          </div>
        </div>
      </Link>
      <div className={styles.userInfo}>
        <div className="">
          {abbreviations.purpose[purpose] && (
            <h4>{abbreviations.purpose[purpose]}</h4>
          )}
          {abbreviations.pets[pets] && <h4>{abbreviations.pets[pets]}</h4>}
          {abbreviations.first_aid[first_aid] && (
            <h4>{abbreviations.first_aid[first_aid]}</h4>
          )}
          {abbreviations.smoking[smoking] && (
            <h4>{abbreviations.smoking[smoking]}</h4>
          )}
          {abbreviations.occupation[occupation] && (
            <h4>{abbreviations.occupation[occupation]}</h4>
          )}
        </div>
      </div>
      <div className={styles.buttons}>
        <Link href={`/chat/${id}`}>
          <button>Написать</button>
        </Link>
        <button onClick={() => hide(id)}>Скрыть</button>
      </div>
    </div>
  );
};

export default React.memo(Neighbor);
