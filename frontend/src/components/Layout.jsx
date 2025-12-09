import './Layout.css';

export default function Layout({ children }) {
    return (
        <div className="layout-container">
            <header className="layout-header">
                <div className='logo'>Logo</div>
            </header>
            <div className="layout-content">
                {children}
            </div>
            <footer className="layout-footer">
                <p>Technical Test</p>
                <p>Produced by David Antunes</p>
            </footer>
        </div>
    );
}