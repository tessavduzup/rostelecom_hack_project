import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import './App.css';
import Login from './pages/Login';
import Registration from './pages/Registration';
import User from './pages/User';
import CreateProject from './pages/CreateProject';
import Header from './pages/components/Header'; // Добавьте этот импорт
import './index.css';
import RevenueForm from './forms/RevenueForm';
import CostsForm from './forms/CostsForm'

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Routes>
       <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reg" element={<Registration />} />
        <Route path="/user" element={<User />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/r" element={<RevenueForm />} />
        <Route path="/cr" element={<CostsForm />} />
      </Routes>
    </Router>
  );
}

export default App;