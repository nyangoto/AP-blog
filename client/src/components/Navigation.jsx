import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/layout.css';

function Navigation() {
  return (
    <nav className="nav">
      <div className="container">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
          <li className="nav-item"><Link to="/blog" className="nav-link">Blog</Link></li>
          <li className="nav-item"><Link to="/about" className="nav-link">About</Link></li>
          <li className="nav-item"><Link to="/admin/login" className="nav-link">Admin</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
