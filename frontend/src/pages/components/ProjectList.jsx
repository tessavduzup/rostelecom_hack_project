import React from 'react';
import { Card, List, Tag, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import './../../index.css'


const ProjectList = () => {
  console.log('ProjectList component rendered'); // ← для отладки

  const projects = [
    {
      id: 1,
      name: 'Цифровизация филиалов',
      status: 'active',
      amount: 4500000,
    },
    {
      id: 2,
      name: 'Обновление сетевой инфраструктуры', 
      status: 'planning',
      amount: 2800000,
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card title="Мои проекты">
        <List
          dataSource={projects}
          renderItem={(project) => (
            <List.Item
              actions={[
                <Button key="details" type="link" icon={<ArrowRightOutlined />} style={{color: '#ff4f12'}}>
                  Подробнее
                </Button>
              ]}
            >
              <List.Item.Meta
                title={
                  <div>
                    <span>{project.name}</span>
                    <Tag color={project.status === 'active' ? 'green' : 'blue'} style={{margin: '5px'}}>
                      {project.status === 'active' ? 'В работе' : 'Планирование'}
                    </Tag>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default ProjectList;