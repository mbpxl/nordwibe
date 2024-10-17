import Notifications from "@/page/Notifications";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Уведомления | Nordwibe",
  description: "Страница с вашими уведомлениями"
}

const NotificationsPage = () => {
  return <Notifications />
}

export default NotificationsPage;