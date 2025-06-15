import React from "react";
import { Link, useLocation } from "react-router-dom";
import marvelLogo from "../../assets/Marvel-logo.png";
import "./Header.css";

function Header({ onOpenSignupModal, onOpenLoginModal }) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">
          <img src={marvelLogo} alt="Marvel Logo" />
        </Link>
      </div>
      <div className="header-actions">
        <nav className="header-nav">
          <ul>
            <li className={location.pathname === "/characters" ? "active" : ""}>
              <Link to="/characters">Characters</Link>
            </li>
            <li className={location.pathname === "/comics" ? "active" : ""}>
              <Link to="/comics">Comics</Link>
            </li>
            <li className={location.pathname === "/favorites" ? "active" : ""}>
              <Link to="/favorites">Favorites</Link>
            </li>
            <li>
              <Link to="#" onClick={onOpenSignupModal}>S'inscrire</Link>
            </li>
            <li>
              <Link to="#" onClick={onOpenLoginModal}>Se connecter</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header; 