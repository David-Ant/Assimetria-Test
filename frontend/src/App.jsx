import { useEffect, useState } from 'react'
import { fetchData } from './api/client'
import './App.css'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  return (
    <div>
      <h1>Articles</h1>
      {data ? (
        <pre>
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App
