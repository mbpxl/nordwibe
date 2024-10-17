"use client"

import styles from "@/page/Notifications/Settings/styles.module.scss"
import { useState } from "react"

const NotificationsSettings = () => {
  const [settingsSupport, setSettingsSupport] = useState<boolean>(true)
  const [settingsMail, setSettingsMail] = useState<boolean>(true)
  const [settingsUsers, setSettingsUsers] = useState<boolean>(true)

  const toggleSettings = (type: "support" | "mail" | "users") => {
    switch (type) {
      case "support":
        setSettingsSupport(!settingsSupport)
        break;

      case "mail":
        setSettingsMail(!settingsMail)
        break;

      case "users":
        setSettingsUsers(!settingsUsers)
        break;
    }
  }

 /* return <div className={styles.settings}>
    <div className={styles.inputs}>
      <div className={styles.inputContainer}>
        <h3>Уведомления от поддержки</h3>
        <div className={styles.input} onClick={() => toggleSettings("support")}>
          <div className={`${styles.circle} ${settingsSupport ? styles.active : ""}`}></div>
        </div>
      </div>
      <div className={styles.inputContainer}>
        <h3>Уведомления от рассылки</h3>
        <div className={styles.input} onClick={() => toggleSettings("mail")}>
          <div className={`${styles.circle} ${settingsMail ? styles.active : ""}`}></div>
        </div>
      </div>
      <div className={styles.inputContainer}>
        <h3>Уведомления от пользователей</h3>
        <div className={styles.input} onClick={() => toggleSettings("users")}>
          <div className={`${styles.circle} ${settingsUsers ? styles.active : ""}`}></div>
        </div>
      </div>
    </div>
  </div>
  */

  return <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}><div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}><h2 style={{ marginBottom: '1rem', textAlign: 'center', fontWeight: 'bold', fontSize: '2rem'}}>Ооой🥺</h2><p style={{ marginBottom: '1rem',  textAlign: 'center'}}>Что-то пошло не так</p><p style={{textAlign: 'center'}}>Попробуй снова, если не заработает - <a href="/chat/support" style={{ textDecoration: 'underline', textDecorationStyle: 'dashed' }}>пиши нам</a></p></div></div>

}

export default NotificationsSettings;
