// import { Link } from "react-router-dom";

// function Header() {
//   return (
//     <>
//       <header>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/custom-error">Error 404</Link>
//             </li>
//             <li>
//               <Link to="/error-boundary">Error Boundary</Link>
//             </li>
//           </ul>
//         </nav>
//       </header>
//     </>
//   );
// }

// export default Header;

import { NavLink } from "react-router-dom";
import { useState } from "react";
import "../assets/styles/Header.css";
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">Todo Details</NavLink>
        </li>
        <li>
          <NavLink to="/error">Error</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
