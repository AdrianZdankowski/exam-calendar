import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header>
        <h2><Link className="clean-link" to="/">Exam calendar</Link></h2>
      <nav>
        <p><Link className="clean-link" to="/login">Login</Link></p>
        <p>Manage calendar</p>
      </nav>
      
      
    </header>
  );
};

export default Header;
