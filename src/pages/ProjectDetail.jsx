import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsData } from '../data/projects';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = projectsData.find(p => p.id === projectId);

  if (!project) {
    return <div className="hero-sec"><h2>Project not found</h2><Link to="/projects">Back to Projects</Link></div>;
  }

  return (
    <div className="hero-sec" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
      <h1 style={{ color: 'rgb(189,21,21)' }}>{project.title}</h1>
      <img src={`/images/projects/${project.image}`} alt={project.title} style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', margin: '2rem 0' }} />
      <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>{project.description}</p>
      <div style={{ marginTop: '2rem' }}>
        <h3>Tech Stack:</h3>
        <div className="project-skills-container" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          {project.skills.map(skill => (
             <img key={skill} src={`/images/stack/${skill}`} alt="skill icon" className="project-skill" />
          ))}
        </div>
      </div>
      <Link to="/projects" className="hireme" style={{ marginTop: '3rem', textDecoration: 'none' }}>Back to Projects</Link>
    </div>
  );
};

export default ProjectDetail;