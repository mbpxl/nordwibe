import Results from "@/page/Questions/Results";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Результат | Nordwibe",
  description: "Результат добавления квартиры"
}

export default function ResultsPage() {
  return <Results />;
}
