"use client";

import styles from "@/components/Article/styles.module.scss";
import houseApi from "@/service/houseApi.service";
import { BASE_DOMAIN } from "@/service/stories.service";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FC } from "react";

const API_BASE = "https://3133319-bo35045.twc1.net/api/v0/";
type PostsType = {
  id: number;
  title: string;
  lead: string;
  cover_image_id: string;
  publication_date: string;
  content: string;
  is_favorite: boolean;
};

const Article: FC<PostsType> = ({
  lead,
  cover_image_id,
  publication_date,
  content,
  is_favorite,
  title,
  id,
}) => {
  // console.log(cover_image_id);

  const [articlesImgUrls, setArticlesImgUrls] = useState("");
  console.log(articlesImgUrls);

  useEffect(() => {
    houseApi
      .getImages([cover_image_id])
      .then((fethedImgUrls) => {
        setArticlesImgUrls(fethedImgUrls);
      })
      .catch((error) => console.log("Failed to fetch images", error));
  }, [cover_image_id]);

  return (
    <Link href={`/articles/${id}`}>
      <div className={`${styles.article}`}>
        <div className={styles.image}>
          <Image
            unoptimized
            src={BASE_DOMAIN + articlesImgUrls[0]}
            alt={title}
            width={300}
            height={300}
          />
        </div>
        <h2>{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: content.slice(0, 70) }} />
      </div>
    </Link>
  );
};

export default React.memo(Article);
