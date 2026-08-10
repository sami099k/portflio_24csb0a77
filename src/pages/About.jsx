import React from 'react';

const About = () => {
  return (
    <div className="hero-sec hello" id="skills" style={{ position: 'relative' }}>
      <div className="dj">Skills</div>
      <div className="about-me" style={{ color: 'rgb(189,21,21)' }}>
        <div className="heading">
          <div className="one">
            <div className="m" style={{ fontSize: '55px', fontWeight: 'bold' }}>M</div>
            <div className="t">e and</div>
          </div>
          <div className="one my" style={{ paddingBottom: '50px' }}>My Tech Stack</div>
        </div>
        <div className="one info" style={{ paddingTop: '70px' }}>
          Hi everyone, my name is Mohammad Sami Syed. I'm a B.Tech Computer Science and Engineering student at NIT
          Warangal, pursuing a Minor in Applied and Computational Mathematics. I have
          hands-on experience with full-stack and AI/ML development.
        </div>
      </div>
      <div className="pics">
        <img src="/images/userAsset/blob vector.png" alt="blob background" className="blob" />
        <div className="a">
          <img src="/images/stack/HTML.png" alt="HTML" className="project-skill" />
          <img src="/images/stack/CSS.png" alt="CSS" className="project-skill" />
          <img src="/images/stack/Javascript.svg" alt="JS" className="project-skill" />
          <img src="/images/stack/React.png" alt="React" className="project-skill" />
        </div>
        <div className="b">
          <img src="/images/stack/NodeJs.svg" alt="Node" className="project-skill" />
          <img src="/images/stack/MongoDB.svg" alt="Mongo" className="project-skill" />
        </div>
      </div>
    </div>
  );
};

export default About;