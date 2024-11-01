import styles from "@/components/Specification/styles.module.scss";
import React from "react";

const Specification = () => {
  return (
    <div className={styles.specification}>
      <h1>Характеристика</h1>
      <form>
        <div className={styles.inputs}>
          <div className={styles.input}>
            <input type="radio" />
            <h4>Да</h4>
          </div>
          <div className={styles.input}>
            <input type="radio" />
            <h4>Не важно</h4>
          </div>
          <div className={styles.input}>
            <input type="radio" />
            <h4>Нет</h4>
          </div>
        </div>
      </form>
    </div>
  );
};

export default React.memo(Specification);
