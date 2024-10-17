import Parameter from "@/components/Parameter";
import styles from "@/page/Profile/Parameters/styles.module.scss"

const Parameters = () => {
  return <div className={styles.parameters}>
    <Parameter param="Телеграмм" />
    <Parameter param="ВК" />
    <Parameter param="Телефон" />
    <Parameter param="Email" />
  </div>
}

export default Parameters;
