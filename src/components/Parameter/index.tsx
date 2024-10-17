import styles from "@/components/Parameter/styles.module.scss"
import Image from "next/image";
import { FC } from "react";

interface IParameter {
  param:string
}

const Parameter: FC<IParameter> = ({param}) => {
  return <div className={styles.parameter}>
    <h1>{param.toUpperCase()}</h1>
    <div >
      <input type="text" className={styles.change_input}/>
      <Image src={"/icons/pencilProfile.svg"} alt="edit" width={100} height={100} />
    </div>
  </div>
}

export default Parameter;