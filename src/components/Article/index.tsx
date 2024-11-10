"use client"

import styles from "@/components/Article/styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import React from "react";
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
}

const Article: FC<PostsType> = ({ lead, cover_image_id, publication_date, content, is_favorite, title, id }) => {
  return (
    <Link href={`/articles/${id}`}>
      <div className={`${styles.article}`}>
        <div className={styles.image}>
          <Image
            unoptimized
            src={`${API_BASE}/articles/${cover_image_id}.png`}
            alt={title}
            width={300}
            height={300}
          />
        </div>
        <h2>{title}</h2>
        <h4>{content.slice(0, 100)}...</h4>
      </div>
    </Link>
  );
};

export default React.memo(Article);
