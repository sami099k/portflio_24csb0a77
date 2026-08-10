// src/components/ProjectList.jsx
import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectList = ({ projects }) => {
  return (
    <div className="project-container">
      {projects.map((project, index) => (
        // Passing individual project data down to grandchild component
        <ProjectCard 
          key={project.id} 
          project={project} 
          isLeft={index % 2 === 0} 
          index={index + 1} 
        />
      ))}
    </div>
  );
};

export default ProjectList;