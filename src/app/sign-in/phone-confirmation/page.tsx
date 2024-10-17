import PhoneConfirmation from "@/page/Sign/In/PhoneConfirmation";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Подтверждение телефона | Nordwibe",
  description: "Страница подтверждения телефона"
}

export default function PhoneConfirmPage() {
  return <PhoneConfirmation />;
}
