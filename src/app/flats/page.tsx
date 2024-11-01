import Flats from "@/page/FlatsPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Flats | Nordwibe",
  description: "Here you can see all the added apartments in your city",
};

const FlatsPage = () => {
  return <Flats />;
};

export default React.memo(FlatsPage);
