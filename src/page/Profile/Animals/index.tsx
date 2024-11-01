import { animals, users } from "@/config";
import styles from "@/page/Profile/Animals/styles.module.scss";
import { notFound } from "next/navigation";
import React from "react";
import { FC } from "react";

const Animals: FC<{ id: string }> = ({ id }) => {
  const user = users.find((u) => u.id === Number(id));

  if (!user) return notFound();

  return (
    <div className={styles.animals}>
      <h1>Животные {user.name}</h1>

      <div className={styles.container}>
        <div className={styles.list}>
          {user.animals.map((el, index) => {
            const animal = animals.find((a) => a.animal === el);
            if (!animal) return;

            const { icon: Icon, label: name } = animal;

            return (
              <div key={index}>
                <div className={styles.name}>
                  <Icon />
                  <h3>{name}</h3>
                </div>
                <div className={styles.blocks}>
                  <h4>Возраст</h4>
                  <h4>Болезни</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Animals);
