import Notifications from "@/page/Notifications";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Уведомления | Nordwibe",
  description: "Страница с вашими уведомлениями",
};

const NotificationsPage = () => {
  return <Notifications />;
};

export default React.memo(NotificationsPage);
