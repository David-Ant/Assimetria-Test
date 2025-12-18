import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticleById } from "../api/client";
import "./ArticlePage.css";

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchArticleById(id).then(setArticle);
  }, [id]);

  if (!article) return <p>Loading...</p>;

  function formatArticleText(text) {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={i}>
          {parts.map((part, j) =>
            j % 2 === 1 ? <strong key={j}>{part}</strong> : part
          )}
        </p>
      );
    });
  }

  return (
    <main className="article-card">
      <h1>{article.title.replace(/\*\*/g, '')}</h1>
      <div className="article-content">{formatArticleText(article.content)}</div>
      <small className="article-date">{new Date(article.createdAt).toLocaleDateString()}</small>
    </main>
  );
}
