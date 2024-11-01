import Question from "@/page/Questions/Question";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Анкетирование | Nordwibe",
  description: "Страница анкетирования",
};

export default React.memo(function page({
  params,
}: {
  params: { id: string };
}) {
  return <Question id={params.id}></Question>;
});
