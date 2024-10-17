import styles from "@/components/Convenience/styles.module.scss"
import { FC } from "react";

const Convenience: FC<{ label: string }> = ({ label }) => {
  return <div className={styles.convenience}>
    <h4>{label}</h4>
  </div>
}

export default Convenience;