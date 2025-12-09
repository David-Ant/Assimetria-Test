import './BlogCard.css'

export default function BlogCard({ title, summary, date }) {
    return (
        <div className="blog-card">
            <h2 className="blog-card-title">{title}</h2>
            <p className="blog-card-summary">{summary}</p>
            <p className="blog-card-date">{new Date(date).toLocaleDateString()}</p>
        </div>
    )
}