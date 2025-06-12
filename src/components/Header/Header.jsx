import React from "react";
import { Link, useLocation } from "react-router-dom";
import marvelLogo from "../../assets/Marvel-logo.png";
import "./Header.css";

function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">
          <img src={marvelLogo} alt="Marvel Logo" />
        </Link>
      </div>
      <nav className="header-nav">
        <ul>
          <li className={location.pathname === "/characters" ? "active" : ""}>
            <Link to="/characters">Personnages</Link>
          </li>
          <li className={location.pathname === "/comics" ? "active" : ""}>
            <Link to="/comics">Comics</Link>
          </li>
          <li className={location.pathname === "/favorites" ? "active" : ""}>
            <Link to="/favorites">Favoris</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header; 