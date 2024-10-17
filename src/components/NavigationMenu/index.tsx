"use client"

import styles from "@/components/NavigationMenu/styles.module.scss"
import { useTypedSelector } from "@/hooks/selector.hook"
import { AppDispatch } from "@/store"
import { deleteAll, readAll, removeAllFavourites } from "@/store/slices/user"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useDispatch } from "react-redux"

const NavigationMenu = () => {
  const menu = useTypedSelector(selector => selector.navigationSlice.menu)
  const pathname = usePathname()
  const dispatch = useDispatch<AppDispatch>()

  return <div className={styles.navigationMenu}>
    <ul>
      {menu === "flat" && /^\/flats\/.+/.test(pathname) && (
        <>
          <li>Страница автора</li>
          <li>Пожаловаться</li>
          <li>Скрыть</li>
        </>
      )}
      {menu === "favourites" && pathname === "/favourites" && (
        <>
          <li onClick={() => dispatch(removeAllFavourites())}>Удалить все</li>
        </>
      )}
      {menu === "notifications" && pathname === "/notifications" && (
        <>
          <li onClick={() => dispatch(readAll())}>Пометить все прочитанным</li>
          <li onClick={() => dispatch(deleteAll())}>Удалить все</li>
          <li><Link href={"/notifications/settings"}>Настройки уведомлений</Link></li>
        </>
      )}
    </ul>
  </div>
}

export default NavigationMenu;