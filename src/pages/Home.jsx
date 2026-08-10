import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Projects from './Projects';
import About from './About';
import Contact from './Contact';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch or heavy asset loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    // Cleanup function to prevent memory leaks if component unmounts early
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="hero-sec" style={{ minHeight: '60vh', flexDirection: 'column' }}>
        <h2>Loading Portfolio...</h2>
      </div>
    );
  }

  return (
    <>
      <div className="hero-sec">
        <div className="absolute faded-text">Md Sami</div>
        <div className="sec1">
          <h1 style={{ fontWeight: 100 }}>Hi! I am Mohammad Sami Syed</h1>
          <div className="left">
            <h1>I am a</h1>
            <h1 id="q">Student Developer.</h1>
          </div>
          <h5 style={{ fontWeight: 100 }}>
            I'm a B.Tech Computer Science and Engineering student at NIT Warangal, building
            full-stack web apps and AI/ML systems.
          </h5>
          <Link to="/contact" className="hireme" style={{ textDecoration: 'none' }}>Hire Me</Link>
        </div>
        <div className="sec2">
          <div className="absolute icons icon-dot"> <img src="/images/userAsset/dots.png" alt="dots" /> </div>
          <div className="absolute icons icon-cube"> <img src="/images/userAsset/cube.png" alt="cubes" /> </div>
          <div className="absolute icons icon-circle"> <img src="/images/userAsset/circle.png" alt="circle" /></div>
          <div className="absolute icons icon-zigzak"> <img src="/images/userAsset/zigzags.png" alt="zigzag" /></div>
          <div className="absolute icons icon-plus"> <img src="/images/userAsset/plus.png" alt="plus" /></div>
          <div><img src="/images/userAsset/pic.png" alt="Mohammad Sami Syed" className="user-image" /></div>
        </div>
      </div>
      
      <Projects />
      <About />
      <Contact />
    </>
  );
};

export default Home;