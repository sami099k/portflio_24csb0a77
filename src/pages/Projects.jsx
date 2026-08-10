// src/pages/Projects.jsx
import React from 'react';
import ProjectList from '../components/ProjectList';
import { projectsData } from '../data/projects';

const Projects = () => {
  return (
    <div className="project-section" id="projects">
      <h2 className="page-header" style={{ color: 'rgb(189,21,21)' }}>Projects</h2>
      {/* Passing data down to child component */}
      <ProjectList projects={projectsData} />
    </div>
  );
};

export default Projects;