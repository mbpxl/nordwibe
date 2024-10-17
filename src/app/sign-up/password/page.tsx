import PasswordInput from "@/page/Sign/Up/PasswordInput";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Пароль | Nordwibe",
  description: "Страница пароля"
}

export default function PasswordPage() {
  return <PasswordInput />;
}
