import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProjectList.css'

const ProjectCard = ({ project }) => {
  const getStatusInfo = (status) => {
    const statusMap = {
      active: { text: 'В работе', color: '#52c41a' },
      planning: { text: 'Планирование', color: '#1890ff' },
      completed: { text: 'Завершен', color: '#fa8c16' },
      rejected: { text: 'Отклонен', color: '#ff4d4f' }
    };
    return statusMap[status] || { text: status, color: '#d9d9d9' };
  };

  const statusInfo = getStatusInfo(project.status);

  return (
    <div className="project-plate">
      <div className="project-main-content">
        {/* Название проекта слева */}
        <div className="project-name-section">
          <span className="project-name">{project.name}</span>
        </div>
        
        {/* Нижний индекс в прямоугольнике слева от кнопки */}
        <div 
          className="project-status-index"
          style={{ 
            backgroundColor: statusInfo.color,
            color: 'white'
          }}
        >
          {statusInfo.text}
        </div>
        
        {/* Кнопка "Подробнее" справа */}
        <div className="project-action">
          <Link 
            to={`/project/${project.id}`} 
            className="details-link details-button"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;