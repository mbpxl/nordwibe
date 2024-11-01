import EnableNotifications from "@/page/Sign/Up/Notifications";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Включить уведомления | Nordwibe",
  description: "Страница включения уведомлений",
};

export default React.memo(function EnableNotificationsPage() {
  return <EnableNotifications />;
});
