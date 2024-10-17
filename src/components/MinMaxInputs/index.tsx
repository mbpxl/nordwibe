import { FC } from "react";
import styles from "../FilterToggle/styles.module.scss";

interface IFilterToggle {
  text: string;
}

const FitlerToggle: FC<IFilterToggle> = ({ text }) => {
  return (
    <div className={styles.toggle_parent}>
      <label htmlFor="id" className={styles.toggle_rect}>
        <input className={styles.checkbox} type="checkbox" id="id" required />
        <label className={styles.label_for_before}>{text}</label>
        <label htmlFor="id">{text}</label>
      </label>
    </div>
  );
};

export default FitlerToggle;
