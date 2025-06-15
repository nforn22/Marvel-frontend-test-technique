import React, { useEffect, useState } from "react";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
// import captainAmericaIcon from "../../assets/icons8-captain-america-64.png";
import "./Favorites.css";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(`${API_URL}/favorites`, {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` }
        });
        setFavorites(response.data.favorites || []);
      } catch (error) {
        setError(
          error.response?.data?.message ||
          error.message ||
          "An error has occurred while loading favorites."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (id) => {
    try {
      await axios.delete(`${API_URL}/favorites/${id}`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      });
      setFavorites(prev => prev.filter(fav => fav._id !== id));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const handleCardClick = (id, type) => {
    if (type === "character") {
      navigate(`/characters/${id}/comics`);
    } else if (type === "comic") {
      navigate(`/comics/comic/${id}`);
    }
  };

  return (
    <div className="favorites-page">
      <h1>Favorites</h1>
      {isLoading ? (
        <div className="loader-container">
          <Circles height={60} width={60} color="#e62429" ariaLabel="circles-loading" visible={true} />
        </div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((favorite) => (
            <div key={favorite._id} className="favorite-card">
              <img
                src={`${favorite.thumbnail.path}/portrait_xlarge.${favorite.thumbnail.extension}`}
                alt={favorite.name || favorite.title}
                className="favorite-img"
                onClick={() => handleCardClick(favorite._id, favorite.type)}
                style={{ cursor: "pointer" }}
              />
              <button
                className="remove-favorite-btn"
                onClick={() => handleRemoveFavorite(favorite._id)}
                aria-label="Remove from favorites"
              >
                Remove
              </button>
              <h3>{favorite.name || favorite.title}</h3>
              <p>{favorite.description || "No description."}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites; 