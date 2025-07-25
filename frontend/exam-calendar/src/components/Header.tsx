import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Header.css";
import api from "../api/axios";

const Header = () => {

  const {isAuthenticated, logout} = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await api.post('/auth/logout');
      if (response.status === 200) {
        console.log(response.statusText);
        logout();
        navigate('/', {replace: true});
      }
    } 
    catch (error) {
      console.error(error);
    }
    
  };

  return (
    <header>
        <h2><Link className="clean-link" to="/">Exam calendar</Link></h2>
      <nav>
        {isAuthenticated ? 
        <p onClick={handleLogout}><Link className="clean-link" to=".">Logout</Link></p>
        :
        <p><Link className="clean-link" to="/login">Login</Link></p>
      }
        <p><Link className="clean-link" to="/users">Users</Link></p>
        <p>Manage calendar</p>
      </nav>
      
      
    </header>
  );
};

export default Header;
