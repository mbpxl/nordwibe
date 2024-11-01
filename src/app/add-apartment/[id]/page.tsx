import Question from "@/page/Questions/Question";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Добавить квартиру | Nordwibe",
  description: "Страница добавления квартиры",
};

const AddApartmentQuestionPage = React.memo(function AddApartmentQuestionPage({
  params,
}: {
  params: { id: string };
}) {
  return <Question id={params.id} />;
});

export default AddApartmentQuestionPage;
