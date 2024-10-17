import styles from "@/components/ProfileMenu/styles.module.scss"

const ProfileMenu = () => {
  return <div className={styles.profileMenu}>
    <ul>
      <li>Заблокировать</li>
      <li>Пожаловаться</li>
      <li>Скрыть из предложения</li>
      <li>Отключить уведомления</li>
    </ul>
  </div>
}

export default ProfileMenu;