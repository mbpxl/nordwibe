import Chat from "@/page/Chat";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Чаты | Nordwibe",
  description: "Все ваши чаты",
};

const ChatPage = () => {
  return <Chat />;
};

export default React.memo(ChatPage);
