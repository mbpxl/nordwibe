import Flats from "@/page/FlatsPage";
import { Metadata } from "next";
import React from "react";
import styles from "./flats.module.scss";

export const metadata: Metadata = {
  title: "Flats | Nordwibe",
  description: "Here you can see all the added apartments in your city",
};

const FlatsPage = () => {
  // return <Flats />;
  return (
    <div className={styles.preview}>
      <h1>Coming soon!</h1>
    </div>
  );
};

export default React.memo(FlatsPage);
