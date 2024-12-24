import { Link } from "react-router-dom";
import { useState } from "react";
import "../assets/styles/Header.css";
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
        <h1 style={{ color: "white" }}>Todo App</h1>
        <ul className={menuOpen ? "open" : ""}>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/error">Error</Link>
          </li>

          <li>
            <Link to="/custom-error">Custom 404</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
