import React, { useState, useEffect } from 'react';
import ProjectList from '../components/ProjectList';
import { API_BASE_URL } from '../config/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects`);
      if (!response.ok) {
        throw new Error(`Server error (${response.status})`);
      }
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Unable to load projects from backend. Please verify the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="project-section" id="projects">
      <h2 className="page-header" style={{ color: 'rgb(189,21,21)' }}>Projects</h2>

      {loading && (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', fontSize: '1.2rem', color: 'var(--text-color, #333)' }}>
          <p>Loading projects...</p>
        </div>
      )}

      {error && (
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem', 
          margin: '2rem auto', 
          maxWidth: '600px',
          border: '1px solid #e53e3e',
          borderRadius: '8px',
          backgroundColor: 'rgba(229, 62, 62, 0.1)',
          color: '#e53e3e' 
        }}>
          <h3>Failed to Load Projects</h3>
          <p style={{ margin: '1rem 0' }}>{error}</p>
          <button 
            onClick={fetchProjects} 
            className="hireme" 
            style={{ border: 'none', cursor: 'pointer', display: 'inline-block' }}
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && projects.length > 0 && (
        <ProjectList projects={projects} />
      )}

      {!loading && !error && projects.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No projects found.</p>
        </div>
      )}
    </div>
  );
};

export default Projects;