import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import './App.css';
import Login from './pages/Login';
import Registration from './pages/Registration';
import User from './pages/User';
import CreateProject from './pages/CreateProject';
import Header from './pages/components/Header'; // Добавьте этот импорт
import './index.css';

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <Content>
          <Routes>
            <Route path="/f" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reg" element={<Registration />} />
            <Route path="/user" element={<User />} />
            <Route path="/create-project" element={<CreateProject />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;