"use client";

import Neighbor from "@/components/Neighbor";
import styles from "@/page/Neighbors/styles.module.scss";
import {
  useGetCompatibleUsersQuery,
  useGetUsersQuery,
} from "@/service/userApi.service";
import React from "react";

const Neighbors = () => {
  // Получаем пользователей, которые имеют процент совместимости с нами
  const {
    data: fetchedCompatibleUsers,
    error,
    isLoading,
  } = useGetCompatibleUsersQuery("");

  // Получаем всех пользователей
  const {
    data: fetchedAllUsers,
    error: fetchedAllUsersError,
    isLoading: fetchedAllUsersLoading,
  } = useGetUsersQuery("");

  // Если данные загружаются
  if (isLoading || fetchedAllUsersLoading) return <p>Loading...</p>;

  // Если произошла ошибка при загрузке
  //TODO: if (error || fetchedAllUsersError) return <p>Error loading users.</p>;

  // Если fetchedCompatibleUsers отсутствует, выводим сообщение и рендерим только fetchedAllUsers
  if (!fetchedCompatibleUsers) {
    return (
      <div className={styles.neighbors}>
        <div className={styles.info_message}>
          <p>Нет совместимых с вами людей. Посмотрите список всех объявлений</p>
        </div>
        <div className={styles.container}>
          {fetchedAllUsers?.map((user: any, index: number) => (
            <div className={styles.neigh} key={index}>
              <Neighbor comp_user={user} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Объединяем пользователей, если оба массива загружены
  const allUsers = [...fetchedCompatibleUsers, ...(fetchedAllUsers || [])];

  if (allUsers.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <div className={styles.neighbors}>
      <div className={styles.container}>
        {allUsers.map((user: any, index: number) => (
          <div className={styles.neigh} key={index}>
            <Neighbor comp_user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Neighbors);
