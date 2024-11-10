"use client"

import Article from "@/components/Article";
import styles from "@/page/Articles/styles.module.scss";
import { useGetPostsQuery } from "@/service/articles.service";
import React from "react";

type PostsType = {
  id: number;
  title: string;
  lead: string;
  cover_image_id: string;
  publication_date: string;
  content: string;
  is_favorite: boolean;
}

const Articles = () => {
  //@ts-ignore
  const { data: posts, error, isLoading } = useGetPostsQuery();

  console.log(posts);

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Произошла ошибка при загрузке постов</p>;

  return (
    <div className={`${styles.articles}`}>
      <h1>О НАС</h1>
      <div className={styles.grid}>
        {posts.map((post: PostsType) => (
          <Article key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Articles);
