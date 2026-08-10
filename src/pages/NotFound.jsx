import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="hero-sec" style={{ flexDirection: 'column', textAlign: 'center', minHeight: '50vh' }}>
      <h1 style={{ fontSize: '5rem', color: 'var(--second)' }}>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" className="hireme" style={{ textDecoration: 'none', marginTop: '20px' }}>Back to Home</Link>
    </div>
  );
};

export default NotFound;