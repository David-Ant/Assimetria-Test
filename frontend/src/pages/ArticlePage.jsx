import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticleById } from "../api/client";

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchArticleById(id).then(setArticle);
  }, [id]);

  if (!article) return <p>Loading...</p>;

  return (
    <main>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <small>{new Date(article.createdAt).toLocaleString()}</small>
    </main>
  );
}
