import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './pages/Login'
import Registration from './pages/Registration'
import User from './pages/User';
import CreateProject from './pages/CreateProject';
import RevenueForm from './forms/RevenueForm';
import CostsForm from './forms/CostsForm'
import Header from './components/Header';

function App() {
  return (
    <>
    <>
    <Router>
      <Header />
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
    </></>
  )
}

export default App;

