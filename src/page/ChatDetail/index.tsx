"use client";

import IconCard from "@/components/IconCard";
import Message from "@/components/Message";
import { users } from "@/config";
import { IMessage, ISendMessage } from "@/interfaces/message.interface";
import styles from "@/page/ChatDetail/styles.module.scss";
import {
  useListchatQuery,
  useSendMessageMutation,
} from "@/service/chat.service";
import { useGetMeQuery } from "@/service/userApi.service";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { FC, FormEvent, useState } from "react";

export interface MessageShow {
  message: IMessage;
  type: "your" | "his";
}

const ChatDetail: FC<{ id: string }> = ({ id }) => {
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { data: chatList } = useListchatQuery();
  const [sendMessage, { error }] = useSendMessageMutation();
  const { data: user } = useGetMeQuery();
  if (id != "support")
    console.log(
      chatList?.filter(
        (c) => c.first_user.id == Number(id) || c.second_user.id == Number(id)
      )
    );
  // const messages = id=="support"? [
  //      { message: "Еще сдаете?", type: "your", sended_time: "10:55", readed_time: "11:36"},
  //      { message: "Да. Цена указанна в обьявлении", type: "his", sended_time: "10:55", readed_time: "11:36"},
  //      { message: "Отлично! Где можем встретится?", type: "your", sended_time: "10:55", readed_time: "11:36"},
  //      { message: "Давайте у метро на мухасрансовской в час?", type: "his", sended_time: "10:55", readed_time: "11:36"},
  //      { message: "Хорошо, удачи", type: "your", sended_time: "10:55", readed_time: "11:36" },
  //   ]: chatList?.filter(c=>c.first_user.id==Number(id)||c.second_user.id==Number(id))[0].messages
  const words = [
    "Когда можно посмотреть?",
    "Еще продаете?",
    "Позвоните?",
    "Торг уместен?",
    "Пришлете видео?",
  ];
  const [value, setValue] = useState<string>("");
  const [isFilesMenu, setIsFilesMenu] = useState<boolean>(false);
  // const [messages, setMessages] = useState<
  //   Array<{
  //     message: string;
  //     type: "your" | "his";
  //     sended_time: string;
  //     readed_time: string;
  //   }>
  // >([
  //   {
  //     message: "Еще сдаете?",
  //     type: "your",
  //     sended_time: "10:55",
  //     readed_time: "11:36",
  //   },
  //   {
  //     message: "Да. Цена указанна в обьявлении",
  //     type: "his",
  //     sended_time: "10:55",
  //     readed_time: "11:36",
  //   },
  //   {
  //     message: "Отлично! Где можем встретится?",
  //     type: "your",
  //     sended_time: "10:55",
  //     readed_time: "11:36",
  //   },
  //   {
  //     message: "Давайте у метро на мухасрансовской в час?",
  //     type: "his",
  //     sended_time: "10:55",
  //     readed_time: "11:36",
  //   },
  //   {
  //     message: "Хорошо, удачи",
  //     type: "your",
  //     sended_time: "10:55",
  //     readed_time: "11:36",
  //   },
  // ]);
  const chat = chatList?.filter(
    (c) => c.first_user.id == Number(id) || c.second_user.id == Number(id)
  )[0];
  const messageList: Array<MessageShow> | null = chat
    ? chat.messages.map((c) => ({
        message: c,
        type: c.sender_id == Number(id) ? "your" : "his",
      }))
    : null;

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const type = id === "support" ? "support" : "user";

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user && chat) {
      let msg: ISendMessage = {
        sender_id: user.id,
        recipient_id: id == "support" ? 0 : Number(id),
        type: "TX",
        text: value,
        is_from_app: false,
        is_urgently: false,
      };
      const msgResponse = await sendMessage({ chatId: chat.id, message: msg });
    }
    setValue("");
  };

  return (
    <div className={styles.chatDetail}>
      {messageList && messageList.length === 0 && id != "support" && (
        <h1 className={styles.noneMessages}>
          Чат пуст. Ну же. Сделайте первый шаг
        </h1>
      )}
      {type === "support" && (
        <div className={styles.supportMessage}>
          <p>
            Мы на связи с 10:00 до 22:00, тебе ответят живые люди
            <br />
            <br /> Также нам можно написать в{" "}
            <a href="https://t.me/nordwibe_media">телеграм</a> или на почту{" "}
            <a href="mailto:help@nordwibe.com">help@nordwibe.com</a>
          </p>
        </div>
      )}
      <div className={styles.messages}>
        {messageList &&
          messageList.map((message, index) => (
            <Message {...message} key={index} />
          ))}
      </div>
      {type === "user" &&
        !isFilesMenu &&
        value.length === 0 &&
        messageList &&
        messageList.length === 0 && (
          <div className={styles.buttons}>
            {words.map((word, index) => (
              <h4 onClick={() => setValue(word)} key={index}>
                {word}
              </h4>
            ))}
          </div>
        )}
      {isFilesMenu ? (
        <>
          <div className={styles.filesMenu}>
            <div className={styles.input}>
              <input type="file" onChange={(e) => setIsFilesMenu(false)} />
              <IconCard icon="galery" label="Галерея" />
            </div>
            <div className={styles.input}>
              <input type="file" onChange={(e) => setIsFilesMenu(false)} />
              <IconCard icon="camera" label="Камера" />
            </div>
            <div className={styles.input}>
              <input type="file" onChange={(e) => setIsFilesMenu(false)} />
              <IconCard icon="document" label="Файл" />
            </div>
          </div>
        </>
      ) : (
        <form onSubmit={onSubmit}>
          <div className={styles.input}>
            <div
              className={`${styles.icon} ${styles.file}`}
              onClick={() => setIsFilesMenu(!isFilesMenu)}
            >
              <Image
                src={"/icons/file.svg"}
                alt="file"
                width={100}
                height={100}
              />
            </div>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <div className={`${styles.icon} ${styles.send}`}>
              <button type="submit">
                <Image
                  src={"/icons/send.svg"}
                  alt="send"
                  width={100}
                  height={100}
                />
              </button>
            </div>
          </div>
          <div ref={chatEndRef} className={styles.goToBottom}></div>
        </form>
      )}
    </div>
  );
};

export default React.memo(ChatDetail);
