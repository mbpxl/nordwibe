import Results from "@/page/Questions/Results";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Результат анкетирования | Nordwibe",
  description: "Страница результата анкетирования"
}

export default function ResultsPage() {
  return <Results />;
}
