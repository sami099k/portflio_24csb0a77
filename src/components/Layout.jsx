import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ theme, toggleTheme }) => {
  return (
    <div className="wrapper">
      {/* Prop drilling Level 1: Passing theme to Navbar */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;