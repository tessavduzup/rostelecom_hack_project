import React from 'react';
import { Link } from 'react-router-dom';
import '../components/ProjectList';

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
      <div className="project-info">
        <div className="project-name">{project.name}</div>
        <div 
          className="project-status"
          style={{ color: statusInfo.color, borderColor: statusInfo.color }}
        >
          {statusInfo.text}
        </div>
      </div>
      <div className="project-action">
        <Link to={`/project/${project.id}`} className="details-link">
          Подробнее →
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;