import Specifications from "@/page/Specifications";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Спецификации | Nordwibe",
  description: "Страница спецификаций",
};

const SpecificationsPage = () => {
  return <Specifications />;
};

export default React.memo(SpecificationsPage);
