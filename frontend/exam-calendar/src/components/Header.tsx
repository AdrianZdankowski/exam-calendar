import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Header.css";

const Header = () => {

  const {isAuthenticated, logout} = useAuth();

  return (
    <header>
        <h2><Link className="clean-link" to="/">Exam calendar</Link></h2>
      <nav>
        {isAuthenticated ? 
        <p onClick={logout}><Link className="clean-link" to="/">Logout</Link></p>
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
