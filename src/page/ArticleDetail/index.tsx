// components/ArticleDetail.tsx
import styles from "@/page/ArticleDetail/styles.module.scss";
import { useAddPostToFavoriteMutation } from "@/service/favorite.service";
import Image from "next/image";
import { FC } from "react";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Article = {
  teal: string;
  id: string;
  title: string;
  subtitle: string;
  content: string;
  image: string;
  time: string;
};

const ArticleDetail: FC<{ article: Article }> = ({ article }) => {
  const articleTime = new Date(article.time);

  const [addPostToFavorite] = useAddPostToFavoriteMutation();

  const onAddPostToFavorite = async (post_id: any) => {
    let response: any = await addPostToFavorite(post_id);
    if ("data" in response) {
      toast.success("Статья добавлена в избранное");
    } else {
      toast.error("Ошибка. Попробуйте позже.");
    }
  };

  return (
    <div className={styles.articleDetail}>
      <div className={styles.image}>
        <Image
          unoptimized
          src={`/articles/${article.image}.png`}
          alt={article.image}
          width={300}
          height={300}
        />
      </div>
      <h6>
        {articleTime.getHours()}:{articleTime.getMinutes()}
      </h6>
      <h2>{article.title}</h2>
      <div className="">
        <button
          onClick={() => {
            onAddPostToFavorite(article.id);
          }}
        >
          Add
        </button>
        <ToastContainer />
      </div>
      <h4>{article.teal}</h4>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
      {/* <p>{article.content}</p> */}
    </div>
  );
};

export default React.memo(ArticleDetail);
