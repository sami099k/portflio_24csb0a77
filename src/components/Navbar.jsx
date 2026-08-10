import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <a href="/" className="text" style={{ color: 'inherit', textDecoration: 'none' }}>MD SAMI</a>
      </div>
      <div className="nav-items">
        <div><a href="#projects" className="links" style={{ textDecoration: 'none' }}>Projects</a></div>
        <div><a href="#skills" className="links" style={{ textDecoration: 'none' }}>Skills</a></div>
        <div><a href="#contact" className="links" style={{ textDecoration: 'none' }}>Contact Me</a></div>
        <button onClick={toggleTheme} className="hireme" style={{ width: 'auto', padding: '10px' }}>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;