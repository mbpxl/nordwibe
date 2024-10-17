import styles from "@/components/Notification/styles.module.scss"
import { FC } from "react"

export enum ENotificationsTypes {
  "new",
  "read"
}

interface INotification {
  type: ENotificationsTypes,
  message: string,
  status: boolean
}

const Notification: FC<INotification> = ({ type, message, status }) => {
  
  return <div className={styles.notification}>
    <div className={styles.title}>
      <div className={type === ENotificationsTypes.read ? "bg-green-400" : type === ENotificationsTypes.new ? "bg-grey-300" : "bg-red-600"}></div>
      <h4>{(status ? "Уведомление" : "Новое уведомление").toUpperCase()}</h4>
    </div>
    <p>{message}</p>
  </div>
}

export default Notification;
