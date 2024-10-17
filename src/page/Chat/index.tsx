"use client";

import ChatComponent from "@/components/ChatComponent";
import { chats, users } from "@/config";
import { useTypedSelector } from "@/hooks/selector.hook";
import { IChat } from "@/interfaces/chat.interface";
import { IRealUser } from "@/interfaces/user.interface";
import styles from "@/page/Chat/styles.module.scss";
import { useListchatQuery } from "@/service/chat.service";
import chatApi from "@/service/chatApi.service";
import { useGetMeQuery } from "@/service/userApi.service";
import { useEffect, useState } from "react";

export interface ChatSchema {
  id: number;
  first_user: IRealUser;
  second_user: IRealUser;
  is_confirm_first_user?: boolean | null;
  is_confirm_second_user?: boolean | null;
  last_message_datetime?: string | null;
  created: string;
  is_last_sended_first?: boolean | null;
  messages: string;
  is_with_support?: boolean | null;
}

const Chat = () => {
  const search = useTypedSelector(
    (selector) => selector.navigationSlice.search.chats
  );
  const { data: fetchedChats } = useListchatQuery();
  const [chats, setChats] = useState<IChat[]>([]);
  const { data: user } = useGetMeQuery();
  const id = user?user.id:0;
  return (
    <div className={styles.chat}>
      <ChatComponent
        lastMessage="Написать админам по любому вопросу"
        type="support"
      />

      {fetchedChats &&
        fetchedChats.map((chat, i) =>
          chat.second_user.first_name.includes(search) ? (
            <ChatComponent
              lastMessage="Сделка еще состоится? Или ты меня решил кинуть?"
              type="user"
              user={
                id == chat.second_user.id
                  ? chat.first_user
                  : chat.second_user
              }
            />
          ) : (
            ""
          )
        )}
    </div>
  );
};

export default Chat;

