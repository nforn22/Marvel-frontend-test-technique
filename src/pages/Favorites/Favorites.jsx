import React, { useEffect, useState } from "react";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import captainAmericaIcon from "../../assets/icons8-captain-america-64.png";
import "./Favorites.css";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL || "https://site--marvel-backend--t29qzrn4njwx.code.run";

function Favorites() {
  const [favoriteComics, setFavoriteComics] = useState([]);
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userToken = Cookies.get("token");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(`${API_URL}/favorites`, {
          headers: { Authorization: `Bearer ${userToken}` }
        });
        const { comics, characters } = response.data;

        const comicsDetails = await Promise.all(
          (comics || []).map(async id => {
            const res = await axios.get(`${API_URL}/comics/comic/${id}`);
            return res.data;
          })
        );

        const charactersDetails = await Promise.all(
          (characters || []).map(async id => {
            const res = await axios.get(`${API_URL}/characters/${id}`);
            return res.data;
          })
        );
        setFavoriteComics(comicsDetails);
        setFavoriteCharacters(charactersDetails);
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
  }, [userToken]);

  const handleRemoveFavorite = async (id, type) => {
    try {
      if (type === "comic") {
        await axios.delete(`${API_URL}/favorites/comics/${id}`, {
          headers: { Authorization: `Bearer ${userToken}` }
        });
        setFavoriteComics(prev => prev.filter(fav => fav._id !== id));
      } else if (type === "character") {
        await axios.delete(`${API_URL}/favorites/characters/${id}`, {
          headers: { Authorization: `Bearer ${userToken}` }
        });
        setFavoriteCharacters(prev => prev.filter(fav => fav._id !== id));
      }
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
        <>
          <div className="favorites-section">
            <h2>Favorite Comics</h2>
            <div className="favorites-grid">
              {favoriteComics.length === 0 ? <p>No favorite comics.</p> : favoriteComics.map((comic) => (
                <div key={comic._id} className="favorite-card">
                  <img
                    src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
                    alt={comic.title}
                    className="favorite-img favorite-img-pointer"
                    onClick={() => handleCardClick(comic._id, "comic")}
                  />
                  <button
                    className="favorite-btn"
                    onClick={() => handleRemoveFavorite(comic._id, "comic")}
                    aria-label="Remove from favorites"
                  >
                    <img
                      src={captainAmericaIcon}
                      alt="Remove favorite"
                      width={32}
                      height={32}
                    />
                  </button>
                  <h3>{comic.title}</h3>
                  <p>{comic.description || "No description."}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="favorites-section">
            <h2>Favorite Characters</h2>
            <div className="favorites-grid">
              {favoriteCharacters.length === 0 ? <p>No favorite characters.</p> : favoriteCharacters.map((character) => (
                <div key={character._id} className="favorite-card">
                  <img
                    src={`${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`}
                    alt={character.name}
                    className="favorite-img favorite-img-pointer"
                    onClick={() => handleCardClick(character._id, "character")}
                  />
                  <button
                    className="favorite-btn"
                    onClick={() => handleRemoveFavorite(character._id, "character")}
                    aria-label="Remove from favorites"
                  >
                    <img
                      src={captainAmericaIcon}
                      alt="Remove favorite"
                      width={32}
                      height={32}
                    />
                  </button>
                  <h3>{character.name}</h3>
                  <p>{character.description || "No description."}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Favorites; 