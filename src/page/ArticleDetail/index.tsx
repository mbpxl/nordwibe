// components/ArticleDetail.tsx
import styles from "@/page/ArticleDetail/styles.module.scss";
import { useAddPostToFavoriteMutation } from "@/service/favorite.service";
import houseApi from "@/service/houseApi.service";
import { BASE_DOMAIN } from "@/service/stories.service";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
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
  cover_image_id: string;
};

const ArticleDetail: FC<{ article: Article }> = ({ article }) => {
  const [articlesImgUrl, setArticlesImgUrl] = useState("");

  const coverImageId = article.cover_image_id;
  console.log(articlesImgUrl);

  useEffect(() => {
    houseApi
      .getImages([coverImageId])
      .then((fethedImgUrls) => {
        setArticlesImgUrl(fethedImgUrls);
      })
      .catch((error) => console.log("Failed to fetch images", error));
  }, [coverImageId]);

  const articleCoverImage = BASE_DOMAIN + articlesImgUrl[0];

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
          src={articleCoverImage}
          alt={article.image}
          width={300}
          height={300}
        />
      </div>

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
