import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Button, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './../../styles/Header.css'; // Импортируем CSS файл

const { Header: AntHeader } = Layout;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Показывать кнопку только на главной странице пользователя
  const showCreateButton = location.pathname === '/user';

  return (
    <AntHeader className="app-header">
      <div className="header-content">
        <div className="logo-section">
          <img 
            src="/logo.png" 
            alt="Rostelecom" 
            className="logo-image"
          />
          <span className="company-name">
            Rostelecom Analytics
          </span>
        </div>
        
        <Space>
          {showCreateButton && (
            <Button 
              type="primary" 
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate('/create-project')}
              className="create-project-button"
            >
              Создать новый проект
            </Button>
          )}
        </Space>
      </div>
    </AntHeader>
  );
};

export default Header;