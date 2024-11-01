import { articles } from "@/config";
import styles from "@/page/ArticleDetail/styles.module.scss";
import Image from "next/image";
import { FC } from "react";
import { notFound } from "next/navigation";
import React from "react";

const ArticleDetail: FC<{ id: string }> = ({ id }) => {
  const article = articles[Number(id)];

  if (!article) return notFound();

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
        {article.time.getHours()}:{article.time.getMinutes()}
      </h6>
      <h2>{article.title}</h2>
      <h4>{article.subtitle}</h4>
      <p>{article.content}</p>
    </div>
  );
};

export default React.memo(ArticleDetail);
