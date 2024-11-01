import { FC } from "react";
import styles from "@/components/IconCard/styles.module.scss";
import Image from "next/image";
import React from "react";

const IconCard: FC<{ icon: string; label: string; time?: number }> = ({
  icon,
  label,
  time,
}) => {
  return (
    <div className={styles.iconCard}>
      <Image
        priority
        src={`/icons/${icon}.svg`}
        alt={label}
        width={100}
        height={100}
      />
      <h2>{label}</h2>
      {time && <p>{time} мин</p>}
    </div>
  );
};

export default React.memo(IconCard);
