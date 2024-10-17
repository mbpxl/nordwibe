"use client"

import Article from "@/components/Article";
import FavouritesUser from "@/components/Favourites/User";
import Flat from "@/components/Flat";
import { useTypedSelector } from "@/hooks/selector.hook";
import styles from "@/page/Favourites/styles.module.scss"

const Favourites = () => {
  const user = useTypedSelector(selector => selector.userSlice.user)

  return <div className={styles.favourites}>
    <h1>Избранное</h1>
    <div className={styles.blocks}>
      <div className={styles.block}>
        <h3>Пользователи</h3>
        {
          user.favourites.users.length === 0 ? <h4>Вы еще не добавляли ничего в избранное</h4> : user.favourites.users.map(favourite => (
            <FavouritesUser user={favourite} />
          ))
        }
      </div>
      //to deploy i delete it
      {/* <div className={styles.block}>
        <h3>Квартиры</h3>
        {
          user.favourites.flats.length === 0 ? <h4>Вы еще не добавляли ничего в избранное</h4> : user.favourites.flats.map(favourite => (
            
            <Flat flat={favourite} />
          ))
        }
      </div> */}
      <div className={styles.block}>
        <h3>Статьи</h3>
        {
          user.favourites.articles.length === 0 ? <h4>Вы еще не добавляли ничего в избранное</h4> : <div className={styles.articles}>
            {
              user.favourites.articles.map(article => (
                <Article {...article} />
              ))
            }
          </div>
        }
      </div>
    </div>
  </div>
}

export default Favourites;