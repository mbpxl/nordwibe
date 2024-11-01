import Neighbors from "@/page/Neighbors";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Соседи | Nordwibe",
  description: "Список всех соседей в вашем городе",
};

const NeighborsPage = () => {
  return <Neighbors />;
};

export default React.memo(NeighborsPage);
