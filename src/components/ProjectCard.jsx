import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project, isLeft, index }) => {
  // Independent state per card
  const [showDetails, setShowDetails] = useState(false);

  const cardAlignmentClass = isLeft ? 'left' : 'right';
  const contentAlignmentClass = isLeft ? 'project-content-left' : 'project-content-right';
  const numberAlignmentClass = isLeft ? 'project-number-left' : '';

  return (
    <div 
      className={`project-card ${cardAlignmentClass}`} 
      style={{ backgroundImage: `url(/images/projects/${project.image})` }}
    >
      <div className={`project-number ${numberAlignmentClass}`}>
        {String(index).padStart(2, '0')}
      </div>
      <div className={`project-content ${contentAlignmentClass}`}>
        <div className="project-skills-container">
          {project.skills.map(skill => (
            <img key={skill} src={`/images/stack/${skill}`} alt="skill icon" className="project-skill" />
          ))}
        </div>
        <h2 className="project-heading">{project.title}</h2>
        
        <div className="project-subHeading">
          {showDetails ? project.description : `${project.description.substring(0, 80)}...`}
        </div>
        
        <div className="btn-grp" style={{ marginTop: '1rem', gap: '10px' }}>
          <button onClick={() => setShowDetails(!showDetails)} className="hireme" style={{ width: '145px', border: 'none' }}>
            {showDetails ? 'Show Less' : 'Read More'}
          </button>
          
          <Link to={`/projects/${project.id}`} className="hireme" style={{ width: '145px', textDecoration: 'none' }}>
            Full Page
          </Link>

          <a href={project.githubLink} target="_blank" rel="noreferrer">
            <i title="GitHubLink" className="fa-brands fa-github icon"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;