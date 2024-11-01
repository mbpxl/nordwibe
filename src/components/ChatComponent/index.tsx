import styles from "@/components/ChatComponent/styles.module.scss";
import { IChat } from "@/interfaces/chat.interface";
import { IRealUser, IUser } from "@/interfaces/user.interface";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FC } from "react";

interface IChatComponent {
  type: "user" | "support";
  lastMessage: string;
  user?: IRealUser;
}

const ChatComponent: FC<IChatComponent> = ({ lastMessage, type, user }) => {
  return (
    <Link href={`/chat/${user ? user.id : "support"}`}>
      <div className={styles.chatComponent}>
        <div className={styles.image}>
          <Image
            src={`/icons/${type === "user" ? "userProfile" : "support"}.svg`}
            width={100}
            height={100}
            alt={type}
          />
        </div>
        <div className={styles.text}>
          <h1>
            {user ? user.first_name.toUpperCase() : "Поддержка".toUpperCase()}
          </h1>
          <h4>{lastMessage}</h4>
        </div>
      </div>
    </Link>
  );
};

export default React.memo(ChatComponent);
