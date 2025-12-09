import { useEffect, useState } from 'react'
import { fetchData } from './api/client'
import './App.css'
import BlogCard from './components/BlogCard.jsx'
import { Link } from 'react-router-dom'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  function getExcerpt(text, wordCount = 20) {
    const words = text.split(" ");
    if (words.length <= wordCount) return text;
    return words.slice(0, wordCount).join(" ") + "...";
  }

  return (
    <main>
      <h1>Articles</h1>
      {data ? (
        <div className="blog-list">
          {data.map(article => {
            const { id, title, content, createdAt } = article;
            return (
              <div key={id}>{
                <Link to={`/article/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <BlogCard title={title} summary={getExcerpt(content)} date={createdAt} />
                </Link>
              }
              </div>
            );
          })}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}

export default App
