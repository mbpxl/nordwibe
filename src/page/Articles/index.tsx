import Article from "@/components/Article";
import { articles } from "@/config";
import styles from "@/page/Articles/styles.module.scss";

const Articles = () => {
  return (
    <div className={`${styles.articles}`}>
      <h1>О НАС</h1>
      <div className={styles.grid}>
        {articles.map((article) => (
          <Article key={article.id} {...article} />
        ))}
      </div>
    </div>
  );
};

export default Articles;

