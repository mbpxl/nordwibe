"use client";

import React from "react";
import styles from "./styles.module.scss";
import Link from "next/dist/client/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useGetPostsQuery } from "@/service/articles.service";

const FavoritePosts = () => {
  const pathname = usePathname();

  const isOnFavoritesUsersPage = pathname === "/favourites/posts";
  const isOnFavoritesPage = pathname === "/favourites";

  //@ts-ignore
  const { data: posts, isLoading, error } = useGetPostsQuery();

  console.log(posts);

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки данных</p>;

  // Фильтруем избранные статьи
  const favoritePosts = posts?.filter(
    (article: any, index: any, self: any) =>
      article.is_favorite &&
      index === self.findIndex((t: any) => t.id === article.id)
  );

  if (!favoritePosts || favoritePosts.length === 0) {
    return <p>Нет статей</p>;
  }

  return (
    <div className={styles.favoritePage}>
      <h1 className={styles.header}>Избранное</h1>
      <nav className={styles.nav_fav}>
        <Link href="/favourites">
          <h2
            className={
              isOnFavoritesPage ? styles.activeLink : styles.inActiveLink
            }
          >
            Избранные квартиры
          </h2>
        </Link>
        <Link href="/favourites/posts">
          <h2
            className={
              isOnFavoritesUsersPage ? styles.activeLink : styles.inActiveLink
            }
          >
            Избранные статьи
          </h2>
        </Link>
      </nav>
      <div className={styles.articlesContainer}>
        {favoritePosts.map((article: any) => (
          <Link href={`/articles/${article.id}`} key={article.id}>
            <div className={styles.article}>
              <div className={styles.image}>
                <Image
                  unoptimized
                  src={`/articles/${article.cover_image_id}.png`}
                  alt={article.title}
                  width={300}
                  height={300}
                />
              </div>
              <h2>{article.title}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: article.content.slice(0, 100),
                }}
              />
              {/* <h4>{article.content.slice(0, 100)}...</h4> */}
            </div>
            <div className={styles.remove_btn}>
              <button>Удалить из избранного</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FavoritePosts;
