import { habits, users } from "@/config";
import { notFound } from "next/navigation";
import React from "react";
import styles from "./styles.module.scss";

export default function Medic({ id }: { id: string }) {
  const user = users.find((u) => u.id === Number(id));

  if (!user) return notFound();

  return (
    <div className={styles.container}>
      <h1>Медик {user.name}</h1>
    </div>
  );
}
