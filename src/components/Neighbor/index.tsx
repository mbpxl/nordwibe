"use client";

import styles from "@/components/Neighbor/styles.module.scss";
import Image from "next/image";
import { FC } from "react";
import Link from "next/link";
import { IUser } from "@/interfaces/user.interface";
import React from "react";

interface INeighbor {
  user: IUser;
  hide: (id: number) => void;
}

const Neighbor: FC<INeighbor> = ({
  user: { age, city, id, name, parameters },
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
              <h1>
                {name}, {age}
              </h1>
              <h4>из г. {city}</h4>
            </div>
          </div>
          <h1>XX%</h1>
        </div>
      </Link>
      <div className={styles.userInfo}>
        {parameters.map((parameter, _) => (
          <div key={_}>
            <h4>{parameter.value}</h4>
          </div>
        ))}
        LL
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
