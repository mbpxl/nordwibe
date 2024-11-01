import Specification from "@/components/Specification";
import styles from "@/page/Specifications/styles.module.scss";
import React from "react";

const Specifications = () => {
  return (
    <div className={styles.specifications}>
      <div className={styles.container}>
        <Specification />
        <Specification />
        <Specification />
        <Specification />
      </div>
    </div>
  );
};

export default React.memo(Specifications);
