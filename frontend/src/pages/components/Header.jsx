import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Button, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './../../index.css'

const { Header: AntHeader } = Layout;

const Header = () => {
  const navigate = useNavigate();

  return (
    <AntHeader style={{
      height: '100px',
      background: '#ffffffff', // ← Темно-синий цвет
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '0 40px',
      boxShadow: '0 2px 8px #7c00ff',
      borderRadius: '5px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <img 
          src="/logo.png" 
          alt="Rostelecom" 
          style={{ 
            height: '32px', 
            width: 'auto'
          }}
        />
        <span style={{ 
          fontSize: '20px', 
          fontWeight: '700', 
          color: 'black' // ← Белый текст для контраста
        }}>
          Rostelecom Analytics
        </span>
      </div>
      
      <Space>
        <Button 
          type="primary" 
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/create-project')} // ← Измените путь
          style={{ 
            background: '#ff4f12',
            height: '55px',
            width: '220px'
          }}
        >
          Создать новый проект
        </Button>
      </Space>
    </AntHeader>
  );
};

export default Header;