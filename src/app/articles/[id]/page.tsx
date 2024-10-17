import { articles } from "@/config";
import ArticleDetail from "@/page/ArticleDetail";
import { Metadata } from "next";

export const generateMetadata = async ({ params }: { params: { id: string } }): Promise<Metadata> => {
  const id = params.id
  const article = articles[Number(id)]

  return {
    title: `${article ? article.title : undefined} | Nordwibe`,
    description: `Детальная страница поста под названием ${article ? article.title : undefined}`,
  }
}

const ArticleDetailPage = ({ params }: { params: { id: string } }) => {
  return <ArticleDetail {...params} />
}

export default ArticleDetailPage;