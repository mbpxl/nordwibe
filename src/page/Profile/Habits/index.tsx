import { habits, users } from "@/config";
import { notFound } from "next/navigation";
import React from "react";
import styles from "./styles.module.scss";

export default function Habits({ id }: { id: string }) {
  const user = users.find((u) => u.id === Number(id));

  if (!user) return notFound();

  return (
    <div className={styles.container}>
      <h1>Привычки {user.name}</h1>

      <div className={styles.container}>
        <div className={styles.list}>
          {user.habits.map((el, i) => {
            const habit = habits.find((a) => a.habit === el);
            if (!habit) return;

            const { label: name } = habit;

            return (
              <div key={i}>
                <h3>{name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
