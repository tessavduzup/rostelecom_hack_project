import React from 'react';
import { Layout } from 'antd';
import Header from './components/Header';
import ProjectList from './components/ProjectList';

const { Content } = Layout;

const User = () => {
  return (
    <div className="app-container"> {/* Добавляем контейнер */}
      <Layout>
        <Header />
        <Content>
          <ProjectList />
        </Content>
      </Layout>
    </div>
  );
};

export default User;