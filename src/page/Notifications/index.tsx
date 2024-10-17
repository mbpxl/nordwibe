"use client"

import Notification, { ENotificationsTypes } from "@/components/Notification";
import { useTypedSelector } from "@/hooks/selector.hook";
import styles from "@/page/Notifications/styles.module.scss";
import { useListchatQuery } from "@/service/chat.service";
import { useGetMeQuery } from "@/service/userApi.service";

const Notifications = () => {
  // const user = useTypedSelector(selector => selector.userSlice.user)
  const {data: user} = useGetMeQuery();
  const id = user?user.id:0;
  const notifications = [] as {type:ENotificationsTypes, message:string, status:boolean}[]
  const {data: chatList} = useListchatQuery();
  if (chatList)
    chatList.forEach(chat=>{
      chat.messages.forEach(m=>{
        if(!m.readed&&m.sender_id!=id)
          notifications.push({
              type:ENotificationsTypes.new,
              message:m.text,
              status:true
          })
      })
    })
  return (
    <div className={`${styles.notifications}`}>
      {notifications.map((notification, i) => (
        <Notification
          key={i}
          type={notification.type}
          message={notification.message}
          status={notification.status}
        />
      ))}
      {notifications.length === 0 && <div className={styles.dont}><h1>Нет уведомлений</h1></div>}
    </div>
  );
};

export default Notifications;
