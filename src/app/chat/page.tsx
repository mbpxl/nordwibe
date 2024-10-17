import Chat from "@/page/Chat";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Чаты | Nordwibe",
  description: "Все ваши чаты"
}

const ChatPage = () => {
  return <Chat />
}

export default ChatPage;