import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      {/* section hero */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Marvel Explorer</h1>
          <p className="hero-subtitle">
            Discover Marvel's universe like never before. 
            Explore thousands of characters and comics.
          </p>
          <div className="hero-buttons">
            <Link to="/characters" className="hero-btn hero-btn-primary">
              Explore Heroes
            </Link>
            <Link to="/comics" className="hero-btn hero-btn-secondary">
              Discover Comics
            </Link>
          </div>
        </div>
      </section>

      {/* section fonctionnalités */}
      <section className="features-section">
        <h2 className="features-title">Explore Marvel's Universe</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🦸‍♂️</span>
            <h3>Iconic Characters</h3>
            <p>
              Discover thousands of Marvel superheroes and supervillains with their stories, 
              powers and appearances in comics.
            </p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📚</span>
            <h3>Comics Collection</h3>
            <p>
              Browse a vast library of Marvel comics with complete details 
              on each issue and series.
            </p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">⭐</span>
            <h3>Your Favorites</h3>
            <p>
              Create your personal collection by adding your favorite characters and comics 
              to your favorites list.
            </p>
          </div>
        </div>
      </section>

      {/* section statistiques */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-number">1500+</span>
            <span className="stat-label">Characters</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">50K+</span>
            <span className="stat-label">Comics</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">80+</span>
            <span className="stat-label">Years of History</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">∞</span>
            <span className="stat-label">Adventures</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home; 