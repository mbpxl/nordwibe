import SignIn from "@/page/Sign/In/SignIn";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вход | Nordwibe",
  description: "Страница входа"
}

export default function SignInPage() {
  return <SignIn />;
}
