"use client";

import Neighbor from "@/components/Neighbor";
import { users } from "@/config";
import { useTypedSelector } from "@/hooks/selector.hook";
import { IRealUserMe, IUser, IRealUser } from "@/interfaces/user.interface";
import styles from "@/page/Neighbors/styles.module.scss";
import { useEffect, useState } from "react";
import userApi, {
  useGetCompatibleUsersQuery,
  useGetUsersQuery,
} from "@/service/userApi.service";
import chatApi from "@/service/chatApi.service";
import houseApi from "@/service/houseApi.service";
import React from "react";

const Neighbors = () => {
  //@ts-ignore
  const {
    data: fetchedCompatibleUsers,
    error,
    isLoading,
  } = useGetCompatibleUsersQuery("");

  const {
    data: fetchedAllUsers,
    error: fetchedAllUsersError,
    isLoading: fetchedAllUsersLoading,
  } = useGetUsersQuery("");

  if (isLoading || fetchedAllUsersLoading) return <p>Loading...</p>;

  if (error || fetchedAllUsersError) return <p>Error loading users.</p>;

  // Проверяем, что оба массива загружены и существуют
  const allUsers =
    fetchedCompatibleUsers && fetchedAllUsers
      ? [...fetchedCompatibleUsers, ...fetchedAllUsers]
      : [];

  if (allUsers.length === 0) {
    return null;
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
