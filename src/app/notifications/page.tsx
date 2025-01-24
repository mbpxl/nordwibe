import Notifications from "@/page/Notifications";
import { Metadata } from "next";
import React from "react";
import classes from "./notifications.module.scss";

export const metadata: Metadata = {
  title: "Уведомления | Nordwibe",
  description: "Страница с вашими уведомлениями",
};

const NotificationsPage = () => {
  return (
    <div className={classes.container}>
      <div className={classes.text}>
        Coming soon!
      </div>
    </div>
  )
};

export default NotificationsPage;
