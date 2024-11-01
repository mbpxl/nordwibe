import PasswordUpdate from "@/page/Sign/In/PasswordUpdate";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Обновление пароля | Nordwibe",
  description: "Страница обновления пароля",
};

export default React.memo(function PasswordUpdatePage() {
  return <PasswordUpdate />;
});
