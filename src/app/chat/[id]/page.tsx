import { chats } from "@/config";
import ChatDetail from "@/page/ChatDetail";
import { Metadata } from "next";
import React from "react";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const id = params.id;
  const chat = chats[Number(id)];

  return {
    title: `${chat ? chat.name : undefined} | Nordwibe`,
    description: `Чат с пользователем${chat ? chat.name : undefined}`,
  };
};

const ChatDetailPage = ({ params }: { params: { id: string } }) => {
  return <ChatDetail id={params.id} />;
};

export default React.memo(ChatDetailPage);
