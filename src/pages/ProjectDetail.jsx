import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}`);
        if (response.status === 404) {
          setError('Project not found');
          setProject(null);
          return;
        }
        if (!response.ok) {
          throw new Error(`Server error (${response.status})`);
        }
        const data = await response.json();
        setProject(data);
      } catch (err) {
        console.error('Error fetching project detail:', err);
        setError(err.message || 'Failed to load project details');
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  if (loading) {
    return (
      <div className="hero-sec" style={{ minHeight: '50vh', flexDirection: 'column', justifyContent: 'center' }}>
        <h2>Loading project details...</h2>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="hero-sec" style={{ minHeight: '50vh', flexDirection: 'column', justifyContent: 'center' }}>
        <h2 style={{ color: 'rgb(189,21,21)', marginBottom: '1rem' }}>
          {error || 'Project not found'}
        </h2>
        <p style={{ marginBottom: '1.5rem' }}>
          The requested project could not be found or loaded from the backend.
        </p>
        <Link to="/projects" className="hireme" style={{ textDecoration: 'none' }}>
          Back to Projects
        </Link>
      </div>
    );
  }

  const skillsList = project.skills || [];

  return (
    <div className="hero-sec" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
      <h1 style={{ color: 'rgb(189,21,21)' }}>{project.title}</h1>
      {project.image && (
        <img 
          src={`/images/projects/${project.image}`} 
          alt={project.title} 
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', margin: '2rem 0' }} 
        />
      )}
      <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>{project.description}</p>
      {skillsList.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Tech Stack:</h3>
          <div className="project-skills-container" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            {skillsList.map((skill) => (
              <img 
                key={skill} 
                src={skill.includes('.') ? `/images/stack/${skill}` : `/images/stack/${skill}.svg`} 
                alt={`${skill} icon`} 
                className="project-skill" 
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ))}
          </div>
        </div>
      )}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem' }}>
        <Link to="/projects" className="hireme" style={{ textDecoration: 'none' }}>
          Back to Projects
        </Link>
        {project.githubLink && project.githubLink !== '#' && (
          <a 
            href={project.githubLink} 
            target="_blank" 
            rel="noreferrer" 
            className="hireme" 
            style={{ textDecoration: 'none', background: '#333' }}
          >
            GitHub Repository
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;