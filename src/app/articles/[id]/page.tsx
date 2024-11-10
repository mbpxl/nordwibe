// pages/article/[id].tsx
"use client"
import ArticleDetail from "@/page/ArticleDetail";
import { useGetPostByIdQuery } from "@/service/articles.service";
import { Metadata } from "next";
import React from "react";

const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const { id } = params;
  const { data: article } = useGetPostByIdQuery(id, { skip: typeof window === "undefined" });

  return {
    title: `${article ? article.title : "Loading..."} | Nordwibe`,
    description: `Детальная страница поста под названием ${article ? article.title : "Loading..."}`,
  };
};

const ArticleDetailPage = ({ params }: { params: { id: string } }) => {
  const { data: article, isLoading, error } = useGetPostByIdQuery(params.id);

  if (isLoading) return <p>Загрузка...</p>;
  if (error || !article) return <p>Пост не найден</p>;

  return <ArticleDetail article={article} />;
};

export default React.memo(ArticleDetailPage);
