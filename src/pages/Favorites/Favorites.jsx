import React, { useEffect, useState } from "react";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import captainAmericaIcon from "../../assets/icons8-captain-america-64.png";
import "./Favorites.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function Favorites() {
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const [favoriteComics, setFavoriteComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // récupérer les ID des favs depuis localStorage
        const storedCharacters = localStorage.getItem("favoriteCharacters");
        const storedComics = localStorage.getItem("favoriteComics");
        const characterIds = storedCharacters ? JSON.parse(storedCharacters) : [];
        const comicIds = storedComics ? JSON.parse(storedComics) : [];

        // récupérer les détails des personnages fav
        const characterPromises = characterIds.map(id =>
          axios.get(`${API_URL}/characters/${id}`)
        );
        const characterResponses = await Promise.all(characterPromises);
        const characters = characterResponses.map(res => res.data);

        // récupérer les détails des comics fav
        const comicPromises = comicIds.map(comicId =>
          axios.get(`${API_URL}/comics/comic/${comicId}`)
        );
        const comicResponses = await Promise.all(comicPromises);
        const comics = comicResponses.map(res => res.data);

        setFavoriteCharacters(characters);
        setFavoriteComics(comics);
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

  const handleRemoveFavorite = (type, id) => {
    if (type === "character") {
      const newFavorites = favoriteCharacters.filter(char => (char._id || char.id) !== id);
      setFavoriteCharacters(newFavorites);
      localStorage.setItem("favoriteCharacters", JSON.stringify(newFavorites.map(char => char._id)));
    } else {
      const newFavorites = favoriteComics.filter(comic => comic._id !== id);
      setFavoriteComics(newFavorites);
      localStorage.setItem("favoriteComics", JSON.stringify(newFavorites.map(comic => comic._id)));
    }
  };

  const handleCardClick = (type, id) => {
    if (type === "character") {
      navigate(`/characters/${id}/comics`);
    } else {
      navigate(`/comics/comic/${id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <Circles height={60} width={60} color="#e62429" ariaLabel="circles-loading" visible={true} />
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="favorites-page">
      <h1>My Favorites</h1>
      
      <section className="favorites-section">
        <h2>Favorites Characters</h2>
        {favoriteCharacters.length === 0 ? (
          <p>No favorite character</p>
        ) : (
          <div className="favorites-grid">
            {favoriteCharacters.map((character) => {
              const thumbnailUrl = character.thumbnail?.path && character.thumbnail?.extension
                ? `${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`
                : null;

              return (
                <div
                  key={character._id}
                  className="favorite-card"
                  style={{ position: "relative" }}
                >
                  {thumbnailUrl && (
                    <img
                      src={thumbnailUrl}
                      alt={character.name || "Personnage"}
                      className="favorite-img"
                      onClick={() => handleCardClick("character", character._id)}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                  <button
                    className="favorite-btn"
                    onClick={() => handleRemoveFavorite("character", character._id)}
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      opacity: 1
                    }}
                  >
                    <img
                      src={captainAmericaIcon}
                      alt="Remove from favorites"
                      width={32}
                      height={32}
                    />
                  </button>
                  <h3>{character.name || "Sans nom"}</h3>
                  <p>{character.description || "Pas de description."}</p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="favorites-section">
        <h2>Favorites Comics</h2>
        {favoriteComics.length === 0 ? (
          <p>No favorite comic</p>
        ) : (
          <div className="favorites-grid">
            {favoriteComics.map((comic) => {
              const thumbnailUrl = comic.thumbnail?.path && comic.thumbnail?.extension
                ? `${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`
                : null;

              return (
                <div
                  key={comic._id}
                  className="favorite-card"
                  style={{ position: "relative" }}
                >
                  {thumbnailUrl && (
                    <img
                      src={thumbnailUrl}
                      alt={comic.title || "Comic"}
                      className="favorite-img"
                      onClick={() => handleCardClick("comic", comic._id)}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                  <button
                    className="favorite-btn"
                    onClick={() => handleRemoveFavorite("comic", comic._id)}
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      opacity: 1
                    }}
                  >
                    <img
                      src={captainAmericaIcon}
                      alt="Remove from favorites"
                      width={32}
                      height={32}
                    />
                  </button>
                  <h3>{comic.title || "No title"}</h3>
                  <p>{comic.description || "No description."}</p>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default Favorites; 