import Parameter from "@/components/Parameter";
import styles from "@/page/Profile/Parameters/styles.module.scss";
import React from "react";

const Parameters = () => {
  return (
    <div className={styles.parameters}>
      <Parameter param="Телеграмм" />
      <Parameter param="ВК" />
      <Parameter param="Телефон" />
      <Parameter param="Email" />
    </div>
  );
};

export default React.memo(Parameters);
