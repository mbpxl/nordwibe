import styles from "@/components/Message/styles.module.scss";
import { IMessage } from "@/interfaces/message.interface";
import { MessageShow } from "@/page/ChatDetail";
import { useGetMeQuery, useGetUserQuery } from "@/service/userApi.service";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { FC } from "react";

const Message: FC<{ message: IMessage; type: "your" | "his" }> = ({
  message,
  type,
}) => {
  let pathname = usePathname();
  const companion_id = pathname?.split("/").pop();
  console.log(companion_id);

  const {
    data: mydata,
    error: myAccountFetchedError,
    isLoading: myAccountFetchedLoading,
  } = useGetMeQuery();
  const {
    data: companionData,
    error: companionAccountFetchedError,
    isLoading: companionAccountFetchedLoading,
  } = useGetUserQuery(Number(companion_id));
  console.log(companionData);

  return (
    <div
      className={`${styles.message} ${
        type === "his" ? "flex-row-reverse" : ""
      }`}
    >
      <div className={styles.avatar}>
        <Image
          src={"/icons/userProfile.svg"}
          alt="avatar"
          width={100}
          height={100}
        />
      </div>

      <div className={`${styles.text} ${type === "his" ? "mr-2" : ""}`}>
        <h3 className={`${type === "his" ? "text-right" : ""}`}>
          {message.sender_id === mydata?.id
            ? "Я"
            : companionData
            ? companionData.first_name
            : "Собеседник"}
        </h3>
        <p className={`${type === "his" ? "text-right !text-gray-600" : ""}`}>
          {message.text}
          <br />
          <span>
            {message.sended} | {message.readed}
          </span>
        </p>
      </div>
    </div>
  );
};

export default React.memo(Message);
