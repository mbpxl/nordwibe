import styles from "@/components/ProfileMenu/styles.module.scss";
import React from "react";

const ProfileMenu = () => {
  return (
    <div className={styles.profileMenu}>
      <ul>
        <li>Заблокировать</li>
        <li>Пожаловаться</li>
        <li>Скрыть из предложения</li>
        <li>Отключить уведомления</li>
      </ul>
    </div>
  );
};

export default React.memo(ProfileMenu);
