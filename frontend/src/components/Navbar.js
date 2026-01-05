import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="navbar-left">
        <Link to="/" className="logo">
          NoteSphere
        </Link>
      </div>

      {/* Center: Search */}
      <div className="navbar-center">
        <input
          type="text"
          placeholder="Search notes..."
          className="search-input"
        />
      </div>

      {/* Right: Auth / User actions */}
      <div className="navbar-right">
        {!token ? (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-button">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="nav-button logout">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
