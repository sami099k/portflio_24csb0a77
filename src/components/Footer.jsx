import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="faded-text rrr">Mohammad Sami Syed</div>
      <div className="navbar">
        <div className="nav-items">
          <div><Link to="/projects" className="links">Projects</Link></div>
          <div><Link to="/about" className="links">Skills</Link></div>
          <div><Link to="/contact" className="links">Contact Me</Link></div>
        </div>
        <div className="logo">
          <a href="https://github.com/sami099k" target="_blank" rel="noreferrer" className="last">
            <i title="GitHub" className="fa-brands fa-github icon" style={{ paddingRight: '5px' }}></i>
          </a>
          <a href="https://linkedin.com/in/sami099k" target="_blank" rel="noreferrer" className="last" style={{ paddingLeft: '5px' }}>
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;