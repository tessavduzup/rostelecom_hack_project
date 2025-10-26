import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectList';
import '../styles/User.css';

const User = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка проектов из базы данных
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Здесь реальный запрос к API
        // const response = await fetch('/api/projects');
        // if (!response.ok) throw new Error('Ошибка загрузки');
        // const data = await response.json();
        // setProjects(data);
        
        // Временные mock данные
        setTimeout(() => {
          const mockProjects = [
            {
              id: 1,
              name: 'Цифровизация филиалов',
              status: 'active',
            },
            {
              id: 2,
              name: 'Обновление сетевой инфраструктуры', 
              status: 'planning',
            },
            {
              id: 3,
              name: 'Внедрение CRM системы',
              status: 'completed',
            },
            {
              id: 4,
              name: 'Модернизация серверного оборудования',
              status: 'active',
            }
          ];
          setProjects(mockProjects);
          setLoading(false);
        }, 1000);
        
      } catch (err) {
        setError('Не удалось загрузить проекты');
        setLoading(false);
        console.error('Ошибка загрузки:', err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="app-container">
      <main className="user-content">
        <div className="user-container">
          <div className="projects-section main_container">
            <div className="header-with-action">
              <h1 className="page-title">Мои проекты</h1>
              <Link to="/create-project">
              <button 
                className="create-project-btn"
                disabled={loading}
              >
                <span className="btn-icon">+</span>
                Создать новый проект
              </button></Link>
            </div>
            
            {loading && (
              <div className="loading-message">Загрузка проектов...</div>
            )}
            
            {error && (
              <div className="error-message">{error}</div>
            )}
            
            {!loading && !error && (
              <div className="projects-list">
                {projects.length > 0 ? (
                  projects.map(project => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                    />
                  ))
                ) : (
                  <div className="empty-state">
                    <p>У вас пока нет проектов</p>
                    <Link to="/create-project"><button 
                      className="create-project-btn empty-state-btn"
                    >
                      <span className="btn-icon">+</span>
                      Создать первый проект
                    </button></Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default User;