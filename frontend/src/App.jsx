import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './pages/Login'
import Registration from './pages/Registration'
import User from './pages/User';
import CreateProject from './pages/CreateProject';


function App() {
  return (
    <Router>
      <Routes>
       <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reg" element={<Registration />} />
        <Route path="/" element={<User />} />
        <Route path="/user" element={<User />} />
        <Route path="/create-project" element={<CreateProject />} />
      </Routes>
    </Router>
  )
}

export default App;

